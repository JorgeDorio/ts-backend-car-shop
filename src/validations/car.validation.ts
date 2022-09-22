import { NextFunction, Request, Response } from 'express';
import { ICar, CarZodSchema } from '../interfaces/ICar';

export default class CarValidation {
  public validate = (req: Request, res: Response<ICar>, next: NextFunction) => {
    const car = req.body;
    const parsed = CarZodSchema.safeParse(car);
    if (!parsed.success) return res.status(400).end();
    next();
  };

  public idValidation = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id.length < 24) {
      return res.status(400).json({ error: 'Id must have 24 hexadecimal characters' });
    }
    next();
  };
}
