
import React from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Share2, 
  LogOut,
  Car,
  ChevronRight,
  TrendingUp,
  Clock,
  Wand2,
  Image as ImageIcon,
  X,
  Upload
} from 'lucide-react';
import { Vehicle, FuelType, CarBodyType, Transmission } from '../types';
import { BRAND_LIST } from '../constants';
import { generateCarPitch } from '../geminiService';

interface AdminDashboardProps {
  vehicles: Vehicle[];
  onAdd: (v: Vehicle) => void;
  onUpdate: (v: Vehicle) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ vehicles, onAdd, onUpdate, onDelete, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Partial<Vehicle>>({
    brand: BRAND_LIST[0],
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    km: 0,
    fuel: FuelType.DIESEL,
    bodyType: CarBodyType.SUV,
    transmission: Transmission.AUTOMATICA,
    engineSize: '2.0',
    color: '',
    description: '',
    images: [],
    sellerPhone: '912345678'
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      brand: BRAND_LIST[0],
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      km: 0,
      fuel: FuelType.DIESEL,
      bodyType: CarBodyType.SUV,
      transmission: Transmission.AUTOMATICA,
      engineSize: '2.0',
      color: '',
      description: '',
      images: [],
      sellerPhone: '912345678'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (v: Vehicle) => {
    setEditingId(v.id);
    setFormData(v);
    setIsModalOpen(true);
  };

  const handleMagicDescription = async () => {
    if (!formData.brand || !formData.model) return;
    setIsGenerating(true);
    const pitch = await generateCarPitch(formData);
    setFormData(prev => ({ ...prev, description: pitch }));
    setIsGenerating(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = (!formData.images || formData.images.length === 0) 
      ? ['https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200']
      : formData.images;
    
    if (editingId) {
      onUpdate({ ...formData as Vehicle, images: finalImages, id: editingId });
    } else {
      onAdd({ 
        ...formData as Vehicle, 
        images: finalImages,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        isFeatured: false
      });
    }
    setIsModalOpen(false);
  };

  const handleShare = (v: Vehicle) => {
    const url = `${window.location.origin}/#/veiculo/${v.id}`;
    if (navigator.share) {
      navigator.share({ title: `${v.brand} ${v.model}`, url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-montserrat font-extrabold text-white">O Meu Stand</h1>
          <p className="text-stone-500">Gestão profissional de inventário AutoElite</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleOpenAdd}
            className="flex-grow sm:flex-grow-0 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Plus size={20} /> Novo Veículo
          </button>
          <button 
            onClick={onLogout}
            className="p-3 bg-stone-900 border border-stone-800 text-stone-400 hover:text-red-500 rounded-xl transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <Car size={24} />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-bold uppercase">Veículos Ativos</div>
            <div className="text-2xl font-montserrat font-bold text-white">{vehicles.length}</div>
          </div>
        </div>
        <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-bold uppercase">Valor de Stock</div>
            <div className="text-2xl font-montserrat font-bold text-white">
              {vehicles.reduce((acc, v) => acc + v.price, 0).toLocaleString('pt-PT')} €
            </div>
          </div>
        </div>
        <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-bold uppercase">Inseridos Hoje</div>
            <div className="text-2xl font-montserrat font-bold text-white">{vehicles.filter(v => v.createdAt > Date.now() - 24 * 60 * 60 * 1000).length}</div>
          </div>
        </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-white">Inventário de Elite</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-950/50 text-stone-500 text-xs uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Veículo</th>
                <th className="px-6 py-4">Especificações</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Gestão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {vehicles.map(vehicle => (
                <tr key={vehicle.id} className="hover:bg-stone-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={vehicle.images[0]} className="w-16 h-12 object-cover rounded-lg border border-stone-700 shadow-lg" alt="" />
                      <div>
                        <div className="font-bold text-white leading-tight">{vehicle.model}</div>
                        <div className="text-[10px] text-stone-500 uppercase tracking-widest">{vehicle.brand} • {vehicle.year}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-400">
                      <div>{vehicle.km.toLocaleString()} km</div>
                      <div className="text-[10px] uppercase font-semibold text-stone-500">{vehicle.fuel} • {vehicle.transmission}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-amber-500 font-montserrat">
                      {vehicle.price.toLocaleString('pt-PT')} €
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {vehicle.isFeatured ? (
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-black rounded uppercase border border-amber-500/20">Destaque</span>
                    ) : (
                      <span className="px-2 py-1 bg-stone-800 text-stone-500 text-[9px] font-black rounded uppercase border border-stone-700">Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleShare(vehicle)} className="p-2 hover:bg-stone-700 text-stone-400 rounded-lg transition-colors"><Share2 size={16} /></button>
                      <button onClick={() => handleEdit(vehicle)} className="p-2 hover:bg-stone-700 text-blue-400 rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => onDelete(vehicle.id)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-stone-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-stone-800 shadow-2xl p-6 md:p-10 scrollbar-hide">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-montserrat font-bold text-white">
                {editingId ? 'Editar Anúncio' : 'Nova Listagem'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-500 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest">Galeria de Imagens</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {formData.images?.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-stone-800 group shadow-inner">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-stone-800 flex flex-col items-center justify-center gap-2 text-stone-500 hover:border-amber-500 hover:text-amber-500 transition-all hover:bg-amber-500/5 group"
                  >
                    <Upload size={20} className="group-hover:bounce" />
                    <span className="text-[9px] font-black uppercase tracking-tighter">Upload</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Marca</label>
                  <select 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl focus:ring-2 focus:ring-amber-500/20 text-white outline-none"
                  >
                    {BRAND_LIST.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Modelo</label>
                  <input 
                    type="text" 
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    placeholder="Ex: 911 Carrera S"
                    required
                    className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl focus:ring-2 focus:ring-amber-500/20 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Ano</label>
                  <input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: Number(e.target.value)})} className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Preço (€)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">KM</label>
                  <input type="number" value={formData.km} onChange={(e) => setFormData({...formData, km: Number(e.target.value)})} className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Motor</label>
                  <input type="text" value={formData.engineSize} onChange={(e) => setFormData({...formData, engineSize: e.target.value})} placeholder="3.0" className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-white outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Combustível</label>
                  <select value={formData.fuel} onChange={(e) => setFormData({...formData, fuel: e.target.value as FuelType})} className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-white">
                    {Object.values(FuelType).map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Transmissão</label>
                  <select value={formData.transmission} onChange={(e) => setFormData({...formData, transmission: e.target.value as Transmission})} className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-white">
                    {Object.values(Transmission).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Tipo</label>
                  <select value={formData.bodyType} onChange={(e) => setFormData({...formData, bodyType: e.target.value as CarBodyType})} className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl text-white">
                    {Object.values(CarBodyType).map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Descrição Técnica</label>
                  <button type="button" onClick={handleMagicDescription} disabled={isGenerating || !formData.model} className="flex items-center gap-2 text-[10px] font-black text-amber-500 hover:text-amber-400 disabled:opacity-50 transition-all uppercase tracking-widest">
                    <Wand2 size={14} className={isGenerating ? 'animate-spin' : ''} /> {isGenerating ? 'Processando...' : 'IA AutoElite'}
                  </button>
                </div>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  rows={4} 
                  className="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl focus:ring-2 focus:ring-amber-500/20 text-white outline-none resize-none" 
                  placeholder="Destaque os principais extras e estado do veículo..."
                ></textarea>
              </div>

              <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row gap-3">
                <button type="submit" className="flex-grow px-10 py-4 bg-amber-600 hover:bg-amber-700 text-stone-950 font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-900/20">
                  {editingId ? 'Confirmar Edição' : 'Publicar Stock'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-4 bg-stone-800 hover:bg-stone-700 text-stone-300 font-black uppercase tracking-widest rounded-xl transition-all">
                  Descartar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
