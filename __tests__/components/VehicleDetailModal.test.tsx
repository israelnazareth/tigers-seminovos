import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VehicleDetailModal from '@/app/_components/VehicleDetailModal/VehicleDetailModal';
import { vehicles } from '@/lib/vehicles';

const mockVehicle = vehicles[0];
const mockOnClose = jest.fn();
const mockOnRequestQuote = jest.fn();

describe('VehicleDetailModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('should render the modal with vehicle info', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    expect(screen.getByText(mockVehicle.name)).toBeInTheDocument();
  });

  it('should render vehicle details', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    expect(screen.getByText('Ano')).toBeInTheDocument();
    expect(screen.getByText('Km')).toBeInTheDocument();
    expect(screen.getByText('Cor')).toBeInTheDocument();
    expect(screen.getByText('Combustível')).toBeInTheDocument();
    expect(screen.getByText('Blindagem')).toBeInTheDocument();
    expect(screen.getByText('Carroceria')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
    
    expect(screen.getByText(mockVehicle.color)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.fuel)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.armor)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.body)).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.make)).toBeInTheDocument();
  });

  it('should render action buttons', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Solicitar Cotação' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Falar com um atendente' })).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: 'Fechar' });
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should close modal when clicking on overlay', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const overlay = document.querySelector('[class*="overlay"]');
    await user.click(overlay as Element);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onRequestQuote when quote button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const quoteButton = screen.getByRole('button', { name: 'Solicitar Cotação' });
    await user.click(quoteButton);
    
    expect(mockOnRequestQuote).toHaveBeenCalledTimes(1);
  });

  it('should have WhatsApp link with correct href', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const waLink = screen.getByRole('link', { name: 'Falar com um atendente' });
    expect(waLink).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(waLink).toHaveAttribute('target', '_blank');
    expect(waLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render image counter', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    expect(screen.getByText(`1 / ${mockVehicle.images.length}`)).toBeInTheDocument();
  });

  it('should render navigation buttons when multiple images', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Imagem anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima imagem' })).toBeInTheDocument();
  });

  it('should navigate to next image', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: 'Próxima imagem' });
    await user.click(nextButton);
    
    expect(screen.getByText(`2 / ${mockVehicle.images.length}`)).toBeInTheDocument();
  });

  it('should navigate to previous image', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    // First go to next
    const nextButton = screen.getByRole('button', { name: 'Próxima imagem' });
    await user.click(nextButton);
    
    // Then go back
    const prevButton = screen.getByRole('button', { name: 'Imagem anterior' });
    await user.click(prevButton);
    
    expect(screen.getByText(`1 / ${mockVehicle.images.length}`)).toBeInTheDocument();
  });

  it('should wrap around when navigating past last image', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: 'Próxima imagem' });
    
    // Click through all images
    for (let i = 0; i < mockVehicle.images.length; i++) {
      await user.click(nextButton);
    }
    
    // Should wrap to first
    expect(screen.getByText(`1 / ${mockVehicle.images.length}`)).toBeInTheDocument();
  });

  it('should wrap around when navigating before first image', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const prevButton = screen.getByRole('button', { name: 'Imagem anterior' });
    await user.click(prevButton);
    
    // Should wrap to last
    expect(screen.getByText(`${mockVehicle.images.length} / ${mockVehicle.images.length}`)).toBeInTheDocument();
  });

  it('should navigate with keyboard arrows', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    // Press right arrow
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText(`2 / ${mockVehicle.images.length}`)).toBeInTheDocument();
    
    // Press left arrow
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText(`1 / ${mockVehicle.images.length}`)).toBeInTheDocument();
  });

  it('should close modal with Escape key', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should prevent body scroll when modal is open', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore body scroll when modal is closed', () => {
    const { unmount } = render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('should render indicators for multiple images', () => {
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const indicators = document.querySelectorAll('[class*="indicator"]');
    // Each image should have an indicator
    expect(indicators.length).toBeGreaterThanOrEqual(mockVehicle.images.length);
  });

  it('should navigate to specific image when indicator is clicked', async () => {
    const user = userEvent.setup();
    render(
      <VehicleDetailModal
        vehicle={mockVehicle}
        onClose={mockOnClose}
        onRequestQuote={mockOnRequestQuote}
      />
    );
    
    const thirdIndicator = screen.getByRole('button', { name: 'Ir para imagem 3' });
    await user.click(thirdIndicator);
    
    expect(screen.getByText(`3 / ${mockVehicle.images.length}`)).toBeInTheDocument();
  });
});
