# Estudio Santi — juegos de estudio

App web de una sola página para repasar dos materias:

- **Ciencias Sociales** · "Pueblos originarios de Santa Fe" y "Recursos naturales". El contenido
  sale del resumen `pueblos_originarios_de_santa_fe.md` y de la fotocopia
  `recursos-naturales.jpg` (al arcade de recursos se le sumaron ejemplos de
  cosas hechas por el hombre: auto, casa, lápiz…).
- **Lengua** · textos humorísticos, verbos, sustantivos, género y número, y
  adjetivos. El contenido sale de `apuntes_de_lengua.md`; para que los juegos
  tengan material se sumaron algunos ejemplos más de los mismos conceptos
  (otros verbos conjugados, sustantivos abstractos/concretos y adjetivos).

Al abrir la app se elige la materia. Desde la barra de arriba se puede pasar
de una a otra en cualquier momento. Cada materia guarda su propio progreso
(estrellas, XP, nivel y flashcards sabidas).

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
| 🧠 **Trivia contrarreloj** | 10 preguntas al azar de un banco de 68. Reloj de 20 s, racha con multiplicador y explicación después de cada respuesta. |
| 🕰️ **Línea de tiempo** | 3 rondas: hay que tocar los hechos del más antiguo al más nuevo (nómades → sedentarios → Solís 1516 → fundación 1573 → traslado 1649; y 1993 → 2005 → 2020 → hoy). La fecha se revela al acertar. |
| 🔗 **Unir con flechas** | 4 rondas al azar de 7 (dónde vivía cada pueblo, palabras clave, fechas, pueblos de hoy, casas y caciques, números, recursos naturales). Cada par resuelto queda con su propio **color y número**. |
| 🃏 **Flashcards** | 36 tarjetas con volteo 3D, en 6 mazos. Se pueden marcar como "ya la sé" y queda guardado. |
| ⚡ **Cazador de Pueblos** | Arcade: caen tarjetas y hay que tirarlas al balde Guaycurú / Chaná-Timbú / Guaraníes. 3 vidas, combos y reloj de 9 s. |
| 🥾 **¿Nómade o sedentario?** | Mismo arcade, con dos baldes: Nómades / Sedentarios. |
| 🍃 **¿Es un recurso natural?** | Mismo arcade: Recurso natural / Lo hizo el hombre. |

En **Lengua** están la Trivia (49 preguntas), Unir con flechas (8 rondas),
Flashcards (25), **Pasado, presente y futuro** (ordenar la misma oración en los
tres tiempos) y tres arcades: **Cazador de adjetivos** (calificativo /
gentilicio / numeral / ordinal), **¿Abstracto o concreto?** y **¿Pasado,
presente o futuro?**.

🔎 **Detective de palabras** (Lengua): aparece una oración con una palabra
marcada. Primero hay que decir si es sustantivo, verbo o adjetivo, y después
contestar dos pistas más sobre esa palabra:

- **Sustantivo:** común o propio, abstracto o concreto, individual o colectivo,
  contable o no contable, género y número.
- **Verbo:** tiempo verbal (pasado, presente o futuro) y su raíz, su desinencia
  o cómo se separa en raíz | desinencia.
- **Adjetivo:** tipo (calificativo, gentilicio, numeral u ordinal) y a qué
  sustantivo acompaña.

Cada partida tiene 6 palabras (2 de cada clase) elegidas al azar de un banco de
81 oraciones, o sea 18 preguntas. Las preguntas se arman solas en `lengua.js`
(sección *Detective de palabras*): para sumar ejemplos alcanza con agregar una
línea a `D_SUSTANTIVOS`, `D_VERBOS` o `D_ADJETIVOS`.

En las dos materias hay un **Resumen para leer** con la ficha de datos, el texto por secciones
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
  arriba a la derecha borra el progreso de la materia que estás viendo.
- **Sonido con [Howler.js](https://howlerjs.com/)**: música de fondo (ondas alfa, en
  bucle) y efectos en cada click, al acertar, al errar, al volver atrás, al dar
  vuelta una tarjeta, al agarrar una ficha y al subir de nivel. El botón del
  parlante abre un menú para silenciar **la música** y **los efectos** por separado
  (queda guardado). La música arranca con el primer toque (los navegadores no
  dejan reproducir audio antes) y se pausa si la app pasa a segundo plano.
- **Instalable en Android**: desde Chrome, menú ⋮ → *Agregar a la pantalla
  principal* / *Instalar app*. Usa `estudio.png` como ícono y se abre a pantalla
  completa, como una app.
- **Feedback**: confeti y destello verde al acertar; marco rojo suave, vibración
  y explicación al errar. Los mensajes son siempre de refuerzo positivo.
- **Responsive** mobile-first; pensado para jugar en celular.

## Archivos

```
index.html   Estructura + componentes de React (JSX inline, así funciona con file://)
styles.css   Tema visual, animaciones, tarjeta con volteo 3D, línea de tiempo, drag & drop
app.js       Utilidades + datos de Ciencias Sociales (trivia, línea de tiempo, pares, flashcards, baldes)
lengua.js    Datos de Lengua, con la misma forma
audio/       musica.mp3 (20 min recortados del original, 96 kbps) y efectos.mp3 (todos los efectos)
icons/       Íconos de la app hechos con estudio.png (normales y "maskable" para Android)
manifest.webmanifest, sw.js   Lo que hace falta para instalarla en el celular
```

> El archivo original de la música pesa 1 GB (12 horas), así que no se sube a
> GitHub (está en `.gitignore`). La app usa el recorte de `audio/musica.mp3`.

Para agregar o corregir contenido: Sociales está en `app.js` y Lengua en `lengua.js`
(`TRIVIA`, `TIMELINE_ROUNDS`, `MATCH_ROUNDS`, `FLASHCARDS`, `CLASSIFY_GAMES`, `FICHA`,
`RESUMEN` y la tabla del resumen). Cada materia se arma al final de su archivo.
