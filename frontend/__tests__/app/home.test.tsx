import '@testing-library/jest-dom';

import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('should render the home page', () => {
    render(<Home />);

    const title = screen.getByText(/Get started by editing/);

    expect(title).toBeInTheDocument();
  });
});
