import { Home, Building2, MapPin, Building } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  const categories = [
    { id: 'all', name: 'Tüm Emlak Kategorileri', icon: null },
    { id: 'Konut', name: 'Konut', icon: Home },
    { id: 'İşyeri', name: 'İş Yeri', icon: Building2 },
    { id: 'Arsa', name: 'Arsa', icon: MapPin },
    { id: 'Bina', name: 'Bina', icon: Building },
  ];

  return (
    <aside className="w-64 bg-white shadow-md rounded-lg p-4 sticky top-20 h-fit">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b">
          Emlak
        </h2>
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition ${
                isSelected
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {Icon && <Icon size={18} />}
              <span className={category.id === 'all' ? 'font-semibold' : ''}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Popüler Aramalar</h3>
        <div className="space-y-2">
          <button className="text-sm text-gray-600 hover:text-blue-600 block">
            Satılık Daire
          </button>
          <button className="text-sm text-gray-600 hover:text-blue-600 block">
            Kiralık Ev
          </button>
          <button className="text-sm text-gray-600 hover:text-blue-600 block">
            Satılık Villa
          </button>
          <button className="text-sm text-gray-600 hover:text-blue-600 block">
            Satılık Arsa
          </button>
        </div>
      </div>
    </aside>
  );
}
