import React from 'react';
import { motion } from 'framer-motion';

const brandsList = [
  { name: 'SECA', subtitle: 'Precisión para la salud' },
  { name: 'MEK', subtitle: 'Intensive Care System' },
  { name: 'MINDRAY', subtitle: 'Healthcare within reach' },
  { name: 'EDAN', subtitle: 'Medical Systems' },
  { name: 'GENTEC', subtitle: 'Genstar Technologies' },
  { name: 'WELCH ALLYN', subtitle: 'Medical Diagnostics' },
  { name: 'LITTMANN', subtitle: 'Littmann Quality' },
  { name: 'BOECO', subtitle: 'Germany' },
  { name: 'THERMO SCIENTIFIC', subtitle: 'Scientific Solutions' },
  { name: 'CHEMETRON', subtitle: 'Fire System' },
  { name: 'VITALIFE', subtitle: 'Hedy Medical' },
  { name: 'BIOLIGHT', subtitle: 'BLT Biolight' },
  { name: 'COMEN', subtitle: 'Share of Life' },
  { name: 'DAVID', subtitle: 'Neonatal Care' },
  { name: 'CONTEC', subtitle: 'Medical Systems' },
  { name: 'NEUMOVENT', subtitle: 'Ventilation Systems' }
];

export default function BrandsMarquee() {
  // Double the list for infinite scroll continuity
  const marqueeItems = [...brandsList, ...brandsList, ...brandsList];

  return (
    <section id="marcas" className="marquee-container">
      <div className="container">
        <h2 className="marquee-title">Marcas Aliadas y Distribución Oficial</h2>
      </div>

      <div className="marquee-track-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((brand, idx) => (
            <div key={idx} className="brand-logo-card">
              <div className="brand-logo-content">
                <div className="brand-name">
                  {brand.name.split(' ').map((word, i) => (
                    <span key={i} style={{ color: i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
                      {word}{' '}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', marginTop: '2px' }}>
                  {brand.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
