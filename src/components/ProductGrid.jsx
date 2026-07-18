import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { iconMap, defaultCategories } from '../utils/defaultCatalog';
import { translateEsToEnSync } from '../utils/translations';

export default function ProductGrid({ products, onSelectCategory, onNavigate, lang }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  const handleQuoteClick = (e, formValue) => {
    e.preventDefault();
    onSelectCategory(formValue);
    
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
  };

  // English Category translation mapping
  const getCategoryTitle = (cat) => {
    if (lang === 'en') {
      if (cat.id === 'bombas-infusion') return 'Infusion Pumps';
      if (cat.id === 'monitoreo-pacientes') return 'Patient Monitoring';
      if (cat.id === 'desfibriladores') return 'Defibrillators';
      if (cat.id === 'electrocardiografos') return 'Electrocardiographs';
      if (cat.id === 'cuidado-neonatal') return 'Neonatal Care';
      if (cat.id === 'soporte-vital') return 'Life Support';
      if (cat.id === 'diagnostico-menor') return 'Minor Diagnostics';
      if (cat.id === 'accesorios-consumibles') return 'Accessories & Consumables';
    }
    return cat.title;
  };

  const getCategoryDesc = (cat) => {
    if (lang === 'en') {
      if (cat.id === 'bombas-infusion') return 'Volumetric and syringe infusion pumps for precise fluid management.';
      if (cat.id === 'monitoreo-pacientes') return 'Multiparameter patient monitors for vital signs tracking in critical care.';
      if (cat.id === 'desfibriladores') return 'Automated external and biphasic defibrillators for emergency resuscitation.';
      if (cat.id === 'electrocardiografos') return 'High-resolution multi-channel ECG machines for cardiac diagnostics.';
      if (cat.id === 'cuidado-neonatal') return 'Incubators, phototherapy lamps, and specialized care for newborns.';
      if (cat.id === 'soporte-vital') return 'Ventilators, anesthesia machines, and high-complexity vital support.';
      if (cat.id === 'diagnostico-menor') return 'Ophthalmoscopes, otoscopes, pulse oximeters, and general diagnostic tools.';
      if (cat.id === 'accesorios-consumibles') return 'Sensors, cables, cuffs, paper rolls, and original hospital supplies.';
    }
    return cat.description;
  };

  return (
    <section id="equipos" className="section section-bg">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {lang === 'en' ? 'Medical Equipment Portfolio' : 'Portafolio de Equipos Médicos'}
          </motion.h2>
          <div className="divider"></div>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {lang === 'en'
              ? 'We distribute medical technology certified by INVIMA for clinics, hospitals, and healthcare institutions in Colombia.'
              : 'Distribuimos tecnología médica certificada por el INVIMA para clínicas, hospitales e instituciones de salud en Colombia.'}
          </motion.p>
        </div>

        {/* Product Grid */}
        <motion.div 
          className="product-grid-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {(() => {
            // Filter categories that actually have at least one product
            const activeCategories = defaultCategories.filter(category => {
              const categoryProducts = products.filter(p => p.category === category.id);
              return categoryProducts.length > 0;
            });

            // Limit to at most 6 categories for the landing page
            const displayedCategories = activeCategories.slice(0, 6);

            return displayedCategories.map((category) => {
              const IconComponent = iconMap[category.iconName] || Activity;
              const categoryProducts = products.filter(p => p.category === category.id);
              const displayedModels = categoryProducts.slice(0, 10); // Show up to 10 models

              const title = getCategoryTitle(category);
              const desc = getCategoryDesc(category);

              return (
                <motion.div 
                  key={category.id} 
                  className="product-card"
                  variants={cardVariants}
                >
                  <div className="product-card-header">
                    <div className="product-icon-container">
                      <IconComponent size={26} />
                    </div>
                    <h3 className="product-title" style={{ fontSize: '1.15rem' }}>{title}</h3>
                  </div>

                  {/* Category Cover Image */}
                  <div className="product-card-image-container">
                    <img 
                      src={categoryProducts[0]?.image || category.image} 
                      alt={title} 
                      className="product-card-img" 
                      loading="lazy" 
                    />
                  </div>

                  <p className="product-description" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>{desc}</p>

                  <div className="product-list-title">{lang === 'en' ? 'Models & Solutions' : 'Modelos y Soluciones'}</div>
                  <ul className="product-items-list" style={{ gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {displayedModels.map((product) => (
                      <li key={product.id} className="product-item" style={{ fontSize: '0.85rem', lineHeight: '1.3' }}>
                        <CheckCircle2 size={13} style={{ marginTop: '0.15rem' }} />
                        <span>{lang === 'en' ? translateEsToEnSync(product.name) : product.name}</span>
                      </li>
                    ))}
                    {categoryProducts.length > 10 && (
                      <li className="product-item" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary-color)', fontStyle: 'italic' }}>
                        + {categoryProducts.length - 10} {lang === 'en' ? 'more models in the catalog...' : 'modelos más en el catálogo...'}
                      </li>
                    )}
                  </ul>

                  <div className="product-card-cta">
                    <span className="product-brand-tag" style={{ fontSize: '0.7rem' }}>{category.brands}</span>
                    <a
                      id={`btn-quote-${category.id}`}
                      href="#cotizar"
                      className="product-cta-btn"
                      onClick={(e) => handleQuoteClick(e, category.formValue)}
                    >
                      {lang === 'en' ? 'Quote' : 'Cotizar'}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            });
          })()}
        </motion.div>

        {/* View Full Catalog Button */}
        {(() => {
          const activeCategoriesCount = defaultCategories.filter(category => 
            products.some(p => p.category === category.id)
          ).length;

          return activeCategoriesCount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
              <button 
                onClick={() => onNavigate('/catalogo')}
                className="btn btn-primary"
                style={{
                  padding: '0.85rem 2.25rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0, 210, 255, 0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 210, 255, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 210, 255, 0.2)';
                }}
              >
                {lang === 'en' ? 'View Full Catalog' : 'Ver Catálogo Completo'}
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
