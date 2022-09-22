export interface IModel<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[] | null>,
  // update(_id: string, body: T): Promise<T | null>,
  readOne(_id: string): Promise<T | null>,
  // delete(_id: string): Promise<T | null>
}
