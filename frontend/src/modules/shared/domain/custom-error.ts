interface SerializableError<T extends Record<string, any>> {
  message: string;
  field?: keyof T | 'root';
}

interface CustomError<T extends Record<string, any> = {}> {
  errors: SerializableError<T>[];
}

export type { CustomError };
