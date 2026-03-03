import { Search, User, Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <div className="bg-yellow-400 px-6 py-3 rounded-md">
              <h1 className="text-xl font-bold text-gray-900">
                BarisEmlak.com
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Kelime, ilan no veya marka ile ara..."
                className="w-full px-4 py-2.5 pr-12 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition">
              <User size={20} />
              <span>Giriş Yap</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
              <Phone size={18} />
              <span>İletişim</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
