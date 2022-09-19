import CustomErrors from '../errors/CustomErrors';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(car: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(car);
    if (!parsed.success) throw new CustomErrors(400, 'Invalid fields');
    return this._car.create(parsed.data);
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new CustomErrors(400, 'Invalid fields');
    return car;
  }
}

export default CarService;
