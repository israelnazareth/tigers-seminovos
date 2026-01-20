import { render } from '@testing-library/react';
import { Arrow } from '@/app/_components/Icons/Arrows';
import { Socials } from '@/app/_components/Icons/Socials';

describe('Arrow Icons', () => {
  describe('Arrow.Left', () => {
    it('should render left arrow with default size', () => {
      render(<Arrow.Left />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });

    it('should render left arrow with custom size', () => {
      render(<Arrow.Left size={24} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });

    it('should apply custom className', () => {
      render(<Arrow.Left className="custom-class" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('should apply custom style', () => {
      render(<Arrow.Left style={{ color: 'red' }} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });

    it('should have aria-hidden attribute', () => {
      render(<Arrow.Left />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Arrow.Right', () => {
    it('should render right arrow with default size', () => {
      render(<Arrow.Right />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });

    it('should render right arrow with custom size', () => {
      render(<Arrow.Right size={32} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');
    });

    it('should apply custom className', () => {
      render(<Arrow.Right className="test-class" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('test-class');
    });
  });
});

describe('Social Icons', () => {
  describe('Socials.Facebook', () => {
    it('should render Facebook icon with default size', () => {
      render(<Socials.Facebook />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });

    it('should render Facebook icon with custom size', () => {
      render(<Socials.Facebook size={24} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });

    it('should apply custom className and style', () => {
      render(<Socials.Facebook className="fb-icon" style={{ fill: 'blue' }} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('fb-icon');
      expect(svg).toHaveStyle({ fill: 'blue' });
    });
  });

  describe('Socials.Instagram', () => {
    it('should render Instagram icon with default size', () => {
      render(<Socials.Instagram />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '16');
    });

    it('should render Instagram icon with custom size', () => {
      render(<Socials.Instagram size={48} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('width', '48');
      expect(svg).toHaveAttribute('height', '48');
    });

    it('should apply custom className', () => {
      render(<Socials.Instagram className="insta-icon" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('insta-icon');
    });
  });

  describe('Socials.Whatsapp', () => {
    it('should render WhatsApp icon with default size', () => {
      render(<Socials.Whatsapp />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '16');
    });

    it('should render WhatsApp icon with custom size', () => {
      render(<Socials.Whatsapp size={32} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');
    });

    it('should apply custom style', () => {
      render(<Socials.Whatsapp style={{ color: 'green' }} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle({ color: 'rgb(0, 128, 0)' });
    });
  });
});
