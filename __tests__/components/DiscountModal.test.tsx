import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiscountModal from '@/app/_components/DiscountModal/DiscountModal';

describe('DiscountModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render in open state by default', () => {
    render(<DiscountModal />);
    
    expect(screen.getByText(/GANHE UM/)).toBeInTheDocument();
    expect(screen.getByText(/DESCONTO DE ATÉ/)).toBeInTheDocument();
    expect(screen.getByText('R$ 3.000,00')).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    render(<DiscountModal />);
    
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Telefone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render car image', () => {
    render(<DiscountModal />);
    
    const carImage = screen.getByAltText('Carro BMW');
    expect(carImage).toBeInTheDocument();
  });

  it('should minimize modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    const closeButton = screen.getByRole('button', { name: 'Minimizar' });
    await user.click(closeButton);
    
    expect(screen.getByText('Ganhe desconto!')).toBeInTheDocument();
    expect(screen.queryByText('GANHE UM')).not.toBeInTheDocument();
  });

  it('should restore modal when minimized button is clicked', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    // Minimize
    const closeButton = screen.getByRole('button', { name: 'Minimizar' });
    await user.click(closeButton);
    
    // Restore - the minimized button contains both emoji and text
    const minimizedContainer = document.querySelector('[class*="modalMinimized"]');
    await user.click(minimizedContainer as Element);
    
    expect(screen.getByText('R$ 3.000,00')).toBeInTheDocument();
  });

  it('should render gift emoji when minimized', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    const closeButton = screen.getByRole('button', { name: 'Minimizar' });
    await user.click(closeButton);
    
    expect(screen.getByText('🎁')).toBeInTheDocument();
  });

  it('should disable submit button when form is incomplete', () => {
    render(<DiscountModal />);
    
    const submitButton = screen.getByRole('button', { name: 'SOLICITAR' });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is complete', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    await user.type(screen.getByPlaceholderText('Seu nome'), 'João Silva');
    await user.type(screen.getByPlaceholderText('Telefone'), '11999999999');
    await user.type(screen.getByPlaceholderText('Email'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    const submitButton = screen.getByRole('button', { name: 'SOLICITAR' });
    expect(submitButton).not.toBeDisabled();
  });

  it('should update form fields on input', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    const nomeInput = screen.getByPlaceholderText('Seu nome');
    const telefoneInput = screen.getByPlaceholderText('Telefone');
    const emailInput = screen.getByPlaceholderText('Email');
    
    await user.type(nomeInput, 'Carlos');
    await user.type(telefoneInput, '21988887777');
    await user.type(emailInput, 'carlos@test.com');
    
    expect(nomeInput).toHaveValue('Carlos');
    expect(telefoneInput).toHaveValue('21988887777');
    expect(emailInput).toHaveValue('carlos@test.com');
  });

  it('should show loading state when submitting', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    // Fill form
    await user.type(screen.getByPlaceholderText('Seu nome'), 'João Silva');
    await user.type(screen.getByPlaceholderText('Telefone'), '11999999999');
    await user.type(screen.getByPlaceholderText('Email'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    // Submit
    const submitButton = screen.getByRole('button', { name: 'SOLICITAR' });
    await user.click(submitButton);
    
    // Check loading state - spinner should be present
    const spinner = document.querySelector('[class*="spinner"]');
    expect(spinner).toBeInTheDocument();
  });

  it('should disable inputs during loading', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    // Fill form
    await user.type(screen.getByPlaceholderText('Seu nome'), 'João Silva');
    await user.type(screen.getByPlaceholderText('Telefone'), '11999999999');
    await user.type(screen.getByPlaceholderText('Email'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    // Submit
    const submitButton = screen.getByRole('button', { name: 'SOLICITAR' });
    await user.click(submitButton);
    
    // Check inputs are disabled
    expect(screen.getByPlaceholderText('Seu nome')).toBeDisabled();
    expect(screen.getByPlaceholderText('Telefone')).toBeDisabled();
    expect(screen.getByPlaceholderText('Email')).toBeDisabled();
  });

  it('should show success state after submission', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.useFakeTimers();
    
    render(<DiscountModal />);
    
    // Fill form
    await user.type(screen.getByPlaceholderText('Seu nome'), 'João Silva');
    await user.type(screen.getByPlaceholderText('Telefone'), '11999999999');
    await user.type(screen.getByPlaceholderText('Email'), 'joao@email.com');
    await user.selectOptions(screen.getByRole('combobox'), 'barra');
    
    // Submit
    const submitButton = screen.getByRole('button', { name: 'SOLICITAR' });
    await user.click(submitButton);
    
    // Fast-forward timers
    await jest.advanceTimersByTimeAsync(2500);
    
    await waitFor(() => {
      expect(screen.getByText('Parabéns!')).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  }, 10000);

  it('should have store options in dropdown', () => {
    render(<DiscountModal />);
    
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    
    expect(options).toHaveLength(4); // placeholder + 3 stores
    expect(screen.getByRole('option', { name: 'Selecione uma loja' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Barra da Tijuca' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Botafogo' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Niterói' })).toBeInTheDocument();
  });

  it('should not submit when form is invalid', async () => {
    const user = userEvent.setup();
    render(<DiscountModal />);
    
    // Only fill partial form
    await user.type(screen.getByPlaceholderText('Seu nome'), 'João');
    
    const submitButton = screen.getByRole('button', { name: 'SOLICITAR' });
    expect(submitButton).toBeDisabled();
    
    // Should still show form (no loading or success)
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
  });
});
