export interface IModel<T> {
  create(obj: T): Promise<T>,
  read(_id: string): Promise<T[]>,
  readOne(_id: string): Promise<T | null>,
  update(_id: string, body: T): Promise<T | null>,
  delete(_id: string): Promise<T | null>,
}
