import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, Globe } from 'lucide-react';
import logoEmpresa from '../logo-empresa.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
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
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Company Logo and Description */}
          <div className="footer-column">
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src={logoEmpresa} alt="WBS Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }} />
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-white)', margin: 0, lineHeight: 1.2 }}>WORLD BUSINESS SERVICES</h2>
                <span style={{ fontSize: '0.65rem', color: 'var(--secondary-color)', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>Mundo de negocios a su servicio</span>
              </div>
            </div>
            <p className="footer-about">
              Importadores y distribuidores de equipamiento médico y accesorios hospitalarios de alta complejidad. Proveemos soluciones tecnológicas avanzadas en Colombia y soporte técnico especializado.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-column">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li>
                <a href="#inicio" className="footer-link" onClick={(e) => handleScrollTo(e, 'inicio')}>
                  Inicio
                </a>
              </li>
              <li>
                <a href="#equipos" className="footer-link" onClick={(e) => handleScrollTo(e, 'equipos')}>
                  Equipos Médicos
                </a>
              </li>
              <li>
                <a href="#marcas" className="footer-link" onClick={(e) => handleScrollTo(e, 'marcas')}>
                  Marcas Aliadas
                </a>
              </li>
              <li>
                <a href="#cotizar" className="footer-link" onClick={(e) => handleScrollTo(e, 'cotizar')}>
                  Solicitar Presupuesto
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">Información de Contacto</h3>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={20} />
                <span>
                  Calle 30 No. 5-29 M30 No 706<br />
                  Ibagué - Tolima - Colombia
                </span>
              </li>
              <li className="footer-contact-item">
                <Phone size={18} />
                <span>
                  Colombia: <a href="tel:+573115855038" className="footer-link-direct">+57 311 585 5038</a><br />
                  USA: <a href="tel:+14074927879" className="footer-link-direct">+1 (407) 492-7879</a>
                </span>
              </li>
              <li className="footer-contact-item">
                <Mail size={18} />
                <span>
                  <a href="mailto:worldbusinesservices@gmail.com" className="footer-link-direct">
                    worldbusinesservices@gmail.com
                  </a>
                </span>
              </li>
              <li className="footer-contact-item">
                <Clock size={18} />
                <span>
                  Lunes - Viernes: 8:00 AM - 6:00 PM<br />
                  Sábados: 8:00 AM - 12:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} WORLD BUSINESS SERVICES S.A.S. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
            <Shield size={14} style={{ color: 'var(--secondary-color)' }} />
            <span>Distribución de Tecnología Médica Regulada por INVIMA</span>
          </div>
        </div>
      </div>
      
      {styleTag}
    </footer>
  );
}

// Inline styles for elements in footer that might need custom hover styles
const styleTag = (
  <style dangerouslySetInnerHTML={{__html: `
    .footer-link-direct {
      color: rgba(255, 255, 255, 0.7);
      transition: var(--transition-smooth);
    }
    .footer-link-direct:hover {
      color: var(--secondary-color);
    }
  `}} />
);
