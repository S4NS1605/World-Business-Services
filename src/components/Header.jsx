import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoEmpresa from '../logo-empresa.png';
import { uiTranslations } from '../utils/translations';

export default function Header({ onNavigate, lang, onLanguageChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key) => uiTranslations[lang]?.[key] || uiTranslations['en']?.[key] || key;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container nav-container">
        {/* Brand/Logo */}
        <a href="#inicio" onClick={(e) => handleScrollTo(e, 'inicio')} className="nav-logo" id="header-logo-link" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src={logoEmpresa} alt="WBS Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }} />
          <div>
            <h1>WORLD BUSINESS SERVICES</h1>
            <span>{t('slogan')}</span>
          </div>
        </a>

        {/* Navigation menu for desktop & mobile */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <a
                id="nav-link-inicio"
                href="#inicio"
                className="nav-link"
                onClick={(e) => handleScrollTo(e, 'inicio')}
              >
                {t('nav_home')}
              </a>
            </li>
            <li>
              <a
                id="nav-link-equipos"
                href="#equipos"
                className="nav-link"
                onClick={(e) => handleScrollTo(e, 'equipos')}
              >
                {t('nav_products')}
              </a>
            </li>
            <li>
              <a
                id="nav-link-marcas"
                href="#marcas"
                className="nav-link"
                onClick={(e) => handleScrollTo(e, 'marcas')}
              >
                {t('nav_brands')}
              </a>
            </li>
            <li>
              <a
                id="nav-link-catalogo"
                href="/catalogo"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onNavigate('/catalogo');
                }}
                style={{ color: 'var(--secondary-color)', fontWeight: '700' }}
              >
                {t('nav_view_catalog')}
              </a>
            </li>
          </ul>

          <a
            id="nav-cta-button"
            href="#cotizar"
            className="btn btn-secondary nav-cta-btn-header"
            onClick={(e) => handleScrollTo(e, 'cotizar')}
          >
            {t('hero_btn_quote')}
            <ArrowRight size={16} />
          </a>

          {/* Language Switcher Toggle Pill */}
          <div className="lang-switcher-nav" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', marginLeft: '1rem', padding: '0.25rem', borderRadius: '20px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-white)', boxShadow: 'var(--shadow-sm)' }}>
            <button 
              onClick={() => onLanguageChange('en')} 
              style={{ 
                padding: '0.2rem 0.6rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 700, 
                backgroundColor: lang === 'en' ? 'var(--secondary-color)' : 'transparent',
                color: lang === 'en' ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              EN
            </button>
            <button 
              onClick={() => onLanguageChange('es')} 
              style={{ 
                padding: '0.2rem 0.6rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 700, 
                backgroundColor: lang === 'es' ? 'var(--secondary-color)' : 'transparent',
                color: lang === 'es' ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ES
            </button>
          </div>
        </nav>

        {/* Hamburger button for mobile */}
        <button
          id="mobile-menu-toggle"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={lang === 'en' ? 'Open navigation menu' : 'Abrir menú de navegación'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  );
}
