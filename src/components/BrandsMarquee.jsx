import React from 'react';
import { motion } from 'framer-motion';

export default function BrandsMarquee({ brands = [] }) {
  if (!brands || brands.length === 0) return null;

  // Double the list for infinite scroll continuity
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <section id="marcas" className="marquee-container">
      <div className="container">
        <h2 className="marquee-title">Marcas Aliadas y Distribución Oficial</h2>
      </div>

      <div className="marquee-track-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((brand, idx) => (
            <div key={idx} className="brand-logo-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
              <div className="brand-logo-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                  src={brand.image_url} 
                  alt={brand.name || 'Brand Logo'} 
                  style={{ 
                    height: '42px', 
                    width: 'auto', 
                    maxWidth: '120px',
                    objectFit: 'contain', 
                    transition: 'all 0.3s ease'
                  }} 
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
