/**
 * Datos del negocio en un solo lugar.
 * ⚠️ Los marcados con TODO son de ejemplo en Figma y deben confirmarse con el cliente.
 */
export const site = {
  name: 'Pulxxe',
  legalName: 'PULXXE S.A.S.',
  tagline: 'Planeamos, medimos, cumplimos',
  title: 'Pulxxe | Ingeniería y construcción en Barranquilla',
  description:
    'Obra civil, edificación y remodelación en Barranquilla con presupuesto por ítem y avance medido semana a semana. Cotiza tu proyecto con Pulxxe.',
  locale: 'es_CO',
  lang: 'es-CO',
  // TODO: confirmar con el cliente
  phone: '+57 300 123 4567',
  whatsapp: '573001234567',
  email: 'info@pulxxe.com',
  nit: '[por confirmar]',
  city: 'Barranquilla',
  region: 'Atlántico',
  country: 'CO',
  geo: { lat: 10.9685, lng: -74.7813 },
  serviceArea: ['Barranquilla', 'Soledad', 'Puerto Colombia', 'Malambo', 'Galapa'],
  social: {
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
    youtube: 'https://www.youtube.com/',
  },
  mapsUrl: 'https://maps.google.com/?q=Barranquilla,+Atl%C3%A1ntico',
} as const;

export const whatsappUrl = (text = 'Hola Pulxxe, quiero cotizar una obra.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Frentes de obra', href: '#frentes' },
] as const;
