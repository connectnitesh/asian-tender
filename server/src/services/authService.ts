const jwt = require('jsonwebtoken');
import { APP_SECRET } from '../config';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

interface AuthenticatedRequestAdmin extends Request {
  adminId?: any;
}

const verifyToken = (req: AuthenticatedRequestAdmin, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({status: "failure", message: 'Unauthorized: Access token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, APP_SECRET);
    if (decoded.adminId < 1000 && decoded.adminId > 1002) {
      return res.status(403).json({status: "failure", message: 'Forbidden: Admin access required' });
      }
      req.adminId = decoded.adminId;
      
    next();
  } catch (error) {
    return res.status(401).json({status: "failure", message: 'Unauthorized: Invalid token' });
  }
};



const verifyTokenUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({status: "failure", message: 'Unauthorized: Access token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, APP_SECRET) as any;

    if (!decoded.userId) {
      return res.status(401).json({status: "failure", message: 'Unauthorized: Access Denied' });
    }

    req.user = decoded;
    console.log(decoded);

    next();
  } catch (error) {
    return res.status(401).json({status: "failure", message: 'Unauthorized: Invalid token' });
  }
};


export { verifyToken, verifyTokenUser };
