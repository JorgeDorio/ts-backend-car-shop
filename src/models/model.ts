import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class ModelDefault<T> implements IModel<T> {
  constructor(private data: Model<T>) { }
  public async create(obj: T): Promise<T> {
    return this.data.create({ ...obj });
  }
  public async read(): Promise<T[]> {
    return this.data.find();
  }
  public async readOne(_id: string): Promise<T | null> {
    return this.data.findOne({ _id });
  }
  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    return this.data.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
    );
  }
  public async delete(_id: string): Promise<T | null> {
    return this.data.findByIdAndDelete({ _id });
  }
}
