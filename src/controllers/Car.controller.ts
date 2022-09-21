import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public create = async (req: Request, res: Response<ICar>) => {
    const { body } = req;
    const result = await this._service.create(body);
    return res.status(201).json(result);
  }

  public read = async (_req: Request, res: Response<ICar[]>) => {
    const result = await this._service.read()
    console.log(result)
    return res.status(200).json(result)
  }
}
