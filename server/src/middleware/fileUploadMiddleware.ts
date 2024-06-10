import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import {encrypt} from '../utility/crypto'


declare module 'express-serve-static-core' {
  interface Request {
    filePath?: string;
  }
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only PDF files are allowed'));
  }
  cb(null, true);
};


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../tenderDoc'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,//10Mb
  },
});

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single('tenderDoc')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const relativeFilePath = path.relative(process.cwd(), req.file.path);
    req.filePath = encrypt(relativeFilePath);
    next();
  });
};

export default uploadFile;
