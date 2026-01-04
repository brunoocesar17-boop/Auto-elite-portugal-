
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Car } from 'lucide-react';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated credentials as requested: teste / 2319
    if (username === 'teste' && password === '2319') {
      onLogin();
      navigate('/admin/dashboard');
    } else {
      setError('Credenciais de administrador inválidas.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-stone-900 rounded-3xl border border-stone-800 p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-amber-500/10 rounded-2xl text-amber-500 mb-4">
            <Car size={32} />
          </div>
          <h1 className="text-3xl font-montserrat font-extrabold text-white">Painel Vendedor</h1>
          <p className="text-stone-500 mt-2">Acesso restrito a parceiros AutoElite</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-400">Utilizador</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Introduza o utilizador"
                className="w-full pl-12 pr-4 py-3 bg-stone-950 border border-stone-800 rounded-xl focus:outline-none focus:border-amber-500 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-400">Palavra-passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-stone-950 border border-stone-800 rounded-xl focus:outline-none focus:border-amber-500 text-white"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl transition-all"
          >
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-stone-600">Área de acesso reservado.</p>
        </div>
      </div>
    </div>
  );
};
