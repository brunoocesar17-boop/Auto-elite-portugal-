
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
    description: 'Veículo em estado irrepreensível. Pack AMG completo, teto panorâmico e sistema MBUX de última geração com realidade aumentada.',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200'
    ],
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
    description: 'SUV de luxo com performance superior. Histórico completo na marca. Muitos extras, incluindo suspensão pneumática e faróis Laser.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200'
    ],
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    sellerPhone: '912345678'
  },
  {
    id: '3',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2023,
    price: 185000,
    km: 5000,
    fuel: FuelType.ELETRICO,
    bodyType: CarBodyType.SEDAN,
    transmission: Transmission.AUTOMATICA,
    engineSize: 'EV',
    color: 'Azul Gentian',
    description: 'O pináculo da mobilidade elétrica. Performance avassaladora com todo o conforto de um sedan de luxo. Garantia Porsche Approved.',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200'
    ],
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    sellerPhone: '912345678'
  }
];

export const BRAND_LIST = [
  'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Tesla', 'Land Rover', 'Volvo', 'Jaguar', 'Volkswagen', 'Renault', 'Peugeot'
];
