import { SiteFooter } from '@/components';
import { siteConfig } from '@/config';
import { render, screen } from '../../../../__utils__';

describe('SiteFooter', () => {
  it('should render correctly', () => {
    render(<SiteFooter />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();

    expect(screen.getByText(/Built by/i)).toBeInTheDocument();

    const authorLink = screen.getByText(siteConfig.author);
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', siteConfig.links.author);
    expect(authorLink).toHaveAttribute('target', '_blank');
    expect(authorLink).toHaveAttribute('rel', 'noreferrer');

    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', siteConfig.links.github);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('should apply correct className to footer', () => {
    const customClass = 'custom-footer-class';
    render(<SiteFooter className={customClass} />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(customClass);
  });
});
