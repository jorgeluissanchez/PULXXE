# Spec Delta

## Purpose
Define las animaciones e interacciones de la landing ligadas al scroll, al puntero y al teclado, y cómo se degradan cuando el usuario pide menos movimiento.

## ADDED Requirements

### Requirement: Entradas al hacer scroll
Los titulares, textos e imágenes de cada sección SHALL aparecer con una transición suave cuando entran en el viewport.

#### Scenario: Llegar a una sección
- **WHEN** una sección entra en pantalla al hacer scroll
- **THEN** sus elementos aparecen escalonados en menos de 1 segundo

### Requirement: Encaje de Frentes de obra
Las tres tarjetas de "Frentes de obra" SHALL empezar desfasadas en vertical y alinearse entre sí de forma progresiva con el scroll.

#### Scenario: Recorrer la sección
- **WHEN** el usuario hace scroll a través de la sección en desktop
- **THEN** la tarjeta central sube hasta quedar alineada con las laterales, y al volver hacia arriba recupera el desfase

### Requirement: Sectores con columna sticky
En desktop, la sección "Sectores" SHALL quedar fija y centrada en el viewport mientras el scroll recorre los cuatro sectores, activando cada uno en orden y cambiando imagen, título y descripción.

#### Scenario: Recorrer sectores con scroll
- **WHEN** el usuario hace scroll dentro de la sección
- **THEN** la lista permanece centrada y el sector activo pasa de "Infraestructura" a "Empresas" en orden

#### Scenario: Elegir un sector con el puntero o el teclado
- **WHEN** el usuario pasa el puntero o enfoca con el teclado un sector
- **THEN** ese sector se activa y la vista de la izquierda muestra su contenido

### Requirement: Acordeón de Obra en acción
Los paneles de "Obra en acción" SHALL expandirse al pasar el puntero o al enfocarlos, mostrando título y descripción del panel activo.

#### Scenario: Hover sobre Edificación
- **WHEN** el puntero entra en el panel "Edificación"
- **THEN** ese panel se ensancha y los demás se reducen con una transición suave

### Requirement: Proceso por pasos
La sección de método SHALL activar cada paso al hacer hover, al enfocarlo o al avanzar el scroll, actualizando la imagen, el número grande y la etapa.

#### Scenario: Activar "Reportamos"
- **WHEN** el paso "Reportamos" se activa
- **THEN** la imagen muestra "04 / 05" y la etapa "REPORTAMOS"

### Requirement: Preguntas frecuentes accesibles
Cada pregunta SHALL abrirse y cerrarse con clic o teclado, mostrando su respuesta con una transición, y SHALL exponer su estado a lectores de pantalla.

#### Scenario: Abrir una pregunta con teclado
- **WHEN** el usuario enfoca una pregunta y pulsa Enter
- **THEN** la respuesta se despliega y el control indica que está expandido

### Requirement: Marquee de valores
La franja de valores SHALL desplazarse de forma continua y sin cortes.

#### Scenario: Franja visible
- **WHEN** la franja está en pantalla
- **THEN** el texto se desplaza horizontalmente en bucle infinito

### Requirement: Movimiento reducido
Cuando el sistema del usuario pide reducir el movimiento, las animaciones de scroll, marquee y pin MUST desactivarse y el contenido MUST mostrarse completo y estático.

#### Scenario: prefers-reduced-motion activo
- **WHEN** el navegador informa `prefers-reduced-motion: reduce`
- **THEN** todo el contenido es visible sin animaciones y las secciones no quedan fijadas
