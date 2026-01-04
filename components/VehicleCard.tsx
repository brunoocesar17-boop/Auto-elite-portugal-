
import React from 'react';
import { Link } from 'react-router-dom';
import { Fuel, Gauge, Calendar } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <Link 
      to={`/veiculo/${vehicle.id}`}
      className="group bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={vehicle.images[0]} 
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-stone-950/80 backdrop-blur-sm text-amber-500 text-xs font-bold rounded-full border border-amber-500/30">
            {vehicle.year}
          </span>
        </div>
        {vehicle.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-amber-600 text-stone-950 text-xs font-bold rounded-full">
              DESTAQUE
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider">{vehicle.brand}</h3>
            <h2 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors leading-tight">{vehicle.model}</h2>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-stone-400 text-sm">
            <Gauge size={16} className="text-amber-500" />
            <span>{vehicle.km.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400 text-sm">
            <Fuel size={16} className="text-amber-500" />
            <span>{vehicle.fuel}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-800">
          <span className="text-2xl font-montserrat font-extrabold text-white">
            {vehicle.price.toLocaleString('pt-PT')} <span className="text-amber-500">€</span>
          </span>
          <span className="text-xs text-amber-500 font-bold group-hover:translate-x-1 transition-transform">
            VER DETALHES →
          </span>
        </div>
      </div>
    </Link>
  );
};
