import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import BrandsMarquee from './components/BrandsMarquee';
import QuoteForm from './components/QuoteForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import CatalogPage from './components/CatalogPage';

import { supabase } from './utils/supabase';
import { defaultProducts as backupProducts } from './utils/defaultCatalog.backup';
import { translateProductToEn } from './utils/translations';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);
  
  // Language State - Default to English ('en')
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('wbs_lang');
    return saved ? saved : 'en';
  });

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('wbs_lang', newLang);
  };
  
  // Client-side router path state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Load products from Supabase on mount
  useEffect(() => {
    // Clean up old local storage keys to prevent QuotaExceededError from large base64 images
    try {
      localStorage.removeItem('wbs_products');
      localStorage.removeItem('wbs_products_v2');
      localStorage.removeItem('wbs_products_supabase');
    } catch (e) {
      console.warn('Failed to clear old localStorage keys:', e);
    }

    async function loadData() {
      try {
        const [prodRes, brandRes, quoteRes] = await Promise.all([
          supabase.from('products').select('*').order('name', { ascending: true }),
          supabase.from('brands').select('*').order('created_at', { ascending: true }),
          supabase.from('quotes').select('*').order('created_at', { ascending: false })
        ]);
        
        if (prodRes.error) throw prodRes.error;
        if (prodRes.data) setProducts(prodRes.data);

        if (brandRes.error) {
          console.warn('Brands table might not exist yet, please run migration:', brandRes.error.message);
        } else if (brandRes.data) {
          setBrands(brandRes.data);
        }

        if (quoteRes.error) {
          console.warn('Quotes table might not exist yet, please run migration:', quoteRes.error.message);
        } else if (quoteRes.data) {
          setQuotes(quoteRes.data);
        }
      } catch (e) {
        console.error('Error loading data from Supabase:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Track browser navigation popstate
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Save single product (insert or update)
  const handleSaveProduct = async (product) => {
    try {
      const exists = products.some(p => p.id === product.id);
      if (exists) {
        // Update
        const { error } = await supabase
          .from('products')
          .update({
            name: product.name,
            brand: product.brand,
            category: product.category,
            description: product.description,
            image: product.image,
            specs: product.specs
          })
          .eq('id', product.id);

        if (error) throw error;
        setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      } else {
        // Insert
        const { error } = await supabase
          .from('products')
          .insert([{
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            description: product.description,
            image: product.image,
            specs: product.specs
          }]);

        if (error) throw error;
        setProducts(prev => [...prev, product]);
      }
    } catch (e) {
      console.error('Error saving product to Supabase:', e.message);
      alert('Error al guardar en la base de datos: ' + e.message);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      const productToDelete = products.find(p => p.id === id);
      if (!productToDelete) return;

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      
      // Undo logic configuration
      setRecentlyDeleted(productToDelete);
      if (undoTimer) clearTimeout(undoTimer);
      const timer = setTimeout(() => {
        setRecentlyDeleted(null);
      }, 10000); // lasts for 10 seconds
      setUndoTimer(timer);
    } catch (e) {
      console.error('Error deleting product from Supabase:', e.message);
      alert('Error al eliminar de la base de datos: ' + e.message);
    }
  };

  // Undo delete operation
  const handleUndoDelete = async () => {
    if (!recentlyDeleted) return;
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          id: recentlyDeleted.id,
          name: recentlyDeleted.name,
          brand: recentlyDeleted.brand,
          category: recentlyDeleted.category,
          description: recentlyDeleted.description,
          image: recentlyDeleted.image,
          specs: recentlyDeleted.specs
        }]);

      if (error) throw error;

      setProducts(prev => [...prev, recentlyDeleted].sort((a, b) => a.name.localeCompare(b.name)));
      
      setRecentlyDeleted(null);
      if (undoTimer) clearTimeout(undoTimer);
    } catch (e) {
      console.error('Error restoring product to Supabase:', e.message);
      alert('Error al restaurar el artículo: ' + e.message);
    }
  };

  // Reset catalog to backup defaults
  const handleResetCatalog = async () => {
    try {
      // Delete all
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', 'placeholder-non-existent-id');

      if (deleteError) throw deleteError;

      // Insert default backup products
      if (backupProducts && backupProducts.length > 0) {
        const { error: insertError } = await supabase
          .from('products')
          .insert(backupProducts.map(p => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            category: p.category,
            description: p.description,
            image: p.image,
            specs: p.specs
          })));

        if (insertError) throw insertError;
      }

      setProducts(backupProducts);
      alert('Catálogo restablecido con éxito.');
    } catch (e) {
      console.error('Error resetting catalog in Supabase:', e.message);
      alert('Error al restablecer el catálogo: ' + e.message);
    }
  };

  // Add allied brand to Supabase
  const handleAddBrand = async (brand) => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .insert([brand])
        .select();

      if (error) throw error;
      if (data) {
        setBrands(prev => [...prev, data[0]]);
      }
    } catch (e) {
      console.error('Error adding brand to Supabase:', e.message);
      alert('Error al agregar marca: ' + e.message);
    }
  };

  // Delete allied brand from Supabase
  const handleDeleteBrand = async (id) => {
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBrands(prev => prev.filter(b => b.id !== id));
    } catch (e) {
      console.error('Error deleting brand from Supabase:', e.message);
      alert('Error al eliminar marca: ' + e.message);
    }
  };

  // Submit quote request to Supabase
  const handleSubmitQuote = async (quoteData) => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select();

      if (error) throw error;
      if (data) {
        setQuotes(prev => [data[0], ...prev]);
      }
    } catch (e) {
      console.error('Error submitting quote to Supabase:', e.message);
      throw e;
    }
  };

  // Delete quote request from Supabase
  const handleDeleteQuote = async (id) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este registro de cotización?')) return;
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setQuotes(prev => prev.filter(q => q.id !== id));
    } catch (e) {
      console.error('Error deleting quote from Supabase:', e.message);
      alert('Error al eliminar registro de cotización: ' + e.message);
    }
  };

  // Custom SPA navigation
  const navigateTo = (path) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Handle quote redirection from the catalog page
  const handleCatalogQuoteSelect = (formValue) => {
    setSelectedCategory(formValue);
    navigateTo('/');
    
    // Smooth scroll to quote form after home page render
    setTimeout(() => {
      const element = document.getElementById('cotizar');
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Render loading screen during initial fetch
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0a192f',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(255,255,255,0.1)',
          borderTopColor: '#00d2ff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1.5rem'
        }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '1px' }}>
          {lang === 'en' ? 'Connecting to database...' : 'Conectando con la base de datos...'}
        </h2>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Render toast for undoing deletion
  const renderUndoToast = () => {
    if (!recentlyDeleted) return null;
    return (
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#1e293b',
        color: '#f8fafc',
        padding: '0.85rem 1.25rem',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 9999,
        border: '1px solid #475569',
        fontFamily: 'sans-serif',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <span style={{ fontSize: '0.85rem' }}>
          {lang === 'en' ? (
            <>Product <strong>{recentlyDeleted.name}</strong> deleted.</>
          ) : (
            <>Artículo <strong>{recentlyDeleted.name}</strong> eliminado.</>
          )}
        </span>
        <button
          onClick={handleUndoDelete}
          style={{
            background: '#00d2ff',
            color: '#0f172a',
            border: 'none',
            borderRadius: '4px',
            padding: '0.35rem 0.75rem',
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#00b5dc'}
          onMouseLeave={(e) => e.target.style.background = '#00d2ff'}
        >
          {lang === 'en' ? 'Undo' : 'Deshacer'}
        </button>
        <button 
          onClick={() => {
            setRecentlyDeleted(null);
            if (undoTimer) clearTimeout(undoTimer);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: 0,
            lineHeight: 1
          }}
        >
          ✕
        </button>
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  };

  // Render administrator panel
  if (currentPath === '/administrador') {
    return (
      <>
        <AdminPanel 
          products={products} 
          onSaveProduct={handleSaveProduct} 
          onDeleteProduct={handleDeleteProduct} 
          onResetCatalog={handleResetCatalog} 
          onNavigateHome={() => navigateTo('/')}
          brands={brands}
          onAddBrand={handleAddBrand}
          onDeleteBrand={handleDeleteBrand}
          quotes={quotes}
          onDeleteQuote={handleDeleteQuote}
        />
        {renderUndoToast()}
      </>
    );
  }

  // Render dedicated complete catalog page (with individual product cards)
  if (currentPath === '/catalogo') {
    return (
      <>
        <CatalogPage
          products={products}
          onNavigateHome={() => navigateTo('/')}
          onSelectCategory={handleCatalogQuoteSelect}
          lang={lang}
          onLanguageChange={handleLanguageChange}
        />
        {renderUndoToast()}
      </>
    );
  }

  // Render main landing page
  return (
    <>
      {/* Header / Sticky Glassmorphism Navigation */}
      <Header onNavigate={navigateTo} currentPath={currentPath} lang={lang} onLanguageChange={handleLanguageChange} />

      {/* Main Content Sections */}
      <main style={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <HeroSection lang={lang} />

        {/* Product Catalog Grid (Receives dynamic database props) */}
        <ProductGrid 
          products={products} 
          onSelectCategory={setSelectedCategory} 
          onNavigate={navigateTo}
          lang={lang}
        />

        {/* Brand Logos Infinite Marquee */}
        <BrandsMarquee brands={brands} />

        {/* State-controlled Interactive Quotation Form */}
        <QuoteForm selectedCategory={selectedCategory} lang={lang} onSubmitQuote={handleSubmitQuote} />
      </main>

      {/* Footer Details (Address, Contact & Slogan) */}
      <Footer lang={lang} />
      {renderUndoToast()}
    </>
  );
}

export default App;
