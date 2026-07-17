import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoEmpresa from '../logo-empresa.png';

export default function Header({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <span>Mundo de negocios a su servicio</span>
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
                Inicio
              </a>
            </li>
            <li>
              <a
                id="nav-link-equipos"
                href="#equipos"
                className="nav-link"
                onClick={(e) => handleScrollTo(e, 'equipos')}
              >
                Equipos
              </a>
            </li>
            <li>
              <a
                id="nav-link-marcas"
                href="#marcas"
                className="nav-link"
                onClick={(e) => handleScrollTo(e, 'marcas')}
              >
                Marcas
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
                Ver Catálogo
              </a>
            </li>
          </ul>

          <a
            id="nav-cta-button"
            href="#cotizar"
            className="btn btn-secondary nav-cta-btn-header"
            onClick={(e) => handleScrollTo(e, 'cotizar')}
          >
            Solicitar Presupuesto
            <ArrowRight size={16} />
          </a>
        </nav>

        {/* Hamburger button for mobile */}
        <button
          id="mobile-menu-toggle"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú de navegación"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  );
}
