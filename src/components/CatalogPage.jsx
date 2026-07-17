import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowLeft, 
  CheckCircle, 
  ArrowRight,
  HeartPulse, 
  Layers
} from 'lucide-react';
import { defaultCategories } from '../utils/defaultCatalog';
import logoEmpresa from '../logo-empresa.png';

export default function CatalogPage({ products, onNavigateHome, onSelectCategory }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default to 12 items per page (fits 3x4 grid)

  // List of quick filters based on default categories
  const filters = [
    { id: 'all', label: 'Todos los Equipos' },
    { id: 'bombas-infusion', label: 'Infusión' },
    { id: 'monitoreo-pacientes', label: 'Monitorización' },
    { id: 'desfibriladores', label: 'Desfibriladores' },
    { id: 'electrocardiografos', label: 'Electrocardiógrafos' },
    { id: 'cuidado-neonatal', label: 'Cuidado Neonatal' },
    { id: 'soporte-vital', label: 'Soporte Vital' },
    { id: 'diagnostico-menor', label: 'Diagnóstico Menor' },
    { id: 'accesorios-consumibles', label: 'Accesorios' }
  ];

  // Perform search and category filtering
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filter by category tab
      if (selectedFilter !== 'all' && product.category !== selectedFilter) {
        return false;
      }

      // Filter by search query
      if (!searchQuery.trim()) {
        return true;
      }

      const query = searchQuery.toLowerCase().trim();
      
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDesc = product.description.toLowerCase().includes(query);
      const matchesBrand = product.brand.toLowerCase().includes(query);
      const matchesSpecs = product.specs.some(spec => spec.toLowerCase().includes(query));

      return matchesName || matchesDesc || matchesBrand || matchesSpecs;
    });
  }, [products, searchQuery, selectedFilter]);

  // Reset page to 1 whenever filters or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (itemsPerPage === 'all') return 1;
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts, itemsPerPage]);

  // Paginated subset of filtered products
  const paginatedProducts = useMemo(() => {
    if (itemsPerPage === 'all') return filteredProducts;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Resolve category name for form quote mapping
  const getCategoryFormValue = (catId) => {
    const found = defaultCategories.find(c => c.id === catId);
    return found ? found.formValue : 'Otro';
  };

  return (
    <div className="catalog-page-wrapper">
      {/* Navbar for SPA Navigation */}
      <nav className="catalog-navbar">
        <div className="container catalog-navbar-flex">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="nav-logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img src={logoEmpresa} alt="WBS Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }} />
            <div>
              <h1>WORLD BUSINESS SERVICES</h1>
              <span>Mundo de negocios a su servicio</span>
            </div>
          </a>

          <button id="catalog-back-btn" onClick={onNavigateHome} className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} className="catalog-back-btn-icon" style={{ marginRight: '0.25rem' }} />
            <span className="catalog-back-btn-text">Volver al Inicio</span>
          </button>
        </div>
      </nav>

      {/* Header Banner */}
      <section className="catalog-hero">
        <div className="container catalog-hero-content">
          <h2>Catálogo de Equipamiento Médico</h2>
          <p style={{ marginBottom: '2rem' }}>Explore nuestro portafolio completo de tecnología médica certificada por el INVIMA. Todo el catálogo es de carácter informativo.</p>
          
          {/* Interactive Search Bar */}
          <div className="catalog-search-bar" style={{ maxWidth: '650px', marginBottom: '2.5rem' }}>
            <Search className="catalog-search-icon" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por equipo, modelo (ej. COMEN C80) o marca..."
            />
          </div>

          {/* Quick Category Tabs */}
          <ul className="catalog-tabs">
            {filters.map(filter => (
              <li key={filter.id}>
                <button
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`catalog-tab-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Main Catalog Listing */}
      <main className="catalog-main-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {paginatedProducts.length > 0 ? (
              <motion.div 
                className="catalog-results-grid"
                key="results-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {paginatedProducts.map((product) => {
                  return (
                    <motion.div 
                      key={product.id} 
                      className="catalog-item-card"
                      layout
                    >
                      {/* Image Box */}
                      <div className="catalog-item-img-box">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="catalog-item-img" 
                            loading="lazy"
                          />
                        ) : (
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                            Sin Foto de Producto
                          </div>
                        )}
                      </div>

                      {/* Card Content Body */}
                      <div className="catalog-item-body">
                        <div className="catalog-item-brand-row">
                          <span className="catalog-item-badge">{product.brand}</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                            ID: {product.id.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="catalog-item-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                        <p className="catalog-item-desc" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>{product.description}</p>

                        {/* List of Specs */}
                        <div className="catalog-item-models-box" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                          <div className="catalog-item-models-title" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                            Especificaciones Técnicas
                          </div>
                          <ul className="catalog-models-list">
                            {product.specs.map((spec, idx) => (
                              <li key={idx} className="catalog-model-li" style={{ fontSize: '0.8rem' }}>
                                <CheckCircle size={13} style={{ marginTop: '0.15rem' }} />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Card CTA Footer */}
                        <div className="catalog-card-footer">
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            * Informativo (No transaccional)
                          </span>
                          <button
                            id={`btn-catalog-quote-${product.id}`}
                            className="product-cta-btn"
                            onClick={() => onSelectCategory(getCategoryFormValue(product.category))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            Cotizar Equipo
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* No Results State */
              <motion.div 
                className="catalog-no-results"
                key="no-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Layers size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                <h4>No se encontraron equipos</h4>
                <p>Intente buscando con otros términos o seleccionando otra categoría en los filtros superiores.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination and Items Per Page Row */}
          {(totalPages > 1 || filteredProducts.length > 12) && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '3.5rem',
              flexWrap: 'wrap',
              gap: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              {/* Items Per Page Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mostrar por página:</span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[12, 24, 48, 'all'].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setItemsPerPage(size);
                        setCurrentPage(1);
                      }}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '4px',
                        border: itemsPerPage === size ? 'none' : '1px solid var(--border-color)',
                        background: itemsPerPage === size ? 'linear-gradient(135deg, #00d2ff, #0075c4)' : 'transparent',
                        color: itemsPerPage === size ? '#fff' : 'var(--text-color)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {size === 'all' ? 'Todos' : size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Navigation Buttons */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-outline"
                    style={{
                      padding: '0.4rem 1rem',
                      fontSize: '0.8rem',
                      opacity: currentPage === 1 ? 0.5 : 1,
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      borderRadius: '6px'
                    }}
                  >
                    Anterior
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: currentPage === pageNumber ? 'none' : '1px solid var(--border-color)',
                        background: currentPage === pageNumber ? 'linear-gradient(135deg, #00d2ff, #0075c4)' : 'transparent',
                        color: currentPage === pageNumber ? '#fff' : 'var(--text-color)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline"
                    style={{
                      padding: '0.4rem 1rem',
                      fontSize: '0.8rem',
                      opacity: currentPage === totalPages ? 0.5 : 1,
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      borderRadius: '6px'
                    }}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer Info (Address & Slogan) */}
      <footer className="footer" style={{ marginTop: 'auto', padding: '3rem 0 2rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="footer-logo" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <img src={logoEmpresa} alt="WBS Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }} />
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-white)', margin: 0, lineHeight: 1.2 }}>WORLD BUSINESS SERVICES</h2>
              <span style={{ fontSize: '0.65rem', color: 'var(--secondary-color)', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>Mundo de negocios a su servicio</span>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Calle 30 No. 5-29 M30 No 706 - Ibagué - Tolima - Colombia<br />
            Tel: 311 585 50 38
          </p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            &copy; {new Date().getFullYear()} WORLD BUSINESS SERVICES S.A.S. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
