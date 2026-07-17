import { Droplet, Activity, Zap, FileHeart, Baby, HeartPulse, Stethoscope, Layers } from 'lucide-react';

// Import individual correct product photos extracted page-by-page from the PDF catalog
import p4Img from '../assets/pdf_products/product_page_4.png';   // ENMIND EN-V7
import p5Img from '../assets/pdf_products/product_page_5.png';   // ENMIND EN-S7
import p6Img from '../assets/pdf_products/product_page_6.png';   // COMEN C80
import p7Img from '../assets/pdf_products/product_page_7.png';   // COMEN STAR 8000E
import p8Img from '../assets/pdf_products/product_page_8.png';   // COMEN STAR 8000H
import p9Img from '../assets/pdf_products/product_page_9.png';   // COMEN S5
import p10Img from '../assets/pdf_products/product_page_10.png'; // COMEN S8
import p11Img from '../assets/pdf_products/product_page_11.png'; // COMEN H3
import p12Img from '../assets/pdf_products/product_page_12.png'; // COMEN H12
import p13Img from '../assets/pdf_products/product_page_13.png'; // BIOCARE iH-3 Plus
import p14Img from '../assets/pdf_products/product_page_14.png'; // COMEN C21
import p15Img from '../assets/pdf_products/product_page_15.png'; // COMEN C22
import p16Img from '../assets/pdf_products/product_page_16.png'; // COMEN B3
import p17Img from '../assets/pdf_products/product_page_17.png'; // BIOCARE FM-200
import p18Img from '../assets/pdf_products/product_page_18.png'; // COMEN AX-400
import p19Img from '../assets/pdf_products/product_page_19.png'; // COMEN V1
import p20Img from '../assets/pdf_products/product_page_20.png'; // COMEN V3
import p21Img from '../assets/pdf_products/product_page_21.png'; // COMEN W3
import p22Img from '../assets/pdf_products/product_page_22.png'; // COMEN L5A
import p23Img from '../assets/pdf_products/product_page_23.png'; // COMEN BL70
import p24Img from '../assets/pdf_products/product_page_24.png'; // DISONMED BN-100A
import p25Img from '../assets/pdf_products/product_page_25.png'; // YWELL 7E-C
import p26Img from '../assets/pdf_products/product_page_26.png'; // YWELL 7A-23B
import p27Img from '../assets/pdf_products/product_page_27.png'; // Cables EKG
import p28Img from '../assets/pdf_products/product_page_28.png'; // Papel EKG

export const iconMap = {
  Droplet,
  Activity,
  Zap,
  FileHeart,
  Baby,
  HeartPulse,
  Stethoscope,
  Layers
};

export const defaultCategories = [
  { id: 'bombas-infusion', title: 'Bombas de Infusión y Jeringa', iconName: 'Droplet', image: p4Img, brands: 'ENMIND, HEDY', formValue: 'Bombas de Infusión y Jeringa' },
  { id: 'monitoreo-pacientes', title: 'Monitorización de Pacientes', iconName: 'Activity', image: p6Img, brands: 'COMEN, EDAN, MINDRAY', formValue: 'Monitorización de Pacientes' },
  { id: 'desfibriladores', title: 'Desfibriladores', iconName: 'Zap', image: p9Img, brands: 'COMEN, MINDRAY', formValue: 'Desfibriladores' },
  { id: 'electrocardiografos', title: 'Electrocardiógrafos y Holter', iconName: 'FileHeart', image: p12Img, brands: 'COMEN, EDAN, BIOCARE', formValue: 'Electrocardiógrafos' },
  { id: 'cuidado-neonatal', title: 'Cuidado Neonatal y Fetal', iconName: 'Baby', image: p16Img, brands: 'COMEN, EDAN, DISONMED, BIOCARE', formValue: 'Cuidado Neonatal / Materno Fetal' },
  { id: 'soporte-vital', title: 'Soporte Vital y Quirófano', iconName: 'HeartPulse', image: p18Img, brands: 'COMEN, MEK', formValue: 'Soporte Vital y Quirófano' },
  { id: 'diagnostico-menor', title: 'Diagnóstico Menor y Succión', iconName: 'Stethoscope', image: p25Img, brands: 'WELCH ALLYN, EDAN, YWELL, DISONMED', formValue: 'Otro' },
  { id: 'accesorios-consumibles', title: 'Accesorios y Consumibles', iconName: 'Layers', image: p27Img, brands: 'COMEN, MINDRAY, EDAN, FIAB, NELLCOR', formValue: 'Otro' }
];

export const defaultProducts = [
  // 1. Bombas de Infusión y Jeringa
  {
    id: 'enmind-en-v7',
    name: 'Bomba de Infusión ENMIND EN-V7',
    category: 'bombas-infusion',
    brand: 'ENMIND',
    description: 'Bomba de infusión volumétrica con pantalla táctil a color de 4.3 pulgadas, puerta eléctrica y protección contra líquidos IP24.',
    image: p4Img,
    specs: [
      'Pantalla táctil a color de 4.3 pulgadas para edición de parámetros',
      'Puerta eléctrica y protección contra flujo libre eléctrico',
      'Arquitectura abierta compatible con diferentes sets de infusión',
      'Protección contra líquidos IP24 frente a derrames'
    ]
  },
  {
    id: 'enmind-en-s7',
    name: 'Bomba de Jeringa ENMIND EN-S7',
    category: 'bombas-infusion',
    brand: 'ENMIND',
    description: 'Bomba de jeringa apilable con pantalla táctil a color, batería de larga duración y alta compatibilidad modular.',
    image: p5Img,
    specs: [
      'Pantalla táctil a color de 4.3 pulgadas para visualización clara',
      'Hasta 12 horas de autonomía de batería continua',
      'Registro histórico con capacidad para más de 5000 eventos',
      'Excelente compatibilidad con jeringas de 10, 20, 30, 50 y 60 ml'
    ]
  },
  {
    id: 'vitalife-i7',
    name: 'Bomba de Infusión HEDY Vitalife I7',
    category: 'bombas-infusion',
    brand: 'HEDY',
    description: 'Bomba de infusión inteligente con 9 modos de flujo y sistema apilable que no requiere racks adicionales.',
    image: p4Img,
    specs: [
      'Nueve modos de infusión: Flujo, Dosificación, V-T, R-T, Relevo, Rampa, Intermitente, etc.',
      'Sistema modular apilable de fácil manipulación sin necesidad de racks',
      'Bolo manual y bolo automático programables',
      'Sensor de oclusión superior e inferior que indica si la llave queda cerrada'
    ]
  },

  // 2. Monitorización de Pacientes
  {
    id: 'comen-c80',
    name: 'Monitor Multiparámetro COMEN C80',
    category: 'monitoreo-pacientes',
    brand: 'COMEN',
    description: 'Monitor multiparamétrico de alta gama para UCI con pantalla táctil de 12.1 pulgadas y soporte avanzado de parámetros.',
    image: p6Img,
    specs: [
      'Pantalla color táctil de 12.1" con interfaz cama-cama interactiva',
      '7 parámetros incluidos: ECG, SpO2, NIBP, RESP, TEMP, IBP y CO',
      'Módulos opcionales: CO2, ICG, Gases Anestésicos y profundidad de anestesia (BIS)',
      'Conectividad cableada e inalámbrica al sistema de monitoreo central COMEN'
    ]
  },
  {
    id: 'comen-star-8000e',
    name: 'Monitor de Paciente COMEN STAR 8000E',
    category: 'monitoreo-pacientes',
    brand: 'COMEN',
    description: 'Monitor multiparamétrico básico de 12.1 pulgadas, ideal para salas de hospitalización o recuperación post-anestesia.',
    image: p7Img,
    specs: [
      'Pantalla color de 12.1 pulgadas para monitorización clara',
      '5 parámetros estándar: ECG, RESP, TEMP, NIBP y SpO2',
      'Soporte opcional para monitorización de IBP y CO2',
      'Acepta conexiones externas de teclado y mouse por puerto USB'
    ]
  },
  {
    id: 'comen-star-8000h',
    name: 'Monitor de Transporte COMEN STAR 8000H',
    category: 'monitoreo-pacientes',
    brand: 'COMEN',
    description: 'Monitor compacto y liviano con pantalla de 8.4 pulgadas, optimizado para el transporte medicalizado de pacientes.',
    image: p8Img,
    specs: [
      'Pantalla táctil a color de 8.4 pulgadas de fácil navegación',
      '5 parámetros básicos integrados y software en español',
      'Conector de CO2 activo y monitorización en tiempo real',
      'Batería recargable integrada de gran autonomía'
    ]
  },
  {
    id: 'edan-im50',
    name: 'Monitor de Signos Vitales EDAN iM50',
    category: 'monitoreo-pacientes',
    brand: 'EDAN',
    description: 'Monitor portátil multiparámetro con pantalla táctil de 8.4 pulgadas y conectividad a central de monitoreo.',
    image: p6Img,
    specs: [
      'Pantalla táctil TFT a color de 8.4 pulgadas',
      'Parámetros básicos: ECG, SpO2, RESP, NIBP, 2-TEMP, PR',
      'Detección de marcapasos, análisis de arritmias y segmento ST',
      'Conexión directa a central de monitoreo con llamada de enfermería'
    ]
  },
  {
    id: 'edan-im70',
    name: 'Monitor Multiparámetro EDAN iM70 2IBP/CO',
    category: 'monitoreo-pacientes',
    brand: 'EDAN',
    description: 'Monitor multiparamétrico avanzado de 12.1 pulgadas, diseñado para cuidados intensivos con soporte para parámetros invasivos.',
    image: p7Img,
    specs: [
      'Pantalla táctil TFT LCD a color de 12.1 pulgadas',
      'Parámetros: ECG, SpO2, RESP, NIBP, PR, 2-TEMP, 2-IBP y Gasto Cardíaco (CO)',
      'Visualización de hasta 11 ondas simultáneamente en pantalla',
      'Representación avanzada de curvas, gráficos y tendencias históricas'
    ]
  },

  // 3. Desfibriladores
  {
    id: 'comen-s5',
    name: 'Monitor Desfibrilador COMEN S5',
    category: 'desfibriladores',
    brand: 'COMEN',
    description: 'Desfibrilador/monitor bifásico 4 en 1 con marcapasos y DEA para emergencias y reanimación hospitalaria.',
    image: p9Img,
    specs: [
      'Diseño funcional 4 en 1: Monitorización, Desfibrilación manual, DEA y Marcapasos',
      'Tecnología bifásica con dosificación de energía de 1J hasta 360J',
      'Marcapasos bajo demanda y marcapasos fijo para arritmias severas',
      'Módulo opcional de SpO2, NIBP y CO2 para monitoreo continuo'
    ]
  },
  {
    id: 'comen-s8',
    name: 'Monitor Desfibrilador COMEN S8',
    category: 'desfibriladores',
    brand: 'COMEN',
    description: 'Desfibrilador bifásico avanzado de reanimación hospitalaria con monitorización multiparamétrica de soporte crítico.',
    image: p10Img,
    specs: [
      'Funciones 4 en 1: ECG, SpO2, NIBP, TEMP, Desfibrilación manual, DEA y Marcapasos',
      'Rango de dosis de energía ajustable desde 1J hasta 360J',
      'Módulos de capnografía CO2 y presión invasiva IBP opcionales',
      'Impresora térmica de alta velocidad de 80mm integrada'
    ]
  },
  {
    id: 'mindray-d3',
    name: 'Desfibrilador MINDRAY BeneHeart D3',
    category: 'desfibriladores',
    brand: 'MINDRAY',
    description: 'Desfibrilador bifásico compacto con pantalla LCD de 7 pulgadas y diseño robusto para reanimación móvil.',
    image: p9Img,
    specs: [
      'Pantalla LCD a color de 7 pulgadas',
      'Desfibrilación manual, DEA, marcapasos y monitorización básica integrados',
      'Administración de descargas bifásicas hasta 360J',
      'Diseño compacto y asa ergonómica de fácil transporte'
    ]
  },

  // 4. Electrocardiógrafos y Holter
  {
    id: 'comen-h3',
    name: 'Electrocardiógrafo COMEN H3',
    category: 'electrocardiografos',
    brand: 'COMEN',
    description: 'Electrocardiógrafo interpretativo digital de 3 canales con pantalla táctil a color de 6.2 pulgadas.',
    image: p11Img,
    specs: [
      'Pantalla táctil LCD de 6.2 pulgadas con ajuste de brillo inteligente',
      'Formato de visualización de ondas de 12 derivaciones simultáneas',
      'Almacenamiento en tarjeta microSD de 8GB para 40.000 ECGs',
      'Exporta archivos en formatos PDF, DICOM, XML, JPG, BMP y DAT'
    ]
  },
  {
    id: 'comen-h12',
    name: 'Electrocardiógrafo COMEN H12',
    category: 'electrocardiografos',
    brand: 'COMEN',
    description: 'Electrocardiógrafo de alta gama de 12 canales con pantalla táctil de 10.4 pulgadas y red de datos HL7.',
    image: p12Img,
    specs: [
      'Pantalla táctil capacitiva a color de 10.4 pulgadas',
      'Registro interpretativo digital de 12 canales simultáneos',
      'Memoria interna para 10.000 exámenes en tarjeta de 8GB',
      'Soporta conexión a código de lector, mouse, teclado y servidores DICOM'
    ]
  },
  {
    id: 'biocare-ih-3-plus',
    name: 'Electrocardiógrafo Ambulatorio BIOCARE iH-3 Plus',
    category: 'electrocardiografos',
    brand: 'BIOCARE',
    description: 'Holter de EKG portátil de 3 canales diseñado para la monitorización ambulatoria cardíaca continua hasta por 72 horas.',
    image: p13Img,
    specs: [
      'Dispositivo digital de 24 bits con registro de 3 canales y 7 electrodos',
      'Grabación continua de trazos cardíacos de 24 a 72 horas',
      'Detección y análisis automático de arritmias y marcapasos',
      'Transferencia de datos por tarjeta SD o USB a software de análisis'
    ]
  },

  // 5. Cuidado Neonatal y Fetal
  {
    id: 'comen-c21',
    name: 'Monitor Fetal y Maternal COMEN C21',
    category: 'cuidado-neonatal',
    brand: 'COMEN',
    description: 'Monitor prenatal y maternal avanzado con pantalla de 12.1 pulgadas y ángulo de inclinación ajustable de 0-90°.',
    image: p14Img,
    specs: [
      'Pantalla táctil retroiluminada LED de 12.1 pulgadas inclinable de 0-90°',
      'Monitoreo fetal de un canal y signos vitales maternos (ECG, NIBP, SpO2, TEMP)',
      'Identificación automática de accesorios y transductores en cualquier puerto',
      'Permite exportar archivos en formato gráfico (BPM) para impresión en PC'
    ]
  },
  {
    id: 'comen-c22',
    name: 'Monitor Fetal y Maternal COMEN C22',
    category: 'cuidado-neonatal',
    brand: 'COMEN',
    description: 'Monitor fetal y maternal doble transductor de alta precisión para gestantes críticas y parto.',
    image: p15Img,
    specs: [
      'Pantalla táctil retroiluminada LED de 12.1 pulgadas con inclinación',
      'Monitoreo de frecuencia cardíaca de gemelos (doble FHR) y presión uterina TOCO',
      'Monitoreo continuo de signos vitales maternos integrados',
      'Soporte para conexión de impresoras externas por puerto USB'
    ]
  },
  {
    id: 'comen-b3',
    name: 'Incubadora Neonatal Cerrada COMEN B3',
    category: 'cuidado-neonatal',
    brand: 'COMEN',
    description: 'Incubadora neonatal de cuidado intensivo con servocontrol de humedad, Trendelenburg electrónico y cúpula insonorizada.',
    image: p16Img,
    specs: [
      'Pantalla táctil LED de 8 pulgadas para control de todas las funciones',
      'Sistema de inclinación Trendelenburg electrónico operado desde pantalla',
      'Monitoreo de oxígeno integrado y colchón difusor de presión',
      'Cúpula de doble pared con 2 puertas principales y 4 ventanas de acceso'
    ]
  },
  {
    id: 'biocare-fm-200',
    name: 'Detector de Latido Fetal BIOCARE FM-200',
    category: 'cuidado-neonatal',
    brand: 'BIOCARE',
    description: 'Detector portátil de latidos cardíacos fetales con sonda intercambiable a prueba de agua y pantalla LCD.',
    image: p17Img,
    specs: [
      'Diseño compacto y portátil con pantalla LCD con luz de fondo',
      'Algoritmo inteligente para detección y cálculo preciso de FHR',
      'Sonda a prueba de agua intercambiable con diferentes modos (tiempo real, promedio)',
      'Apagado automático integrado para optimización del consumo de batería'
    ]
  },
  {
    id: 'comen-bl70',
    name: 'Equipo de Fototerapia Infantil COMEN BL70',
    category: 'cuidado-neonatal',
    brand: 'COMEN',
    description: 'Unidad de fototerapia LED de alta intensidad para el tratamiento clínico de la ictericia neonatal con pantalla táctil.',
    image: p23Img,
    specs: [
      'Pantalla táctil color de 4.3 pulgadas de fácil operación',
      'Cinco niveles de ajuste de irradiancia clínica adaptable',
      'Fuente de luz fría LED de alta potencia y vida útil ultra prolongada',
      'Ventosas de fijación para acoplamiento seguro sobre incubadoras'
    ]
  },
  {
    id: 'disonmed-bn-100a',
    name: 'Calentador Radiante Infantil DISONMED BN-100A',
    category: 'cuidado-neonatal',
    brand: 'DISONMED',
    description: 'Cuna de calor radiante microprocesada con tubo infrarrojo de cuarzo y lámpara de examinación LED ajustable.',
    image: p24Img,
    specs: [
      'Sistema servocontrolado por microprocesador con tres modos: Precalentamiento, Manual y Automático',
      'Luz de examinación LED ajustable y desconexión térmica automática por seguridad',
      'Tubo de radiación infrarroja de cuarzo microcristal para calor uniforme',
      'Pantalla LED para visualización de temperatura de piel y seteada'
    ]
  },

  // 6. Soporte Vital y Quirófano
  {
    id: 'comen-ax-400',
    name: 'Máquina de Anestesia COMEN AX-400',
    category: 'soporte-vital',
    brand: 'COMEN',
    description: 'Estación de anestesia avanzada con pantalla táctil de 8.4 pulgadas y fuelle ascendente integrado para quirófanos de alta complejidad.',
    image: p18Img,
    specs: [
      'Pantalla de control táctil de 8.4 pulgadas con interfaz intuitiva',
      'Fuelle ascendente de 1500ml para uso en pacientes adultos, pediátricos y neonatales',
      'Diseño modular compatible con módulos opcionales de CO2, BIS y gases anestésicos',
      'Arranque rápido con autocomprobación y prueba automática de fugas'
    ]
  },
  {
    id: 'comen-v1',
    name: 'Ventilador de Transporte COMEN V1',
    category: 'soporte-vital',
    brand: 'COMEN',
    description: 'Ventilador de emergencia y traslado con turbina de aire integrada de alto rendimiento y batería de 4.6 horas.',
    image: p19Img,
    specs: [
      'Pantalla táctil a color de 8.4 pulgadas con software e interfaz en español',
      'Turbina de aire integrada y batería con autonomía de 4.6 horas de uso continuo',
      'Diseño compacto, liviano, resistente a golpes con protección contra líquidos IP24',
      'Modos ventilatorios avanzados para adultos, pediátricos y neonatales'
    ]
  },
  {
    id: 'comen-v3',
    name: 'Ventilador de UCI COMEN V3',
    category: 'soporte-vital',
    brand: 'COMEN',
    description: 'Ventilador de cuidados intensivos stationary con pantalla HD de 12 pulgadas y compensación automática de resistencia.',
    image: p20Img,
    specs: [
      'Pantalla a color táctil de alta definición de 12 pulgadas',
      'Turbina de aire integrada de alta fidelidad y válvulas de intercambio rápido',
      'Tecnología intelliSyn para disparo espiratorio automático y optimización',
      'Compensación automática de resistencia de tubo endotraqueal (ATRC)'
    ]
  },
  {
    id: 'comen-w3',
    name: 'Mesa de Operaciones Quirúrgica COMEN W3',
    category: 'soporte-vital',
    brand: 'COMEN',
    description: 'Mesa de cirugía modular de alta gama fabricada en acero inoxidable de grado quirúrgico con bloqueo automático de inactividad.',
    image: p21Img,
    specs: [
      'Construcción en acero inoxidable grado 304 de alta durabilidad y resistencia anticorrosiva',
      'Sistema de seguridad con bloqueo automático tras 60 segundos de inactividad',
      'Placas radiotransparentes de hexakis melamina para nítida filtración de rayos X (≤1 mmAL)',
      'Estructura modular ajustable para posturas anatómicas complejas en quirófano'
    ]
  },
  {
    id: 'comen-l5a',
    name: 'Lámpara Quirúrgica LED COMEN L5A',
    category: 'soporte-vital',
    brand: 'COMEN',
    description: 'Lámpara de cirugía LED de doble satélite con 130.000 lux por cúpula y pantallas de control táctil de 4.3 pulgadas.',
    image: p22Img,
    specs: [
      'Doble satélite con luminancia de 130.000 lux cada uno (30 LEDs por satélite)',
      'Pantalla táctil de 4.3 pulgadas en cada satélite para ajustes de intensidad',
      'Intensidad inteligente para ajustar el diámetro del campo quirúrgico',
      'Luz fría de alta duración con vida útil del panel de 70.000 horas'
    ]
  },

  // 7. Diagnóstico Menor y Succión
  {
    id: 'ywell-7e-c',
    name: 'Succionador Portátil YWELL 7E-C',
    category: 'diagnostico-menor',
    brand: 'YWELL',
    description: 'Aspirador de secreciones portátil de 15 LPM, silencioso y seguro para uso clínico y domiciliario.',
    image: p25Img,
    specs: [
      'Ideal para uso en clínicas, consultorios y servicios domiciliarios por su fácil transporte',
      'Poder de succión de 15 LPM con bajo nivel de ruido por debajo de 65 dB',
      'Botella de recolección plástica de 1.000 cc reusable y lavable',
      'Válvula interna de protección contra sobreflujo para evitar derrames accidentales'
    ]
  },
  {
    id: 'ywell-7a-23b',
    name: 'Succionador Quirúrgico YWELL 7A-23B',
    category: 'diagnostico-menor',
    brand: 'YWELL',
    description: 'Aspirador quirúrgico de fluidos de alto flujo (40 LPM) con dos botellas de 2.500cc y base móvil rodable.',
    image: p26Img,
    specs: [
      'Base rodable de transporte rápido ideal para consultorios, clínicas y quirófanos',
      'Gran poder de succión de 40 LPM con motor libre de aceite de bajo mantenimiento',
      'Dos botellas de recolección de vidrio de 2.500 cc de capacidad cada una',
      'Válvula de protección contra sobreflujo integrada para seguridad del motor'
    ]
  },

  // 8. Accesorios y Consumibles
  {
    id: 'cables-ecg-accesorios',
    name: 'Cables de Paciente EKG y Latiguillos',
    category: 'accesorios-consumibles',
    brand: 'COMEN / MINDRAY / EDAN',
    description: 'Cables troncales de ECG de alta calidad y latiguillos de conexión certificados para desfibriladores y monitores.',
    image: p27Img,
    specs: [
      'Cables de ECG de 12 pines con 5 leads y 3 leads (para COMEN, MINDRAY y monitores multiparámetro)',
      'Cables de paciente de 10 cables (latiguillos) para electrocardiógrafos COMEN H3/H12 y EDAN SE-1/SE-3',
      'Fijación robusta con blindaje especial para reducción de ruido electromagnético',
      'Terminales codificadas por colores bajo normativa internacional'
    ]
  },
  {
    id: 'papel-termico-ekg',
    name: 'Papel Termosensible para EKG y Desfibrilador',
    category: 'accesorios-consumibles',
    brand: 'COMEN / EDAN / MINDRAY',
    description: 'Rollos y carpetas de papel termosensible de grado médico de alta resolución para impresión de electrocardiogramas.',
    image: p28Img,
    specs: [
      'Papel de desfibrilador en rollo de 50mm x 20 metros para COMEN S5/S8',
      'Papel EKG de 3 canales en rollo de 80mm x 20 metros para electrocardiógrafos y desfibriladores',
      'Papel EKG de 12 canales en carpetas dobladas de 210mm x 20 metros para COMEN H12 y EDAN SE-12',
      'Impresión de cuadrícula milimétrica nítida para lectura precisa de trazos cardíacos'
    ]
  }
];
