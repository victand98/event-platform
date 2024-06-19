export const Role: { [key: string]: 'USER' | 'ADMIN' } = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export type Role = (typeof Role)[keyof typeof Role];
