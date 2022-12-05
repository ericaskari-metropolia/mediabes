import { Request, Response, NextFunction } from 'express';

export type authenticateJWT = (req: Request, res: Response, next: NextFunction) => any;
