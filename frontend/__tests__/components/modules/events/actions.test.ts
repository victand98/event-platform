import { revalidateEventsAction } from '@/components';
import { revalidateTag } from 'next/cache';

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

describe('actions', () => {
  describe('revalidateEventsAction', () => {
    it('should call revalidateTag with the correct tag', () => {
      revalidateEventsAction();
      expect(revalidateTag).toHaveBeenCalledWith('/events');
    });

    it('should call revalidateTag only once', () => {
      revalidateEventsAction();
      expect(revalidateTag).toHaveBeenCalledTimes(1);
    });

    it('should not throw any errors', () => {
      expect(() => revalidateEventsAction()).not.toThrow();
    });

    it('should return undefined', () => {
      const result = revalidateEventsAction();
      expect(result).toBeUndefined();
    });
  });
});
