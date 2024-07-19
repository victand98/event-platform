import '@testing-library/jest-dom';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(async () => true),
}));

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(async () => true),
}));
