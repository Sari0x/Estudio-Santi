# Estudio Santi — juegos de estudio

App web de una sola página para repasar tres materias:

- **Ciencias Sociales** · "Santa Fe, de la Colonia a la Independencia": quién mandaba,
  la sociedad colonial (pirámide), el circuito comercial, la ciudad, los pueblos
  originarios (encomienda y reducción), la revolución, la autonomía, la Liga de los
  Pueblos Libres y los dos congresos. El contenido sale de los resúmenes de clase
  (hojas 1 a 9) y de la hoja con las fechas para saber de memoria.
- **Lengua** · publicidad y propaganda, la historieta, la noticia y las reglas
  de tilde (agudas, graves y esdrújulas). El contenido sale de las fotocopias de
  clase; las historietas, noticias y avisos de ejemplo están inventados para
  practicar (la Juguetería Capiplasan sale de la fotocopia).
- **Inglés** · examen final de Learning Lands 2, con foco en el Speaking
  (question words, "Tell me about…", prepositions). Ver la sección *Inglés* más abajo.

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

En **Ciencias Sociales** (todo en `sociales.js`):

| Juego | Qué practica |
|---|---|
| 🗺️ **Infografías con sus partes** | Dibujos hechos en la app, con cada parte marcada: ¿quién mandaba? (rey → virrey → gobernación → Cabildo), la pirámide social, el plano de Santa Fe la Vieja, el mapa del circuito comercial (qué llegaba y qué salía) y una reducción. Se pueden ocultar los nombres. Sin puntaje. |
| 🏷️ **Poné los nombres** | Las mismas infografías con un **?** en cada parte: se elige el nombre y se toca dónde va (hay nombres que sobran). |
| 👆 **Encontrá en el dibujo** | "Tocá el Cabildo", "Tocá a los criollos", "Tocá de dónde traían el agua"… y preguntas sobre cada dibujo. |
| 🗣️ **Decilo con tus palabras** | Las 9 preguntas de "Para que Santino lo diga con sus palabras": contesta en voz alta, ve la respuesta y marca las palabras clave que dijo. |
| 🧠 Trivia · 🕰️ Línea de tiempo · 🔗 Unir · 🃏 Flashcards | 78 preguntas, 4 líneas de tiempo (las fechas de memoria, colonia, revolución, autonomía e independencia), 10 rondas para unir y 33 tarjetas. |
| ⚡ Arcades | **¿Santa Fe o Buenos Aires?**, **¿Qué congreso fue?**, **¿Quién es quién en la pirámide?** y **¿Encomienda o reducción?** |

El progreso de Sociales arrancó de cero con los temas nuevos (`estudioSanti.sociales.v2`).

En **Lengua**:

| Juego | Qué practica |
|---|---|
| 🧩 **Ejemplos con sus partes** | Historietas, noticias y avisos dibujados en la app, con cada parte marcada con su nombre (cartelera, globo, onomatopeya, metáfora visual · volanta, título, copete, cuerpo, imagen, epígrafe · palabra pista y palabras lindas). Se pueden ocultar los nombres para repasar. Tiene también una pestaña de tildes con las palabras partidas en sílabas. Sin puntaje. |
| 🏷️ **Poné los nombres** | 4 ejemplos (historieta, noticia, publicidad y propaganda) con un **?** en cada parte: se elige un nombre del banco de abajo y se toca la parte donde va. Hay nombres que sobran (de otros textos) para no adivinar por descarte. En los avisos también hay que poner si es *Publicidad* o *Propaganda*. Cuentan como aciertos las partes nombradas bien a la primera. |
| 👆 **Encontrá las partes** | 5 ejemplos (2 historietas, 1 noticia, 1 publicidad y 1 propaganda): "Tocá la cartelera", "Tocá el epígrafe", "¿Qué significa 💡?", "¿Publicidad o propaganda?"… |
| 🔎 **Detective de tildes** | Paso 1: ¿qué sílaba suena más fuerte? · ¿aguda, grave o esdrújula? · Paso 2: ¿en qué termina? · ¿cómo se escribe? |
| 📰 **Detective de noticias** | Leer una noticia corta y contestar ¿qué?, ¿quiénes?, ¿cuándo?, ¿dónde?, ¿para qué? |
| 🧠 Trivia · 🔗 Unir con flechas · 🃏 Flashcards | 59 preguntas, 10 rondas y 23 tarjetas de los cuatro temas. |
| ⚡ Arcades | **¿Publicidad o propaganda?**, **¿Cartelera, globo u onomatopeya?**, **¿Aguda, grave o esdrújula?** y **¿Lleva tilde?** |

Las palabras de tildes están en `PALABRAS` dentro de `lengua.js` (palabra,
sílabas y cuál suena fuerte): la clase y si lleva tilde se calculan solas. Las
historietas, noticias y avisos están en `HISTORIETAS`, `NOTICIAS` y `AVISOS`.
El progreso de Lengua arrancó de cero con los temas nuevos (`estudioSanti.lengua.v2`).

### 📝 Evaluación y 🔁 Recuperatorio (Lengua)

Están primeros en el menú de Lengua y salen de `examen.js`. Los dos tienen la misma forma
(45 puntos) con ejemplos distintos:

1. **¿Qué es cada cosa?** · 8 definiciones para escribir (publicidad = quiere vender,
   propaganda = quiere convencer de una idea, historieta, noticia, cartelera, globo…).
2. **La historieta** · partes numeradas (escribe cartelera, globo, onomatopeya, metáfora
   visual) y qué significa una metáfora visual.
3. **La noticia** · las 6 partes numeradas y preguntas (¿qué?, ¿quiénes?, ¿cuándo?, ¿dónde?, ¿para qué?).
4-5. **Una publicidad y una propaganda** · ¿cuál es y por qué?, palabra pista, palabras lindas y quién lo dice.
6. **Tildes** · un texto donde marca con "lápices de colores" 5 agudas, 5 graves y 5 esdrújulas.

Santi responde (se guarda solo) y toca **Entregar**. Después un adulto toca **Soy el adulto:
corregir**, ve cada respuesta al lado de la respuesta esperada y marca ✓ o ✗. En las tildes la
app sugiere la clase de cada palabra y hay un botón para marcarlas según esa sugerencia.

**La nota** va de 0 a 10: (puntos bien / 45) × 10, redondeada al número más cercano. Si quedó
bastante por debajo lleva **-** (9,6 → **-10**) y si quedó bastante por arriba lleva **+**
(9,3 → **+9**). Se aprueba con 6 (`APROBADO` en `examen.js`). Aprobado: redoble de tambor,
fanfarria, aplausos, confeti, lluvia de emojis, sello gigante de ¡APROBADO! y una voz que lo
felicita. Si no aprueba, aparece el botón para ir al **Recuperatorio**.

Sociales y Lengua tienen un **Resumen para leer** con la ficha de datos, el texto por secciones
y un cuadro (en Sociales, las fechas de memoria).

## Inglés (examen final · Learning Lands 2)

El contenido sale de los consejos de la seño para el Speaking (question words,
"Tell me about…" y prepositions), los 3 cuestionarios de Wordwall de la
plataforma (copiados tal cual), la ficha de Speaking de la carpeta (Part 1 a 4,
he/she/it + S) y el PDF *Learning Lands 2 – End of Year Test – Reach Higher*.
Todo está en `ingles.js`.

| Juego | Qué practica |
|---|---|
| ❓ **Question words** | Cuestionario estilo Wordwall (pantalla con INICIAR, botones de colores A-B-C-D, aciertos arriba y "X de N" abajo). Se elige el Juego 1, 2 o 3 de la plataforma o una mezcla. |
| 🎤 **Simulacro de Speaking** | La "teacher" pregunta **en voz alta** (Introduction, Part 1, 2, 3 y 4). Santi contesta hablando, mira la respuesta modelo y marca si la dijo bien. Al final lista lo que hay que practicar. |
| 💬 **Tell me about…** | Arma 4 oraciones (animal, estación, docente, amigo, país, juguete) eligiendo la palabra correcta, escucha el texto y lo dice solito (con opción de esconderlo). |
| 📍 **Prepositions** | Dibujos con emojis: Where is the cat? It's under the chair. Where is Jack? He's between Lucy and Mary. |
| 🖼️ **Look and answer** | Part 2: What is this? / What are these? / Big or small? / What colour? |
| 🔗 **Pregunta y respuesta** | Unir con flechas preguntas ↔ respuestas y question words ↔ castellano. |
| 🔤 **Write the question** | Writing del examen: tocar las palabras en orden (have / you / got / a / helmet → Have you got a helmet?). |
| 🎧 **Listening** | Los dos audios del examen (`audio/listening-1.mp3` y `-2.mp3`) con sus preguntas. |
| 📖 **Reading** | True / False con imágenes y el texto "The beach" para completar. |
| ⚡ Arcades | **¿Con S o sin S?**, **has got · have got** y **It's… o They're…?** |

La voz usa la del navegador (`speechSynthesis`, en inglés) y la música baja
sola mientras habla. Donde el navegador lo permite (Chrome), hay un botón de
**micrófono** que escucha la respuesta y avisa si fue una oración completa.
Las respuestas modelo usan los datos de la ficha (Santiago, 9 años, cumple en
abril, Argentina, teacher Camila…): se cambian en `PERSONAL` dentro de `ingles.js`.

## Estrellas, XP y niveles

- Cada juego con puntaje da **hasta 3 estrellas** según el porcentaje de aciertos
  (90 % → 3, 70 % → 2, 50 % → 1). Se guarda la mejor.
- Cada partida suma **XP** (y las flashcards marcadas como sabidas, 5 XP cada una).
- El XP hace subir de **nivel**. Cada materia tiene sus propios niveles (en Sociales: Aprendiz →
  Vecino del Cabildo → Arriero de mulas → Navegante del Paraná → Granadero a caballo →
  Diputado del Congreso → Prócer de la historia).
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
app.js       Utilidades (sonido, confeti, progreso guardado, niveles)
sociales.js  Datos de Ciencias Sociales (trivia, línea de tiempo, pares, flashcards, baldes, infografías)
lengua.js    Datos de Lengua, con la misma forma
examen.js    Evaluación y Recuperatorio de Lengua (preguntas, ejemplos, textos de tildes y nota)
ingles.js    Datos de Inglés + la voz (APP.say) y el micrófono (APP.listen)
audio/       musica.mp3 (20 min recortados del original, 96 kbps) y efectos.mp3 (todos los efectos)
icons/       Íconos de la app hechos con estudio.png (normales y "maskable" para Android)
manifest.webmanifest, sw.js   Lo que hace falta para instalarla en el celular
```

> El archivo original de la música pesa 1 GB (12 horas), así que no se sube a
> GitHub (está en `.gitignore`). La app usa el recorte de `audio/musica.mp3`.

Para agregar o corregir contenido: Sociales está en `sociales.js` y Lengua en `lengua.js`
(`TRIVIA`, `TIMELINE_ROUNDS`, `MATCH_ROUNDS`, `FLASHCARDS`, `CLASSIFY_GAMES`, `FICHA`,
`RESUMEN` y la tabla del resumen). Cada materia se arma al final de su archivo.
