import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { ADMIN_SIGNUP_SECRET } from '../config'
import Admin from '../models/Admin';
import User from '../models/User';
import getLatestId from '../utility/helper';


export const AdminSignup = async (req: Request, res: Response, next: NextFunction) => {

  const { email, password, secret } = req.body;
  try {

    if (secret !== ADMIN_SIGNUP_SECRET) {
      return res.status(401).json({status: "failure", message: 'Unauthorized' });
    }

    const existingAdmin = await Admin.findOne({ email: email });

    if (existingAdmin) {
      return res.status(400).json({status: "failure", message: 'Admin already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let adminId = await getLatestId(Admin, "adminId");
    adminId++;
    const newAdmin = new Admin({
      email: email,
      adminId: adminId,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({status: "success", message: 'Admin registered successfully', newAdmin });
  } catch (error) {
    next(error);
  }
};

export const AdminLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ status: "failure", message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({status: "failure",  message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin.adminId, username: admin.username }, APP_SECRET, { expiresIn: '24h' });

    res.status(200).json({status: "success", "asiantoken_adn_": token });
  } catch (error) {
    next(error);
  }
};



export const CustomerSignup = async (req: Request, res: Response, next: NextFunction) => {
  const { name,email, contact,  company, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { contact }] });


    if (existingUser) {
      return res.status(400).json({ status: "failure", message: 'User already exists with this email or contact number' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let userId = await getLatestId(User, "userId");
    userId++;

    const newCustomer = new User({
      name,
      email,
      contact,
      company,
      password: hashedPassword,
      userId: userId,
    });
    await newCustomer.save();

    res.status(201).json({ status:"success", message: 'Customer registered successfully' });
  } catch (error) {
    next(error);
  }
};


export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "failure", message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: "failure", message: 'Invalid password' });
    }


    const token = jwt.sign({ userId: user.userId }, APP_SECRET, { expiresIn: '24h' });
    console.log(token);
    res.status(200).json({status: "success", "asiantoken_": token });
  } catch (error) {
    next(error);
  }
};

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const CustomerProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.user.userId, 10);

    const dbUser = await User.findOne({ userId: userId });

    if (!dbUser) {
      return res.status(404).json({status: "success", message: 'User not found' });
    } 
    
    const filteredProfile = {
      name: dbUser.name,
      email: dbUser.email,
      contact: dbUser.contact,
      company: dbUser.company,
      subscribed: dbUser.subscribedStatus
    };


    return res.json({status: "success", userProfile: filteredProfile});

  } catch (error) {
    next(error);
  }
};


interface AuthenticatedRequestAdmin extends Request {
  adminId?: any;
}

export const AdminProfile = async (req: AuthenticatedRequestAdmin, res: Response, next: NextFunction) => {
  try {

    return res.json({status: "success", adminId: req.adminId});

  } catch (error) {
    next(error);
  }
};

