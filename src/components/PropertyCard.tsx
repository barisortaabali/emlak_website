import { MapPin, Maximize2, Home } from 'lucide-react';
import { Property } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (property.listingType === 'Kiralık') {
      return `${price.toLocaleString('tr-TR')} TL/ay`;
    }
    return `${price.toLocaleString('tr-TR')} TL`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
          {property.listingType}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
          {property.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">
            {property.location.district}, {property.location.city}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 pb-3 border-b">
          {property.rooms !== '-' && (
            <div className="flex items-center gap-1">
              <Home size={16} />
              <span>{property.rooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize2 size={16} />
            <span>{property.area} m²</span>
          </div>
        </div>

        <div className="text-xl font-bold text-blue-700">
          {formatPrice(property.price)}
        </div>
      </div>
    </div>
  );
}
