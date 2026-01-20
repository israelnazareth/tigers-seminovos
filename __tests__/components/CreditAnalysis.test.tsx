import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreditAnalysis from '@/app/_components/CreditAnalysis/CreditAnalysis';

describe('CreditAnalysis', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    render(<CreditAnalysis />);
    
    expect(screen.getByText(/Faça sua análise com a TIGERS/i)).toBeInTheDocument();
    expect(screen.getByText(/Seu crédito em primeiro lugar/i)).toBeInTheDocument();
  });

  it('should render the card with text', () => {
    render(<CreditAnalysis />);
    
    expect(screen.getByText(/Seu carro novo com/i)).toBeInTheDocument();
    expect(screen.getByText(/aprovação facilitada/i)).toBeInTheDocument();
  });

  it('should render CPF input field', () => {
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('inputMode', 'numeric');
  });

  it('should render submit button', () => {
    render(<CreditAnalysis />);
    
    const button = screen.getByRole('button', { name: 'Continuar' });
    expect(button).toBeInTheDocument();
  });

  it('should disable button when CPF is incomplete', () => {
    render(<CreditAnalysis />);
    
    const button = screen.getByRole('button', { name: 'Continuar' });
    expect(button).toBeDisabled();
  });

  it('should format CPF as user types', async () => {
    const user = userEvent.setup();
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    
    await user.type(input, '12345678901');
    
    expect(input).toHaveValue('123.456.789-01');
  });

  it('should format CPF correctly for partial input', async () => {
    const user = userEvent.setup();
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    
    // Type 3 digits
    await user.type(input, '123');
    expect(input).toHaveValue('123');
    
    // Type more to trigger first dot
    await user.clear(input);
    await user.type(input, '1234');
    expect(input).toHaveValue('123.4');
    
    // Type more to trigger second dot
    await user.clear(input);
    await user.type(input, '1234567');
    expect(input).toHaveValue('123.456.7');
    
    // Type more to trigger dash
    await user.clear(input);
    await user.type(input, '1234567890');
    expect(input).toHaveValue('123.456.789-0');
  });

  it('should enable button when CPF is complete', async () => {
    const user = userEvent.setup();
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    const button = screen.getByRole('button', { name: 'Continuar' });
    
    await user.type(input, '12345678901');
    
    expect(button).not.toBeDisabled();
  });

  it('should limit CPF to 11 digits', async () => {
    const user = userEvent.setup();
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    
    await user.type(input, '123456789012345');
    
    expect(input).toHaveValue('123.456.789-01');
  });

  it('should only accept numeric input', async () => {
    const user = userEvent.setup();
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    
    await user.type(input, 'abc123def456ghi789jkl01');
    
    expect(input).toHaveValue('123.456.789-01');
  });

  it('should call console.log on submit with valid CPF', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const user = userEvent.setup();
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    const button = screen.getByRole('button', { name: 'Continuar' });
    
    await user.type(input, '12345678901');
    await user.click(button);
    
    expect(consoleSpy).toHaveBeenCalledWith('CPF enviado:', '12345678901');
    
    consoleSpy.mockRestore();
  });

  it('should not submit with incomplete CPF', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const user = userEvent.setup();
    render(<CreditAnalysis />);
    
    const input = screen.getByPlaceholderText('Digite aqui seu CPF');
    const button = screen.getByRole('button', { name: 'Continuar' });
    
    await user.type(input, '12345');
    
    // Button should be disabled, but let's verify submit doesn't fire
    expect(button).toBeDisabled();
    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should render background image', () => {
    render(<CreditAnalysis />);
    
    const image = screen.getByAltText('Análise de crédito');
    expect(image).toBeInTheDocument();
  });
});
