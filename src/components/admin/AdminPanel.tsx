import { useEffect, useState } from 'react';
import { LogOut, Home, Loader, AlertCircle } from 'lucide-react';
import ApplicationCard from './ApplicationCard';
import ConfirmDialog from './ConfirmDialog';

interface PropertyRequest {
  id: string;
  request_type: 'buy' | 'sell';
  property_type: 'residential' | 'land';
  property_subtype: string;
  room_count?: number;
  square_meters: number;
  location: string;
  description?: string;
  full_name: string;
  phone: string;
  whatsapp?: string;
  created_at: string;
}

interface AdminPanelProps {
  supabase: any;
  onLogout: () => void;
}

export default function AdminPanel({ supabase, onLogout }: AdminPanelProps) {
  const [applications, setApplications] = useState<PropertyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean;
    id: string | null;
  }>({ show: false, id: null });

  useEffect(() => {
    fetchApplications();
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('property_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setApplications(data || []);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Başvurular yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDialog({ show: true, id });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDialog.id) return;

    setDeletingId(confirmDialog.id);
    try {
      const { error: deleteError } = await supabase
        .from('property_requests')
        .delete()
        .eq('id', confirmDialog.id);

      if (deleteError) throw deleteError;

      setApplications(prev => prev.filter(app => app.id !== confirmDialog.id));
      setConfirmDialog({ show: false, id: null });
    } catch (err) {
      console.error('Delete error:', err);
      setError('Başvuru silinirken bir hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <Home className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-xl font-medium text-gray-900">Yönetici Paneli</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 font-medium transition-all duration-300 hover:border-red-300 hover:text-red-700 flex items-center gap-2 active:scale-95"
          >
            <LogOut className="w-4 h-4" strokeWidth={2} />
            Çıkış
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
            Başvurular
          </h2>
          <p className="text-gray-600 font-light">
            {applications.length} başvuru bulunmaktadır
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border-2 border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" strokeWidth={1.5} />
            <p className="text-gray-600 font-light">Başvurular yükleniyor...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Home className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Henüz başvuru yok</h3>
            <p className="text-gray-600 font-light">
              Yeni başvurular burada görüntülenecektir
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map(app => (
              <ApplicationCard
                key={app.id}
                id={app.id}
                requestType={app.request_type as 'buy' | 'sell'}
                propertyType={app.property_type as 'residential' | 'land'}
                propertySubtype={app.property_subtype}
                roomCount={app.room_count}
                squareMeters={app.square_meters}
                location={app.location}
                description={app.description}
                fullName={app.full_name}
                phone={app.phone}
                whatsapp={app.whatsapp}
                createdAt={app.created_at}
                onDelete={handleDeleteClick}
                isDeleting={deletingId === app.id}
              />
            ))}
          </div>
        )}
      </main>

      {confirmDialog.show && (
        <ConfirmDialog
          title="Başvuru Silinsin mi?"
          message="Bu başvuruyu silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
          isDangerous={true}
          confirmText="Sil"
          cancelText="İptal Et"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDialog({ show: false, id: null })}
          isLoading={deletingId === confirmDialog.id}
        />
      )}
    </div>
  );
}
