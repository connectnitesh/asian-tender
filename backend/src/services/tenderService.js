const Tender = require('../models/tenderModel');
const User = require('../models/userModel');

const tenderService = {
    search: async (req, res) => {
        try {
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";

            const tender = await Tender.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { state: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                ],
            })
                .skip(page * limit)
                .limit(limit);


            const total = await Tender.countDocuments({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { state: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                ],
            });

            const response = {
                total,
                page: page + 1,
                limit,
                data:tender,
            };

            return response;
        } catch (err) {
            console.log(err);
            throw ({ message: err });
        }
    },

    filter: async (req, res) => {
        try {
            const page = parseInt(req.body.page) - 1 || 0;
            const limit = parseInt(req.body.limit) || 10;
            const category = req.body.category
            const state = req.body.state
            if (category) {
                const tender = await Tender.find({ category: category })
                    .skip(page * limit)
                    .limit(limit);

                const total = await Tender.countDocuments({
                    category: category
                });

                const response = {
                    total,
                    page: page + 1,
                    limit,
                    data: tender,
                };

                return response;
            }
            if (state) {
                const tender = await Tender.find({ state: state })
                    .skip(page * limit)
                    .limit(limit);

                const total = await Tender.countDocuments({
                    state: state
                });

                const response = {
                    total,
                    page: page + 1,
                    limit,
                    data: tender,
                };

                return response;
            }
            throw ({ message: "Category or State is not defined" })

        } catch (err) {
            console.log(err);
            throw ({ message: err });
        }
    },

    details: async (req, res) => {
        try {
            const tID = req.query.tID;
            const response = await Tender.find({ tID: tID });
            return response;
        } catch (err) {
            console.log(err);
            throw ({ message: err })
        }
    },

    list: async (req, res) => {
        try {
            const tID = req.params.tID;
            const response = await Tender.findOne({ tID: tID });
            return response;
        } catch (err) {
            console.log(err);
            throw ({ message: err })
        }
    },

    getLastTenderID: async () => {
        const latestTender = await Tender.findOne().sort({ tID: -1 }).limit(1);
        return latestTender ? latestTender.tID : 0;
    },

    add: async (req, res) => {
        try {
            const { state, category, title, value, closeDate, document } = req.body;
            const tID = await tenderService.getLastTenderID();
            console.log(tID);
            const newTender = new Tender({
                tID: tID,
                state: state,
                category: category,
                title: title,
                value: value,
                closeDate: closeDate,
                document: document
            })
            await newTender.save();
            return { tID: newTender.tID, title: newTender.title };
        } catch (err) {
            console.log(err);
            throw ({ message: err })
        }
    },

    delete: async (req, res) => {
        try {
            const tID = req.params.tID;
            await Tender.findOneAndDelete({ tID: tID });
            return { tID };
        }
        catch (err) {
            console.log(err);
            throw { message: err };
        }
    },

    subscribe: async (req, res) => {
        try {
            const email = req.body.email;
            const _user = await User.findOne({email: email});
            if (_user) {
                const updatedUser = await User.findOneAndUpdate(
                    { email: email },
                    { $set: { subscription: true } },
                    { new: true }
                );

                if (updatedUser) {
                    return {
                        name: updatedUser.name,
                        email: updatedUser.email,
                        subscription: updatedUser.subscription ? "SUCCESS" : "NOT_SUBSCRIBE"
                    };
                }
            }
            throw { message: "User doesn't exist " }
        }
        catch (err) {
            console.log(err);
            throw { message: err };
        }
    },

    listSubscriber: async (req, res) => {
        try {
            const page = parseInt(req.body.page) -1 || 0 ;
            const limit = parseInt(req.body.limit) || 10 ;
            const subscriber = await User.find({ subscription: true }).skip(page*limit).limit(limit);
            const total = await User.countDocuments({subscription: true});

            const response={
                total,
                page,
                limit,
                data: subscriber
            }

            return response;
        } catch (err) {
            console.log(err);
            throw { message: err }
        }
    },

    seed: async (req, res) => {
        try {
            const data = require('../utils/sample-tender.json');
            await Tender.deleteMany({});
            await Tender.insertMany(data);
            return ({ message: 'Database seeded successfully' });
        } catch (error) {
            throw ({ error: 'Error seeding database' });
        }
    }
}


module.exports = tenderService;