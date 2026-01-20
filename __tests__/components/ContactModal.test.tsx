import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactModal } from '@/app/_components/ContactModal/ContactModal';
import { vehicles } from '@/lib/vehicles';

const mockVehicle = vehicles[0];
const mockOnClose = jest.fn();

describe('ContactModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with vehicle info', () => {
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    expect(screen.getByText('Solicite sua cotação')).toBeInTheDocument();
    expect(screen.getByText('Dados para contato')).toBeInTheDocument();
    expect(screen.getByText(mockVehicle.name.toUpperCase())).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    expect(screen.getByPlaceholderText('NOME')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('TELEFONE')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('EMAIL')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render vehicle details correctly', () => {
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    // Vehicle details are shown in a combined format
    const vehicleDetails = document.querySelector('[class*="vehicleDetails"]');
    expect(vehicleDetails).toBeInTheDocument();
    // Verify vehicle name is displayed
    expect(screen.getByText(mockVehicle.name.toUpperCase())).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: 'Fechar' });
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should close modal when clicking on overlay', async () => {
    const user = userEvent.setup();
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    const overlay = document.querySelector('[class*="overlay"]');
    await user.click(overlay as Element);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not close modal when clicking inside modal content', async () => {
    const user = userEvent.setup();
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    const modal = document.querySelector('[class*="modal"]');
    await user.click(modal as Element);
    
    // onClose should not be called when clicking modal content
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should disable submit button when form is incomplete', () => {
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    const submitButton = screen.getByRole('button', { name: 'Solicitar' });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is complete', async () => {
    const user = userEvent.setup();
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    await user.type(screen.getByPlaceholderText('NOME'), 'João Silva');
    await user.type(screen.getByPlaceholderText('TELEFONE'), '11999999999');
    await user.type(screen.getByPlaceholderText('EMAIL'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    const submitButton = screen.getByRole('button', { name: 'Solicitar' });
    expect(submitButton).not.toBeDisabled();
  });

  it('should update form fields on input', async () => {
    const user = userEvent.setup();
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    const nomeInput = screen.getByPlaceholderText('NOME');
    const telefoneInput = screen.getByPlaceholderText('TELEFONE');
    const emailInput = screen.getByPlaceholderText('EMAIL');
    
    await user.type(nomeInput, 'Maria');
    await user.type(telefoneInput, '21988887777');
    await user.type(emailInput, 'maria@test.com');
    
    expect(nomeInput).toHaveValue('Maria');
    expect(telefoneInput).toHaveValue('21988887777');
    expect(emailInput).toHaveValue('maria@test.com');
  });

  it('should show loading state when submitting', async () => {
    const user = userEvent.setup();
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    // Fill form
    await user.type(screen.getByPlaceholderText('NOME'), 'João Silva');
    await user.type(screen.getByPlaceholderText('TELEFONE'), '11999999999');
    await user.type(screen.getByPlaceholderText('EMAIL'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    // Submit
    const submitButton = screen.getByRole('button', { name: 'Solicitar' });
    await user.click(submitButton);
    
    // Check loading state - spinner should be present
    const spinner = document.querySelector('[class*="spinner"]');
    expect(spinner).toBeInTheDocument();
  });

  it('should disable inputs during loading', async () => {
    const user = userEvent.setup();
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    // Fill form
    await user.type(screen.getByPlaceholderText('NOME'), 'João Silva');
    await user.type(screen.getByPlaceholderText('TELEFONE'), '11999999999');
    await user.type(screen.getByPlaceholderText('EMAIL'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    // Submit
    const submitButton = screen.getByRole('button', { name: 'Solicitar' });
    await user.click(submitButton);
    
    // Check inputs are disabled
    expect(screen.getByPlaceholderText('NOME')).toBeDisabled();
    expect(screen.getByPlaceholderText('TELEFONE')).toBeDisabled();
    expect(screen.getByPlaceholderText('EMAIL')).toBeDisabled();
  });

  it('should show success state after submission', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.useFakeTimers();
    
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    // Fill form
    await user.type(screen.getByPlaceholderText('NOME'), 'João Silva');
    await user.type(screen.getByPlaceholderText('TELEFONE'), '11999999999');
    await user.type(screen.getByPlaceholderText('EMAIL'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    // Submit
    const submitButton = screen.getByRole('button', { name: 'Solicitar' });
    await user.click(submitButton);
    
    // Fast-forward timers
    await jest.advanceTimersByTimeAsync(2500);
    
    await waitFor(() => {
      expect(screen.getByText('Solicitação enviada!')).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  }, 15000);

  it('should have store options in dropdown', () => {
    render(<ContactModal vehicle={mockVehicle} onClose={mockOnClose} />);
    
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    
    expect(options).toHaveLength(4); // placeholder + 3 stores
    expect(screen.getByRole('option', { name: 'LOJA MAIS PRÓXIMA' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Barra da Tijuca' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Botafogo' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Niterói' })).toBeInTheDocument();
  });
});
