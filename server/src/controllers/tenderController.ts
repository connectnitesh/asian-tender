import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import Tender from '../models/Tender';
import getLatestId from '../utility/helper';
import path from 'path';
import { categoryData, stateData } from '../config';
import User from '../models/User';
import {decrypt} from '../utility/crypto'


export const CreateTender = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, state, category, value, closeDate } = req.body;

        if (!state || !Object.keys(stateData).includes(state)) {
            return res.status(400).json({status: "failure", message: 'Invalid state provided' });
        }
        if (!category || !Object.keys(categoryData).includes(category)) {
            return res.status(400).json({status: "failure", message: 'Invalid category provided' });
        }

        let tID = await getLatestId(Tender, "tID");
        tID++;


        const newTender = new Tender({ tID, title, state: stateData[state], state_code: state, category: categoryData[category], category_code: category, value, document: req.filePath, closeDate: closeDate });
        await newTender.save();

        return res.status(201).json({status: "success", message: "Tender Upload Successfully!", tender: {tID: newTender.tID, title: newTender.title, state: newTender.state, category: newTender.category }});
    } catch (error) {
        next(error);
    }
};


export const UpdateTender = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, state, category, value, closeDate } = req.body;
        const { tID } = req.params;

        const existingTender = await Tender.findOne({ tID: parseInt(tID, 10) });

        if (!existingTender) {
            return res.status(404).json({status: "failure", message: 'Tender not found' });
        }

        if (title) {
            existingTender.title = title;
        }
        if (state) {
            if (!Object.keys(stateData).includes(state)) {
                return res.status(400).json({status: "failure", message: 'Invalid state provided' });
            }
            existingTender.state = stateData[state];
            existingTender.state_code = state;
        }
        if (category) {
            if (!Object.keys(categoryData).includes(category)) {
                return res.status(400).json({status: "failure", message: 'Invalid category provided' });
            }
            existingTender.category = categoryData[category];
            existingTender.category_code = category;
        }
        if (value) {
            existingTender.value = value;
        }
        if (closeDate) {
            existingTender.closeDate = closeDate;
        }
        if (req.file) {
            const existingTenderDoc = existingTender.document;
            if (existingTenderDoc) {
                fs.unlink(existingTenderDoc, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            existingTender.document = req.filePath;
        }


        await existingTender.save();

        return res.json({status: "success", message: `Tender with tID: ${existingTender.tID} updated Successfully`});
    } catch (error) {
        next(error);
    }
};


export const DeleteTender = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tID } = req.params;

        const existingTender = await Tender.findOne({ tID: parseInt(tID, 10) });

        if (!existingTender) {
            return res.status(404).json({status: "failure", message: 'Tender not found' });
        }

        const existingTenderDoc = existingTender.document;
        if (existingTenderDoc) {
            fs.unlink(existingTenderDoc, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        const deletedTender = await Tender.findByIdAndDelete(existingTender._id);

        return res.json({status:"success", message: `Tender tID: ${deletedTender.tID}: Title: ${deletedTender.title} deleted successfully`, });
    } catch (error) {
        next(error);
    }
};

export const GetAllTenders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tendersQuery = Tender.find({ closeDate: { $gte: today } }).skip(skip).limit(limit);
        const tenders = await tendersQuery.exec();

        const totalTendersCount = await Tender.countDocuments({ closeDate: { $gte: today } });
        const totalPages = Math.ceil(totalTendersCount / limit);

        console.log("GET ALL TENDERS")

        return res.json({
            tenders: tenders,
            metadata: {
                totalTenders: totalTendersCount,
                totalPages: totalPages,
                currentPage: page
            }
        });
    } catch (error) {
        next(error);
    }
};



export const GetTenderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tID } = req.params;

        const tender = await Tender.findOne({ tID: parseInt(tID, 10) });

        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        const tenderResult =  {
            tID: tender.tID,
            title: tender.title,
            state: tender.state,
            category: tender.category,
            value: tender.value,
            closeDate: tender.closeDate,
        }

        return res.json(tenderResult);
    } catch (error) {
        next(error);
    }
};

export const FilterTenders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { state, category, value, limit, page } = req.query;

        let stateQuery = {};
        let categoryQuery = {};

        if (state) {
            const states = (state as string).split(',');
            stateQuery = { state_code: { $in: states } };
        }

        if (category) {
            const categories = (category as string).split(',');
            categoryQuery = { category_code: { $in: categories } };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const query: any = {
            ...stateQuery,
            ...categoryQuery,
            closeDate: { $gte: today } // Default closeDate to filter from today onwards
        };

        const sortOptions: any = {};

        if (value === 'max') {
            sortOptions.value = -1;
        } else if (value === 'min') {
            sortOptions.value = 1;
        }

        const pageValue = parseInt(page as string, 10) || 1;
        const limitValue = parseInt(limit as string, 10) || 10;
        const skip = (pageValue - 1) * limitValue;

        const tenders = await Tender.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitValue);

        const totalTendersCount = await Tender.countDocuments(query);
        const totalPages = Math.ceil(totalTendersCount / limitValue);

        console.log("FILTEER TENDER")

        return res.json({
            tenders: tenders,
            metadata: {
                totalTenders: totalTendersCount,
                totalPages: totalPages,
                currentPage: pageValue,
                pageSize: limitValue,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const GlobalTenderSearch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.query;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const skip = (page - 1) * limit;

        const tenders = await Tender.find({
            $and: [
                {
                    $or: [
                        { title: { $regex: text, $options: 'i' } },
                        { state: { $regex: text, $options: 'i' } },
                        { category: { $regex: text, $options: 'i' } },
                    ]
                },
                { closeDate: { $gte: today } } // Filter by closeDate >= today
            ]
        } as any).skip(skip).limit(limit);

        const totalTendersCount = await Tender.countDocuments({
            $and: [
                {
                    $or: [
                        { title: { $regex: text, $options: 'i' } },
                        { state: { $regex: text, $options: 'i' } },
                        { category: { $regex: text, $options: 'i' } },
                    ]
                },
                { closeDate: { $gte: today } } // Filter by closeDate >= today
            ]
        }as any);

        const totalPages = Math.ceil(totalTendersCount / limit);

        console.log("GLOBLA TENDER")

        return res.json({
            tenders: tenders,
            metadata: {
                totalTenders: totalTendersCount,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error) {
        next(error);
    }
};

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const DownloadTenderDocument = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const tenderId = req.params.tID;

        const tender = await Tender.findOne({ tID: parseInt(tenderId, 10) });

        if (!tender) {
            return res.status(404).json({status: "failure", message: 'Tender not found' });
        }

        const userId = parseInt(req.user.userId, 10);

        const dbUser = await User.findOne({ userId: userId });

        if (!dbUser) {
            return res.status(404).json({status: "failure", message: 'User not found' });
        }

        if (!dbUser.subscribedStatus || new Date(dbUser.subscriptionExpiryDate) < new Date()) {
            return res.status(403).json({status: "failure", message: 'Not authorized: Subscription expired or not subscribed' });
        }

        const documentPath = tender.document;

        if (!documentPath) {
            return res.status(404).json({status: "failure", message: 'Document not found for this tender' });
        }

            
        const decryptTenderDoc = decrypt(documentPath);
        const absolutePath = path.resolve(decryptTenderDoc);
            
  

        if (!fs.existsSync(absolutePath)) {
            return res.status(404).json({status: "failure", message: 'Document file not found' });
        }

        res.download(absolutePath, (err) => {
            if (err) {
                next(err);
            }
        });
    } catch (error) {
        next(error);
    }
};


