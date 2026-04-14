import { MessageCircle, FileText } from 'lucide-react';

import logo from '../assets/logo.png';

export default function Hero() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/', '_blank');
  };

  const handleSahibinden = () => {
    window.open('https://www.sahibinden.com', '_blank');
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-4 pt-12 pb-20">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" className="w-40 h-40 object-contain drop-shadow-xl" />
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 flex-wrap">
          <button
            onClick={handleSahibinden}
            className="group relative px-8 py-4 rounded-2xl bg-[#ffe800] border-2 border-yellow-400 text-black font-semibold transition-all duration-300 hover:bg-[#e6d100] hover:shadow-lg hover:shadow-yellow-200 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0v24h24V0zm11.517 4.723c.563-.007 1.13-.004 1.69.063 2.412.054 4.853 2.18 4.879 4.508h-3.319c.009-.694-.603-1.555-1.279-1.732-1.105-.269-2.46-.355-3.43.294-.738.445-1.065 1.672-.095 2.056 2.288 1.083 5.158.846 7.224 2.372 1.698 1.21 1.598 3.666.274 5.086-1.718 1.84-4.636 2.132-7.099 1.782-2.448-.117-4.755-2.245-4.819-4.562h3.311c-.056.832.638 1.557 1.46 1.822 1.27.275 2.726.358 3.93-.19.96-.323 1.024-1.544.284-2.103-1.595-.897-3.565-.924-5.297-1.518-2.012-.39-3.643-2.278-3.26-4.197.424-2.342 3.127-3.727 5.546-3.681z"/>
              </svg>
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

          <button
            onClick={() => document.getElementById('basvuru-formu')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-2xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" strokeWidth={2} />
              Başvuru Yap
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
