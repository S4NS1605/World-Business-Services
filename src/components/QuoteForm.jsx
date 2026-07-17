import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function QuoteForm({ selectedCategory }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    equipment: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  // Sync selectedCategory from parent component
  useEffect(() => {
    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        equipment: selectedCategory
      }));
    }
  }, [selectedCategory]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'El teléfono debe tener entre 7 y 15 dígitos';
    }
    if (!formData.institution.trim()) newErrors.institution = 'La institución o clínica es requerida';
    if (!formData.equipment) newErrors.equipment = 'Seleccione un equipo de interés';
    if (!formData.message.trim()) newErrors.message = 'Por favor ingrese un mensaje';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        equipment: '',
        message: ''
      });
    }, 2000);
  };

  const resetForm = () => {
    setStatus('idle');
    setErrors({});
  };

  return (
    <section id="cotizar" className="section quote-section">
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
            Solicitud de Presupuesto
          </motion.h2>
          <div className="divider"></div>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Complete el siguiente formulario y un asesor comercial especializado se pondrá en contacto con usted a la brevedad para brindarle una oferta a su medida.
          </motion.p>
        </div>

        {/* Form Container */}
        <div className="quote-wrapper">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="quote-form-header">
                  <div className="quote-form-header-content">
                    <h3>Cotización de Equipos Médicos</h3>
                    <p>Mundo de negocios a su servicio - WORLD BUSINESS SERVICES S.A.S.</p>
                  </div>
                </div>

                <form id="quote-medical-form" className="quote-form" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    {/* Nombre */}
                    <div className="form-group">
                      <label htmlFor="form-name" className="form-label">Nombre Completo *</label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Dr. Alejandro Gómez"
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.name}</span>}
                    </div>

                    {/* Correo */}
                    <div className="form-group">
                      <label htmlFor="form-email" className="form-label">Correo Electrónico *</label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@institucion.com"
                        className={errors.email ? 'input-error' : ''}
                      />
                      {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.email}</span>}
                    </div>

                    {/* Teléfono */}
                    <div className="form-group">
                      <label htmlFor="form-phone" className="form-label">Teléfono / Celular *</label>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. +57 311 585 5038"
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.phone}</span>}
                    </div>

                    {/* Institución */}
                    <div className="form-group">
                      <label htmlFor="form-institution" className="form-label">Clínica u Hospital *</label>
                      <input
                        id="form-institution"
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="Nombre de la Institución Médica"
                        className={errors.institution ? 'input-error' : ''}
                      />
                      {errors.institution && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.institution}</span>}
                    </div>

                    {/* Equipo de Interés */}
                    <div className="form-group form-group-full">
                      <label htmlFor="form-equipment" className="form-label">Equipo de Interés *</label>
                      <select
                        id="form-equipment"
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleChange}
                        className={errors.equipment ? 'input-error' : ''}
                      >
                        <option value="">-- Seleccione una categoría --</option>
                        <option value="Bombas de Infusión y Jeringa">Bombas de Infusión y Jeringa (Líneas ENMIND)</option>
                        <option value="Monitorización de Pacientes">Monitorización de Pacientes (COMEN, EDAN, MINDRAY)</option>
                        <option value="Desfibriladores">Desfibriladores (COMEN S5/S8, MINDRAY)</option>
                        <option value="Electrocardiógrafos">Electrocardiógrafos (1, 3 y 12 canales)</option>
                        <option value="Cuidado Neonatal / Materno Fetal">Cuidado Neonatal / Materno Fetal (Incubadoras, fototerapia, dopplers)</option>
                        <option value="Soporte Vital y Quirófano">Soporte Vital y Quirófano (Anestesia, ventiladores, lámparas cielíticas)</option>
                        <option value="Otro">Otro / Consulta General</option>
                      </select>
                      {errors.equipment && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.equipment}</span>}
                    </div>

                    {/* Mensaje */}
                    <div className="form-group form-group-full">
                      <label htmlFor="form-message" className="form-label">Mensaje / Especificaciones *</label>
                      <textarea
                        id="form-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describa la cantidad, modelos específicos o detalles de su requerimiento..."
                        rows={4}
                        className={errors.message ? 'input-error' : ''}
                      />
                      {errors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.message}</span>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-submit-container">
                    <button
                      id="btn-submit-quote"
                      type="submit"
                      className="btn btn-primary form-submit-btn"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <>
                          <RefreshCw className="animate-spin" size={18} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                          Procesando...
                        </>
                      ) : (
                        <>
                          Enviar Solicitud
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* Success Screen */
              <motion.div
                key="success"
                className="form-success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="success-icon-container">
                  <CheckCircle size={40} />
                </div>
                <h3>¡Solicitud Enviada con Éxito!</h3>
                <p>
                  Hemos recibido su solicitud de cotización. Un representante técnico-comercial de <strong>WORLD BUSINESS SERVICES S.A.S.</strong> analizará sus requerimientos y le enviará el presupuesto formal a su correo electrónico a la brevedad.
                </p>
                <button
                  id="btn-new-quote"
                  onClick={resetForm}
                  className="btn btn-outline"
                  style={{ marginTop: '1.5rem' }}
                >
                  Realizar otra solicitud
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Inline styles for spinner and basic errors */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .input-error {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }
        .input-error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
        }
      `}} />
    </section>
  );
}
