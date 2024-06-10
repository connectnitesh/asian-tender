// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config';

// export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header('Authorization')?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET) as any;
//         req.userId = decoded.userId;
//         req.role = decoded.role;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };
