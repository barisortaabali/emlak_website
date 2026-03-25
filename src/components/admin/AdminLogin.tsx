import { useState } from 'react';
import { Lock, Mail, AlertCircle, Loader } from 'lucide-react';

interface AdminLoginProps {
  supabase: any;
  onLoginSuccess: () => void;
}

export default function AdminLogin({ supabase, onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('E-posta veya şifre hatalı');
        return;
      }

      onLoginSuccess();
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 mb-6 shadow-lg shadow-blue-100">
            <Lock className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-3 tracking-tight">
            Yönetici Paneli
          </h1>

          <p className="text-gray-600 font-light text-sm">
            Başvuruları yönetmek için giriş yapınız
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg shadow-blue-100 p-8 md:p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                E-posta
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 pl-10 ${
                    error
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                  disabled={loading}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Şifre
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi giriniz"
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 pl-10 ${
                    error
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500'
                  } focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-100`}
                  disabled={loading}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-2xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" strokeWidth={2} />
                  Giriş Yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 font-light">
          © 2024 Emlak Şirketi • Yönetici Paneli
        </p>
      </div>
    </div>
  );
}
