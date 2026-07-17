#!/bin/bash
# WORLD BUSINESS SERVICES S.A.S. - Launch Script

# Asegurar que el script se ejecute en la carpeta del proyecto
cd "$(dirname "$0")"

echo "=========================================================="
echo "  WORLD BUSINESS SERVICES S.A.S. - EQUIPOS MEDICOS"
echo "=========================================================="
echo "Iniciando servidor de desarrollo de Vite..."
echo "Abre tu navegador en el puerto indicado a continuación."
echo "Presiona Ctrl+C para detener el servidor."
echo "=========================================================="

# Ejecutar el servidor de desarrollo
npm run dev
