import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function QuoteForm({ selectedCategory, lang = 'es', onSubmitQuote }) {
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
    if (!formData.name.trim()) {
      newErrors.name = lang === 'en' ? 'Full name is required' : 'El nombre es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === 'en' ? 'Email address is required' : 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'en' ? 'Invalid email format' : 'El correo electrónico no es válido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = lang === 'en' ? 'Phone number is required' : 'El teléfono es requerido';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = lang === 'en' ? 'Phone must be between 7 and 15 digits' : 'El teléfono debe tener entre 7 y 15 dígitos';
    }
    if (!formData.equipment) {
      newErrors.equipment = lang === 'en' ? 'Select a product category of interest' : 'Seleccione un equipo de interés';
    }
    if (!formData.message.trim()) {
      newErrors.message = lang === 'en' ? 'Please enter a message' : 'Por favor ingrese un mensaje';
    }

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

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      equipment: '',
      message: ''
    });
    setErrors({});
    setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      await onSubmitQuote(formData);
      setStatus('success');
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('error');
    }
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
            {lang === 'en' ? 'Request a Quote' : 'Solicitud de Presupuesto'}
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
              ? 'Complete the form below and our specialized team will contact you shortly to provide technical advice and a customized proposal.'
              : 'Complete el siguiente formulario y un asesor comercial especializado se pondrá en contacto con usted a la brevedad para brindarle una oferta a su medida.'}
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
                    <h3>{lang === 'en' ? 'Medical Equipment Quotation' : 'Cotización de Equipos Médicos'}</h3>
                    <p>{lang === 'en' ? 'A world of business at your service' : 'Mundo de negocios a su servicio'} - WORLD BUSINESS SERVICES S.A.S.</p>
                  </div>
                </div>

                <form id="quote-medical-form" className="quote-form" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    {/* Nombre */}
                    <div className="form-group">
                      <label htmlFor="form-name" className="form-label">{lang === 'en' ? 'Full Name *' : 'Nombre Completo *'}</label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'e.g., Dr. Alexander Smith' : 'Ej. Dr. Alejandro Gómez'}
                        className={errors.name ? 'input-error' : ''}
                      />
                      {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.name}</span>}
                    </div>

                    {/* Correo */}
                    <div className="form-group">
                      <label htmlFor="form-email" className="form-label">{lang === 'en' ? 'Email Address *' : 'Correo Electrónico *'}</label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'example@institution.com' : 'ejemplo@institucion.com'}
                        className={errors.email ? 'input-error' : ''}
                      />
                      {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.email}</span>}
                    </div>

                    {/* Teléfono */}
                    <div className="form-group">
                      <label htmlFor="form-phone" className="form-label">{lang === 'en' ? 'Phone / Mobile *' : 'Teléfono / Celular *'}</label>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'e.g., +1 555 123 4567' : 'Ej. +57 311 585 5038'}
                        className={errors.phone ? 'input-error' : ''}
                      />
                      {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.phone}</span>}
                    </div>

                    {/* Institución */}
                    <div className="form-group">
                      <label htmlFor="form-institution" className="form-label">{lang === 'en' ? 'Clinic or Hospital (Optional)' : 'Clínica u Hospital (Opcional)'}</label>
                      <input
                        id="form-institution"
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'Medical Institution Name' : 'Nombre de la Institución Médica'}
                      />
                    </div>

                    {/* Equipo de Interés */}
                    <div className="form-group form-group-full">
                      <label htmlFor="form-equipment" className="form-label">{lang === 'en' ? 'Equipment of Interest *' : 'Equipo de Interés *'}</label>
                      <select
                        id="form-equipment"
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleChange}
                        className={errors.equipment ? 'input-error' : ''}
                      >
                        <option value="">{lang === 'en' ? '-- Select a category --' : '-- Seleccione una categoría --'}</option>
                        <option value="Bombas de Infusión y Jeringa">{lang === 'en' ? 'Infusion & Syringe Pumps (ENMIND Lines)' : 'Bombas de Infusión y Jeringa (Líneas ENMIND)'}</option>
                        <option value="Monitorización de Pacientes">{lang === 'en' ? 'Patient Monitoring (COMEN, EDAN, MINDRAY)' : 'Monitorización de Pacientes (COMEN, EDAN, MINDRAY)'}</option>
                        <option value="Desfibriladores">{lang === 'en' ? 'Defibrillators (COMEN S5/S8, MINDRAY)' : 'Desfibriladores (COMEN S5/S8, MINDRAY)'}</option>
                        <option value="Electrocardiógrafos">{lang === 'en' ? 'Electrocardiographs (1, 3, and 12 channels)' : 'Electrocardiógrafos (1, 3 y 12 canales)'}</option>
                        <option value="Cuidado Neonatal / Materno Fetal">{lang === 'en' ? 'Neonatal / Fetal Care (Incubators, phototherapy, dopplers)' : 'Cuidado Neonatal / Materno Fetal (Incubadoras, fototerapia, dopplers)'}</option>
                        <option value="Soporte Vital y Quirófano">{lang === 'en' ? 'Life Support & Operating Room (Anesthesia, ventilators, lights)' : 'Soporte Vital y Quirófano (Anestesia, ventiladores, lámparas cielíticas)'}</option>
                        <option value="Otro">{lang === 'en' ? 'Other / General Inquiry' : 'Otro / Consulta General'}</option>
                      </select>
                      {errors.equipment && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.equipment}</span>}
                    </div>

                    {/* Mensaje */}
                    <div className="form-group form-group-full">
                      <label htmlFor="form-message" className="form-label">{lang === 'en' ? 'Message / Specifications *' : 'Mensaje / Especificaciones *'}</label>
                      <textarea
                        id="form-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'Describe quantity, specific models or details of your request...' : 'Describa la cantidad, modelos específicos o detalles de su requerimiento...'}
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
                          {lang === 'en' ? 'Processing...' : 'Procesando...'}
                        </>
                      ) : (
                        <>
                          {lang === 'en' ? 'Send Request' : 'Enviar Solicitud'}
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
                <h3>{lang === 'en' ? 'Request Sent Successfully!' : '¡Solicitud Enviada con Éxito!'}</h3>
                <p>
                  {lang === 'en'
                    ? 'We have received your quotation request. A technical-commercial representative from WORLD BUSINESS SERVICES S.A.S. will analyze your requirements and send a formal proposal to your email shortly.'
                    : 'Hemos recibido su solicitud de cotización. Un representante técnico-comercial de WORLD BUSINESS SERVICES S.A.S. analizará sus requerimientos y le enviará el presupuesto formal a su correo electrónico a la brevedad.'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '1.75rem' }}>
                  <a
                    href={`https://wa.me/573115855038?text=${encodeURIComponent(
                      `Hola, acabo de solicitar una cotización desde su página web:\n\n` +
                      `• *Nombre:* ${formData.name}\n` +
                      `• *Clínica/Hospital:* ${formData.institution}\n` +
                      `• *Equipo de Interés:* ${formData.equipment}\n` +
                      `• *Mensaje:* ${formData.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#25D366',
                      borderColor: '#25D366',
                      color: '#fff',
                      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                      padding: '0.6rem 1.25rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      textDecoration: 'none'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.835-4.814l.41.244c1.472.873 3.125 1.333 4.818 1.335 5.867 0 10.643-4.774 10.647-10.647 0-2.846-1.107-5.522-3.117-7.533C17.632 1.636 14.958.53 12.112.53C6.248.53 1.472 5.305 1.468 11.18c-.001 1.76.459 3.479 1.333 4.974l.268.456-1.002 3.659 3.75-.983zM17.433 14.1c-.29-.145-1.716-.848-1.98-.943-.265-.096-.459-.145-.653.146-.193.29-.75.943-.919 1.137-.168.193-.338.217-.628.072-2.934-1.467-5.074-3.555-5.914-5.006-.222-.382-.023-.589.176-.788.178-.178.397-.463.595-.695.198-.232.265-.397.397-.662.132-.265.066-.497-.033-.692-.099-.196-.848-2.046-1.162-2.802-.307-.738-.617-.638-.847-.65-.22-.01-.471-.012-.723-.012-.251 0-.662.094-.99.463-.329.369-1.258 1.229-1.258 2.996 0 1.767 1.288 3.473 1.468 3.712.18.239 2.536 3.873 6.143 5.432.858.371 1.528.592 2.052.758.862.274 1.647.235 2.268.143.69-.103 1.717-.702 1.96-1.383.242-.682.242-1.266.17-1.383-.073-.117-.265-.19-.556-.335z"/>
                    </svg>
                    {lang === 'en' ? 'WhatsApp Chat' : 'Chatear por WhatsApp'}
                  </a>
                  <button
                    id="btn-new-quote"
                    onClick={resetForm}
                    className="btn btn-outline"
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 700, borderRadius: '6px' }}
                  >
                    {lang === 'en' ? 'New Request' : 'Realizar otra solicitud'}
                  </button>
                </div>
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
