import { Trash2, Phone, MessageCircle, MapPin } from 'lucide-react';

interface ApplicationCardProps {
  id: string;
  requestType: 'buy' | 'sell';
  propertyType: 'residential' | 'land';
  propertySubtype: string;
  roomCount?: number;
  squareMeters: number;
  location: string;
  description?: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  createdAt: string;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function ApplicationCard({
  id,
  requestType,
  propertyType,
  propertySubtype,
  roomCount,
  squareMeters,
  location,
  description,
  fullName,
  phone,
  whatsapp,
  createdAt,
  onDelete,
  isDeleting = false,
}: ApplicationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getRequestTypeLabel = (type: 'buy' | 'sell') => {
    return type === 'buy' ? 'Satın Alma' : 'Satış';
  };

  const getPropertyTypeLabel = (type: 'residential' | 'land') => {
    return type === 'residential' ? 'Konut' : 'Arazi';
  };

  const getRoomCountLabel = (count?: number) => {
    if (!count) return '';
    if (count === 1) return '1+0';
    if (count === 2) return '1+1';
    if (count === 3) return '2+1';
    if (count === 4) return '3+1';
    if (count === 5) return '4+1';
    if (count === 6) return '5+1';
    return `${count}+1`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <span className="inline-block px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-medium">
            {getRequestTypeLabel(requestType)}
          </span>
          <span className="inline-block px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium">
            {getPropertyTypeLabel(propertyType)}
          </span>
          <span className="inline-block px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium">
            {propertySubtype}
          </span>
        </div>
        <span className="text-xs text-gray-500 font-light">
          {formatDate(createdAt)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">
            Gayrimenkul Bilgileri
          </h3>
          <div className="space-y-2 text-sm">
            {roomCount && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-light">Oda Sayısı:</span>
                <span className="text-gray-900 font-medium">{getRoomCountLabel(roomCount)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-light">{squareMeters} m²</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="text-gray-600 font-light">{location}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">
            İletişim
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <div className="text-gray-600 font-light">Adı</div>
              <div className="text-gray-900 font-medium">{fullName}</div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-700 font-light">
                {phone}
              </a>
            </div>
            {whatsapp && (
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" strokeWidth={1.5} />
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-light text-sm"
                >
                  WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {description && (
        <div className="mb-6 pb-6 border-t border-gray-100">
          <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">
            Açıklama
          </h3>
          <p className="text-gray-600 text-sm font-light leading-relaxed">{description}</p>
        </div>
      )}

      <button
        onClick={() => onDelete(id)}
        disabled={isDeleting}
        className="w-full px-4 py-3 rounded-2xl border-2 border-red-200 bg-red-50 text-red-700 font-medium transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Trash2 className="w-4 h-4" strokeWidth={2} />
        {isDeleting ? 'Siliniyor...' : 'Sil'}
      </button>
    </div>
  );
}
