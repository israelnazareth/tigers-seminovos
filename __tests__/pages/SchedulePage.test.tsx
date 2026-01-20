import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SchedulePage from '@/app/agende-sua-visita/page';

describe('SchedulePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the page title', () => {
    render(<SchedulePage />);
    
    expect(screen.getByRole('heading', { name: 'Agende sua visita' })).toBeInTheDocument();
  });

  it('should render personal data section', () => {
    render(<SchedulePage />);
    
    expect(screen.getByText('Dados pessoais')).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    render(<SchedulePage />);
    
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sobrenome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Telefone')).toBeInTheDocument();
  });

  it('should render store selection', () => {
    render(<SchedulePage />);
    
    expect(screen.getByText('Loja')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render date and time inputs', () => {
    render(<SchedulePage />);
    
    const dateInput = document.querySelector('input[type="date"]');
    const timeInput = document.querySelector('input[type="time"]');
    
    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<SchedulePage />);
    
    expect(screen.getByRole('button', { name: /Agendar visita/i })).toBeInTheDocument();
  });

  it('should render middle section with promotional text', () => {
    render(<SchedulePage />);
    
    expect(screen.getByText('A TIGERS ESTÁ COM VOCÊ EM CADA ENCONTRO')).toBeInTheDocument();
    expect(screen.getByText(/Na TIGERS, cada visita é pensada para você/i)).toBeInTheDocument();
  });

  it('should render Footer', () => {
    render(<SchedulePage />);
    
    expect(screen.getByText('Tigers Seminovos © 2026')).toBeInTheDocument();
  });

  it('should render mosaic background images', () => {
    render(<SchedulePage />);
    
    const mosaicImages = document.querySelectorAll('[class*="mosaicImage"]');
    expect(mosaicImages).toHaveLength(6);
  });

  it('should update form fields on input', async () => {
    const user = userEvent.setup();
    render(<SchedulePage />);
    
    const nomeInput = screen.getByPlaceholderText('Nome');
    const sobrenomeInput = screen.getByPlaceholderText('Sobrenome');
    const emailInput = screen.getByPlaceholderText('Email');
    const telefoneInput = screen.getByPlaceholderText('Telefone');
    
    await user.type(nomeInput, 'João');
    await user.type(sobrenomeInput, 'Silva');
    await user.type(emailInput, 'joao@email.com');
    await user.type(telefoneInput, '11999999999');
    
    expect(nomeInput).toHaveValue('João');
    expect(sobrenomeInput).toHaveValue('Silva');
    expect(emailInput).toHaveValue('joao@email.com');
    expect(telefoneInput).toHaveValue('11999999999');
  });

  it('should update store selection', async () => {
    const user = userEvent.setup();
    render(<SchedulePage />);
    
    const storeSelect = screen.getByRole('combobox');
    await user.selectOptions(storeSelect, 'barra');
    
    expect(storeSelect).toHaveValue('barra');
  });

  it('should have store options', () => {
    render(<SchedulePage />);
    
    expect(screen.getByRole('option', { name: 'Selecione uma loja' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Barra da Tijuca' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Botafogo' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Niterói' })).toBeInTheDocument();
  });

  it('should update date field', async () => {
    const user = userEvent.setup();
    render(<SchedulePage />);
    
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    await user.clear(dateInput);
    await user.type(dateInput, '2026-02-15');
    
    expect(dateInput).toHaveValue('2026-02-15');
  });

  it('should update time field', async () => {
    const user = userEvent.setup();
    render(<SchedulePage />);
    
    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    await user.clear(timeInput);
    await user.type(timeInput, '14:30');
    
    expect(timeInput).toHaveValue('14:30');
  });

  it('should require name field', () => {
    render(<SchedulePage />);
    
    const nomeInput = screen.getByPlaceholderText('Nome');
    expect(nomeInput).toHaveAttribute('required');
  });

  it('should require sobrenome field', () => {
    render(<SchedulePage />);
    
    const sobrenomeInput = screen.getByPlaceholderText('Sobrenome');
    expect(sobrenomeInput).toHaveAttribute('required');
  });

  it('should require email field', () => {
    render(<SchedulePage />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('should require telefone field', () => {
    render(<SchedulePage />);
    
    const telefoneInput = screen.getByPlaceholderText('Telefone');
    expect(telefoneInput).toHaveAttribute('required');
    expect(telefoneInput).toHaveAttribute('type', 'tel');
  });

  it('should have form element', () => {
    render(<SchedulePage />);
    
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('should have submit button with arrow icon', () => {
    render(<SchedulePage />);
    
    const submitButton = screen.getByRole('button', { name: /Agendar visita/i });
    expect(submitButton.textContent).toContain('→');
  });
});
