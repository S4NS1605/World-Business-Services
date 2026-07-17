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

export const defaultProducts = [];
