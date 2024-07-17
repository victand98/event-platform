import { SignOutButton } from '@/components';
import { signOut } from 'next-auth/react';
import { fireEvent, render, screen } from '../../../../__utils__';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('SignOutButton', () => {
  it('should render correctly', () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: 'Yes, sign me out' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-full');
  });

  it('calls signOut with correct parameters when clicked', () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: 'Yes, sign me out' });
    fireEvent.click(button);

    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });
});
