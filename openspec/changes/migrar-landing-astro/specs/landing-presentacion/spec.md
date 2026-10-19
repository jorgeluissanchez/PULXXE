# Spec Delta

## Purpose
Define el contenido, la estructura visual y el comportamiento responsive de la landing de Pulxxe para que coincida con el diseño aprobado en Figma.

## ADDED Requirements

### Requirement: Fidelidad al diseño aprobado
La landing SHALL reproducir textos, colores, tipografías (Black Ops One para títulos y Manrope para textos), espaciados, imágenes y orden de secciones del diseño de Figma en los anchos de referencia de 1440 px (desktop) y 390 px (mobile).

#### Scenario: Comparación en desktop
- **WHEN** se abre la página a 1440 px de ancho
- **THEN** cada sección muestra los mismos textos, colores y disposición que el frame "Página / Desktop" de Figma

#### Scenario: Comparación en mobile
- **WHEN** se abre la página a 390 px de ancho
- **THEN** cada sección sigue la disposición de una columna del frame "Página / Mobile" de Figma

### Requirement: Diseño responsive sin desbordes
La página MUST adaptarse a cualquier ancho entre 320 px y 1920 px sin scroll horizontal ni texto cortado.

#### Scenario: Ancho intermedio
- **WHEN** se abre la página a 768 px o 1024 px
- **THEN** no aparece barra de scroll horizontal y todos los textos se leen completos

### Requirement: Header fijo con navegación a secciones
El header SHALL permanecer visible al hacer scroll y sus enlaces SHALL llevar a la sección correspondiente.

#### Scenario: Navegar a Proceso
- **WHEN** el usuario pulsa "Proceso" en el header
- **THEN** la página se desplaza hasta la sección del método sin quedar tapada por el header

### Requirement: Llamado a la acción de WhatsApp
La página SHALL mostrar un acceso fijo en la esquina inferior derecha con forma de triángulo e icono de WhatsApp que abre una conversación.

#### Scenario: Pulsar el triángulo
- **WHEN** el usuario pulsa el triángulo de la esquina
- **THEN** se abre el enlace `wa.me` del número configurado en una pestaña nueva

### Requirement: Obra en acción sin control de video
Los paneles de "Obra en acción" SHALL mostrar índice, título y descripción sin el control "Ver video", y el panel abierto SHALL usar solo un degradado inferior para el contraste del texto, sin oscurecer toda la foto.

#### Scenario: Panel abierto
- **WHEN** un panel está abierto
- **THEN** la parte superior de la foto se ve sin capa oscura y el título y la descripción se leen sobre un degradado inferior

### Requirement: Contenido sin datos inventados
Los datos de contacto y legales que el cliente no ha confirmado SHALL mostrarse tal como están en Figma y estar centralizados en un único archivo de configuración para reemplazarlos.

#### Scenario: Cambiar el teléfono
- **WHEN** se edita el teléfono en el archivo de configuración del sitio
- **THEN** cambia en el pie, en el CTA de WhatsApp y en los datos estructurados
