interface Jwt {
  sign(payload: unknown): string;
  verify<T>(token: string): T;
}

export { Jwt };
