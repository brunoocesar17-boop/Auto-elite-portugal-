
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle } from '../types';

interface HomeProps {
  vehicles: Vehicle[];
}

export const Home: React.FC<HomeProps> = ({ vehicles }) => {
  const featured = vehicles.filter(v => v.isFeatured).slice(0, 3);
  const latest = [...vehicles].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Premium Car"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-6">
              <Sparkles size={14} /> PREMIUM CARS PORTUGAL
            </div>
            <h1 className="text-5xl md:text-7xl font-montserrat font-extrabold text-white leading-[1.1] mb-6">
              A Sua Próxima <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Elite</span> Começa Aqui.
            </h1>
            <p className="text-lg text-stone-300 mb-8 max-w-lg">
              Descubra a coleção mais exclusiva de veículos seminovos em Portugal. Performance, luxo e transparência garantida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalogo" className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105">
                Explorar Catálogo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-montserrat font-bold text-white mb-2">Destaques da Semana</h2>
            <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
          </div>
          <Link to="/catalogo" className="text-amber-500 font-bold hover:underline hidden sm:block">Ver todos os veículos</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-stone-900/50 py-16 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-500/10 flex items-center justify-center rounded-xl text-amber-500">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Garantia Total</h3>
                <p className="text-stone-400 text-sm">Todos os nossos veículos passam por uma inspeção rigorosa de 150 pontos.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-500/10 flex items-center justify-center rounded-xl text-amber-500">
                <CreditCard size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Financiamento</h3>
                <p className="text-stone-400 text-sm">Tratamos de todo o processo de crédito com as melhores taxas do mercado.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 bg-amber-500/10 flex items-center justify-center rounded-xl text-amber-500">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Venda Rápida</h3>
                <p className="text-stone-400 text-sm">Anuncie o seu veículo na nossa rede e venda em tempo recorde.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl font-montserrat font-bold text-white mb-2">Últimos Adicionados</h2>
          <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/catalogo" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 border border-stone-800 hover:border-amber-500 text-white font-bold rounded-xl transition-all">
            Ver Catálogo Completo <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};
