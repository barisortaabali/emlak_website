import { Home, MessageCircle } from 'lucide-react';

export default function Hero() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/905347471071', '_blank');
  };

  const handleSahibinden = () => {
    window.open('https://barisemlakfethiye.sahibinden.com', '_blank');
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-4 pt-12 pb-20">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 mb-6 shadow-lg shadow-blue-100">
            <Home className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-3 tracking-tight">
            Emlak Dünyasında
            <span className="block font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Güvenilen İsim
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md mx-auto font-light leading-relaxed">
            Rüyalarınızdaki ev veya yatırım alanını güvenle bulmak için buradayız.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={handleSahibinden}
            className="group relative px-8 py-4 rounded-2xl bg-white border-2 border-gray-200 text-gray-900 font-medium transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full"></span>
              Sahibinden'de Gör
            </span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="group relative px-8 py-4 rounded-2xl bg-green-500 text-white font-medium shadow-lg shadow-green-200 transition-all duration-300 hover:shadow-xl hover:shadow-green-300 hover:-translate-y-0.5 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" strokeWidth={2} />
              WhatsApp ile Yazın
            </span>
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>24/7 müşteri desteği • Güvenli işlemler • Hızlı yanıt</p>
        </div>
      </div>
    </section>
  );
}
