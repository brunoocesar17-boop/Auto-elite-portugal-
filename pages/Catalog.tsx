
import React from 'react';
import { Filter, X, ChevronDown, Search } from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle, FuelType, CarBodyType } from '../types';
import { BRAND_LIST } from '../constants';

interface CatalogProps {
  vehicles: Vehicle[];
}

export const Catalog: React.FC<CatalogProps> = ({ vehicles }) => {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({
    brand: '',
    fuel: '',
    bodyType: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  const filteredVehicles = vehicles.filter(v => {
    const matchesBrand = !filters.brand || v.brand === filters.brand;
    const matchesFuel = !filters.fuel || v.fuel === filters.fuel;
    const matchesBody = !filters.bodyType || v.bodyType === filters.bodyType;
    const matchesMinPrice = !filters.minPrice || v.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || v.price <= Number(filters.maxPrice);
    const matchesSearch = !filters.search || 
      `${v.brand} ${v.model}`.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesBrand && matchesFuel && matchesBody && matchesMinPrice && matchesMaxPrice && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-montserrat font-bold text-white mb-2">Catálogo de Veículos</h1>
          <p className="text-stone-400">Mostrando {filteredVehicles.length} resultados</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar marca ou modelo..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-800 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-5 py-3 rounded-xl border flex items-center gap-2 font-bold transition-all ${showFilters ? 'bg-amber-600 border-amber-600 text-stone-950' : 'bg-stone-900 border-stone-800 text-white'}`}
          >
            <Filter size={18} /> Filtros
          </button>
        </div>
      </div>

      {/* Filters Overlay/Drawer */}
      {showFilters && (
        <div className="mb-8 p-6 bg-stone-900 border border-stone-800 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Marca</label>
              <select 
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="">Todas as Marcas</option>
                {BRAND_LIST.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Combustível</label>
              <select 
                value={filters.fuel}
                onChange={(e) => setFilters({...filters, fuel: e.target.value})}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="">Todos</option>
                {Object.values(FuelType).map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Tipo</label>
              <select 
                value={filters.bodyType}
                onChange={(e) => setFilters({...filters, bodyType: e.target.value})}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="">Todos</option>
                {Object.values(CarBodyType).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Gama de Preço (€)</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="w-1/2 p-3 bg-stone-950 border border-stone-800 rounded-lg focus:outline-none focus:border-amber-500"
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="w-1/2 p-3 bg-stone-950 border border-stone-800 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => setFilters({ brand: '', fuel: '', bodyType: '', minPrice: '', maxPrice: '', search: '' })}
              className="text-stone-400 hover:text-white px-4 py-2 font-medium"
            >
              Limpar Filtros
            </button>
            <button 
              onClick={() => setShowFilters(false)}
              className="bg-amber-600 text-stone-950 px-6 py-2 rounded-lg font-bold"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-900 rounded-2xl border border-dashed border-stone-700">
          <Filter size={48} className="mx-auto text-stone-700 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Nenhum veículo encontrado</h3>
          <p className="text-stone-500 mb-6">Tente ajustar os seus filtros ou termo de pesquisa.</p>
          <button 
            onClick={() => setFilters({ brand: '', fuel: '', bodyType: '', minPrice: '', maxPrice: '', search: '' })}
            className="text-amber-500 font-bold hover:underline"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
};
