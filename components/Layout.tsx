
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X, Instagram, Facebook, Phone, Lock } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg">
                <Car className="text-stone-900 w-6 h-6" />
              </div>
              <span className="text-2xl font-montserrat font-extrabold tracking-tighter text-white">
                AUTO<span className="text-amber-500">ELITE</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`transition-colors font-medium ${isActive('/') ? 'text-amber-500' : 'hover:text-amber-400'}`}>Início</Link>
              <Link to="/catalogo" className={`transition-colors font-medium ${isActive('/catalogo') ? 'text-amber-500' : 'hover:text-amber-400'}`}>Catálogo</Link>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 text-stone-400 hover:text-amber-500">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-stone-900 border-b border-stone-800 px-4 py-6 space-y-4">
            <Link to="/" onClick={toggleMenu} className="block text-lg font-medium hover:text-amber-500">Início</Link>
            <Link to="/catalogo" onClick={toggleMenu} className="block text-lg font-medium hover:text-amber-500">Catálogo</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Car className="text-amber-500 w-6 h-6" />
                <span className="text-xl font-montserrat font-bold text-white">AUTOELITE</span>
              </div>
              <p className="text-stone-400 max-w-sm">
                Especialistas em veículos premium e seminovos de alta qualidade em Portugal. Qualidade, confiança e transparência em cada quilómetro.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-stone-400">
                <li><Link to="/" className="hover:text-amber-500">Início</Link></li>
                <li><Link to="/catalogo" className="hover:text-amber-500">Catálogo de Carros</Link></li>
                <li className="pt-2 mt-2 border-t border-stone-800">
                  <Link to="/admin" className="flex items-center gap-2 hover:text-amber-500 text-sm font-medium">
                    <Lock size={14} /> Área Administrativa
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <ul className="space-y-2 text-stone-400">
                <li className="flex items-center gap-2"><Phone size={16} /> +351 912 345 678</li>
                <li className="flex items-center gap-2"><Instagram size={16} /> @autoelite_pt</li>
                <li className="flex items-center gap-2"><Facebook size={16} /> AutoElite Portugal</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-center text-sm text-stone-600">
            <p>© {new Date().getFullYear()} AutoElite Portugal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
