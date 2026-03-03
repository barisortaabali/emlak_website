import { X, MapPin, Maximize2, Home, Phone, Calendar, Flame } from 'lucide-react';
import { Property } from '../data/properties';
import { useState } from 'react';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetail({ property, onClose }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    if (property.listingType === 'Kiralık') {
      return `${price.toLocaleString('tr-TR')} TL/ay`;
    }
    return `${price.toLocaleString('tr-TR')} TL`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-5xl w-full my-8 shadow-2xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">{property.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition ${
                          currentImageIndex === index
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition ${
                        currentImageIndex === index
                          ? 'border-blue-600'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Açıklama</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Özellikler</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={20} className="text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Konum</div>
                      <div className="font-medium">
                        {property.location.neighborhood}, {property.location.district}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Maximize2 size={20} className="text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-500">Alan</div>
                      <div className="font-medium">{property.area} m²</div>
                    </div>
                  </div>

                  {property.rooms !== '-' && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Home size={20} className="text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">Oda Sayısı</div>
                        <div className="font-medium">{property.rooms}</div>
                      </div>
                    </div>
                  )}

                  {property.heating !== '-' && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Flame size={20} className="text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">Isıtma</div>
                        <div className="font-medium">{property.heating}</div>
                      </div>
                    </div>
                  )}

                  {property.buildingAge > 0 && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={20} className="text-blue-600" />
                      <div>
                        <div className="text-sm text-gray-500">Bina Yaşı</div>
                        <div className="font-medium">{property.buildingAge} yıl</div>
                      </div>
                    </div>
                  )}

                  {property.floor !== '-' && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold">
                        K
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Kat</div>
                        <div className="font-medium">{property.floor}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Detaylar</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white sticky top-24">
                <div className="text-3xl font-bold mb-6">{formatPrice(property.price)}</div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">İlan Tipi:</span>
                    <span className="font-semibold">{property.listingType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Kategori:</span>
                    <span className="font-semibold">{property.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Emlak Tipi:</span>
                    <span className="font-semibold">{property.propertyType}</span>
                  </div>
                </div>

                <div className="border-t border-blue-400 pt-6 mb-6">
                  <div className="text-sm text-blue-100 mb-2">İletişim</div>
                  <a
                    href={`tel:${property.contactPhone}`}
                    className="flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold py-3 rounded-lg hover:bg-blue-50 transition"
                  >
                    <Phone size={20} />
                    {property.contactPhone}
                  </a>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
                  Mesaj Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
