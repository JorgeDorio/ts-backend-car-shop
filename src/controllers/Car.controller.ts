import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public create = async (req: Request, res: Response<ICar>) => {
    const { body } = req;
    const result = await this._service.create(body);
    return res.status(201).json(result);
  };

  public read = async (_req: Request, res: Response<ICar[]>) => {
    const result = await this._service.read();
    return res.status(200).json(result);
  };

  public readOne = async (req: Request, res: Response<ICar | object>) => {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    if (!result) return res.status(404).json({ error: 'Object not found' });
    return res.status(200).json(result);
  };

  public update = async (req: Request, res: Response<ICar | object>) => {
    const { id } = req.params;
    const { body } = req;
    const result = await this._service.update(id, body);
    if (!result) return res.status(404).json({ error: 'Object not found' });
    // return res.status(200).json(result);
    return res.status(200).json({ ...req.body, _id: id });
  };
}
