import { Providers } from '@/components';
import { SessionProviderProps } from 'next-auth/react';
import React from 'react';
import { render } from '../../../../__utils__';

jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: SessionProviderProps) => (
    <div data-testid='session-provider'>{children}</div>
  ),
}));

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  TooltipProvider: ({ children }: React.PropsWithChildren) => (
    <div data-testid='tooltip-provider'>{children}</div>
  ),
}));

describe('Providers', () => {
  it('renders correctly with children', () => {
    const { getByTestId, getByText } = render(
      <Providers>
        <div>Test Child</div>
      </Providers>
    );

    const sessionProvider = getByTestId('session-provider');
    expect(sessionProvider).toBeInTheDocument();

    const tooltipProvider = getByTestId('tooltip-provider');
    expect(tooltipProvider).toBeInTheDocument();
    expect(sessionProvider).toContainElement(tooltipProvider);

    const childElement = getByText('Test Child');
    expect(childElement).toBeInTheDocument();
    expect(tooltipProvider).toContainElement(childElement);
  });

  it('renders without children', () => {
    const { getByTestId } = render(<Providers />);

    expect(getByTestId('session-provider')).toBeInTheDocument();
    expect(getByTestId('tooltip-provider')).toBeInTheDocument();
  });
});
