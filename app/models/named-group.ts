export class NamedGroup<T> {
  constructor(
    public id: string,
    public name: string,
    public group: T[]
    ) { }
}
