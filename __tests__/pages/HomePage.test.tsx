import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('should render the hero section', () => {
    render(<HomePage />);
    
    // Check for hero content
    expect(screen.getByText('IPVA Grátis')).toBeInTheDocument();
    expect(screen.getByText('Blindados à pronta entrega')).toBeInTheDocument();
  });

  it('should render all hero slides', () => {
    render(<HomePage />);
    
    expect(screen.getByText('IPVA Grátis')).toBeInTheDocument();
    expect(screen.getByText('Primeira parcela só depois da Páscoa')).toBeInTheDocument();
    expect(screen.getByText('Entrada a partir de R$ 5.000')).toBeInTheDocument();
  });

  it('should render navigation buttons', () => {
    render(<HomePage />);
    
    expect(screen.getByRole('button', { name: 'Slide anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo slide' })).toBeInTheDocument();
  });

  it('should render category cards section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Utilitários')).toBeInTheDocument();
    expect(screen.getByText('SUV')).toBeInTheDocument();
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('Hatch')).toBeInTheDocument();
  });

  it('should render category links to catalog', () => {
    render(<HomePage />);
    
    const categoryLinks = screen.getAllByRole('link', { name: /Utilitários|SUV|Sedan|Hatch/i });
    categoryLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/catalogo');
    });
  });

  it('should render "Conferir" buttons on categories', () => {
    render(<HomePage />);
    
    const conferirButtons = screen.getAllByRole('button', { name: 'Conferir' });
    expect(conferirButtons).toHaveLength(4);
  });

  it('should render video section', () => {
    render(<HomePage />);
    
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/video-home.mp4');
    // Boolean attributes may be rendered differently in jsdom
    expect(video?.hasAttribute('autoplay') || video?.autoplay).toBeTruthy();
    expect(video?.hasAttribute('loop') || video?.loop).toBeTruthy();
  });

  it('should render CreditAnalysis component', () => {
    render(<HomePage />);
    
    expect(screen.getByText(/Faça sua análise com a TIGERS/i)).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Tigers Seminovos © 2026')).toBeInTheDocument();
  });

  it('should render Swiper carousel', () => {
    render(<HomePage />);
    
    const swiper = screen.getByTestId('swiper');
    expect(swiper).toBeInTheDocument();
  });

  it('should render all swiper slides', () => {
    render(<HomePage />);
    
    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(3);
  });

  it('should render hero slide titles', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Blindados à pronta entrega')).toBeInTheDocument();
    expect(screen.getByText('Financiamento facilitado')).toBeInTheDocument();
    expect(screen.getByText('Motos e carros seminovos')).toBeInTheDocument();
  });

  it('should render hero slide subtitles', () => {
    render(<HomePage />);
    
    expect(screen.getByText('O conforto e a segurança que você precisa')).toBeInTheDocument();
    expect(screen.getByText('Taxas especiais e aprovação rápida')).toBeInTheDocument();
    expect(screen.getByText('As melhores ofertas você encontra aqui')).toBeInTheDocument();
  });

  it('should render category images', () => {
    render(<HomePage />);
    
    const categoryImages = document.querySelectorAll('[class*="categoryImage"]');
    expect(categoryImages.length).toBeGreaterThanOrEqual(4);
  });
});
