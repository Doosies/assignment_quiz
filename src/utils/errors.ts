export class EmptyError extends Error {
  constructor(
    public message: string,
    public name: string = 'EmptyError',
  ) {
    super(message);
  }
}
