import { getInitials } from '@/lib';

describe('utils', () => {
  describe('getInitials', () => {
    it('should return the initials of a name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('should return the initials of a name with more than two words', () => {
      expect(getInitials('John Doe Smith')).toBe('JD');
    });

    it('should return the initials of a name with one word', () => {
      expect(getInitials('John')).toBe('J');
    });
  });
});
