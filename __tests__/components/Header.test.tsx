import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/app/_components/Header/Header';
import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.Mock;

describe('Header', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('should render the logo', () => {
    render(<Header />);
    const logo = screen.getByText('Tigers');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('should render desktop navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Início' })).toBeInTheDocument();
    // Multiple links exist (desktop + mobile), so use getAllBy
    expect(screen.getAllByRole('link', { name: 'Catálogo' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Agende uma visita' }).length).toBeGreaterThan(0);
  });

  it('should highlight active navigation link on home page', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: 'Início' });
    expect(homeLink.className).toContain('navLinkActive');
  });

  it('should highlight active navigation link on catalogo page', () => {
    mockUsePathname.mockReturnValue('/catalogo');
    render(<Header />);
    const catalogoLinks = screen.getAllByRole('link', { name: 'Catálogo' });
    // Desktop nav link
    expect(catalogoLinks[0].className).toContain('navLinkActive');
  });

  it('should highlight active navigation link on agende-sua-visita page', () => {
    mockUsePathname.mockReturnValue('/agende-sua-visita');
    render(<Header />);
    const visitaLinks = screen.getAllByRole('link', { name: 'Agende uma visita' });
    expect(visitaLinks[0].className).toContain('navLinkActive');
  });

  it('should render social media links', () => {
    render(<Header />);
    const instagramLinks = screen.getAllByRole('link', { name: 'Instagram' });
    const facebookLinks = screen.getAllByRole('link', { name: 'Facebook' });
    
    expect(instagramLinks.length).toBeGreaterThan(0);
    expect(facebookLinks.length).toBeGreaterThan(0);
    expect(instagramLinks[0]).toHaveAttribute('href', 'https://instagram.com');
    expect(facebookLinks[0]).toHaveAttribute('href', 'https://facebook.com');
  });

  it('should render hamburger menu button', () => {
    render(<Header />);
    const hamburgerButton = screen.getByRole('button', { name: 'Abrir menu' });
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const hamburgerButton = screen.getByRole('button', { name: 'Abrir menu' });
    
    // Click to open
    await user.click(hamburgerButton);
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toBeInTheDocument();
    
    // Click to close
    await user.click(hamburgerButton);
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toBeInTheDocument();
  });

  it('should close mobile menu when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    // Open mobile menu
    const hamburgerButton = screen.getByRole('button', { name: 'Abrir menu' });
    await user.click(hamburgerButton);
    
    // Get mobile nav links
    const mobileLinks = screen.getAllByRole('link', { name: 'Catálogo' });
    // Click mobile link (second one is mobile nav)
    await user.click(mobileLinks[1]);
    
    // Menu should be closed
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toBeInTheDocument();
  });

  it('should open social links in new tab', () => {
    render(<Header />);
    const instagramLinks = screen.getAllByRole('link', { name: 'Instagram' });
    const facebookLinks = screen.getAllByRole('link', { name: 'Facebook' });
    
    instagramLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
    
    facebookLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
