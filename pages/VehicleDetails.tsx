
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  Info,
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleDetailsProps {
  vehicles: Vehicle[];
}

export const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find(v => v.id === id);
  const [activeImage, setActiveImage] = React.useState(0);
  const [isCopied, setIsCopied] = React.useState(false);

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Veículo não encontrado.</h2>
        <Link to="/catalogo" className="text-amber-500 font-bold">Voltar ao catálogo</Link>
      </div>
    );
  }

  const handleShare = async () => {
    const shareData = {
      title: `${vehicle.brand} ${vehicle.model} - AutoElite`,
      text: `Vê este ${vehicle.brand} ${vehicle.model} no AutoElite Portugal!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const whatsappLink = `https://wa.me/351${vehicle.sellerPhone}?text=${encodeURIComponent(
    `Olá! Vi o anúncio do ${vehicle.brand} ${vehicle.model} (${vehicle.year}) no AutoElite Portugal e gostaria de obter mais informações.`
  )}`;

  return (
    <div className="bg-stone-950 pb-20">
      {/* Breadcrumb / Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Voltar aos resultados
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Left Side: Images */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-[16/10] bg-stone-900 rounded-3xl overflow-hidden group">
              <img 
                src={vehicle.images[activeImage]} 
                alt={vehicle.model}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              
              {vehicle.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? vehicle.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-stone-950/50 backdrop-blur-md rounded-full text-white hover:bg-amber-600 hover:text-stone-950 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === vehicle.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-stone-950/50 backdrop-blur-md rounded-full text-white hover:bg-amber-600 hover:text-stone-950 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {vehicle.images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeImage === idx ? 'w-8 bg-amber-500' : 'w-4 bg-stone-500/50'}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {vehicle.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-amber-500 scale-95' : 'border-stone-800'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Info & Contact */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sticky top-28">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-stone-400 font-medium uppercase tracking-widest">{vehicle.brand}</h2>
                  <h1 className="text-3xl md:text-4xl font-montserrat font-extrabold text-white">{vehicle.model}</h1>
                </div>
                <button 
                  onClick={handleShare}
                  className="p-3 bg-stone-800 hover:bg-stone-700 text-amber-500 rounded-2xl transition-all relative"
                >
                  <Share2 size={20} />
                  {isCopied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-amber-500 text-stone-950 text-[10px] font-bold rounded animate-bounce">COPIADO!</span>}
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-sm font-bold rounded-lg">
                  Ano {vehicle.year}
                </span>
                <span className="px-3 py-1 bg-stone-800 text-stone-300 text-sm font-bold rounded-lg">
                  {vehicle.km.toLocaleString()} KM
                </span>
              </div>

              <div className="mb-8">
                <p className="text-stone-500 text-sm mb-1 uppercase font-bold tracking-wider">Preço Final</p>
                <div className="text-5xl font-montserrat font-extrabold text-white">
                  {vehicle.price.toLocaleString('pt-PT')} <span className="text-amber-500">€</span>
                </div>
              </div>

              {/* Technical Icons Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-stone-950/50 rounded-2xl flex flex-col gap-1 border border-stone-800">
                  <Fuel size={20} className="text-amber-500 mb-1" />
                  <span className="text-xs text-stone-500 uppercase font-bold">Motor</span>
                  <span className="text-sm font-bold text-white">{vehicle.fuel}</span>
                </div>
                <div className="p-4 bg-stone-950/50 rounded-2xl flex flex-col gap-1 border border-stone-800">
                  <Settings2 size={20} className="text-amber-500 mb-1" />
                  <span className="text-xs text-stone-500 uppercase font-bold">Caixa</span>
                  <span className="text-sm font-bold text-white">{vehicle.transmission}</span>
                </div>
                <div className="p-4 bg-stone-950/50 rounded-2xl flex flex-col gap-1 border border-stone-800">
                  <Info size={20} className="text-amber-500 mb-1" />
                  <span className="text-xs text-stone-500 uppercase font-bold">Cilindrada</span>
                  <span className="text-sm font-bold text-white">{vehicle.engineSize}</span>
                </div>
                <div className="p-4 bg-stone-950/50 rounded-2xl flex flex-col gap-1 border border-stone-800">
                  <Sparkles size={20} className="text-amber-500 mb-1" />
                  <span className="text-xs text-stone-500 uppercase font-bold">Cor Exterior</span>
                  <span className="text-sm font-bold text-white">{vehicle.color}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#22c35e] text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20"
                >
                  <MessageCircle size={22} /> Falar no WhatsApp
                </a>
                <a 
                  href={`tel:+351${vehicle.sellerPhone}`}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20"
                >
                  <Phone size={22} /> Ligar Agora
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-montserrat font-bold text-white mb-6">Descrição e Equipamento</h3>
            <div className="prose prose-invert max-w-none text-stone-300 leading-relaxed bg-stone-900/30 p-8 rounded-3xl border border-stone-800">
              <p className="whitespace-pre-line">{vehicle.description}</p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Garantia de 18 meses incluída',
                  'Revisão efetuada antes da entrega',
                  'Histórico de manutenção completo',
                  'Aceitamos retoma de qualquer marca',
                  'Financiamento 100% online disponível'
                ].map(feature => (
                  <div key={feature} className="flex items-center gap-3 text-stone-400">
                    <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
