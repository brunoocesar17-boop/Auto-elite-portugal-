
export enum FuelType {
  GASOLINA = 'Gasolina',
  DIESEL = 'Diesel',
  ELETRICO = 'Elétrico',
  HIBRIDO = 'Híbrido'
}

export enum CarBodyType {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  HATCHBACK = 'Hatchback',
  CARRINHA = 'Carrinha',
  COUPE = 'Coupé',
  CABRIO = 'Cabrio'
}

export enum Transmission {
  MANUAL = 'Manual',
  AUTOMATICA = 'Automática'
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
  fuel: FuelType;
  bodyType: CarBodyType;
  transmission: Transmission;
  engineSize: string;
  color: string;
  description: string;
  images: string[];
  isFeatured: boolean;
  createdAt: number;
  sellerPhone: string;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}
