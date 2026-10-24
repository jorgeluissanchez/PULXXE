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
  // TODO: dirección de la oficina (se añade al schema solo si se llena). Ej.: 'Cra. 53 # 82-86, Of. 401'
  streetAddress: '',
  postalCode: '',
  // TODO: horario real. Ej.: [{ days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '17:00' }]
  openingHours: [] as { days: string[]; opens: string; closes: string }[],
  /**
   * Medición. Se activa solo si el valor no está vacío.
   * - gtmId: ID del contenedor de Google Tag Manager, formato 'GTM-XXXXXXX'. Google Analytics 4 se configura
   *   dentro de GTM (etiqueta "Etiqueta de Google" con el ID G-… y activador "Initialization - All Pages").
   * - searchConsole: solo el código de la etiqueta HTML de verificación de Search Console
   *   (<meta name="google-site-verification" content="ESTE_CÓDIGO">). No hace falta si verificas por DNS.
   * - bing: código de Bing Webmaster Tools (<meta name="msvalidate.01" content="...">), opcional.
   */
  analytics: {
    gtmId: 'GTM-5DHZCLVW',
    searchConsole: '',
    bing: '8A16D4A25EF52BC6D4E95EB59B2CDA67',
  },
} as const;

export const whatsappUrl = (text = 'Hola, Pulxxe. Vi su página web y quiero cotizar una obra.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Mensajes de WhatsApp de cada botón, escritos como los escribiría un cliente. */
export const waMsg = {
  presupuesto: 'Hola, Pulxxe. Quiero pedir un presupuesto para una obra en Barranquilla. ¿Qué información necesitan para cotizarme?',
  asesoria: 'Hola, Pulxxe. Tengo un proyecto en mente y me gustaría recibir asesoría. ¿Podemos hablar?',
  ejecutamos: 'Hola, Pulxxe. Quiero conocer qué tipo de obras ejecutan y ver algunos proyectos que hayan hecho.',
  edificacion: 'Hola, Pulxxe. Me interesa su servicio de edificación y remodelación. ¿Me pueden dar más información y una cotización?',
  obraCivil: 'Hola, Pulxxe. Necesito información sobre su servicio de obra civil (vías, drenajes y redes) para un proyecto.',
  frente: (title: string) => `Hola, Pulxxe. Me interesa el frente de ${title.toLowerCase()}. ¿Me pueden dar más información y una cotización?`,
  cierre: 'Hola, Pulxxe. Quiero construir o remodelar en Barranquilla y me gustaría una asesoría y un presupuesto por ítems.',
};

export const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Frentes de obra', href: '#frentes' },
] as const;
