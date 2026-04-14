import { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import FormToggle from './FormToggle';
import FormSection from './FormSection';

interface PropertyFormProps {
  supabase: any;
}

export default function PropertyForm({ supabase }: PropertyFormProps) {
  const [requestType, setRequestType] = useState<'buy' | 'sell'>('buy');
  const [propertyType, setPropertyType] = useState<'residential' | 'land' | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    propertySubtype: '',
    roomCount: '',
    squareMeters: '',
    location: '',
    description: '',
    fullName: '',
    phone: '',
    whatsapp: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Ad Soyad gereklidir';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon gereklidir';
    if (!formData.location.trim()) newErrors.location = 'Konum gereklidir';
    if (!formData.propertySubtype) newErrors.propertySubtype = 'Gayrimenkul türü seçiniz';

    if (propertyType === 'residential') {
      if (!formData.roomCount) newErrors.roomCount = 'Oda sayısı seçiniz';
    }

    if (!formData.squareMeters) newErrors.squareMeters = 'Metrekare gereklidir';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('property_requests').insert({
        request_type: requestType === 'buy' ? 'buy' : 'sell',
        property_type: propertyType === 'residential' ? 'residential' : 'land',
        property_subtype: formData.propertySubtype,
        room_count: propertyType === 'residential' ? parseInt(formData.roomCount) : null,
        square_meters: parseInt(formData.squareMeters),
        location: formData.location,
        description: formData.description,
        full_name: formData.fullName,
        phone: formData.phone,
        whatsapp: formData.whatsapp || null,
      });

      if (error) throw error;

      setSuccessMessage('Başvurunuz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
      setFormData({
        propertySubtype: '',
        roomCount: '',
        squareMeters: '',
        location: '',
        description: '',
        fullName: '',
        phone: '',
        whatsapp: '',
      });
      setPropertyType(null);

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPropertyType(null);
    setFormData({
      propertySubtype: '',
      roomCount: '',
      squareMeters: '',
      location: '',
      description: '',
      fullName: '',
      phone: '',
      whatsapp: '',
    });
    setErrors({});
  };

  return (
    <section id="basvuru-formu" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-4xl font-light text-gray-900 mb-3">
            Talebinizi Oluşturun
          </h2>
          <p className="text-gray-600 font-light">
            Satın almak veya satmak için form doldurarak bize ulaşın
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg shadow-blue-100 p-8 md:p-10">
          <div className="mb-8">
            <FormToggle
              requestType={requestType}
              onChange={(type) => {
                setRequestType(type);
                resetForm();
              }}
            />
          </div>

          {propertyType === null ? (
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium block mb-3">
                  Gayrimenkul Türü <span className="text-red-500">*</span>
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'residential', label: 'Konut' },
                    { value: 'land', label: 'Arazi' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setPropertyType(option.value as 'residential' | 'land')}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center font-medium ${
                        propertyType === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </label>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormSection
                title="Gayrimenkul Türü"
                requiredFields={['propertySubtype']}
                errors={errors}
              >
                <select
                  name="propertySubtype"
                  value={formData.propertySubtype}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-white appearance-none cursor-pointer transition-all duration-300 font-medium ${
                    errors.propertySubtype
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                >
                  <option value="">Seçiniz...</option>
                  {propertyType === 'residential' && (
                    <>
                      <option value="Daire">Daire</option>
                      <option value="Ev">Ev</option>
                      <option value="Villa">Villa</option>
                      <option value="Çiftlik Evi">Çiftlik Evi</option>
                    </>
                  )}
                  {propertyType === 'land' && (
                    <>
                      <option value="Tarla">Tarla</option>
                      <option value="Orman">Orman</option>
                      <option value="Bağ">Bağ</option>
                      <option value="İnşaat Alanı">İnşaat Alanı</option>
                    </>
                  )}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </div>
                {errors.propertySubtype && (
                  <p className="text-red-500 text-sm mt-2">{errors.propertySubtype}</p>
                )}
              </FormSection>

              {propertyType === 'residential' && (
                <FormSection
                  title="Oda Sayısı"
                  requiredFields={['roomCount']}
                  errors={errors}
                >
                  <select
                    name="roomCount"
                    value={formData.roomCount}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-2xl border-2 bg-white appearance-none cursor-pointer transition-all duration-300 font-medium ${
                      errors.roomCount
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                  >
                    <option value="">Seçiniz...</option>
                    <option value="1">1+0</option>
                    <option value="2">1+1</option>
                    <option value="3">2+1</option>
                    <option value="4">3+1</option>
                    <option value="5">4+1</option>
                    <option value="6">5+1</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={2} />
                  </div>
                  {errors.roomCount && (
                    <p className="text-red-500 text-sm mt-2">{errors.roomCount}</p>
                  )}
                </FormSection>
              )}

              <FormSection
                title="Metrekare"
                requiredFields={['squareMeters']}
                errors={errors}
              >
                <input
                  type="number"
                  name="squareMeters"
                  placeholder="m² olarak giriniz"
                  value={formData.squareMeters}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                    errors.squareMeters
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                />
                {errors.squareMeters && (
                  <p className="text-red-500 text-sm mt-2">{errors.squareMeters}</p>
                )}
              </FormSection>

              <FormSection
                title="Konum"
                requiredFields={['location']}
                errors={errors}
              >
                <input
                  type="text"
                  name="location"
                  placeholder="İl, ilçe, mahalle veya adres"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                    errors.location
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-2">{errors.location}</p>
                )}
              </FormSection>

              <FormSection title="Açıklama">
                <textarea
                  name="description"
                  placeholder="Ek bilgiler veya istekleriniz (opsiyonel)"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100 transition-all duration-300 resize-none"
                />
              </FormSection>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-gray-700 font-medium mb-4">İletişim Bilgileri</h3>

                <FormSection
                  title="Ad Soyad"
                  requiredFields={['fullName']}
                  errors={errors}
                >
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Adınız ve soyadınız"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                      errors.fullName
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>
                  )}
                </FormSection>

                <FormSection
                  title="Telefon"
                  requiredFields={['phone']}
                  errors={errors}
                >
                  <input
                    type="tel"
                    name="phone"                    placeholder="+90 (5XX) XXX XXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                      errors.phone
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                  )}
                </FormSection>

                <FormSection title="WhatsApp Numarası (Opsiyonel)">
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="+90 (5XX) XXX XXXX"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100 transition-all duration-300"
                  />
                </FormSection>
              </div>

              {successMessage && (
                <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-200 text-green-700 text-sm font-medium">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setPropertyType(null);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-medium transition-all duration-300 hover:border-gray-300 active:scale-95"
                >
                  Geri Dön
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-4 rounded-2xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" strokeWidth={2} />
                  {loading ? 'Gönderiliyor...' : 'Başvuru Gönder'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
