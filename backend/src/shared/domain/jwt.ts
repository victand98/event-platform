interface Jwt {
  sign(payload: unknown): string;
  verify(token: string): unknown;
}

export { Jwt };
