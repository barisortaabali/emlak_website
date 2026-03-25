import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Hero from './components/Hero';
import PropertyForm from './components/PropertyForm';
import AboutUs from './components/AboutUs';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    setMounted(true);
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAdminAuthenticated(true);
        setCurrentPage('admin');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  if (!mounted || isCheckingAuth) return null;

  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin supabase={supabase} onLoginSuccess={handleAdminLogin} />;
    }
    return <AdminPanel supabase={supabase} onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <PropertyForm supabase={supabase} />
      <AboutUs />
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => {
            const adminHash = window.location.hash === '#/admin';
            if (adminHash) {
              window.location.hash = '';
              setCurrentPage('home');
            } else {
              window.location.hash = '#/admin';
              setCurrentPage('admin');
            }
          }}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition-colors"
          title="Admin Panel"
        >
          ⚙️
        </button>
      </div>
    </div>
  );
}

export default App;
