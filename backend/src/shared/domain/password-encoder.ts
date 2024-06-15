interface PasswordEncoder {
  encode(password: string): Promise<string>;
  compare(password: string, encodedPassword: string): Promise<boolean>;
}

export { PasswordEncoder };
