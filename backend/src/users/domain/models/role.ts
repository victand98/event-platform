const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

type Role = (typeof Role)[keyof typeof Role];

export { Role };
