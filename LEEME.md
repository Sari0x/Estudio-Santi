# Santa Fe y la Argentina — juegos de estudio

App web de una sola página para repasar el material de **Ciencias Sociales 4.°**,
"Santa Fe y la Argentina" (páginas 9 a 14 del PDF).

## Cómo abrirla

**Doble clic en `index.html`.** Se abre en el navegador y listo.

> La primera vez necesita internet, porque React, Tailwind y los íconos se cargan
> desde CDN. Una vez cargada, jugar no consume nada más.

Si preferís servirla en local (por ejemplo para probarla desde el celular en la
misma red WiFi), con Node instalado:

```
cd "C:\Users\manue\OneDrive\Desktop\Estudio-Santi"
npx serve .
```

…y abrís la dirección que te muestre.

## Los 5 juegos

| Juego | Qué practica |
|---|---|
| 🧠 **Trivia contrarreloj** | 10 preguntas al azar de un banco de 46. Reloj de 20 s, racha con multiplicador y explicación después de cada respuesta. |
| 🗺️ **Mapa de Santa Fe** | Mapa real del norte y centro del país (19 jurisdicciones). Límites por rumbo, regiones Litoral y Centro, la capital y Rosario. Hay desafíos de una sola respuesta y de varias. |
| 🔗 **Unir con flechas** | 4 rondas al azar de 6. Se arrastra desde el punto del concepto hasta su definición (o se toca uno y después el otro). Cada par resuelto queda con su propio **color y número** en las dos fichas, y la flecha se dibuja por encima con halo blanco, así se lee incluso cuando varias se cruzan. |
| 🃏 **Flashcards** | 26 tarjetas con volteo 3D, agrupadas en 5 mazos. Se pueden marcar como "ya la sé" y queda guardado. |
| ⚡ **Cazador de Poderes** | Arcade: caen funciones, autoridades y sedes, y hay que tirarlas al balde Ejecutivo / Legislativo / Judicial. 3 vidas, combos y reloj de 9 s por tarjeta. |

Además hay un **Resumen para leer** con la ficha de datos, el texto por secciones
y los dos cuadros de los tres poderes.

## Detalles

- **Progreso guardado** en el navegador (`localStorage`): estrellas por juego, XP
  y tarjetas marcadas. El tacho de basura de arriba a la derecha lo borra todo.
- **Sonido** sintetizado con Web Audio (sin archivos mp3). Se silencia con el
  botón del parlante.
- **Feedback**: confeti y destello verde al acertar; marco rojo suave, vibración
  y explicación al errar. Los mensajes son siempre de refuerzo positivo.
- **Responsive** mobile-first; pensado para jugar en celular.

## Archivos

```
index.html   Estructura + componentes de React (JSX inline, así funciona con file://)
styles.css   Tema visual, animaciones, tarjeta con volteo 3D, mapa, drag & drop
app.js       Datos extraídos del PDF (trivia, pares, flashcards, mapa) + utilidades
```

Para agregar o corregir contenido, todo el material está en `app.js`:
`TRIVIA`, `MATCH_ROUNDS`, `FLASHCARDS`, `CLASSIFY_ITEMS`, `MAP.challenges` y `FICHA`.

## Sobre el mapa

Las siluetas de las provincias son geometría real: provienen de
[Natural Earth](https://www.naturalearthdata.com/) (admin-1, escala 1:10 m,
dominio público), proyectadas en Mercator y simplificadas con Douglas–Peucker.
El cauce del río Paraná sale del mismo dataset. Las coordenadas de la ciudad de
Santa Fe y de Rosario son las reales.

El mapa recorta el norte y el centro del país (quedan afuera las cinco provincias
patagónicas) para que Santa Fe y sus vecinas tengan buen tamaño en pantalla de
celular; las 19 jurisdicciones que se muestran están completas.
