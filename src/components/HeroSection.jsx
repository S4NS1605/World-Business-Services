import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, Activity } from 'lucide-react';
import heroImage from '../assets/medical_equipment_hero.jpg';

export default function HeroSection({ lang }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.4
      }
    }
  };

  const handleScrollToQuote = (e) => {
    e.preventDefault();
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

  return (
    <section id="inicio" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-badge" variants={itemVariants}>
              <ShieldCheck size={16} />
              {lang === 'en' ? 'Guaranteed Professional Equipment' : 'Equipamiento Profesional Garantizado'}
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              <span style={{ color: 'var(--primary-color)' }}>WORLD BUSINESS</span>
              <br />
              <span style={{ color: 'var(--secondary-color)' }}>SERVICES S.A.S.</span>
            </motion.h1>

            <motion.h2 
              className="hero-subtitle" 
              variants={itemVariants}
              style={{ fontWeight: 500, fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--primary-color)', margin: '1rem 0' }}
            >
              {lang === 'en' ? 'A World of Business at your Service' : 'Mundo de Negocios a su Servicio'}
            </motion.h2>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              {lang === 'en' 
                ? 'We supply state-of-the-art medical technology from the industry\'s leading brands. We enhance the quality and safety of patient care.'
                : 'Suministramos tecnología médica de vanguardia con las mejores marcas del mercado. Impulsamos la calidad y seguridad en el cuidado de la salud de sus pacientes.'}
            </motion.p>

            <motion.div className="hero-cta" variants={itemVariants}>
              <a
                id="hero-cta-quote"
                href="#cotizar"
                className="btn btn-secondary"
                onClick={handleScrollToQuote}
              >
                {lang === 'en' ? 'Request a Quote' : 'Solicitar Presupuesto'}
              </a>
              <a
                id="hero-cta-catalog"
                href="#equipos"
                className="btn btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('equipos')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {lang === 'en' ? 'View Products' : 'Ver Portafolio'}
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Right Visuals */}
          <motion.div
            className="hero-image-wrapper"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="hero-image-bg"></div>
            <img
              src={heroImage}
              alt="Medical equipment"
              className="hero-img"
              loading="eager"
            />

            {/* Floating Card 1 */}
            <motion.div
              className="floating-icon-card c1"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="icon-container">
                <HeartPulse size={20} />
              </div>
              <div className="text-container">
                <span className="text-title">{lang === 'en' ? 'Life Support' : 'Soporte Vital'}</span>
                <span className="text-subtitle">{lang === 'en' ? 'Advanced Monitoring' : 'Monitoreo Avanzado'}</span>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              className="floating-icon-card c2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="icon-container">
                <Activity size={20} />
              </div>
              <div className="text-container">
                <span className="text-title">{lang === 'en' ? 'Medical Precision' : 'Precisión Médica'}</span>
                <span className="text-subtitle">{lang === 'en' ? 'Certified Technology' : 'Tecnología Certificada'}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
