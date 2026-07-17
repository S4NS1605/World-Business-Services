import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  KeyRound, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit3, 
  Plus, 
  RotateCcw, 
  ArrowLeft, 
  Save, 
  XCircle,
  FileImage,
  Layers,
  ArrowRight
} from 'lucide-react';
import { defaultCategories, defaultProducts } from '../utils/defaultCatalog';

export default function AdminPanel({ products, onSaveProduct, onDeleteProduct, onResetCatalog, onNavigateHome }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Dashboard Management State
  const [editingProduct, setEditingProduct] = useState(null); // null or product object
  const [newSpec, setNewSpec] = useState('');
  
  // JSON import state
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [jsonSuccess, setJsonSuccess] = useState(false);
  const [jsonOpen, setJsonOpen] = useState(false);
  
  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'wbsadmin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta. Por favor intente de nuevo.');
    }
  };

  // Create new empty product
  const handleAddNewProduct = () => {
    const newId = `prod-${Date.now()}`;
    setEditingProduct({
      id: newId,
      name: 'Nuevo Equipo / Modelo',
      brand: 'Marca',
      category: 'bombas-infusion',
      description: 'Breve descripción del equipo médico y sus características principales.',
      image: '',
      specs: ['Especificación técnica de muestra 1']
    });
  };

  // Start editing a product
  const handleStartEdit = (product) => {
    setEditingProduct({ ...product });
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto del catálogo?')) {
      await onDeleteProduct(id);
    }
  };

  // Form field change handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Convert pasted image from clipboard to Base64
  const handlePasteImage = (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setEditingProduct(prev => ({
                ...prev,
                image: reader.result
              }));
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    }
  };

  // Add new spec to editing product
  const handleAddSpec = (e) => {
    e.preventDefault();
    if (!newSpec.trim()) return;
    setEditingProduct(prev => ({
      ...prev,
      specs: [...prev.specs, newSpec.trim()]
    }));
    setNewSpec('');
  };

  // Remove spec from editing product
  const handleRemoveSpec = (idxToRemove) => {
    setEditingProduct(prev => ({
      ...prev,
      specs: prev.specs.filter((_, idx) => idx !== idxToRemove)
    }));
  };

  // Handle JSON import - maps JSON fields to editingProduct state
  const handleJsonImport = () => {
    setJsonError('');
    setJsonSuccess(false);
    if (!jsonInput.trim()) {
      setJsonError('El campo JSON está vacío.');
      return;
    }

    // Map of category title -> category id
    const categoryMap = {};
    defaultCategories.forEach(cat => {
      categoryMap[cat.title.toLowerCase()] = cat.id;
      categoryMap[cat.id.toLowerCase()] = cat.id;
    });

    try {
      const parsed = JSON.parse(jsonInput);

      // Map flexible JSON keys to internal field names
      const name = parsed.nombre_equipo || parsed.name || parsed.nombre || '';
      const description = parsed.descripcion || parsed.description || '';
      const brand = parsed.marca || parsed.brand || '';
      const rawCategory = (parsed.categoria || parsed.category || '').toLowerCase().trim();
      const image = parsed.imagen_url || parsed.image || parsed.imagen || '';
      const specs = parsed.especificaciones || parsed.specs || parsed.especificacion || [];

      if (!name) {
        setJsonError('El campo "nombre_equipo" es requerido en el JSON.');
        return;
      }

      // Try to find category match
      let category = categoryMap[rawCategory];
      if (!category) {
        // Partial match
        const matchKey = Object.keys(categoryMap).find(k => k.includes(rawCategory) || rawCategory.includes(k));
        category = matchKey ? categoryMap[matchKey] : 'bombas-infusion';
      }

      const specsArray = Array.isArray(specs) ? specs : (typeof specs === 'string' ? [specs] : []);

      setEditingProduct(prev => ({
        ...prev,
        name: name.trim(),
        description: description.trim(),
        brand: brand.trim(),
        category,
        image: image.trim() ? image.trim() : prev.image,
        specs: specsArray.map(s => String(s).trim()).filter(Boolean)
      }));

      setJsonInput('');
      setJsonSuccess(true);
      setTimeout(() => setJsonSuccess(false), 3500);
    } catch (e) {
      setJsonError('JSON inválido: ' + e.message);
    }
  };

  // Save changes to App state
  const handleSaveForm = async (e) => {
    e.preventDefault();
    if (!editingProduct.name.trim()) {
      alert('El nombre del equipo es requerido.');
      return;
    }

    await onSaveProduct(editingProduct);
    setEditingProduct(null);
  };

  // Reset entire catalog to original defaults
  const handleResetCatalog = async () => {
    if (window.confirm('¿Desea restaurar el catálogo inicial extraído de los portafolios físicos en PDF? Se perderán todas las modificaciones hechas.')) {
      await onResetCatalog();
      setEditingProduct(null);
    }
  };

  const getCategoryTitle = (catId) => {
    const found = defaultCategories.find(c => c.id === catId);
    return found ? found.title : catId;
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <motion.div 
          className="admin-login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="admin-login-header">
            <h2>WORLD BUSINESS SERVICES</h2>
            <span>Gestor de Catálogo Individual</span>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group" style={{ position: 'relative' }}>
              <label htmlFor="admin-pass-input" className="form-label">Contraseña de Acceso</label>
              <div className="admin-password-input-container">
                <KeyRound className="pass-icon" size={18} />
                <input
                  id="admin-pass-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese la contraseña de administrador"
                  required
                />
                <button 
                  type="button" 
                  className="pass-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {authError && <span className="auth-error-msg">{authError}</span>}
            </div>
            
            <button type="submit" className="btn btn-primary login-btn">
              Iniciar Sesión
              <ArrowRight size={16} />
            </button>
          </form>

          <button onClick={onNavigateHome} className="btn btn-outline back-home-btn-login">
            <ArrowLeft size={16} />
            Regresar a la Landing Page
          </button>
        </motion.div>
        {styleTags}
      </div>
    );
  }

  // Admin Dashboard view
  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <div className="container header-flex">
          <div className="admin-header-title">
            <Layers size={24} style={{ color: 'var(--secondary-color)' }} />
            <div>
              <h2>Panel de Administración del Catálogo</h2>
              <span>WORLD BUSINESS SERVICES S.A.S.</span>
            </div>
          </div>
          <div className="admin-header-actions">
            <button onClick={handleResetCatalog} className="btn btn-outline reset-btn-dashboard">
              <RotateCcw size={16} />
              Restaurar Original
            </button>
            <button onClick={onNavigateHome} className="btn btn-primary go-home-btn-dashboard">
              <ArrowLeft size={16} />
              Ver Landing Page
            </button>
          </div>
        </div>
      </header>

      <main className="container admin-dashboard-main">
        <AnimatePresence mode="wait">
          {!editingProduct ? (
            /* Product List Dashboard */
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="dashboard-section-header">
                <h3>Artículos en el Catálogo</h3>
                <button onClick={handleAddNewProduct} className="btn btn-secondary add-new-cat-btn">
                  <Plus size={16} />
                  Nuevo Artículo
                </button>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Foto</th>
                      <th>Nombre del Equipo</th>
                      <th>Marca</th>
                      <th>Categoría</th>
                      <th>Especificaciones</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="table-img-cell">
                          {product.image ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            <div className="no-img-placeholder">Sin Foto</div>
                          )}
                        </td>
                        <td className="table-title-cell">
                          <strong>{product.name}</strong>
                          <p>{product.description}</p>
                        </td>
                        <td>
                          <span className="brand-badge-admin">{product.brand}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--primary-color)' }}>
                            {getCategoryTitle(product.category)}
                          </span>
                        </td>
                        <td>
                          <span className="models-count-badge">{product.specs.length} specs</span>
                        </td>
                        <td className="table-actions-cell">
                          <button 
                            onClick={() => handleStartEdit(product)} 
                            className="action-btn edit-action"
                            title="Editar"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)} 
                            className="action-btn delete-action"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            /* Product Editor Form */
            <motion.div
              key="edit"
              className="editor-form-wrapper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="dashboard-section-header">
                <h3>{products.some(p => p.id === editingProduct.id) ? 'Editar Artículo' : 'Nuevo Artículo'}</h3>
                <button onClick={() => setEditingProduct(null)} className="btn btn-outline">
                  <XCircle size={16} />
                  Cancelar
                </button>
              </div>


              <form onSubmit={handleSaveForm} className="editor-form">
                <div className="editor-grid">
                  {/* Left Column: Form inputs */}
                  <div className="editor-left-column">
                    <div className="form-group">
                      <label className="form-label">Nombre del Equipo / Modelo *</label>
                      <input
                        type="text"
                        name="name"
                        value={editingProduct.name}
                        onChange={handleFormChange}
                        placeholder="Ej. Monitor de Signos Vitales COMEN C80"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Descripción Informativa *</label>
                      <textarea
                        name="description"
                        value={editingProduct.description}
                        onChange={handleFormChange}
                        placeholder="Ej. Monitor multiparámetrico de alta fidelidad para cuidados..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="editor-row">
                      <div className="form-group">
                        <label className="form-label">Marca *</label>
                        <input
                          type="text"
                          name="brand"
                          value={editingProduct.brand}
                          onChange={handleFormChange}
                          placeholder="Ej. COMEN"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Categoría Asociada</label>
                        <select
                          name="category"
                          value={editingProduct.category}
                          onChange={handleFormChange}
                        >
                          {defaultCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">URL de la Imagen del Equipo</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <FileImage size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        <input
                          type="url"
                          name="image"
                          value={editingProduct.image}
                          onChange={handleFormChange}
                          placeholder="https://ejemplo.com/imagen-equipo.jpg"
                          style={{ flex: 1 }}
                        />
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', marginLeft: '1.75rem' }}>
                        Pega el enlace directo a la imagen (JPG, PNG, WebP). La vista previa se actualizará automáticamente.
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">¿Tienes una captura? (Pegar directamente)</label>
                      <div 
                        onPaste={handlePasteImage}
                        tabIndex={0}
                        style={{
                          border: '2px dashed var(--border-color, #e2e8f0)',
                          borderRadius: '8px',
                          padding: '1.25rem 1rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: 'rgba(255, 255, 255, 0.02)',
                          outline: 'none',
                          transition: 'all 0.2s ease-in-out',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--primary-color, #00d2ff)';
                          e.target.style.background = 'rgba(0, 210, 255, 0.05)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--border-color, #e2e8f0)';
                          e.target.style.background = 'rgba(255, 255, 255, 0.02)';
                        }}
                        title="Haz clic aquí y presiona Ctrl+V para pegar"
                      >
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted, #94a3b8)', display: 'block', marginBottom: '0.25rem' }}>
                          Haz clic dentro de este cuadro y presiona
                        </span>
                        <kbd style={{ 
                          background: '#1e293b', 
                          padding: '3px 6px', 
                          borderRadius: '4px', 
                          border: '1px solid #475569', 
                          color: '#f8fafc', 
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          boxShadow: '0 2px 0 #0f172a'
                        }}>Ctrl + V</kbd>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted, #94a3b8)', display: 'block', marginTop: '0.25rem' }}>
                          para pegar tu captura directamente.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Specifications & Image Preview */}
                  <div className="editor-right-column">
                    <div className="form-group">
                      <label className="form-label">Vista Previa de la Foto</label>
                      <div className="admin-image-preview-box">
                        {editingProduct.image ? (
                          <img src={editingProduct.image} alt="Vista previa" />
                        ) : (
                          <div className="no-img-text">Sin Imagen Cargada</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Especificaciones Técnicas</label>
                      <div className="models-admin-manager">
                        <div className="add-model-input-group">
                          <input
                            type="text"
                            value={newSpec}
                            onChange={(e) => setNewSpec(e.target.value)}
                            placeholder="Ej. Pantalla táctil LED a color de 12.1 pulgadas"
                          />
                          <button type="button" onClick={handleAddSpec} className="btn btn-secondary">
                            <Plus size={16} />
                            Añadir
                          </button>
                        </div>

                        <ul className="models-admin-list">
                          {editingProduct.specs.map((spec, idx) => (
                            <li key={idx}>
                              <span>{spec}</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveSpec(idx)}
                                className="remove-model-btn"
                              >
                                <Trash2 size={14} />
                              </button>
                            </li>
                          ))}
                          {editingProduct.specs.length === 0 && (
                            <li className="no-models-msg">No hay especificaciones añadidas.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-submit-container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                  <button type="submit" className="btn btn-primary save-btn-admin">
                    <Save size={18} />
                    Guardar Cambios del Artículo
                  </button>
                </div>
              </form>

              {/* === JSON IMPORT ACCORDION (avanzado) === */}
              <div style={{ marginTop: '2rem', borderTop: '1px dashed rgba(0,0,0,0.1)', paddingTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setJsonOpen(o => !o)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    padding: '0.25rem 0',
                    textTransform: 'uppercase'
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    transition: 'transform 0.25s',
                    transform: jsonOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    fontSize: '0.75rem'
                  }}>▶</span>
                  Opciones avanzadas — Importar desde JSON
                </button>

                {jsonOpen && (
                  <div style={{
                    background: 'linear-gradient(135deg, #0f2744 0%, #0a1a2e 100%)',
                    border: '1px solid rgba(0, 210, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginTop: '1rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '32px', height: '32px',
                        background: 'rgba(0, 210, 255, 0.12)',
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        color: '#00d2ff'
                      }}>{ '{}'}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0' }}>Importar desde JSON</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Pega el JSON y todos los campos se completarán automáticamente</div>
                      </div>
                    </div>

                    <textarea
                      value={jsonInput}
                      onChange={(e) => { setJsonInput(e.target.value); setJsonError(''); setJsonSuccess(false); }}
                      placeholder={`{
  "nombre_equipo": "S8",
  "descripcion": "Descripción del equipo...",
  "marca": "COMEN",
  "categoria": "Desfibriladores",
  "imagen_url": "https://...",
  "especificaciones": [
    "Especificación 1",
    "Especificación 2"
  ]
}`}
                      rows={9}
                      style={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.35)',
                        border: jsonError ? '1px solid #f87171' : jsonSuccess ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontFamily: 'monospace',
                        fontSize: '0.82rem',
                        padding: '0.875rem',
                        resize: 'vertical',
                        outline: 'none',
                        lineHeight: 1.6,
                        marginBottom: '0.75rem',
                        boxSizing: 'border-box'
                      }}
                    />

                    {jsonError && (
                      <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>⚠️</span> {jsonError}
                      </div>
                    )}
                    {jsonSuccess && (
                      <div style={{ color: '#34d399', fontSize: '0.8rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>✅</span> ¡Campos completados automáticamente desde el JSON!
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleJsonImport}
                      style={{
                        background: 'linear-gradient(135deg, #00d2ff, #0075c4)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.6rem 1.4rem',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>⚡</span>
                      Importar desde JSON
                    </button>
                  </div>
                )}
              </div>
              {/* === FIN JSON ACCORDION === */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {styleTags}
    </div>
  );
}

// Scoped custom CSS for admin views
const styleTags = (
  <style dangerouslySetInnerHTML={{__html: `
    /* LOGIN STYLING */
    .admin-login-wrapper {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle at 10% 20%, rgba(240, 249, 255, 0.5) 0%, rgba(8, 32, 62, 0.05) 90%);
      padding: 1.5rem;
    }
    .admin-login-card {
      width: 100%;
      max-width: 480px;
      background-color: var(--bg-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--border-color);
      padding: 3rem 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .admin-login-header {
      text-align: center;
    }
    .admin-login-header h2 {
      font-size: 1.35rem;
      color: var(--primary-color);
      margin-bottom: 0.25rem;
    }
    .admin-login-header span {
      font-size: 0.8rem;
      color: var(--secondary-color);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .admin-login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .admin-password-input-container {
      position: relative;
      width: 100%;
    }
    .admin-password-input-container input {
      padding-left: 2.75rem;
      padding-right: 2.75rem;
    }
    .pass-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }
    .pass-toggle {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      cursor: pointer;
    }
    .auth-error-msg {
      color: #ef4444;
      font-size: 0.8rem;
      font-weight: 500;
      margin-top: 0.5rem;
      display: inline-block;
    }
    .login-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
    }
    .back-home-btn-login {
      width: 100%;
      font-size: 0.9rem;
      padding: 0.875rem;
    }

    /* DASHBOARD STYLING */
    .admin-dashboard-container {
      min-height: 100vh;
      background-color: var(--bg-light);
      display: flex;
      flex-direction: column;
    }
    .admin-dashboard-header {
      background-color: var(--bg-white);
      border-bottom: 1px solid var(--border-color);
      padding: 1.25rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .admin-header-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .admin-header-title h2 {
      font-size: 1.25rem;
      line-height: 1.2;
      color: var(--primary-color);
    }
    .admin-header-title span {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .admin-header-actions {
      display: flex;
      gap: 0.75rem;
    }
    .admin-dashboard-main {
      flex-grow: 1;
      padding-top: 3rem;
      padding-bottom: 5rem;
    }
    .dashboard-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .dashboard-section-header h3 {
      font-size: 1.5rem;
      color: var(--primary-color);
    }

    /* TABLE STYLING */
    .admin-table-wrapper {
      background-color: var(--bg-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-color);
      overflow-x: auto;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .admin-table th, .admin-table td {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      vertical-align: middle;
    }
    .admin-table th {
      background-color: var(--bg-light);
      font-weight: 700;
      color: var(--primary-color);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .admin-table tr:last-child td {
      border-bottom: none;
    }
    .table-img-cell img {
      width: 60px;
      height: 45px;
      object-fit: contain;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background-color: var(--bg-light);
    }
    .no-img-placeholder {
      width: 60px;
      height: 45px;
      background-color: var(--border-color);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--text-muted);
    }
    .table-title-cell p {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
      line-height: 1.4;
      max-width: 350px;
    }
    .brand-badge-admin {
      font-size: 0.8rem;
      background-color: var(--secondary-light);
      color: var(--secondary-color);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-weight: 600;
      display: inline-block;
    }
    .models-count-badge {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .table-actions-cell {
      display: flex;
      gap: 0.5rem;
    }
    .action-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
      border: 1px solid transparent;
    }
    .edit-action {
      background-color: #f0fdf4;
      color: #16a34a;
    }
    .edit-action:hover {
      background-color: #dcfce7;
      transform: scale(1.05);
    }
    .delete-action {
      background-color: #fef2f2;
      color: #dc2626;
    }
    .delete-action:hover {
      background-color: #fee2e2;
      transform: scale(1.05);
    }

    /* EDITOR STYLING */
    .editor-form-wrapper {
      background-color: var(--bg-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--border-color);
      padding: 3rem 2.5rem;
    }
    .editor-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 3rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 900px) {
      .editor-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
    .editor-row {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 1.5rem;
    }
    @media (max-width: 600px) {
      .editor-row {
        grid-template-columns: 1fr;
      }
    }
    .file-upload-admin-wrapper {
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background-color: var(--bg-light);
      position: relative;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .file-upload-admin-wrapper:hover {
      border-color: var(--secondary-color);
      background-color: rgba(0, 136, 204, 0.02);
    }
    .file-upload-input-container {
      display: flex;
      flex-direction: column;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .file-upload-input-container input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .admin-image-preview-box {
      width: 100%;
      height: 200px;
      background-color: var(--bg-light);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 1rem;
    }
    .admin-image-preview-box img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .no-img-text {
      font-size: 0.9rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    .models-admin-manager {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .add-model-input-group {
      display: flex;
      gap: 0.5rem;
    }
    .add-model-input-group input {
      flex-grow: 1;
    }
    .add-model-input-group button {
      padding: 0 1.25rem;
      flex-shrink: 0;
    }
    .models-admin-list {
      list-style: none;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      max-height: 250px;
      overflow-y: auto;
      background-color: var(--bg-light);
    }
    .models-admin-list li {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
    }
    .models-admin-list li:last-child {
      border-bottom: none;
    }
    .models-admin-list li span {
      font-weight: 500;
      color: var(--text-heading);
    }
    .remove-model-btn {
      color: #dc2626;
      opacity: 0.7;
      transition: var(--transition-smooth);
    }
    .remove-model-btn:hover {
      opacity: 1;
      transform: scale(1.1);
    }
    .no-models-msg {
      justify-content: center !important;
      color: var(--text-muted);
      font-style: italic;
    }
  `}} />
);
