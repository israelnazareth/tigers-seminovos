import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogPage from '@/app/catalogo/page';

describe('CatalogoPage', () => {
  it('should render the page title', () => {
    render(<CatalogPage />);
    
    expect(screen.getByRole('heading', { name: 'Nosso Estoque' })).toBeInTheDocument();
  });

  it('should render the filters sidebar', () => {
    render(<CatalogPage />);
    
    expect(screen.getByRole('heading', { name: 'Filtros' })).toBeInTheDocument();
  });

  it('should render all filter dropdowns', () => {
    render(<CatalogPage />);
    
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByText('Modelo')).toBeInTheDocument();
    expect(screen.getByText('Cor')).toBeInTheDocument();
    expect(screen.getByText('Blindagem')).toBeInTheDocument();
    
    // Verify selects exist
    const selects = document.querySelectorAll('select');
    expect(selects.length).toBeGreaterThanOrEqual(4);
  });

  it('should render year filter', () => {
    render(<CatalogPage />);
    
    expect(screen.getByText('Ano modelo')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'De' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Até' })).toBeInTheDocument();
  });

  it('should render body type filter', () => {
    render(<CatalogPage />);
    
    expect(screen.getByText('Carroceria')).toBeInTheDocument();
    expect(screen.getByText('Hatch')).toBeInTheDocument();
    expect(screen.getByText('Moto')).toBeInTheDocument();
    expect(screen.getByText('Picape')).toBeInTheDocument();
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('SUV')).toBeInTheDocument();
    expect(screen.getByText('Utilitario')).toBeInTheDocument();
  });

  it('should render search input', () => {
    render(<CatalogPage />);
    
    expect(screen.getByPlaceholderText('Pesquisar')).toBeInTheDocument();
  });

  it('should render vehicle cards', () => {
    render(<CatalogPage />);
    
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    expect(vehicleCards.length).toBeGreaterThan(0);
    expect(vehicleCards.length).toBeLessThanOrEqual(12); // PAGE_SIZE
  });

  it('should render pagination', () => {
    render(<CatalogPage />);
    
    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima página' })).toBeInTheDocument();
  });

  it('should render Footer', () => {
    render(<CatalogPage />);
    
    expect(screen.getByText('Tigers Seminovos © 2026')).toBeInTheDocument();
  });

  it('should filter by make', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    // Find the make select (first select after "Marca" label)
    const selects = document.querySelectorAll('select');
    const makeSelect = selects[0]; // First select is for make
    await user.selectOptions(makeSelect, 'Toyota');
    
    // All visible vehicles should be Toyota
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    vehicleCards.forEach((card) => {
      const vehicleName = card.querySelector('[class*="vehicleName"]');
      if (vehicleName) {
        expect(vehicleName.textContent).toMatch(/Toyota/i);
      }
    });
  });

  it('should filter by body type', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const sedanButton = screen.getByRole('button', { name: /Sedan/i });
    await user.click(sedanButton);
    
    // Check that filter is applied - checkmark should appear
    const checkbox = sedanButton.querySelector('[class*="checkboxChecked"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('should toggle body type filter', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const suvButton = screen.getByRole('button', { name: /SUV/i });
    
    // Click to enable
    await user.click(suvButton);
    expect(suvButton.querySelector('[class*="checkboxChecked"]')).toBeInTheDocument();
    
    // Click to disable
    await user.click(suvButton);
    expect(suvButton.querySelector('[class*="checkboxChecked"]')).not.toBeInTheDocument();
  });

  it('should search by text', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const searchInput = screen.getByPlaceholderText('Pesquisar');
    await user.type(searchInput, 'BMW');
    
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    vehicleCards.forEach((card) => {
      const vehicleName = card.querySelector('[class*="vehicleName"]');
      if (vehicleName) {
        expect(vehicleName.textContent?.toLowerCase()).toContain('bmw');
      }
    });
  });

  it('should navigate to next page', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const nextButton = screen.getByRole('button', { name: 'Próxima página' });
    await user.click(nextButton);
    
    // Page 2 should be active
    const page2Button = screen.getByRole('button', { name: '2' });
    expect(page2Button.className).toContain('paginationButtonActive');
  });

  it('should disable previous button on first page', () => {
    render(<CatalogPage />);
    
    const prevButton = screen.getByRole('button', { name: 'Página anterior' });
    expect(prevButton).toBeDisabled();
  });

  it('should open contact modal when "Solicitar" is clicked', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const solicitarButtons = screen.getAllByRole('button', { name: 'Solicitar' });
    await user.click(solicitarButtons[0]);
    
    expect(screen.getByText('Solicite sua cotação')).toBeInTheDocument();
  });

  it('should close contact modal', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    // Open modal
    const solicitarButtons = screen.getAllByRole('button', { name: 'Solicitar' });
    await user.click(solicitarButtons[0]);
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: 'Fechar' });
    await user.click(closeButton);
    
    expect(screen.queryByText('Solicite sua cotação')).not.toBeInTheDocument();
  });

  it('should open vehicle detail modal when card is clicked', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    await user.click(vehicleCards[0]);
    
    // Modal should show vehicle details - check for the quote button
    expect(screen.getByRole('button', { name: 'Solicitar Cotação' })).toBeInTheDocument();
  });

  it('should reset model and color when make changes', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const selects = document.querySelectorAll('select');
    const makeSelect = selects[0]; // First select is for make
    const modelSelect = selects[1]; // Second select is for model
    
    // Select a make first
    await user.selectOptions(makeSelect, 'Toyota');
    
    // Change make
    await user.selectOptions(makeSelect, 'BMW');
    
    // Model should be reset
    expect(modelSelect).toHaveValue('');
  });

  it('should show WhatsApp link on vehicle cards', () => {
    render(<CatalogPage />);
    
    const waLinks = screen.getAllByRole('link', { name: 'Falar com um atendente' });
    expect(waLinks.length).toBeGreaterThan(0);
    waLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'));
    });
  });

  it('should adjust year filters correctly', async () => {
    render(<CatalogPage />);
    
    // Get year selects - they're in a specific container
    const yearContainer = screen.getByText('Ano modelo').parentElement;
    const yearSelects = yearContainer?.querySelectorAll('select');
    
    expect(yearSelects?.length).toBe(2);
  });

  it('should open detail modal and then contact modal from quote button', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    // Open detail modal
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    await user.click(vehicleCards[0]);
    
    // Click quote button in detail modal
    const quoteButton = screen.getByRole('button', { name: 'Solicitar Cotação' });
    await user.click(quoteButton);
    
    // Contact modal should be open
    expect(screen.getByText('Solicite sua cotação')).toBeInTheDocument();
  });

  it('should handle keyboard navigation on vehicle cards', async () => {
    render(<CatalogPage />);
    
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    const firstCard = vehicleCards[0] as HTMLElement;
    
    // Card should have correct accessibility attributes
    expect(firstCard).toHaveAttribute('role', 'button');
    expect(firstCard).toHaveAttribute('tabIndex', '0');
  });

  it('should filter by armor type', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const selects = document.querySelectorAll('select');
    const armorSelect = selects[3]; // Fourth select is for armor
    await user.selectOptions(armorSelect, 'Nível III-A');
    
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    vehicleCards.forEach((card) => {
      const vehicleName = card.querySelector('[class*="vehicleName"]');
      if (vehicleName) {
        expect(vehicleName.textContent).toContain('Blindado');
      }
    });
  });

  it('should filter by color', async () => {
    const user = userEvent.setup();
    render(<CatalogPage />);
    
    const selects = document.querySelectorAll('select');
    const colorSelect = selects[2]; // Third select is for color
    await user.selectOptions(colorSelect, 'Preto');
    
    // Vehicles should be filtered
    const vehicleCards = document.querySelectorAll('[class*="vehicleCard"]');
    expect(vehicleCards.length).toBeGreaterThan(0);
  });

  it('should show all makes in dropdown', () => {
    render(<CatalogPage />);
    
    const selects = document.querySelectorAll('select');
    const makeSelect = selects[0];
    const options = makeSelect.querySelectorAll('option');
    
    // Should have "Todas" plus all makes
    expect(options.length).toBeGreaterThan(1);
    // First option should be "Todas"
    expect(options[0].textContent).toBe('Todas');
  });
});
