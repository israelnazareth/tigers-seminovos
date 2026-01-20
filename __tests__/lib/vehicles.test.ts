import { vehicles, type Body } from '@/lib/vehicles';

describe('vehicles', () => {
  describe('vehicles array', () => {
    it('should generate 122 vehicles (120 + 2 motos)', () => {
      expect(vehicles).toHaveLength(122);
    });

    it('should have unique IDs for all vehicles', () => {
      const ids = vehicles.map((v) => v.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(vehicles.length);
    });

    it('should have all required properties for each vehicle', () => {
      vehicles.forEach((vehicle) => {
        expect(vehicle).toHaveProperty('id');
        expect(vehicle).toHaveProperty('make');
        expect(vehicle).toHaveProperty('model');
        expect(vehicle).toHaveProperty('name');
        expect(vehicle).toHaveProperty('year');
        expect(vehicle).toHaveProperty('km');
        expect(vehicle).toHaveProperty('fuel');
        expect(vehicle).toHaveProperty('armor');
        expect(vehicle).toHaveProperty('color');
        expect(vehicle).toHaveProperty('body');
        expect(vehicle).toHaveProperty('image');
        expect(vehicle).toHaveProperty('images');
      });
    });

    it('should have valid year range (2014-2025)', () => {
      vehicles.forEach((vehicle) => {
        expect(vehicle.year).toBeGreaterThanOrEqual(2014);
        expect(vehicle.year).toBeLessThanOrEqual(2025);
      });
    });

    it('should have valid km values', () => {
      vehicles.forEach((vehicle) => {
        expect(vehicle.km).toBeGreaterThanOrEqual(0);
        expect(vehicle.km).toBeLessThanOrEqual(150000);
      });
    });

    it('should have valid fuel types', () => {
      const validFuels = ['Flex', 'Gasolina', 'Diesel', 'Elétrico'];
      vehicles.forEach((vehicle) => {
        expect(validFuels).toContain(vehicle.fuel);
      });
    });

    it('should have valid armor types', () => {
      const validArmors = ['Não', 'Nível III-A'];
      vehicles.forEach((vehicle) => {
        expect(validArmors).toContain(vehicle.armor);
      });
    });

    it('should have valid color values', () => {
      const validColors = ['Preto', 'Branco', 'Prata', 'Cinza', 'Azul', 'Vermelho'];
      vehicles.forEach((vehicle) => {
        expect(validColors).toContain(vehicle.color);
      });
    });

    it('should have valid body types', () => {
      const validBodies: Body[] = ['Hatch', 'Moto', 'Picape', 'Sedan', 'SUV', 'Utilitario'];
      vehicles.forEach((vehicle) => {
        expect(validBodies).toContain(vehicle.body);
      });
    });

    it('should have images array with at least 3 images per vehicle', () => {
      vehicles.forEach((vehicle) => {
        expect(vehicle.images.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should include "Blindado" in name for armored vehicles', () => {
      vehicles
        .filter((v) => v.armor === 'Nível III-A')
        .forEach((vehicle) => {
          expect(vehicle.name).toContain('Blindado');
        });
    });

    it('should not include "Blindado" in name for non-armored vehicles', () => {
      vehicles
        .filter((v) => v.armor === 'Não')
        .forEach((vehicle) => {
          expect(vehicle.name).not.toContain('Blindado');
        });
    });
  });

  describe('body type assignment', () => {
    it('should assign Picape body type to Hilux', () => {
      const hilux = vehicles.find((v) => v.model === 'Hilux');
      expect(hilux).toBeDefined();
      expect(hilux?.body).toBe('Picape');
    });

    it('should assign SUV body type to Compass', () => {
      const compass = vehicles.find((v) => v.model === 'Compass');
      expect(compass).toBeDefined();
      expect(compass?.body).toBe('SUV');
    });

    it('should assign correct body types based on body field', () => {
      // Verify body types are correctly distributed
      const bodyTypes = new Set(vehicles.map((v) => v.body));
      expect(bodyTypes.has('Picape')).toBe(true);
      expect(bodyTypes.has('SUV')).toBe(true);
      expect(bodyTypes.has('Moto')).toBe(true);
    });

    it('should have Hatch, Sedan, or other body types for cars', () => {
      // All vehicles should have a valid body type
      const validBodies = ['Hatch', 'Moto', 'Picape', 'Sedan', 'SUV', 'Utilitario'];
      vehicles.forEach((v) => {
        expect(validBodies).toContain(v.body);
      });
    });

    it('should assign Moto body type to motorcycles', () => {
      const motos = vehicles.filter((v) => v.body === 'Moto');
      expect(motos.length).toBe(2);
      expect(motos[0].model).toBe('CG 160');
      expect(motos[1].model).toBe('Fazer 250');
    });
  });

  describe('makes and models', () => {
    it('should have vehicles from all expected makes', () => {
      const expectedMakes = ['Jeep', 'Toyota', 'Honda', 'Volkswagen', 'Hyundai', 'BMW', 'Yamaha'];
      const actualMakes = new Set(vehicles.map((v) => v.make));
      expectedMakes.forEach((make) => {
        expect(actualMakes.has(make)).toBe(true);
      });
    });

    it('should have vehicles for each make', () => {
      const makes = ['Jeep', 'Toyota', 'Honda', 'Volkswagen', 'Hyundai', 'BMW'];
      makes.forEach((make) => {
        const vehiclesForMake = vehicles.filter((v) => v.make === make);
        expect(vehiclesForMake.length).toBeGreaterThan(0);
      });
    });

    it('should have models for each make', () => {
      const makes = ['Jeep', 'Toyota', 'Honda'];
      makes.forEach((make) => {
        const modelsForMake = new Set(vehicles.filter((v) => v.make === make).map((v) => v.model));
        expect(modelsForMake.size).toBeGreaterThan(0);
      });
    });
  });

  describe('image URLs', () => {
    it('should have valid image URLs', () => {
      vehicles.forEach((vehicle) => {
        expect(vehicle.image).toMatch(/^https?:\/\/.+/);
        vehicle.images.forEach((img) => {
          expect(img).toMatch(/^https?:\/\/.+/);
        });
      });
    });

    it('should have first image in images array matching the main image', () => {
      vehicles.forEach((vehicle) => {
        expect(vehicle.images[0]).toBe(vehicle.image);
      });
    });
  });
});
