/**
 * Textos e imágenes de la landing, tal como están en Figma ("Página / Desktop").
 * Los organismos solo reciben estos datos; aquí se edita el contenido.
 */
import heroCasa from '@/assets/img/hero-casa.webp';
import equipo from '@/assets/img/equipo-ingenieros.webp';
import franjas from '@/assets/img/servicios-franjas.webp';
import planos from '@/assets/img/planos-documentos.webp';
import ejecutamos from '@/assets/img/proceso-ejecutamos.webp';
import medimos from '@/assets/img/proceso-medimos.webp';
import entregamos from '@/assets/img/proceso-entregamos.webp';
import obraCivil from '@/assets/img/obra-civil.webp';
import obraEdificacion from '@/assets/img/obra-edificacion.webp';
import obraRemodelacion from '@/assets/img/obra-remodelacion.webp';
import frentePavimento from '@/assets/img/frente-pavimento.webp';
import frenteEdificacion from '@/assets/img/frente-edificacion.webp';
import frenteRemodelacion from '@/assets/img/frente-remodelacion.webp';
import sala from '@/assets/img/resultado-sala.webp';
import cocina from '@/assets/img/resultado-cocina.webp';
import bano from '@/assets/img/resultado-bano.webp';
import secInfra from '@/assets/img/sector-infraestructura.webp';
import secVivienda from '@/assets/img/sector-vivienda.webp';
import secHogares from '@/assets/img/sector-hogares.webp';
import secEmpresas from '@/assets/img/sector-empresas.webp';
import banner from '@/assets/img/banner-obra-atardecer.webp';

export const hero = {
  brandWord: 'PULXXE',
  kicker: 'Construcción y remodelación en Barranquilla',
  titleLines: ['Planeamos.', 'Medimos.', 'Cumplimos.'],
  description:
    'Obra civil, edificación y remodelación en Barranquilla y el Caribe, con cantidades, costos y avance medidos en cada corte.',
  primary: { label: 'Solicita tu presupuesto', href: '#contacto' },
  secondary: { label: 'Ver qué ejecutamos', href: '#frentes' },
  image: { src: heroCasa, alt: 'Casa moderna de dos pisos en piedra clara, con jardín de cactus e iluminación cálida al atardecer' },
};

export const purpose = {
  kicker: 'Nuestro propósito',
  titleLines: ['Una obra no', 'debería depender', 'de la suerte.'],
  statement:
    'Administramos y ejecutamos obras civiles para empresas privadas, entidades públicas y personas naturales, con control permanente de las cantidades, los costos y el avance de cada proyecto.',
  company: {
    label: 'La empresa',
    text: 'Somos una empresa de ingeniería y construcción con sede en Barranquilla. Nuestro nombre viene de pulso: medimos de forma permanente cantidades, costos y avance para decidir con datos y mantenerte informado.',
  },
  photo: { src: equipo, alt: 'Dos ingenieros con casco y chaleco revisan en una tableta el avance de una obra', caption: 'Equipo Pulxxe en obra' },
  vision: {
    year: '2035',
    label: 'Visión',
    text: 'Ser reconocidos en la región Caribe por el control técnico y el cumplimiento de cada obra, con una operación capaz de ejecutar varios proyectos a la vez.',
  },
  stats: [
    { label: 'Experiencia', value: '+10', detail: 'Años del equipo y aliados en vías, redes, edificación y remodelación.', tone: 'navy' as const },
    { label: 'Presupuesto por ítem', value: '100%', detail: 'Ninguna obra arranca sin alcance, presupuesto y programación.', tone: 'yellow' as const },
    { label: 'Líneas de servicio', value: '2', detail: 'Obra civil · Edificación y remodelación.', tone: 'navy' as const },
    { label: 'Respuesta', value: '1 día', detail: 'El mismo día hábil, en lenguaje sencillo.', tone: 'navy' as const },
    { label: 'Escala', value: '1:1', detail: 'Obra real, medida en sitio en cada corte.', tone: 'navy' as const },
  ],
  meta: [
    { label: 'Sede', value: 'Barranquilla, Atlántico' },
    { label: 'Cobertura', value: 'Área Metropolitana y Caribe' },
    { label: 'Revisión', value: 'En cada corte de obra' },
  ],
};

export const services = {
  kicker: 'Las ideas toman forma',
  titleLines: ['Construcción y remodelación', 'en Barranquilla.'],
  lead: ['Tienes una idea, un plano o un espacio por transformar.', 'Nosotros lo llevamos a obra, sin improvisar.'],
  image: { src: franjas, alt: 'Edificio blanco de tres pisos con piscina, visto en franjas verticales con acentos amarillos' },
  lines: [
    {
      line: 'Línea 1  ·  Obra civil',
      title: 'La infraestructura que nadie ve, pero todos usan.',
      text: 'Vías, drenajes y redes que tienen que funcionar desde el primer día. Ejecutamos tu frente con cantidades medidas y listas para tus actas.',
      scope: 'Pavimento rígido · Drenaje y canalización · Estructuras de concreto · Alcantarillado y pluvial · Espacio público',
      audience: 'Para contratistas, entidades y empresas',
    },
    {
      line: 'Línea 2  ·  Edificación y remodelación',
      title: 'Del concreto a la llave en la mano.',
      text: 'Levantamos la estructura y terminamos cada espacio para que esté listo para habitar u operar en la fecha acordada.',
      scope: 'Obra negra · Obra gris · Obra blanca · Remodelación de casas, apartamentos, locales y oficinas',
      audience: 'Para constructoras, hogares y comercio',
    },
  ],
};

export const process = {
  kicker: 'Nuestro método',
  title: 'Presupuesto por ítem, avance medido.',
  intro:
    'Un método que integra planificación, ejecución y seguimiento. Pagas por hitos contra avance medido y sabes en todo momento en qué punto está tu obra.',
  coords: ['10.9685° N', '74.7813° W'],
  place: ['Barranquilla', 'Atlántico'],
  initial: 2,
  steps: [
    { n: '01', name: 'Definimos', text: 'Ninguna obra arranca sin alcance, presupuesto por ítems y programación.', detail: 'Alcance / Presupuesto / Programación', image: planos, alt: 'Ingeniero dibuja a mano el plano de una fachada sobre una mesa de madera' },
    { n: '02', name: 'Ejecutamos', text: 'Equipo afiliado y con elementos de protección. Revisamos cada actividad antes de cubrirla.', detail: 'Equipo / Seguridad / Revisión', image: ejecutamos, alt: 'Obrero con casco y chaleco corta varilla con pulidora en una obra' },
    { n: '03', name: 'Medimos', text: 'Cantidades, costos y avance en cada corte, para decidir con datos.', detail: 'Cantidades / Costos / Avance', image: medimos, alt: 'Flexómetro metálico con la cinta amarilla extendida' },
    { n: '04', name: 'Reportamos', text: 'Reportes periódicos con fotos. Si hay un problema, lo sabes primero por nosotros.', detail: 'Fotos / Avance / Alertas', image: equipo, alt: 'Dos ingenieros revisan el reporte de avance en una tableta dentro de la obra' },
    { n: '05', name: 'Entregamos', text: 'Lo que no cumple la especificación se corrige antes de entregar. Y te acompañamos después.', detail: 'Calidad / Corrección / Acompañamiento', image: entregamos, alt: 'Maqueta de casa con llaves sobre una mesa, símbolo de entrega' },
  ],
};

export const workInAction = {
  kicker: 'Pulxxe en acción',
  titleLines: ['El trabajo', 'habla.'],
  intro: ['Cada frente tiene una historia.', 'Mira cómo la construimos.'],
  panels: [
    { index: '01 / Obra civil', title: 'Obra civil', text: 'Pavimento rígido, drenaje y canalización, estructuras de concreto, redes de alcantarillado y pluvial, y espacio público.', foot: 'Línea 1 · Frentes de obra civil.', image: obraCivil, alt: 'Fresadora CAT trabajando en el pavimento de una calle residencial' },
    { index: '02 / Edificación', title: 'Edificación', text: 'Obra negra, gris y blanca: de la estructura en concreto reforzado a los acabados.', foot: 'Línea 2 · Frentes de edificación.', image: obraEdificacion, alt: 'Cuadrilla armando el acero de refuerzo de una losa junto a una grúa torre' },
    { index: '03 / Remodelación', title: 'Remodelación', text: 'Apartamentos, casas, locales, oficinas y consultorios, listos para habitar u operar en la fecha acordada.', foot: 'Línea 2 · Remodelación residencial y comercial.', image: obraRemodelacion, alt: 'Fachada ornamentada de un edificio antiguo restaurado' },
  ],
};

export const fronts = {
  kicker: 'Lo que ejecutamos',
  titleLines: ['Frentes de obra', 'que dominamos.'],
  intro:
    'Nuestro equipo y aliados suman más de 10 años en infraestructura vial, redes de acueducto y alcantarillado, drenaje, espacio público, edificación y remodelaciones.',
  items: [
    { n: '01', title: 'Pavimento rígido y drenaje', meta: 'Línea 1 · Obra civil', image: frentePavimento, alt: 'Dos obreros vibran el concreto de una placa con malla de acero' },
    { n: '02', title: 'Obra negra, gris y blanca', meta: 'Línea 2 · Edificación', image: frenteEdificacion, alt: 'Obreros con casco naranja preparan varillas sobre una losa en construcción' },
    { n: '03', title: 'Remodelación residencial y comercial', meta: 'Línea 2 · Remodelación', image: frenteRemodelacion, alt: 'Manos instalando enchape blanco sobre pegante en una pared' },
  ],
};

export const results = {
  kicker: 'El resultado',
  titleLines: ['Así se ve cuando', 'nada queda al azar.'],
  text: 'Pisos, cocina, baños y divisiones listos antes de la mudanza. Supiste cuánto ibas a invertir, viste cómo avanzaba y sabías cuándo terminaba.',
  closing: 'Lo único que queda es habitarlo.',
  main: { src: sala, alt: 'Sala remodelada con sofá claro, techo en concreto y ventanales al jardín', tag: 'Sala · Remodelación completa' },
  side: [
    { src: cocina, alt: 'Cocina remodelada con muebles de madera clara y mesón blanco', tag: 'Cocina · Obra blanca' },
    { src: bano, alt: 'Baño remodelado con enchape gris, tina y mueble flotante', tag: 'Baño · Enchapes y aparatos' },
  ],
};

export const sectors = {
  kicker: 'Sectores',
  titleLines: ['Experiencia que', 'se adapta a', 'cada contexto.'],
  intro: 'Acompañamos a empresas privadas, entidades públicas y personas naturales. Cambia la escala; el control es el mismo.',
  items: [
    { name: 'Infraestructura urbana y servicios públicos', text: 'Vías, drenaje, redes y espacio público, como aliados técnicos de los contratistas.', image: secInfra, alt: 'Cuadrilla rompiendo pavimento en una calle de ciudad con conos de seguridad' },
    { name: 'Vivienda nueva', text: 'Constructoras que necesitan frentes de obra y propietarios de proyectos recién entregados.', image: secVivienda, alt: 'Casa nueva de dos pisos con fachada blanca y madera al anochecer' },
    { name: 'Hogares y comercio local', text: 'Propietarios y pequeños negocios que remodelan, amplían o adecúan sus espacios.', image: secHogares, alt: 'Sala y comedor de una casa con piso de madera recién remodelada' },
    { name: 'Empresas privadas', text: 'Universidades, industria, zonas francas, servicios públicos, comercio y sector portuario.', image: secEmpresas, alt: 'Recepción corporativa con mesón de mármol y paneles de madera' },
  ],
};

export const monitoring = {
  kicker: 'Reporte semanal de obra',
  titleLines: ['Lo que se mide,', 'se puede controlar.'],
  text: 'Sabes cuánto inviertes, ves cómo avanza y cuándo termina. En todos nuestros servicios medimos cantidades, costos y avance, y te entregamos reportes periódicos con fotos.',
  benefits: [
    'Presupuesto por ítems antes de empezar',
    'Cantidades medidas en cada corte',
    'Reportes de avance con fotos',
    'Pagos por hitos contra avance medido',
  ],
  photo: { src: equipo, alt: 'Ingenieros revisando el avance de obra en una tableta' },
  board: {
    title: 'Avance de obra',
    project: 'Reporte de ejemplo',
    value: '78%',
    period: 'Semana 32 de 40',
    progress: 78,
    metrics: [
      { label: 'Área ejecutada', value: '4.850 m²' },
      { label: 'Costo acumulado', value: '$2.480 M' },
      { label: 'Desviación', value: '−1,8 %' },
    ],
    fronts: [
      { label: 'Obra negra', value: 100 },
      { label: 'Obra gris', value: 70 },
      { label: 'Obra blanca', value: 40 },
      { label: 'Instalaciones', value: 30 },
    ],
    note: 'Ejemplo ilustrativo del reporte que recibe cada cliente.',
  },
  stamp: ['Medido', 'En cada corte'],
  values: ['Centrados en las personas', 'Transparencia y cumplimiento', 'Planificación y control', 'Calidad y mejora continua', 'Vocación de servicio'],
};

export const faq = {
  kicker: 'Preguntas frecuentes',
  titleLines: ['Lo que nos', 'preguntan antes', 'de empezar.'],
  backing: {
    title: 'Respaldo en cada contrato',
    tag: 'Documentos al día',
    image: planos,
    alt: 'Plano arquitectónico y regla de escala sobre una mesa',
    items: [
      'Equipo con seguridad social y SG-SST al día',
      'Pólizas por contrato',
      'Eléctricas y gas con personal certificado',
      'Pagos por hitos contra avance medido',
      'Carpeta de proveedor completa',
    ],
  },
  items: [
    { q: '¿Sale más caro que un maestro de obra?', a: 'No, si comparas lo mismo. El precio incluye ingeniero responsable, presupuesto por ítem que conoces antes de empezar, seguridad social del equipo y reporte de avance con fotos. Pagas por certeza, no solo por mano de obra.' },
    { q: '¿Cómo sé cuánto costará mi obra?', a: 'Antes de empezar te entregamos un presupuesto por ítem: cada partida con su cantidad y su precio, de la demolición a los acabados. Así comparas cotizaciones con el mismo detalle y sabes en qué se va cada peso.' },
    { q: '¿Cómo se paga la obra?', a: 'Pagas lo ejecutado: por hitos, contra avance medido y reportado con fotos. En obra pública trabajamos con anticipo y cortes por actas, con cantidades listas para tus actas.' },
    { q: '¿Necesito licencia para remodelar en Barranquilla?', a: 'Depende de la obra. Cambiar pisos, enchapes, cielorrasos, pintura o redes es reparación locativa y no requiere licencia. Ampliar, levantar un segundo piso o tocar la estructura sí la requiere ante una curaduría urbana. Te decimos qué aplica antes de cotizar.' },
    { q: '¿Hacen diseño arquitectónico o estructural?', a: 'No. Ejecutamos y controlamos la obra a partir de tus planos y especificaciones. Las instalaciones eléctricas y de gas las hace personal certificado.' },
    { q: 'Son una empresa nueva, ¿quién los respalda?', a: 'Nuestro equipo y aliados suman más de 10 años en obra civil, edificación y remodelación. Te mostramos trabajos anteriores y un reporte de avance de ejemplo antes de firmar.' },
    { q: 'Soy contratista de obra pública, ¿cómo empezamos?', a: 'Con un frente de prueba: cantidades medidas y listas para tus actas, y equipo propio para pavimento rígido. Si no estamos en tu registro de proveedores, entregamos la carpeta completa con documentos y SG-SST al día.' },
  ],
};

export const closing = {
  titleLines: ['Construyamos', 'lo que sigue.'],
  text: 'Cuéntanos qué quieres construir en Barranquilla. Te enviamos un presupuesto por ítems y un plan de obra claro, sin letra pequeña.',
  cta: { label: 'Solicita tu presupuesto' },
  coords: ['10.9685° N  74.7813° W', 'Barranquilla · Atlántico'],
  image: { src: banner, alt: 'Edificios en construcción con grúas torre al atardecer' },
};

export const footer = {
  columns: [
    { title: 'Servicios', links: [{ label: 'Obra civil', href: '#servicios' }, { label: 'Edificación', href: '#servicios' }, { label: 'Remodelación', href: '#servicios' }] },
    { title: 'Pulxxe', links: [{ label: 'Nuestro método', href: '#proceso' }, { label: 'Frentes de obra', href: '#frentes' }, { label: 'Preguntas frecuentes', href: '#preguntas' }] },
  ],
};
