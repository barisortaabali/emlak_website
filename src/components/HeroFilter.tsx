import { Search } from 'lucide-react';
import { useState } from 'react';

interface FilterState {
  category: string;
  listingType: string;
  propertyType: string;
  city: string;
  district: string;
  minPrice: string;
  maxPrice: string;
  rooms: string;
}

interface HeroFilterProps {
  onSearch: (filters: FilterState) => void;
}

export default function HeroFilter({ onSearch }: HeroFilterProps) {
  const [activeTab, setActiveTab] = useState('Konut');
  const [filters, setFilters] = useState<FilterState>({
    category: 'Konut',
    listingType: '',
    propertyType: '',
    city: '',
    district: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
  });

  const tabs = ['Konut', 'İşyeri', 'Arsa'];

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Muğla', 'Konya'];

  const propertyTypes: { [key: string]: string[] } = {
    Konut: ['Daire', 'Villa', 'Müstakil Ev', 'Residence'],
    İşyeri: ['Dükkan', 'Ofis', 'İşyeri', 'Depo'],
    Arsa: ['Arsa', 'Tarla', 'İmarlı Arsa'],
  };

  const roomOptions = ['1+0', '1+1', '2+1', '3+1', '4+1', '5+1', '4+2', '5+2'];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setFilters({ ...filters, category: tab, propertyType: '' });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    onSearch({ ...filters, category: activeTab });
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 p-8">
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-3 rounded-t-lg font-semibold transition ${
                activeTab === tab
                  ? 'bg-white text-blue-900'
                  : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <select
              value={filters.listingType}
              onChange={(e) => handleFilterChange('listingType', e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">İşlem Türü</option>
              <option value="Satılık">Satılık</option>
              <option value="Kiralık">Kiralık</option>
            </select>

            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">{activeTab} Türü</option>
              {propertyTypes[activeTab]?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">İl</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {activeTab === 'Konut' && (
              <select
                value={filters.rooms}
                onChange={(e) => handleFilterChange('rooms', e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Oda Sayısı</option>
                {roomOptions.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Min Fiyat (TL)"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Max Fiyat (TL)"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              Daha fazla seçenek göster
            </button>

            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition shadow-lg"
            >
              <Search size={20} />
              Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
