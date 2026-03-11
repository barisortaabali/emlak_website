import { CheckCircle2, Users, Award, Shield } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: Shield,
      title: 'Güvenli İşlemler',
      description: 'Tüm işlemleriniz güvenilir yasal çerçevede gerçekleştirilir',
    },
    {
      icon: Users,
      title: 'Müşteri Odaklı',
      description: '20 yıldan fazla deneyimle müşteri memnuniyeti garantisiyiz',
    },
    {
      icon: Award,
      title: 'Uzman Ekip',
      description: 'Profesyonel danışmanlarımız size en iyi seçeneği bulur',
    },
    {
      icon: CheckCircle2,
      title: 'Hızlı Çözüm',
      description: '24 saatte başvurunuza yanıt alırsınız',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-4xl font-light text-gray-900 mb-3">
            Hakkımızda
          </h2>
          <p className="text-gray-600 font-light text-lg">
            Emlak sektöründe güvenilir ortağınız
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl p-8 md:p-12 mb-12 border border-blue-100">
          <p className="text-gray-800 text-lg leading-relaxed mb-6 font-light">
            Biz, gayrimenkul dünyasında 20 yıldan fazla deneyimi olan, müşteri memnuniyetini en yüksek seviyede tutma prensibine sahip bir ekibiz. Satın almak, satmak veya yatırım yapmak isteyen her müşterimiz için en uygun projeleri ve mülkleri bulma konusunda uzmanız.
          </p>

          <p className="text-gray-800 text-lg leading-relaxed font-light">
            Rüyalarınızdaki ev sadece bir mülk değildir—o, yeni başlangıçlar, mutlu anılar ve güvenli bir geleceğin sembolüdür. Biz bu vizyonu gerçeğe dönüştürmek için buradayız. Her adımınızda yanınızda olacak, tüm sorularınızı cevaplayacak, en iyi şartları sağlayacak ekibimiz sizi beklemektedir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <feature.icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-light mb-4">
            Başlayın, Biz de Size Yardımcı Olalım
          </h3>
          <p className="text-blue-100 font-light mb-8">
            Talebinizi yukarıdaki form ile gönderin veya doğrudan bize ulaşın
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-2xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-300 active:scale-95"
          >
            Hemen Başla
          </button>
        </div>

        <div className="mt-16 text-center border-t border-gray-200 pt-8">
          <p className="text-gray-600 font-light text-sm">
            © 2024 Emlak Şirketi. Tüm hakları saklıdır. | 24/7 Müşteri Desteği • Güvenli İşlemler • Profesyonel Hizmet
          </p>
        </div>
      </div>
    </section>
  );
}
