import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroFilter from './components/HeroFilter';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './components/PropertyDetail';
import { properties, Property } from './data/properties';
import introVideo from './intro1.mp4';

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

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const [showIntro, setShowIntro] = useState(false);
  const [introClosing, setIntroClosing] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('site-intro-played');

    if (!hasSeenIntro) {
      setShowIntro(true);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closeIntro = () => {
    setIntroClosing(true);
    sessionStorage.setItem('site-intro-played', 'true');

    setTimeout(() => {
      setShowIntro(false);
      setIntroClosing(false);
      document.body.style.overflow = 'auto';
    }, 500);
  };

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (filters) {
      if (filters.category && filters.category !== 'all') {
        result = result.filter((p) => p.category === filters.category);
      }

      if (filters.listingType) {
        result = result.filter((p) => p.listingType === filters.listingType);
      }

      if (filters.propertyType) {
        result = result.filter((p) => p.propertyType === filters.propertyType);
      }

      if (filters.city) {
        result = result.filter((p) => p.location.city === filters.city);
      }

      if (filters.rooms) {
        result = result.filter((p) => p.rooms === filters.rooms);
      }

      if (filters.minPrice) {
        const minPrice = parseInt(filters.minPrice.replace(/\D/g, ''));
        result = result.filter((p) => p.price >= minPrice);
      }

      if (filters.maxPrice) {
        const maxPrice = parseInt(filters.maxPrice.replace(/\D/g, ''));
        result = result.filter((p) => p.price <= maxPrice);
      }
    }

    return result;
  }, [selectedCategory, filters]);

  const handleSearch = (searchFilters: FilterState) => {
    setFilters(searchFilters);
    if (searchFilters.category !== 'all') {
      setSelectedCategory(searchFilters.category);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilters(null);
  };

  return (
    <>
      {showIntro && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
            introClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <button
            onClick={closeIntro}
            className="absolute right-5 top-5 z-10 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-white/30"
          >
            Geç
          </button>

          <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={closeIntro}
>
            <source src={introVideo} type="video/mp4" />
          </video>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="flex gap-6">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex-1">
              <div className="mb-8">
                <HeroFilter onSearch={handleSearch} />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Emlak Vitrin</h2>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">
                      {filteredProperties.length}
                    </span>{' '}
                    ilan bulundu
                  </div>
                </div>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onClick={() => setSelectedProperty(property)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-12 text-center">
                  <p className="text-gray-500 text-lg">
                    Aradığınız kriterlere uygun ilan bulunamadı.
                  </p>
                  <button
                    onClick={() => {
                      setFilters(null);
                      setSelectedCategory('all');
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {selectedProperty && (
          <PropertyDetail
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
    </>
  );
}

export default App;
