# Pueblos originarios de Santa Fe — juegos de estudio

App web de una sola página para repasar el tema de **Ciencias Sociales**
"Pueblos originarios de Santa Fe". Todo el contenido sale del resumen
`pueblos_originarios_de_santa_fe.md` (no se agregó información de otras fuentes).

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

## Los juegos

| Juego | Qué practica |
|---|---|
| 🧠 **Trivia contrarreloj** | 10 preguntas al azar de un banco de 57. Reloj de 20 s, racha con multiplicador y explicación después de cada respuesta. |
| 🕰️ **Línea de tiempo** | 3 rondas: hay que tocar los hechos del más antiguo al más nuevo (nómades → sedentarios → Solís 1516 → fundación 1573 → traslado 1649; y 1993 → 2005 → 2020 → hoy). La fecha se revela al acertar. |
| 🔗 **Unir con flechas** | 4 rondas al azar de 6 (dónde vivía cada pueblo, palabras clave, fechas, pueblos de hoy, casas y caciques, números). Cada par resuelto queda con su propio **color y número**. |
| 🃏 **Flashcards** | 30 tarjetas con volteo 3D, en 5 mazos. Se pueden marcar como "ya la sé" y queda guardado. |
| ⚡ **Cazador de Pueblos** | Arcade: caen tarjetas y hay que tirarlas al balde Guaycurú / Chaná-Timbú / Guaraníes. 3 vidas, combos y reloj de 9 s. |
| 🥾 **¿Nómade o sedentario?** | Mismo arcade, con dos baldes: Nómades / Sedentarios. |

Además hay un **Resumen para leer** con la ficha de datos, el texto por secciones
y el cuadro de los tres pueblos.

## Estrellas, XP y niveles

- Cada juego con puntaje da **hasta 3 estrellas** según el porcentaje de aciertos
  (90 % → 3, 70 % → 2, 50 % → 1). Se guarda la mejor.
- Cada partida suma **XP** (y las flashcards marcadas como sabidas, 5 XP cada una).
- El XP hace subir de **nivel**: Aprendiz → Explorador → Rastreador → Navegante del
  Paraná → Guardián de la historia → Sabio de los pueblos → Gran cacique del saber.
  Al subir aparece un cartel con confeti.

## Detalles

- **Progreso guardado** en el navegador (`localStorage`). El tacho de basura de
  arriba a la derecha lo borra todo.
- **Sonido** sintetizado con Web Audio (sin archivos mp3). Se silencia con el
  botón del parlante.
- **Feedback**: confeti y destello verde al acertar; marco rojo suave, vibración
  y explicación al errar. Los mensajes son siempre de refuerzo positivo.
- **Responsive** mobile-first; pensado para jugar en celular.

## Archivos

```
index.html   Estructura + componentes de React (JSX inline, así funciona con file://)
styles.css   Tema visual, animaciones, tarjeta con volteo 3D, línea de tiempo, drag & drop
app.js       Datos del resumen (trivia, línea de tiempo, pares, flashcards, baldes) + utilidades
```

Para agregar o corregir contenido, todo el material está en `app.js`:
`TRIVIA`, `TIMELINE_ROUNDS`, `MATCH_ROUNDS`, `FLASHCARDS`, `CLASSIFY_GAMES`,
`FICHA`, `RESUMEN` y `PUEBLOS_TABLA`.
