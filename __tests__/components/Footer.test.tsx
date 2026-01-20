import { render, screen } from '@testing-library/react';
import Footer from '@/app/_components/Footer/Footer';

describe('Footer', () => {
  it('should render the footer', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should render all footer links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: 'Trabalhe conosco' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Parceiro de negócio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Termos de uso' })).toBeInTheDocument();
  });

  it('should link footer items to home page', () => {
    render(<Footer />);
    
    const trabalheLink = screen.getByRole('link', { name: 'Trabalhe conosco' });
    const parceiroLink = screen.getByRole('link', { name: 'Parceiro de negócio' });
    const termosLink = screen.getByRole('link', { name: 'Termos de uso' });
    
    expect(trabalheLink).toHaveAttribute('href', '/');
    expect(parceiroLink).toHaveAttribute('href', '/');
    expect(termosLink).toHaveAttribute('href', '/');
  });

  it('should render copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('Tigers Seminovos © 2026')).toBeInTheDocument();
  });
});
