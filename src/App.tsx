import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import PropertyForm from './components/PropertyForm';
import AboutUs from './components/AboutUs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <PropertyForm supabase={supabase} />
      <AboutUs />
    </div>
  );
}

export default App;
