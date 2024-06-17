interface Validator<T> {
  validate(value: T): void;
}

export { Validator };
