
import { Vehicle, FuelType, CarBodyType, Transmission } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: '1',
    brand: 'Mercedes-Benz',
    model: 'Classe A 250e AMG Line',
    year: 2023,
    price: 42500,
    km: 15000,
    fuel: FuelType.HIBRIDO,
    bodyType: CarBodyType.HATCHBACK,
    transmission: Transmission.AUTOMATICA,
    engineSize: '1.3',
    color: 'Cinza Montanha Magno',
    description: 'Veículo em estado irrepreensível. Pack AMG completo, teto panorâmico e sistema MBUX de última geração.',
    images: ['https://picsum.photos/seed/a250/1200/800', 'https://picsum.photos/seed/a250int/1200/800'],
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    sellerPhone: '912345678'
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'X5 xDrive30d Pack M',
    year: 2021,
    price: 78900,
    km: 45000,
    fuel: FuelType.DIESEL,
    bodyType: CarBodyType.SUV,
    transmission: Transmission.AUTOMATICA,
    engineSize: '3.0',
    color: 'Preto Carbono',
    description: 'SUV de luxo com performance superior. Histórico completo na marca. Muitos extras.',
    images: ['https://picsum.photos/seed/x5/1200/800', 'https://picsum.photos/seed/x5int/1200/800'],
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    sellerPhone: '912345678'
  },
  {
    id: '3',
    brand: 'Audi',
    model: 'A4 Avant 35 TDI',
    year: 2022,
    price: 38900,
    km: 28000,
    fuel: FuelType.DIESEL,
    bodyType: CarBodyType.CARRINHA,
    transmission: Transmission.AUTOMATICA,
    engineSize: '2.0',
    color: 'Branco Glaciar',
    description: 'Carrinha familiar versátil e económica. Equipamento de topo e design intemporal.',
    images: ['https://picsum.photos/seed/a4/1200/800', 'https://picsum.photos/seed/a4int/1200/800'],
    isFeatured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    sellerPhone: '912345678'
  },
  {
    id: '4',
    brand: 'Renault',
    model: 'Clio E-Tech Full Hybrid',
    year: 2023,
    price: 24500,
    km: 8000,
    fuel: FuelType.HIBRIDO,
    bodyType: CarBodyType.HATCHBACK,
    transmission: Transmission.AUTOMATICA,
    engineSize: '1.6',
    color: 'Laranja Valência',
    description: 'Excelente para cidade. Consumos baixos e tecnologia híbrida eficiente.',
    images: ['https://picsum.photos/seed/clio/1200/800', 'https://picsum.photos/seed/clioint/1200/800'],
    isFeatured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    sellerPhone: '912345678'
  }
];

export const BRAND_LIST = ['Mercedes-Benz', 'BMW', 'Audi', 'Renault', 'Peugeot', 'Volkswagen', 'Tesla', 'Porsche', 'Volvo', 'Land Rover'];
