# Spec Delta

## Purpose
Define los requisitos técnicos de SEO, rendimiento y accesibilidad para que la landing posicione en búsquedas locales de construcción en Barranquilla.

## ADDED Requirements

### Requirement: Metadatos de la página
La página SHALL publicar title, meta description, URL canónica, idioma `es-CO`, Open Graph y Twitter Card con imagen de 1200×630.

#### Scenario: Compartir en redes
- **WHEN** se pega la URL en WhatsApp o LinkedIn
- **THEN** aparece la tarjeta con título, descripción e imagen de Pulxxe

### Requirement: Jerarquía semántica
La página MUST tener un único H1, un H2 por sección y landmarks `header`, `main`, `nav` y `footer`.

#### Scenario: Revisar el esquema de títulos
- **WHEN** se analiza el HTML generado
- **THEN** hay exactamente un `h1` y ningún nivel de título se salta

### Requirement: Datos estructurados
La página SHALL incluir JSON-LD de tipo `GeneralContractor` con área de servicio Barranquilla y Atlántico, y de tipo `FAQPage` con las preguntas visibles.

#### Scenario: Validar datos estructurados
- **WHEN** se pasa la URL por el validador de schema.org
- **THEN** ambos bloques se reconocen sin errores

### Requirement: Rastreo
El sitio SHALL publicar `sitemap-index.xml` y `robots.txt` que apunte al sitemap.

#### Scenario: Pedir robots.txt
- **WHEN** se solicita `/robots.txt`
- **THEN** responde 200 e incluye la línea `Sitemap:`

### Requirement: Rendimiento y accesibilidad
La página SHALL obtener 90 o más en Performance, Accessibility, Best Practices y SEO de Lighthouse en mobile, con imágenes en formatos modernos, dimensiones explícitas, carga diferida fuera del primer pantallazo y textos alternativos descriptivos.

#### Scenario: Auditoría Lighthouse
- **WHEN** se ejecuta Lighthouse en modo mobile sobre la URL publicada
- **THEN** las cuatro categorías marcan 90 o más
