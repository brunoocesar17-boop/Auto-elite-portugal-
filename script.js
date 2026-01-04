
// --- CONSTANTES E MOCK DATA ---
const INITIAL_VEHICLES = [
    {
        id: '1',
        brand: 'Mercedes-Benz',
        model: 'Classe A 250e AMG Line',
        year: 2023,
        price: 42500,
        km: 15000,
        fuel: 'Híbrido',
        bodyType: 'Hatchback',
        transmission: 'Automática',
        engineSize: '1.3',
        color: 'Cinza Montanha Magno',
        description: 'Veículo em estado irrepreensível. Pack AMG completo, teto panorâmico e sistema de infotainment de última geração.',
        images: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200'],
        isFeatured: true,
        createdAt: Date.now() - 172800000,
        sellerPhone: '912345678'
    },
    {
        id: '2',
        brand: 'BMW',
        model: 'X5 xDrive30d Pack M',
        year: 2021,
        price: 78900,
        km: 45000,
        fuel: 'Diesel',
        bodyType: 'SUV',
        transmission: 'Automática',
        engineSize: '3.0',
        color: 'Preto Carbono',
        description: 'SUV de luxo com performance superior. Histórico completo na marca. Muitos extras, incluindo suspensão pneumática.',
        images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200'],
        isFeatured: true,
        createdAt: Date.now() - 432000000,
        sellerPhone: '912345678'
    }
];

const BRAND_LIST = ['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Tesla', 'Volvo', 'Volkswagen', 'Renault'];

// --- ESTADO GLOBAL ---
let state = {
    vehicles: JSON.parse(localStorage.getItem('autoelite_vehicles')) || INITIAL_VEHICLES,
    isAuthenticated: localStorage.getItem('autoelite_auth') === 'true',
    currentRoute: window.location.hash || '#/'
};

// --- PERSISTÊNCIA ---
function saveState() {
    localStorage.setItem('autoelite_vehicles', JSON.stringify(state.vehicles));
    localStorage.setItem('autoelite_auth', state.isAuthenticated);
}

// --- ROTEAMENTO ---
window.addEventListener('hashchange', () => {
    state.currentRoute = window.location.hash || '#/';
    render();
});

// --- COMPONENTES ---

const Navbar = () => `
<nav class="sticky top-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
            <a href="#/" class="flex items-center gap-2">
                <div class="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg">
                    <i data-lucide="car" class="text-stone-900 w-6 h-6"></i>
                </div>
                <span class="text-2xl font-montserrat font-extrabold tracking-tighter text-white">
                    AUTO<span class="text-amber-500">ELITE</span>
                </span>
            </a>
            <div class="hidden md:flex items-center gap-8 font-medium">
                <a href="#/" class="${state.currentRoute === '#/' ? 'text-amber-500' : 'hover:text-amber-400'}">Início</a>
                <a href="#/catalogo" class="${state.currentRoute === '#/catalogo' ? 'text-amber-500' : 'hover:text-amber-400'}">Catálogo</a>
            </div>
            <div class="md:hidden">
                <i data-lucide="menu" class="text-stone-400 cursor-pointer"></i>
            </div>
        </div>
    </div>
</nav>`;

const Footer = () => `
<footer class="bg-stone-900 border-t border-stone-800 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div class="col-span-1 md:col-span-2">
                <div class="flex items-center gap-2 mb-4">
                    <i data-lucide="car" class="text-amber-500 w-6 h-6"></i>
                    <span class="text-xl font-montserrat font-bold text-white">AUTOELITE</span>
                </div>
                <p class="text-stone-400 max-w-sm">Especialistas em veículos premium em Portugal. Qualidade e confiança em cada quilómetro.</p>
            </div>
            <div>
                <h4 class="font-bold text-white mb-4">Links</h4>
                <ul class="space-y-2 text-stone-400">
                    <li><a href="#/" class="hover:text-amber-500">Início</a></li>
                    <li><a href="#/catalogo" class="hover:text-amber-500">Catálogo</a></li>
                    <li class="pt-2 border-t border-stone-800">
                        <a href="#/admin" class="flex items-center gap-2 hover:text-amber-500 text-sm">
                            <i data-lucide="lock" class="w-3.5 h-3.5"></i> Área Administrativa
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-white mb-4">Contacto</h4>
                <ul class="space-y-2 text-stone-400">
                    <li class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4"></i> +351 912 345 678</li>
                    <li class="flex items-center gap-2"><i data-lucide="instagram" class="w-4 h-4"></i> @autoelite_pt</li>
                </ul>
            </div>
        </div>
        <div class="mt-12 pt-8 border-t border-stone-800 text-center text-sm text-stone-600">
            <p>© ${new Date().getFullYear()} AutoElite Portugal. Todos os direitos reservados.</p>
        </div>
    </div>
</footer>`;

const VehicleCard = (v) => `
<a href="#/veiculo/${v.id}" class="group bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col h-full hover-scale">
    <div class="relative aspect-[16/10] overflow-hidden">
        <img src="${v.images[0]}" alt="${v.brand}" class="w-full h-full object-cover">
        <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-stone-950/80 backdrop-blur-sm text-amber-500 text-xs font-bold rounded-full border border-amber-500/30">${v.year}</span>
        </div>
    </div>
    <div class="p-5 flex flex-col flex-grow">
        <h3 class="text-xs font-medium text-stone-400 uppercase tracking-widest">${v.brand}</h3>
        <h2 class="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">${v.model}</h2>
        <div class="mt-4 grid grid-cols-2 gap-3 mb-6">
            <div class="flex items-center gap-2 text-stone-400 text-sm"><i data-lucide="gauge" class="w-4 h-4 text-amber-500"></i> ${v.km.toLocaleString()} km</div>
            <div class="flex items-center gap-2 text-stone-400 text-sm"><i data-lucide="fuel" class="w-4 h-4 text-amber-500"></i> ${v.fuel}</div>
        </div>
        <div class="mt-auto pt-4 border-t border-stone-800 flex justify-between items-center">
            <span class="text-xl font-montserrat font-extrabold text-white">${v.price.toLocaleString('pt-PT')} €</span>
            <span class="text-xs text-amber-500 font-bold">VER MAIS →</span>
        </div>
    </div>
</a>`;

// --- PÁGINAS ---

const HomePage = () => {
    const featured = state.vehicles.filter(v => v.isFeatured).slice(0, 3);
    return `
    <div class="page-fade">
        <section class="relative h-[70vh] flex items-center overflow-hidden">
            <div class="absolute inset-0 bg-stone-950">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover opacity-30">
                <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50"></div>
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="text-5xl md:text-7xl font-montserrat font-extrabold text-white leading-tight mb-6">A Sua Próxima <span class="text-amber-500">Elite</span>.</h1>
                <p class="text-lg text-stone-300 mb-8 max-w-lg">Coleção exclusiva de seminovos em Portugal.</p>
                <a href="#/catalogo" class="inline-flex px-8 py-4 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl transition-all">Explorar Catálogo</a>
            </div>
        </section>
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 class="text-3xl font-montserrat font-bold text-white mb-10">Destaques</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${featured.map(VehicleCard).join('')}
            </div>
        </section>
    </div>`;
};

const CatalogPage = () => `
<div class="page-fade max-w-7xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-montserrat font-bold text-white mb-10">Catálogo Completo</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        ${state.vehicles.map(VehicleCard).join('')}
    </div>
</div>`;

const LoginPage = () => `
<div class="page-fade min-h-[70vh] flex items-center justify-center">
    <div class="max-w-md w-full bg-stone-900 p-10 rounded-3xl border border-stone-800">
        <h2 class="text-2xl font-bold text-center mb-8">Acesso Administrativo</h2>
        <div id="login-error" class="hidden p-3 bg-red-500/10 text-red-500 text-sm rounded-lg mb-4 text-center"></div>
        <div class="space-y-4">
            <input id="user-input" type="text" placeholder="Utilizador" class="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl outline-none focus:border-amber-500">
            <input id="pass-input" type="password" placeholder="Palavra-passe" class="w-full p-4 bg-stone-950 border border-stone-800 rounded-xl outline-none focus:border-amber-500">
            <button onclick="handleLogin()" class="w-full py-4 bg-amber-600 text-stone-950 font-bold rounded-xl">Entrar</button>
        </div>
    </div>
</div>`;

const VehicleDetailsPage = (id) => {
    const v = state.vehicles.find(v => v.id === id);
    if (!v) return `<div class="p-20 text-center">Veículo não encontrado.</div>`;
    return `
    <div class="page-fade max-w-7xl mx-auto px-4 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div class="lg:col-span-3">
                <img src="${v.images[0]}" class="w-full aspect-[16/10] object-cover rounded-3xl border border-stone-800 shadow-2xl">
            </div>
            <div class="lg:col-span-2">
                <div class="bg-stone-900 p-8 rounded-3xl border border-stone-800">
                    <h2 class="text-stone-400 uppercase text-xs font-bold tracking-widest">${v.brand}</h2>
                    <h1 class="text-4xl font-montserrat font-bold text-white mb-6">${v.model}</h1>
                    <div class="text-5xl font-montserrat font-extrabold text-amber-500 mb-8">${v.price.toLocaleString('pt-PT')} €</div>
                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="p-4 bg-stone-950 rounded-xl"><span class="block text-stone-500 text-[10px] uppercase font-bold">KM</span><span class="font-bold">${v.km.toLocaleString()}</span></div>
                        <div class="p-4 bg-stone-950 rounded-xl"><span class="block text-stone-500 text-[10px] uppercase font-bold">Ano</span><span class="font-bold">${v.year}</span></div>
                    </div>
                    <a href="tel:${v.sellerPhone}" class="block w-full py-4 bg-amber-600 text-stone-950 font-bold text-center rounded-xl mb-4">Ligar Agora</a>
                </div>
            </div>
        </div>
    </div>`;
};

// --- FUNÇÕES DE INTERAÇÃO ---

window.handleLogin = () => {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;
    const error = document.getElementById('login-error');

    if (user === 'teste' && pass === '2319') {
        state.isAuthenticated = true;
        saveState();
        window.location.hash = '#/admin/dashboard';
    } else {
        error.innerText = 'Credenciais incorretas.';
        error.classList.remove('hidden');
    }
};

window.handleLogout = () => {
    state.isAuthenticated = false;
    saveState();
    window.location.hash = '#/';
};

// --- RENDERIZADOR PRINCIPAL ---

function render() {
    const root = document.getElementById('app');
    const route = state.currentRoute;
    
    let content = '';
    
    if (route === '#/') content = HomePage();
    else if (route === '#/catalogo') content = CatalogPage();
    else if (route === '#/admin') {
        content = state.isAuthenticated ? (window.location.hash = '#/admin/dashboard', '') : LoginPage();
    }
    else if (route === '#/admin/dashboard') {
        if (!state.isAuthenticated) { window.location.hash = '#/admin'; return; }
        content = `
        <div class="page-fade max-w-7xl mx-auto px-4 py-10">
            <div class="flex justify-between items-center mb-10">
                <h1 class="text-3xl font-bold">Gestão de Inventário</h1>
                <button onclick="handleLogout()" class="px-4 py-2 bg-stone-800 rounded-lg text-sm text-red-400">Sair</button>
            </div>
            <div class="bg-stone-900 rounded-3xl border border-stone-800 overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-stone-950 text-xs font-bold uppercase text-stone-500">
                        <tr><th class="px-6 py-4">Veículo</th><th class="px-6 py-4">Preço</th><th class="px-6 py-4">Ações</th></tr>
                    </thead>
                    <tbody class="divide-y divide-stone-800">
                        ${state.vehicles.map(v => `
                        <tr>
                            <td class="px-6 py-4">${v.brand} ${v.model}</td>
                            <td class="px-6 py-4">${v.price.toLocaleString()} €</td>
                            <td class="px-6 py-4"><span class="text-stone-500 text-xs italic">Modo Visualização (Mock)</span></td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    }
    else if (route.startsWith('#/veiculo/')) {
        const id = route.split('/').pop();
        content = VehicleDetailsPage(id);
    }

    root.innerHTML = `
        <div class="min-h-screen flex flex-col">
            ${Navbar()}
            <main class="flex-grow">${content}</main>
            ${Footer()}
        </div>
    `;

    // Reinicializa os ícones do Lucide
    lucide.createIcons();
}

// Inicialização
render();
