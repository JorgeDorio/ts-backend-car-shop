import CustomErrors from '../errors/CustomErrors';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class CarService implements IService<ICar> {
  constructor(private _car: IModel<ICar>) { }

  public create = async (car: ICar): Promise<ICar> => {
    const parsed = CarZodSchema.safeParse(car);
    if (!parsed.success) throw new CustomErrors(400, 'Invalid fields');
    const result = await this._car.create(parsed.data);
    return result;
  };

  public read = async (): Promise<ICar[]> => {
    const car = await this._car.read();
    if (!car) throw new CustomErrors(400, 'Invalid fields');
    return car;
  };

  public readOne = async (id: string): Promise<ICar | null> => {
    const result = await this._car.readOne(id);
    return result;
  };
}

export default CarService;
