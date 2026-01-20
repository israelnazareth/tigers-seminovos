import { render, screen } from '@testing-library/react';
import { WhatsAppButton } from '@/app/_components/WhatsAppButton/WhatsAppButton';

describe('WhatsAppButton', () => {
  it('should render the button', () => {
    render(<WhatsAppButton />);
    
    const link = screen.getByRole('link', { name: 'Fale conosco pelo WhatsApp' });
    expect(link).toBeInTheDocument();
  });

  it('should have correct href', () => {
    render(<WhatsAppButton />);
    
    const link = screen.getByRole('link', { name: 'Fale conosco pelo WhatsApp' });
    expect(link).toHaveAttribute('href', 'https://wa.me/5500000000000');
  });

  it('should open in new tab', () => {
    render(<WhatsAppButton />);
    
    const link = screen.getByRole('link', { name: 'Fale conosco pelo WhatsApp' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have accessible aria-label', () => {
    render(<WhatsAppButton />);
    
    const link = screen.getByRole('link', { name: 'Fale conosco pelo WhatsApp' });
    expect(link).toHaveAttribute('aria-label', 'Fale conosco pelo WhatsApp');
  });

  it('should render WhatsApp icon', () => {
    render(<WhatsAppButton />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });
});
