import { SerializableError } from './errors';

interface Validator<T> {
  validate(value: T): SerializableError[];
}

export { Validator };
