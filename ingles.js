/* =======================================================================
   ESTUDIO SANTI · MATERIA "Inglés"
   Learning Lands 2 · End of Year Test (examen final).

   Contenido sacado de:
     · los consejos de la seño para el Speaking (question words, "Tell me
       about…" y prepositions);
     · los 3 juegos de Wordwall de la plataforma (copiados tal cual);
     · el PDF "Learning Lands 2 End of Year Test – Reach Higher"
       (listening, reading, writing y speaking);
     · el resumen de la carpeta (Speaking Part 1 a 4, he/she/it + S).

   Se carga después de app.js y agrega la materia a `APP.SUBJECTS`.
   También suma dos ayudas de voz que usan los juegos de Inglés:
     APP.say(texto)      → lee el texto en voz alta, en inglés.
     APP.listen(cb, end) → escucha por el micrófono y devuelve lo que oyó.
   ======================================================================= */

(function (APP) {
  'use strict';

  /* =====================================================================
     VOZ (texto → voz en inglés) y MICRÓFONO (voz → texto)
     ===================================================================== */
  const canSpeak = typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance === 'function';
  let voice = null;
  function pickVoice() {
    if (!canSpeak) return null;
    const vs = window.speechSynthesis.getVoices() || [];
    const en = vs.filter((v) => /^en[-_]/i.test(v.lang));
    voice = en.find((v) => /en[-_]GB/i.test(v.lang) && /google|natural|online/i.test(v.name)) ||
            en.find((v) => /en[-_]GB/i.test(v.lang)) ||
            en.find((v) => /en[-_]US/i.test(v.lang) && /google|natural|online/i.test(v.name)) ||
            en.find((v) => /en[-_]US/i.test(v.lang)) || en[0] || null;
    return voice;
  }
  if (canSpeak) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  /** Lee un texto en inglés. Saca los emojis y los "___" antes de leer. */
  function say(text, opts) {
    if (!canSpeak || !text) return false;
    const clean = String(text)
      .replace(/\p{Extended_Pictographic}|️|‍/gu, '')
      .replace(/_{2,}/g, ' … ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!clean) return false;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = (voice && voice.lang) || 'en-GB';
    if (voice || pickVoice()) u.voice = voice;
    u.rate = opts && opts.slow ? 0.7 : 0.88;
    if (APP.sfx.duck) {
      APP.sfx.duck(true);
      u.onend = u.onerror = () => APP.sfx.duck(false);
    }
    synth.speak(u);
    return true;
  }

  /* Reconocimiento de voz (Chrome en Android y en la compu). Es opcional:
     si el navegador no lo tiene, el botón del micrófono no aparece. */
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  /** Escucha una respuesta. Devuelve una función para cortar. */
  function listen(onText, onEnd) {
    if (!Recognition) { onEnd && onEnd('unsupported'); return () => {}; }
    if (canSpeak) window.speechSynthesis.cancel();
    const r = new Recognition();
    r.lang = 'en-US';
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.continuous = false;
    let finished = false;
    const end = (why) => { if (!finished) { finished = true; if (APP.sfx.duck) APP.sfx.duck(false); onEnd && onEnd(why); } };
    r.onresult = (e) => {
      let txt = '';
      for (let k = 0; k < e.results.length; k++) txt += e.results[k][0].transcript;
      onText(txt.trim(), e.results[e.results.length - 1].isFinal);
    };
    r.onerror = (e) => end(e.error || 'error');
    r.onend = () => end('ok');
    try { if (APP.sfx.duck) APP.sfx.duck(true); r.start(); } catch (err) { end('error'); }
    return () => { try { r.stop(); } catch (err) { /* ya terminó */ } };
  }

  APP.say = say;
  APP.canSpeak = canSpeak;
  APP.listen = listen;
  APP.canListen = !!Recognition;

  /* ------------------------------ Niveles ------------------------------- */
  const LEVELS = [
    { min: 0,    name: 'Beginner',          icon: '🌱' },
    { min: 60,   name: 'Little speaker',    icon: '🗣️' },
    { min: 150,  name: 'Word explorer',     icon: '🔎' },
    { min: 300,  name: 'Question master',   icon: '❓' },
    { min: 500,  name: 'Super speaker',     icon: '🎤' },
    { min: 800,  name: 'English star',      icon: '⭐' },
    { min: 1200, name: 'English champion',  icon: '👑' }
  ];

  /* =====================================================================
     RESUMEN PARA LEER
     ===================================================================== */
  const FICHA = [
    { k: 'El examen',            v: 'Listening, Reading, Writing y Speaking (Learning Lands 2 · End of Year)' },
    { k: 'Speaking · Part 1',    v: 'Preguntas personales: What’s your name? How old are you? …' },
    { k: 'Speaking · Part 2',    v: 'Una foto: What is this? It’s a… / What are these? They’re…' },
    { k: 'Speaking · Part 3',    v: 'Un dibujo con personas: Where’s…? Who…? How many…? What is … wearing?' },
    { k: 'Speaking · Part 4',    v: 'Tell me about…: contar 3 o 4 oraciones solito' },
    { k: 'Regla de oro',         v: 'Nunca contestar sólo “yes” o “no”: ¡siempre una oración!' },
    { k: 'He / She / It',        v: 'El verbo lleva S: she reads, he studies, it has got' },
    { k: 'I / You / We / They',  v: 'El verbo va sin S: I read, they study, we have got' },
    { k: 'This → It’s',          v: 'Uno solo: What is this? It’s a watermelon.' },
    { k: 'These → They’re',      v: 'Dos o más: What are these? They’re shells.' }
  ];

  const RESUMEN = [
    { t: '1. Cómo es el Speaking', p: [
      'Introduction: What’s your name? — My name is Santiago. · How do you spell it? — S-A-N-T-I-A-G-O.',
      'Part 1 · Personal questions: preguntas sobre vos (edad, cumpleaños, de dónde sos, tu familia, tus amigos, lo que te gusta).',
      'Part 2 · Vocabulary and simple description: te muestran una foto. What is this? It’s a… · What are these? They’re… · Is it big or small? · What colour is it? · Is it new or old? · What can you do with this? I can…',
      'Part 3 · Picture-based comprehension: un dibujo con chicos. Where’s Wally? · Who’s got long black hair? · How many girls are there? · What is Nick wearing?',
      'Part 4 · Extended response: Tell me about… Hay que hablar solito, sin preguntas, 3 o 4 oraciones.'
    ]},
    { t: '2. Question words (consejo de la seño)', p: [
      'Cuando te preguntan con una question word, contestá con una frase, no con sí o no.',
      'Ejemplo: When is your birthday? — It’s in June. / It’s on June 3rd.',
      'What = ¿Qué? / ¿Cuál? · Who = ¿Quién? · Where = ¿Dónde? · When = ¿Cuándo? · How = ¿Cómo?',
      'How old = ¿Cuántos años? · How many = ¿Cuántos? · Whose = ¿De quién? · What colour = ¿De qué color?'
    ]},
    { t: '3. Tell me about… (Part 4)', p: [
      'Hay que describir algo en 3 o 4 oraciones: tu animal favorito, tu país, tu estación, tu docente, tu amigo…',
      'Ejemplo de la seño: My favourite animal is the giraffe. It’s tall and yellow. It has got four legs and it hasn’t got wings.',
      'Frases que ayudan: My favourite … is … · It’s … (color, tamaño) · It has got … / It hasn’t got … · It can … but it can’t …',
      'Para personas: He’s / She’s … · She has got … · He can … but he can’t …',
      'Para la estación: My favourite season is … · The weather is … and … · In this season, I wear … · I always …'
    ]},
    { t: '4. Prepositions (¿dónde está?)', p: [
      'in = adentro de · on = arriba de / sobre · under = debajo de · next to = al lado de',
      'between = entre (dos cosas o personas) · behind = detrás de · in front of = delante de',
      'Ejemplo de la seño: Where is Jack? — He is between Lucy and Mary.',
      'Where is the ball? — It’s under the table.'
    ]},
    { t: '5. He / She / It + S', p: [
      'Con HE, SHE, IT (o una sola persona: my mum, Tom, the cat) el verbo lleva S: she reads, he plays, it swims.',
      'Si el verbo termina en consonante + Y, cambia a IES: study → studies.',
      'Con I, WE, YOU, THEY el verbo va sin S: I read, we study, they play.',
      'Lo mismo con have got: he / she / it HAS got · I / you / we / they HAVE got.',
      'Preguntas: Does he climb a tree? — Yes, he does. · What does she like doing? — She likes doing puzzles.'
    ]},
    { t: '6. Lo que también entra en el examen escrito', p: [
      'Listening: escuchar y numerar fotos; escuchar y contestar preguntas.',
      'Reading: mirar una foto y decir True o False (y corregir la falsa); completar un texto con palabras de un cuadro (The beach).',
      'Writing: ordenar palabras para armar la pregunta (have / you / got / a / helmet → Have you got a helmet?).',
      'Look at the picture: contestar con 2 o 3 palabras (What’s the weather like? — It’s sunny.).',
      'Ahora / ayer: What are you doing? I’m swimming (ahora) · Where were you yesterday? I was at the market (ayer).'
    ]}
  ];

  const TABLA = {
    title: 'Question words',
    cols: ['Palabra', 'Significa', 'Ejemplo'],
    rows: [
      ['What',        '¿Qué? / ¿Cuál?',   'What’s your name? — My name is Santiago.'],
      ['Who',         '¿Quién?',          'Who is your English teacher? — It’s Camila.'],
      ['Where',       '¿Dónde?',          'Where are you from? — I’m from Argentina.'],
      ['When',        '¿Cuándo?',         'When is your birthday? — It’s in April.'],
      ['How',         '¿Cómo?',           'How are you? — I’m fine, thanks.'],
      ['How old',     '¿Cuántos años?',   'How old are you? — I’m nine years old.'],
      ['How many',    '¿Cuántos/as?',     'How many friends have you got? — I’ve got five friends.'],
      ['Whose',       '¿De quién?',       'Whose mat is this? — It’s Sam’s mat.'],
      ['What colour', '¿De qué color?',   'What colour is it? — It’s pink.']
    ]
  };

  /* =====================================================================
     CUESTIONARIOS (estilo Wordwall)
     Cada pregunta: { q, opts, ok, why?, pic?, scene?, text? }
       · q:    la pregunta. "___" es el hueco a completar.
       · opts: las opciones en el orden en que se muestran (A, B, C, D).
       · pic:  emoji grande arriba de la pregunta.
       · scene: dibujo de preposiciones (ver Scene en index.html).
       · text: un texto para leer arriba. [[así]] se marca resaltado.
       · say:  lo que lee la voz (si no, la oración completa).
     ===================================================================== */
  const QW = 'Las question words: What = qué/cuál · Who = quién · Where = dónde · When = cuándo · How = cómo.';

  /* --- Juego 1 de la plataforma: "Question Words" (tal cual) ---------- */
  const WW1 = [
    { q: '___ is your name?',                       opts: ['Where', 'Who', 'What'],  ok: 'What',  why: 'What’s your name? = ¿Cuál es tu nombre?' },
    { q: '___ old is your grandma?',                 opts: ['How', 'When', 'What'],   ok: 'How',   why: 'How old…? = ¿Cuántos años…? — She’s 65 years old.' },
    { q: '___ is the ball? It’s under the table.',   opts: ['What', 'Who', 'Where'],  ok: 'Where', why: 'La respuesta dice un lugar (under the table): Where = ¿Dónde?' },
    { q: '___ is your birthday? In July.',           opts: ['When', 'Where', 'Who'],  ok: 'When',  why: 'La respuesta es un mes (In July): When = ¿Cuándo?' },
    { q: '___ is your English teacher? Elisa.',      opts: ['What', 'Who', 'Where'],  ok: 'Who',   why: 'La respuesta es una persona (Elisa): Who = ¿Quién?' },
    { q: '___ are you from? Argentina.',             opts: ['When', 'What', 'Where'], ok: 'Where', why: 'Where are you from? = ¿De dónde sos?' },
    { q: '___ is your favourite colour? It’s blue.', opts: ['What', 'Who', 'How'],    ok: 'What',  why: 'What is your favourite colour? = ¿Cuál es tu color favorito?' },
    { q: '___ is he? He’s my friend.',               opts: ['What', 'How', 'Who'],    ok: 'Who',   why: 'Preguntamos por una persona: Who is he? = ¿Quién es él?' },
    { q: '___ are you? I’m fine.',                   opts: ['How', 'Who', 'What'],    ok: 'How',   why: 'How are you? = ¿Cómo estás? — I’m fine.' },
    { q: '___ colour is it? It’s pink.',             opts: ['When', 'What', 'Where'], ok: 'What',  why: 'What colour…? = ¿De qué color…?' }
  ];

  /* --- Juego 2 de la plataforma: opciones fijas Who / Where / What / How */
  const W4 = ['Who', 'Where', 'What', 'How'];
  const WW2 = [
    { q: '___ are you from?',                  ok: 'Where', why: 'Where are you from? = ¿De dónde sos?' },
    { q: '___ old is Tini Stoessel?',          ok: 'How',   why: 'How old…? = ¿Cuántos años tiene…?' },
    { q: '___ is your name?',                  ok: 'What',  why: 'What’s your name? = ¿Cuál es tu nombre?' },
    { q: '___ is your best friend into?',      ok: 'What',  why: 'What is he/she into? = ¿Qué le gusta?' },
    { q: '___ is your favourite actor?',       ok: 'Who',   why: 'Un actor es una persona: Who.' },
    { q: '___ are you?',                       ok: 'How',   why: 'How are you? = ¿Cómo estás?' },
    { q: '___ is Shakira from?',               ok: 'Where', why: 'Where is she from? = ¿De dónde es?' },
    { q: '___ is your favourite singer?',      ok: 'Who',   why: 'Un cantante es una persona: Who.' },
    { q: '___ is your favourite music?',       ok: 'What',  why: 'La música es una cosa: What.' },
    { q: '___ do you spell CHILE?',            ok: 'How',   why: 'How do you spell…? = ¿Cómo se deletrea…? — C-H-I-L-E.' },
    { q: '___ is your favourite sport?',       ok: 'What',  why: 'Un deporte es una cosa: What.' },
    { q: '___ is your favourite sports person?', ok: 'Who', why: 'Un deportista es una persona: Who.' },
    { q: '___ old is Lionel Messi?',           ok: 'How',   why: 'How old…? = ¿Cuántos años tiene…?' }
  ].map((x) => Object.assign({ opts: W4 }, x));

  /* --- Juego 3 de la plataforma: "Question words quiz!" (con imagen) --- */
  const WW3 = [
    { pic: '👜', q: '___ is this? — It’s a bag.',                      opts: ['Where', 'What', 'Who'],         ok: 'What',    why: 'Una cosa: What is this? — It’s a bag.' },
    { pic: '👶', q: '___ is this? — It’s Ella. She’s my baby sister.', opts: ['Where', 'What', 'Who'],         ok: 'Who',     why: 'Una persona: Who is this? — It’s Ella.' },
    { pic: '🌟', q: '___ is your favourite female star? Julia Roberts?', opts: ['Who', 'Whose', 'What'],       ok: 'Who',     why: 'Una persona: Who. (Whose = ¿de quién?)' },
    { pic: '🎬', q: '___’s your favourite film?',                      opts: ['Who', 'Where', 'What'],         ok: 'What',    why: 'Una película es una cosa: What’s your favourite film?' },
    { pic: '🛋️', q: '___ is your mother? — She’s in the living room.', opts: ['What', 'Where', 'Who'],         ok: 'Where',   why: 'La respuesta es un lugar (in the living room): Where.' },
    { pic: '🎂', q: '___ are you? — 5. I’m 5 years old.',              opts: ['What', 'Who', 'How old'],       ok: 'How old', why: 'La respuesta es la edad: How old are you?' },
    { pic: '🎾', q: '___ is Rafael Nadal from? — He’s from Spain.',    opts: ['When', 'Where', 'Whose'],       ok: 'Where',   why: 'Where is he from? — He’s from Spain.' },
    { pic: '😊', q: '___ are you today? — Very well, thanks. And you?', opts: ['How old', 'How', 'What'],      ok: 'How',     why: 'How are you today? = ¿Cómo estás hoy?' },
    { pic: '📅', q: '___ is your mum’s birthday? — It’s in November.', opts: ['Who', 'When', 'What'],         ok: 'When',    why: 'La respuesta es un mes: When.' },
    { pic: '🖼️', q: '___’s this? — It’s a photo of my family.',        opts: ['What', 'Where', 'Who'],         ok: 'What',    why: 'Una cosa (una foto): What’s this?' },
    { pic: '☂️', q: 'And ___’s that? — It’s an umbrella. A modern umbrella!', opts: ['who', 'where', 'what'],  ok: 'what',    why: 'Una cosa (un paraguas): what’s that?' },
    { pic: '🗓️', q: '___ are your English lessons? On Mondays?',       opts: ['When', 'Where', 'Who'],         ok: 'When',    why: 'On Mondays es un día: When.' }
  ];

  /* --- Preguntas extra de la ficha de Speaking (respuestas de Santi) --- */
  const WWX = [
    { q: '___ do you spell it? — S-A-N-T-I.',              opts: ['What', 'How', 'Who'],          ok: 'How',      why: 'How do you spell it? = ¿Cómo se deletrea?' },
    { q: '___ friends have you got? — I’ve got five friends.', opts: ['How old', 'How many', 'Who'], ok: 'How many', why: 'How many = ¿Cuántos? (para contar cosas o personas).' },
    { q: '___ do you feel today? — I’m happy.',            opts: ['How', 'Where', 'When'],        ok: 'How',      why: 'How do you feel today? = ¿Cómo te sentís hoy?' },
    { q: '___ is your birthday? — It’s in April.',         opts: ['Where', 'When', 'What'],       ok: 'When',     why: 'When is your birthday? — It’s in April.' },
    { q: '___ is your favourite film? — Toy Story.',       opts: ['Who', 'What', 'Where'],        ok: 'What',     why: 'Una película es una cosa: What.' },
    { q: '___ mat is this? — It’s Sam’s mat.',             opts: ['Who', 'Whose', 'What'],        ok: 'Whose',    why: 'Whose = ¿De quién? — It’s Sam’s (de Sam).' },
    { q: '___ brothers or sisters have you got?',          opts: ['How many', 'How old', 'What'], ok: 'How many', why: 'How many brothers or sisters…? = ¿Cuántos hermanos…?' },
    { q: '___ were you yesterday? — I was at the market.', opts: ['When', 'Where', 'Who'],        ok: 'Where',    why: 'La respuesta es un lugar: Where were you yesterday?' },
    { q: '___ is your English teacher? — Camila.',         opts: ['Who', 'What', 'How'],          ok: 'Who',      why: 'Una persona: Who is your English teacher?' }
  ];

  /* ---------------------- Prepositions (con dibujo) --------------------- */
  const THINGS = [
    { e: '🐱', n: 'cat' }, { e: '🐶', n: 'dog' }, { e: '⚽', n: 'ball' },
    { e: '🧸', n: 'teddy bear' }, { e: '🐭', n: 'mouse' }, { e: '🐰', n: 'rabbit' }
  ];
  const PLACES = [
    { e: '📦', n: 'box',    rels: ['in', 'on', 'next to', 'behind', 'in front of'] },
    { e: '🪑', n: 'chair',  rels: ['on', 'under', 'next to', 'behind', 'in front of'] },
    { e: '🛏️', n: 'bed',    rels: ['on', 'under', 'next to'] },
    { e: '🧺', n: 'basket', rels: ['in', 'next to', 'behind', 'in front of'] }
  ];
  const ALL_RELS = ['in', 'on', 'under', 'next to', 'behind', 'in front of'];
  const REL_ES = { 'in': 'adentro de', 'on': 'arriba de', 'under': 'debajo de', 'next to': 'al lado de',
                   'behind': 'detrás de', 'in front of': 'delante de', 'between': 'entre' };

  const KIDS = [
    { e: '👧', n: 'Lucy', g: 'f' }, { e: '👦', n: 'Jack', g: 'm' }, { e: '👧🏽', n: 'Mary', g: 'f' },
    { e: '👦🏻', n: 'Tom', g: 'm' }, { e: '👧🏼', n: 'Ana', g: 'f' }, { e: '👦🏽', n: 'Sam', g: 'm' }
  ];

  function objQuestion() {
    const t = APP.pick(THINGS, 1)[0];
    const p = APP.pick(PLACES, 1)[0];
    const rel = APP.pick(p.rels, 1)[0];
    const others = APP.pick(ALL_RELS.filter((r) => r !== rel), 2);
    const line = (r) => 'It’s ' + r + ' the ' + p.n + '.';
    return {
      scene: { kind: 'obj', thing: t.e, place: p.e, rel: rel },
      q: 'Where is the ' + t.n + '?',
      opts: APP.shuffle([rel].concat(others)).map(line),
      ok: line(rel),
      why: rel + ' = ' + REL_ES[rel] + '. The ' + t.n + ' is ' + rel + ' the ' + p.n + '.'
    };
  }

  function kidsQuestion() {
    const row = APP.pick(KIDS, 3);
    const mid = Math.random() < 0.6;          // la mayoría de las veces, "between"
    const who = mid ? row[1] : row[Math.random() < 0.5 ? 0 : 2];
    const pr = who.g === 'f' ? 'She’s' : 'He’s';
    const a = row[0].n, b = row[1].n, c = row[2].n;
    let ok, bad;
    if (mid) {
      ok = pr + ' between ' + a + ' and ' + c + '.';
      bad = [pr + ' next to ' + a + ' and ' + c + '.', pr + ' between ' + a + ' and ' + b + '.', pr + ' under ' + a + '.'];
    } else {
      const other = who === row[0] ? c : a;
      ok = pr + ' next to ' + b + '.';
      bad = [pr + ' between ' + a + ' and ' + c + '.', pr + ' next to ' + other + '.', pr + ' behind ' + b + '.'];
    }
    return {
      scene: { kind: 'kids', kids: row, mark: row.indexOf(who) },
      q: 'Where is ' + who.n + '?',
      opts: APP.shuffle([ok].concat(APP.pick(bad, 2))),
      ok: ok,
      why: mid ? 'between = entre. ' + who.n + ' está entre ' + a + ' y ' + c + '.'
               : 'next to = al lado de. ' + who.n + ' está al lado de ' + b + '.'
    };
  }

  /* --------------- Part 2 · Look and answer (con emoji) --------------- */
  const LOOK = [
    { pic: '🍉',       q: 'What is this?',        ok: 'It’s a watermelon.',  bad: ['They’re watermelons.', 'It’s a coconut.'],  why: 'Uno solo → What is this? It’s a…' },
    { pic: '🐚🐚🐚',   q: 'What are these?',      ok: 'They’re shells.',     bad: ['It’s a shell.', 'They’re waves.'],          why: 'Muchos → What are these? They’re…' },
    { pic: '🎧',       q: 'What are these?',      ok: 'They’re headphones.', bad: ['It’s a helmet.', 'They’re glasses.'],       why: 'Headphones (auriculares) siempre va en plural: They’re headphones.' },
    { pic: '👓',       q: 'What are these?',      ok: 'They’re glasses.',    bad: ['It’s a glass.', 'They’re headphones.'],     why: 'Glasses (anteojos) va en plural: They’re glasses.' },
    { pic: '⛑️',       q: 'What is this?',        ok: 'It’s a helmet.',      bad: ['They’re helmets.', 'It’s a hat.'],          why: 'Helmet = casco. Uno solo: It’s a helmet.' },
    { pic: '⌚',       q: 'What is this?',        ok: 'It’s a watch.',       bad: ['They’re watches.', 'It’s a clock.'],        why: 'Watch = reloj pulsera.' },
    { pic: '☂️',       q: 'What is this?',        ok: 'It’s an umbrella.',   bad: ['It’s a umbrella.', 'They’re umbrellas.'],   why: 'Umbrella empieza con vocal: an umbrella.' },
    { pic: '🩴🩴',     q: 'What are these?',      ok: 'They’re sandals.',    bad: ['It’s a sandal.', 'They’re shoes.'],         why: 'Dos o más: They’re sandals.' },
    { pic: '🥥',       q: 'What is this?',        ok: 'It’s a coconut.',     bad: ['It’s a watermelon.', 'They’re coconuts.'],  why: 'Coconut = coco.' },
    { pic: '🐘',       q: 'Is it big or small?',  ok: 'It’s big.',           bad: ['It’s small.', 'Yes, it is.'],               why: '¡No contestes sólo yes o no! Decí: It’s big.' },
    { pic: '🐞',       q: 'Is it big or small?',  ok: 'It’s small.',         bad: ['It’s big.', 'Small yes.'],                  why: 'Ladybird = vaquita de San Antonio. It’s small.' },
    { pic: '🍌',       q: 'What colour is it?',   ok: 'It’s yellow.',        bad: ['It’s green.', 'They’re yellow.'],           why: 'What colour is it? — It’s yellow.' },
    { pic: '🐸',       q: 'What colour is it?',   ok: 'It’s green.',         bad: ['It’s blue.', 'Green is.'],                  why: 'What colour is it? — It’s green.' },
    { pic: '⚽',       q: 'What can you do with this?', ok: 'I can play football with it.', bad: ['I can eat it.', 'It’s a ball.'], why: 'What can you do with this? — I can…' },
    { pic: '🚲',       q: 'What can you do with this?', ok: 'I can ride it.',  bad: ['I can drink it.', 'It can ride.'],        why: 'With a bike: I can ride it.' },
    { pic: '☀️',       q: 'What’s the weather like?', ok: 'It’s sunny.',     bad: ['It’s rainy.', 'It’s cloudy.'],              why: 'Sunny = soleado.' },
    { pic: '☁️',       q: 'What’s the weather like?', ok: 'It’s cloudy.',    bad: ['It’s sunny.', 'It’s windy.'],               why: 'Cloudy = nublado.' },
    { pic: '🌧️',       q: 'What’s the weather like?', ok: 'It’s rainy.',     bad: ['It’s snowy.', 'It’s sunny.'],               why: 'Rainy = lluvioso.' },
    { pic: '🏊',       q: 'What is he doing?',    ok: 'He’s swimming.',      bad: ['He swimming.', 'He’s flying.'],             why: 'Ahora mismo: He’s + verbo con -ing.' },
    { pic: '👨‍✈️✈️',  q: 'What’s he doing?',     ok: 'He’s flying a plane.', bad: ['He’s driving a car.', 'He flying a plane.'], why: 'Del examen: What’s he doing? — He’s flying a plane.' },
    { pic: '🧗',       q: 'What is she doing?',   ok: 'She’s climbing.',     bad: ['She’s swimming.', 'She climbing.'],         why: 'Climb = trepar. She’s climbing.' },
    { pic: '🚗',       q: 'What can you do with this?', ok: 'I can drive it.', bad: ['I can fly it.', 'It’s drive.'],          why: 'Drive = manejar.' },
    { pic: '🦅',       q: 'What can it do?',      ok: 'It can fly.',         bad: ['It can swim.', 'It can’t fly.'],            why: 'Eagle = águila: It can fly. It has got wings.' },
    { pic: '🦍',       q: 'What is this?',        ok: 'It’s a gorilla.',     bad: ['It’s a bear.', 'They’re gorillas.'],        why: 'Gorilla = gorila.' },
    { pic: '🐻',       q: 'What is this?',        ok: 'It’s a bear.',        bad: ['It’s a gorilla.', 'It’s a dog.'],           why: 'Bear = oso.' }
  ].map((x) => ({ pic: x.pic, q: x.q, ok: x.ok, opts: APP.shuffle([x.ok].concat(x.bad)), why: x.why }));
  // (las opciones se vuelven a mezclar en cada partida)

  /* ---------------- Reading (del PDF del examen) ----------------------- */
  const TF = [
    { pic: '☁️', s: 'It’s sunny.',                 ok: 'False', fix: 'It’s cloudy.' },
    { pic: '🦅', s: 'It hasn’t got wings.',        ok: 'False', fix: 'It has got wings.' },
    { pic: '🏊', s: 'I go swimming in the summer.', ok: 'True' },
    { pic: '🏐🏖️', s: 'We’re swimming in the sea.', ok: 'False', fix: 'We’re playing volleyball on the beach.' },
    { pic: '👓', s: 'They’re glasses.',            ok: 'True' },
    { pic: '🎧', s: 'It’s a helmet.',              ok: 'False', fix: 'They’re headphones.' },
    { pic: '🐘', s: 'It’s small.',                 ok: 'False', fix: 'It’s big.' },
    { pic: '🌧️', s: 'It’s rainy.',                 ok: 'True' }
  ];

  const BEACH = [
    'People like going to the beach in summer. They ', 'drive', ' there in their cars. Some people take the bus or the ', 'train',
    '. On hot and sunny days, people go swimming in the sea, eat some ', 'watermelon', ' and wear ', 'sandals',
    '. On windy days, there are ', 'waves', ' in the sea. They don’t go swimming. They collect ', 'shells', ' or draw on the sand.'
  ];
  const BEACH_SAY = {
    2: 'Some people take the bus or the train.',
    3: 'People go swimming in the sea, eat some watermelon and wear sandals.',
    4: 'People go swimming in the sea, eat some watermelon and wear sandals.',
    5: 'On windy days, there are waves in the sea.',
    6: 'They collect shells or draw on the sand.'
  };
  const BEACH_BOX = ['drive', 'cafe', 'waves', 'sandals', 'shells', 'watermelon', 'train', 'sail'];

  /** El texto con los huecos: los ya resueltos completos y el actual marcado. */
  function beachText(cur) {
    let gap = 0, out = '';
    BEACH.forEach((part, k) => {
      if (k % 2 === 0) { out += part; return; }
      gap++;
      if (gap < cur) out += part;
      else if (gap === cur) out += '[[(' + gap + ') ______]]';
      else out += '(' + gap + ') ______';
    });
    return out;
  }

  function readingQuiz() {
    const tf = APP.pick(TF, 5).map((x) => ({
      pic: x.pic, q: x.s + ' — True or False?', say: x.s, opts: ['True', 'False'], ok: x.ok,
      why: x.ok === 'True' ? '¡Es verdad! ' + x.s : 'Es falso. Corregido: ' + x.fix
    }));
    const gaps = [];
    for (let g = 2; g <= 6; g++) {           // el 1 (drive) es el ejemplo del examen
      const ok = BEACH[g * 2 - 1];
      const bad = APP.pick(BEACH_BOX.filter((w) => w !== ok && w !== 'drive'), 3);
      gaps.push({
        text: beachText(g),
        q: 'The beach · ¿Qué palabra va en el hueco ' + g + '?',
        opts: APP.shuffle([ok].concat(bad)), ok: ok,
        say: BEACH_SAY[g],
        why: 'Del cuadro: drive, cafe, waves, sandals, shells, watermelon, train, sail (sobran cafe y sail).'
      });
    }
    return tf.concat(gaps);
  }

  /* ---------------------- Juntar los cuestionarios --------------------- */
  const QUIZ = {
    qwords: {
      title: 'Question words',
      intro: 'Una serie de preguntas de opción múltiple. Tocá la respuesta correcta para continuar.',
      sets: [
        { id: 'ww1', name: 'Juego 1 · Question Words',      desc: '10 preguntas · 3 opciones',          build: () => WW1.slice() },
        { id: 'ww2', name: 'Juego 2 · Who, Where, What, How', desc: '13 preguntas · siempre las mismas 4 opciones', build: () => APP.shuffle(WW2) },
        { id: 'ww3', name: 'Juego 3 · Question words quiz!', desc: '12 preguntas con imagen',           build: () => WW3.slice() },
        { id: 'mix', name: 'Mezcla de todo',                desc: '15 preguntas al azar de los 3 juegos y la ficha de Speaking',
          build: () => APP.pick(WW1.concat(WW2, WW3, WWX), 15).map((x) => Object.assign({}, x, { opts: x.opts === W4 ? W4 : APP.shuffle(x.opts) })) }
      ]
    },
    prepos: {
      title: 'Prepositions · Where is…?',
      intro: 'Mirá el dibujo y elegí dónde está. in · on · under · next to · between · behind · in front of',
      sets: [{ id: 'all', name: 'Where is…?', desc: '10 dibujos', build: () => {
        const qs = [];
        for (let k = 0; k < 7; k++) qs.push(objQuestion());
        for (let k = 0; k < 3; k++) qs.push(kidsQuestion());
        return APP.shuffle(qs);
      } }]
    },
    look: {
      title: 'Look and answer',
      intro: 'Como en la Part 2 del Speaking: mirá la imagen y elegí la mejor respuesta (¡siempre una oración!).',
      sets: [{ id: 'all', name: 'Look and answer', desc: '12 imágenes', build: () => APP.pick(LOOK, 12).map((x) => Object.assign({}, x, { opts: APP.shuffle(x.opts) })) }]
    },
    reading: {
      title: 'Reading · True or False',
      intro: 'Como en el examen: primero True o False mirando la imagen, después completás “The beach” con las palabras del cuadro.',
      sets: [{ id: 'all', name: 'Reading', desc: '5 True/False + 5 huecos', build: readingQuiz }]
    }
  };

  /* =====================================================================
     SPEAKING · SIMULACRO (con voz)
     Cada paso: la "teacher" pregunta en voz alta, Santi contesta en voz
     alta y después compara con la respuesta modelo.
     ===================================================================== */
  const PERSONAL = [
    { q: 'What’s your name?',                 a: 'My name is Santiago.',               tip: 'Empezá con “My name is…”.' },
    { q: 'How do you spell it?',              a: 'S - A - N - T - I - A - G - O.',     tip: 'Deletreá letra por letra en inglés (o “Santi”: S - A - N - T - I).' },
    { q: 'How old are you?',                  a: 'I am nine years old.',               tip: 'I am … years old.' },
    { q: 'How many friends have you got?',    a: 'I have got five friends.',           tip: 'I have got … friends. (Decí tu número.)' },
    { q: 'How do you feel today?',            a: 'I am fine. / I am happy.',           tip: 'I am fine / happy / sad / tired.' },
    { q: 'When is your birthday?',            a: 'It’s in April.',                     tip: 'It’s in + mes. (O: It’s on April 3rd.)' },
    { q: 'Where are you from?',               a: 'I am from Argentina.',               tip: 'I am from…' },
    { q: 'How old is your grandma?',          a: 'She is sixty-five years old.',       tip: 'She is … years old.' },
    { q: 'How are you?',                      a: 'I am fine, thank you.',              tip: 'I’m fine, thanks. And you?' },
    { q: 'Who is your English teacher?',      a: 'My English teacher is Camila.',      tip: 'My English teacher is…' },
    { q: 'Who is your favourite star?',       a: 'My favourite star is Julia Roberts.', tip: 'My favourite star is…' },
    { q: 'What is your favourite film?',      a: 'My favourite film is Toy Story.',    tip: 'My favourite film is…' },
    { q: 'What’s your favourite colour?',     a: 'My favourite colour is blue.',       tip: 'My favourite colour is… (decí el tuyo).' },
    { q: 'How many brothers or sisters have you got?', a: 'I have got one sister. / I haven’t got brothers or sisters.', tip: 'I have got… / I haven’t got…' },
    { q: 'What’s your favourite food?',       a: 'My favourite food is pizza.',        tip: 'My favourite food is…' },
    { q: 'What do you like doing?',           a: 'I like playing football.',           tip: 'I like + verbo con -ing.' }
  ];

  /* Part 2: una "foto" y tres preguntas sobre ella. */
  const PART2 = [
    { pic: '🦢', qs: [
      { q: 'What’s this?', a: 'It’s a swan.' },
      { q: 'Is it big or small?', a: 'It’s big.' },
      { q: 'What colour is it?', a: 'It’s white.' } ] },
    { pic: '🍉', qs: [
      { q: 'What’s this?', a: 'It’s a watermelon.' },
      { q: 'What colour is it?', a: 'It’s green and red.' },
      { q: 'Is it big or small?', a: 'It’s big.' } ] },
    { pic: '🦍', qs: [
      { q: 'What’s this?', a: 'It’s a gorilla.' },
      { q: 'Is it big or small?', a: 'It’s big.' },
      { q: 'What colour is it?', a: 'It’s black.' } ] },
    { pic: '🐞', qs: [
      { q: 'What’s this?', a: 'It’s a ladybird.' },
      { q: 'Is it big or small?', a: 'It’s small.' },
      { q: 'What colour is it?', a: 'It’s red and black.' } ] },
    { pic: '🎧', qs: [
      { q: 'What are these?', a: 'They’re headphones.' },
      { q: 'What colour are they?', a: 'They’re black.' },
      { q: 'What can you do with them?', a: 'I can listen to music.' } ] },
    { pic: '⚽', qs: [
      { q: 'What’s this?', a: 'It’s a ball.' },
      { q: 'Is it new or old?', a: 'It’s new.' },
      { q: 'What can you do with this?', a: 'I can play football.' } ] },
    { pic: '🚲', qs: [
      { q: 'What’s this?', a: 'It’s a bike.' },
      { q: 'What colour is it?', a: 'It’s red.' },
      { q: 'What can you do with this?', a: 'I can ride it.' } ] },
    { pic: '🐚🐚🐚', qs: [
      { q: 'What are these?', a: 'They’re shells.' },
      { q: 'How many shells are there?', a: 'There are three shells.' },
      { q: 'Are they big or small?', a: 'They’re small.' } ] }
  ];

  /* Part 3: un dibujo con chicos (con nombre) haciendo cosas. */
  const PART3 = [
    { scene: [
        { e: '🧒', n: 'Sam',   d: '🛴', act: 'riding a scooter' },
        { e: '👧', n: 'Carol', d: '⚽', act: 'playing football' },
        { e: '👦', n: 'Bob',   d: '🏖️', act: 'playing in the sand' },
        { e: '👧🏽', n: 'Danny', d: '🪁', act: 'flying a kite' } ],
      qs: [
        { q: 'How many children are there?', a: 'There are four children.' },
        { q: 'What is Carol doing?',         a: 'She’s playing football.' },
        { q: 'Who is next to Sam?',          a: 'Carol is next to Sam.' },
        { q: 'Who is between Carol and Danny?', a: 'Bob is between Carol and Danny.' } ] },
    { scene: [
        { e: '👦', n: 'Nick',  d: '👕', act: 'wearing a T-shirt' },
        { e: '👧', n: 'Sally', d: '🎒', act: 'holding a bag' },
        { e: '👧🏻', n: 'Ana',  d: '📚', act: 'reading a book' },
        { e: '🧒', n: 'Wally', d: '🪑', act: 'sitting on a chair' } ],
      qs: [
        { q: 'How many girls are there?',     a: 'There are two girls.' },
        { q: 'What is Nick wearing?',         a: 'He’s wearing a T-shirt.' },
        { q: 'Where’s Wally?',                a: 'He’s next to Ana. He’s on a chair.' },
        { q: 'What is Ana doing?',            a: 'She’s reading a book.' } ] },
    { scene: [
        { e: '👩', n: 'Mum',  d: '🧺', act: 'having a picnic' },
        { e: '👧', n: 'Lucy', d: '🍉', act: 'eating watermelon' },
        { e: '👦', n: 'Jack', d: '🎾', act: 'playing tennis' },
        { e: '🐴', n: 'the horse', d: '🌊', act: 'swimming' } ],
      qs: [
        { q: 'What’s the weather like?',      a: 'It’s sunny.' },
        { q: 'What is Lucy eating?',          a: 'She’s eating watermelon.' },
        { q: 'Is Jack swimming?',             a: 'No, he isn’t. He’s playing tennis.' },
        { q: 'Who is between Mum and Jack?',  a: 'Lucy is between Mum and Jack.' } ] }
  ];

  /* Part 4 + juego "Tell me about…": cada tema con 4 pasos para armar
     las oraciones (elegir la palabra correcta) y el texto final. */
  const TELLME = [
    { id: 'animal', title: 'your favourite animal', pic: '🦒',
      steps: [
        { s: 'My favourite animal ___ the giraffe.',  opts: ['is', 'are', 'has'],          ok: 'is',      why: 'My favourite animal IS…' },
        { s: 'It’s ___ and yellow.',                  opts: ['tall', 'tails', 'talls'],    ok: 'tall',    why: 'Tall = alto. It’s tall and yellow.' },
        { s: 'It ___ got four legs.',                 opts: ['has', 'have', 'is'],         ok: 'has',     why: 'Con IT: has got.' },
        { s: 'It ___ got wings.',                     opts: ['hasn’t', 'haven’t', 'isn’t'], ok: 'hasn’t', why: 'Con IT, en negativo: hasn’t got.' }
      ] },
    { id: 'season', title: 'your favourite season', pic: '☀️',
      steps: [
        { s: 'My favourite season is ___.',           opts: ['summer', 'sunny', 'Monday'], ok: 'summer',  why: 'Las estaciones: summer, autumn, winter, spring.' },
        { s: 'The weather is hot ___ sunny.',         opts: ['and', 'but', 'is'],          ok: 'and',     why: 'Hot AND sunny: dos cosas que suman.' },
        { s: 'In this season, I ___ shorts and sandals.', opts: ['wear', 'wears', 'wearing'], ok: 'wear',  why: 'Con I, el verbo va sin S: I wear.' },
        { s: 'I always ___ swimming.',                opts: ['go', 'goes', 'am'],          ok: 'go',      why: 'Con I: I go swimming.' }
      ] },
    { id: 'teacher', title: 'your favourite teacher', pic: '👩‍🏫',
      steps: [
        { s: 'My favourite teacher ___ Camila.',      opts: ['is', 'are', 'has'],          ok: 'is',      why: 'My favourite teacher IS…' },
        { s: '___ is kind and funny.',                opts: ['She', 'He', 'It'],           ok: 'She',     why: 'Camila es mujer: She.' },
        { s: 'She ___ got long brown hair.',          opts: ['has', 'have', 'is'],         ok: 'has',     why: 'Con SHE: has got.' },
        { s: 'She can sing but she ___ play the guitar.', opts: ['can’t', 'don’t', 'isn’t'], ok: 'can’t', why: 'can … but … can’t: puede… pero no puede…' }
      ] },
    { id: 'friend', title: 'your best friend', pic: '🧒',
      steps: [
        { s: 'My best friend ___ Tom.',              opts: ['is', 'are', 'has'],          ok: 'is',      why: 'My best friend IS…' },
        { s: 'He ___ got short black hair.',          opts: ['has', 'have', 'is'],         ok: 'has',     why: 'Con HE: has got.' },
        { s: 'He ___ playing football.',              opts: ['likes', 'like', 'liking'],   ok: 'likes',   why: 'Con HE el verbo lleva S: he likes.' },
        { s: 'He can run fast but he ___ swim.',      opts: ['can’t', 'isn’t', 'hasn’t'],  ok: 'can’t',   why: 'can … but … can’t.' }
      ] },
    { id: 'country', title: 'your favourite country', pic: '🇧🇷',
      steps: [
        { s: 'My favourite country is ___.',          opts: ['Brazil', 'Brazilian', 'sunny'], ok: 'Brazil', why: 'El país: Brazil. (Brazilian = brasileño.)' },
        { s: 'It’s big and ___.',                     opts: ['hot', 'cold', 'snowy'],      ok: 'hot',     why: 'En Brasil hace calor: hot.' },
        { s: 'It has ___ beautiful beaches.',         opts: ['got', 'get', 'go'],          ok: 'got',     why: 'It has got…' },
        { s: 'People ___ football there.',            opts: ['play', 'plays', 'playing'],  ok: 'play',    why: 'People (muchas personas) = they: play, sin S.' }
      ] },
    { id: 'toy', title: 'your favourite toy', pic: '🧸',
      steps: [
        { s: 'My favourite toy ___ my teddy bear.',   opts: ['is', 'are', 'have'],         ok: 'is',      why: 'My favourite toy IS…' },
        { s: 'It’s brown ___ soft.',                  opts: ['and', 'but', 'is'],          ok: 'and',     why: 'Brown AND soft = marrón y suave.' },
        { s: 'It ___ got two big eyes.',              opts: ['has', 'have', 'is'],         ok: 'has',     why: 'Con IT: has got.' },
        { s: 'It ___ got a mouth.',                   opts: ['hasn’t', 'haven’t', 'don’t'], ok: 'hasn’t', why: 'Con IT, en negativo: hasn’t got.' }
      ] }
  ].map((t) => Object.assign(t, {
    text: t.steps.map((st) => st.s.replace('___', st.ok).replace(/\s+([.,])/g, '$1')).join(' ')
  }));

  /** Arma el simulacro: Intro → Part 1 → Part 2 → Part 3 → Part 4. */
  function buildSpeaking() {
    const p1 = APP.pick(PERSONAL.slice(2), 4);
    const p2 = APP.pick(PART2, 1)[0];
    const p3 = APP.pick(PART3, 1)[0];
    const p4 = APP.pick(TELLME, 1)[0];
    return [].concat(
      PERSONAL.slice(0, 2).map((x) => ({ part: 'Introduction', q: x.q, a: x.a, tip: x.tip })),
      p1.map((x) => ({ part: 'Part 1 · Personal questions', q: x.q, a: x.a, tip: x.tip })),
      p2.qs.map((x) => ({ part: 'Part 2 · Look at the picture', pic: p2.pic, q: x.q, a: x.a,
        tip: 'Contestá con oración: It’s… / They’re… / I can…' })),
      APP.pick(p3.qs, 3).map((x) => ({ part: 'Part 3 · Look at the picture', people: p3.scene, q: x.q, a: x.a,
        tip: 'Mirá bien el dibujo. He’s… / She’s… / There are…' })),
      [{ part: 'Part 4 · Tell me about…', pic: p4.pic, q: 'Tell me about ' + p4.title + '. Say three or four sentences.',
         a: p4.text, long: true,
         tip: 'My favourite … is … · It’s … · It has got … · It can … but it can’t …' }]
    );
  }

  /* =====================================================================
     WRITING · ORDENAR LA PREGUNTA (ejercicio 5 del examen y más)
     ===================================================================== */
  const ORDER = [
    { pic: '⛑️', w: ['Have', 'you', 'got', 'a', 'helmet', '?'],           reply: 'No, I haven’t.' },
    { pic: '✈️', w: ['What’s', 'he', 'doing', '?'],                       reply: 'He’s flying a plane.' },
    { pic: '🏖️', w: ['Are', 'you', 'drawing', 'in', 'the', 'sand', '?'],   reply: 'Yes, we are.' },
    { pic: '🛒', w: ['Where', 'were', 'you', 'yesterday', '?'],           reply: 'I was at the market.' },
    { pic: '🌳', w: ['Does', 'he', 'climb', 'a tree', 'after school', '?'], reply: 'Yes, he does.' },
    { pic: '🎧', w: ['What', 'are', 'these', '?'],                        reply: 'They’re headphones.' },
    { pic: '📛', w: ['What’s', 'your', 'name', '?'],                      reply: 'My name is Santiago.' },
    { pic: '🎂', w: ['How', 'old', 'are', 'you', '?'],                    reply: 'I’m nine years old.' },
    { pic: '📅', w: ['When', 'is', 'your', 'birthday', '?'],              reply: 'It’s in April.' },
    { pic: '🌎', w: ['Where', 'are', 'you', 'from', '?'],                 reply: 'I’m from Argentina.' },
    { pic: '👩‍🏫', w: ['Who', 'is', 'your', 'English', 'teacher', '?'],    reply: 'My English teacher is Camila.' },
    { pic: '👫', w: ['How', 'many', 'friends', 'have', 'you', 'got', '?'], reply: 'I’ve got five friends.' },
    { pic: '☀️', w: ['What’s', 'the', 'weather', 'like', '?'],            reply: 'It’s sunny.' },
    { pic: '🧩', w: ['What', 'does', 'she', 'like', 'doing', '?'],        reply: 'She likes doing puzzles.' },
    { pic: '🧘', w: ['Whose', 'mat', 'is', 'this', '?'],                  reply: 'It’s Sam’s mat.' },
    { pic: '👦', w: ['Has', 'he', 'got', 'short', 'hair', '?'],           reply: 'Yes, he has.' },
    { pic: '🏊‍♀️', w: ['Is', 'she', 'swimming', '?'],                     reply: 'No, she isn’t.' },
    { pic: '🎬', w: ['What', 'is', 'your', 'favourite', 'film', '?'],     reply: 'My favourite film is Toy Story.' }
  ];

  /* =====================================================================
     UNIR CON FLECHAS · pregunta ↔ respuesta
     ===================================================================== */
  const MATCH_ROUNDS = [
    { title: 'Preguntas personales 1', pairs: [
      { id: 'p1', a: 'What’s your name?',      b: 'My name is Santiago.' },
      { id: 'p2', a: 'How old are you?',       b: 'I’m nine years old.' },
      { id: 'p3', a: 'Where are you from?',    b: 'I’m from Argentina.' },
      { id: 'p4', a: 'When is your birthday?', b: 'It’s in April.' }
    ]},
    { title: 'Preguntas personales 2', pairs: [
      { id: 'q1', a: 'Who is your English teacher?', b: 'My English teacher is Camila.' },
      { id: 'q2', a: 'How are you?',                 b: 'I’m fine, thank you.' },
      { id: 'q3', a: 'What is your favourite film?', b: 'My favourite film is Toy Story.' },
      { id: 'q4', a: 'How old is your grandma?',     b: 'She’s sixty-five years old.' },
      { id: 'q5', a: 'How do you spell it?',         b: 'S - A - N - T - I.' }
    ]},
    { title: 'Question words en castellano', pairs: [
      { id: 'w1', a: 'What',  b: '¿Qué? / ¿Cuál?' },
      { id: 'w2', a: 'Who',   b: '¿Quién?' },
      { id: 'w3', a: 'Where', b: '¿Dónde?' },
      { id: 'w4', a: 'When',  b: '¿Cuándo?' },
      { id: 'w5', a: 'How',   b: '¿Cómo?' }
    ]},
    { title: 'Más question words', pairs: [
      { id: 'x1', a: 'How old',     b: '¿Cuántos años?' },
      { id: 'x2', a: 'How many',    b: '¿Cuántos?' },
      { id: 'x3', a: 'Whose',       b: '¿De quién?' },
      { id: 'x4', a: 'What colour', b: '¿De qué color?' }
    ]},
    { title: 'Prepositions', pairs: [
      { id: 'r1', a: 'in',          b: 'adentro de' },
      { id: 'r2', a: 'on',          b: 'arriba de / sobre' },
      { id: 'r3', a: 'under',       b: 'debajo de' },
      { id: 'r4', a: 'next to',     b: 'al lado de' },
      { id: 'r5', a: 'between',     b: 'entre' },
      { id: 'r6', a: 'behind',      b: 'detrás de' }
    ]},
    { title: 'Preguntas del examen', pairs: [
      { id: 'e1', a: 'What is this?',            b: 'It’s a watermelon.' },
      { id: 'e2', a: 'What are these?',          b: 'They’re shells.' },
      { id: 'e3', a: 'What’s he doing?',         b: 'He’s flying a plane.' },
      { id: 'e4', a: 'Where were you yesterday?', b: 'I was at the market.' },
      { id: 'e5', a: 'Whose mat is this?',       b: 'It’s Sam’s mat.' }
    ]}
  ];

  /* =====================================================================
     FLASHCARDS (say = lo que lee el parlante)
     ===================================================================== */
  const FLASHCARDS = [
    // --- Question words ---
    { id: 'ifc01', deck: 'Question words', f: 'What', b: '¿Qué? / ¿Cuál? — What’s your name? My name is Santiago.' },
    { id: 'ifc02', deck: 'Question words', f: 'Who', b: '¿Quién? — Who is your English teacher? Camila.' },
    { id: 'ifc03', deck: 'Question words', f: 'Where', b: '¿Dónde? — Where are you from? I’m from Argentina.' },
    { id: 'ifc04', deck: 'Question words', f: 'When', b: '¿Cuándo? — When is your birthday? It’s in April.' },
    { id: 'ifc05', deck: 'Question words', f: 'How', b: '¿Cómo? — How are you? I’m fine.' },
    { id: 'ifc06', deck: 'Question words', f: 'How old', b: '¿Cuántos años? — How old are you? I’m nine years old.' },
    { id: 'ifc07', deck: 'Question words', f: 'How many', b: '¿Cuántos? — How many friends have you got? I’ve got five friends.' },
    { id: 'ifc08', deck: 'Question words', f: 'Whose', b: '¿De quién? — Whose mat is this? It’s Sam’s mat.' },

    // --- Speaking Part 1 (respuestas de la ficha) ---
    { id: 'ifc10', deck: 'Speaking', f: 'What’s your name?', b: 'My name is Santiago.' },
    { id: 'ifc11', deck: 'Speaking', f: 'How do you spell it?', b: 'S - A - N - T - I - A - G - O.' },
    { id: 'ifc12', deck: 'Speaking', f: 'How old are you?', b: 'I am nine years old.' },
    { id: 'ifc13', deck: 'Speaking', f: 'How many friends have you got?', b: 'I have got … friends.' },
    { id: 'ifc14', deck: 'Speaking', f: 'How do you feel today?', b: 'I am fine. / I am happy. / I am sad.' },
    { id: 'ifc15', deck: 'Speaking', f: 'When is your birthday?', b: 'It’s in April.' },
    { id: 'ifc16', deck: 'Speaking', f: 'Where are you from?', b: 'I am from Argentina.' },
    { id: 'ifc17', deck: 'Speaking', f: 'How old is your grandma?', b: 'She is sixty-five years old.' },
    { id: 'ifc18', deck: 'Speaking', f: 'Who is your English teacher?', b: 'My English teacher is Camila.' },
    { id: 'ifc19', deck: 'Speaking', f: 'Who is your favourite star?', b: 'My favourite star is Julia Roberts.' },
    { id: 'ifc20', deck: 'Speaking', f: 'What is your favourite film?', b: 'My favourite film is Toy Story.' },
    { id: 'ifc21', deck: 'Speaking', f: 'Tell me about your favourite animal.', b: 'My favourite animal is the giraffe. It’s tall and yellow. It has got four legs and it hasn’t got wings.' },

    // --- Prepositions ---
    { id: 'ifc30', deck: 'Prepositions', f: 'in', b: 'adentro de — The cat is in the box.' },
    { id: 'ifc31', deck: 'Prepositions', f: 'on', b: 'arriba de / sobre — The ball is on the chair.' },
    { id: 'ifc32', deck: 'Prepositions', f: 'under', b: 'debajo de — The ball is under the table.' },
    { id: 'ifc33', deck: 'Prepositions', f: 'next to', b: 'al lado de — Lucy is next to Jack.' },
    { id: 'ifc34', deck: 'Prepositions', f: 'between', b: 'entre — Jack is between Lucy and Mary.' },
    { id: 'ifc35', deck: 'Prepositions', f: 'behind', b: 'detrás de — The dog is behind the box.' },
    { id: 'ifc36', deck: 'Prepositions', f: 'in front of', b: 'delante de — The cat is in front of the basket.' },

    // --- Grammar ---
    { id: 'ifc40', deck: 'Grammar', f: 'He / She / It + verbo', b: 'Con S: she reads, he plays, it studies.' },
    { id: 'ifc41', deck: 'Grammar', f: 'I / We / You / They + verbo', b: 'Sin S: I read, we play, they study.' },
    { id: 'ifc42', deck: 'Grammar', f: 'has got / have got', b: 'He / She / It HAS got. I / You / We / They HAVE got.' },
    { id: 'ifc43', deck: 'Grammar', f: 'What is this? / What are these?', b: 'Uno: It’s a shell. · Muchos: They’re shells.' },
    { id: 'ifc44', deck: 'Grammar', f: 'can / can’t', b: 'It can run but it can’t fly. (puede… pero no puede…)' },
    { id: 'ifc45', deck: 'Grammar', f: 'What is he doing?', b: 'He’s + verbo con -ing: He’s swimming. He’s flying a plane.' },

    // --- Vocabulary del examen ---
    { id: 'ifc50', deck: 'Vocabulary', f: '🐻 bear', say: 'bear', b: 'oso' },
    { id: 'ifc51', deck: 'Vocabulary', f: '🦅 eagle', say: 'eagle', b: 'águila' },
    { id: 'ifc52', deck: 'Vocabulary', f: '🥥 coconut', say: 'coconut', b: 'coco' },
    { id: 'ifc53', deck: 'Vocabulary', f: '☂️ umbrella', say: 'umbrella', b: 'paraguas' },
    { id: 'ifc54', deck: 'Vocabulary', f: '⛄ snowman', say: 'snowman', b: 'muñeco de nieve' },
    { id: 'ifc55', deck: 'Vocabulary', f: '⛑️ helmet', say: 'helmet', b: 'casco' },
    { id: 'ifc56', deck: 'Vocabulary', f: '🎧 headphones', say: 'headphones', b: 'auriculares' },
    { id: 'ifc57', deck: 'Vocabulary', f: '👓 glasses', say: 'glasses', b: 'anteojos' },
    { id: 'ifc58', deck: 'Vocabulary', f: '⌚ watch', say: 'watch', b: 'reloj (pulsera)' },
    { id: 'ifc59', deck: 'Vocabulary', f: '🩴 sandals', say: 'sandals', b: 'sandalias' },
    { id: 'ifc60', deck: 'Vocabulary', f: '🐚 shells', say: 'shells', b: 'caracoles (de mar)' },
    { id: 'ifc61', deck: 'Vocabulary', f: '🌊 waves', say: 'waves', b: 'olas' },
    { id: 'ifc62', deck: 'Vocabulary', f: '🍉 watermelon', say: 'watermelon', b: 'sandía' },
    { id: 'ifc63', deck: 'Vocabulary', f: '🚆 train', say: 'train', b: 'tren' },
    { id: 'ifc64', deck: 'Vocabulary', f: '⛵ sail', say: 'sail', b: 'navegar a vela' },
    { id: 'ifc65', deck: 'Vocabulary', f: '🚗 drive', say: 'drive', b: 'manejar' },
    { id: 'ifc66', deck: 'Vocabulary', f: '🦍 gorilla', say: 'gorilla', b: 'gorila' },
    { id: 'ifc67', deck: 'Vocabulary', f: '🐞 ladybird', say: 'ladybird', b: 'vaquita de San Antonio' },
    { id: 'ifc68', deck: 'Vocabulary', f: '🪜 stairs', say: 'stairs', b: 'escaleras' },
    { id: 'ifc69', deck: 'Vocabulary', f: '🛝 swing', say: 'swing', b: 'hamaca' },
    { id: 'ifc70', deck: 'Vocabulary', f: '🛍️ shopping centre', say: 'shopping centre', b: 'shopping' },
    { id: 'ifc71', deck: 'Vocabulary', f: '🧺 picnic', say: 'picnic', b: 'picnic' },
    { id: 'ifc72', deck: 'Vocabulary', f: '🌱 gardening', say: 'gardening', b: 'jardinería (plantar en macetas)' },
    { id: 'ifc73', deck: 'Vocabulary', f: '🧩 puzzles', say: 'puzzles', b: 'rompecabezas' },
    { id: 'ifc74', deck: 'Vocabulary', f: '☁️ cloudy · ☀️ sunny · 🌧️ rainy · 💨 windy', say: 'cloudy, sunny, rainy, windy', b: 'nublado · soleado · lluvioso · ventoso' }
  ].map((c) => (c.deck === 'Speaking' ? Object.assign(c, { bEn: true }) : c));

  /* =====================================================================
     ARCADES (clasificar en baldes)
     ===================================================================== */
  const CLASSIFY_GAMES = {
    cons: {
      title: '¿Con S o sin S?',
      question: '¿El verbo lleva S?',
      buckets: [
        { id: 's',  name: 'Con S (he · she · it)',        icon: 'fa-s',          cls: 'bucket-amber' },
        { id: 'no', name: 'Sin S (I · you · we · they)',  icon: 'fa-ban',        cls: 'bucket-sky' }
      ],
      items: [
        { t: 'She ___ books. (read)',          p: 's',  s: 'reads · read' },
        { t: 'He ___ English. (study)',        p: 's',  s: 'studies · study' },
        { t: 'It ___ in the sea. (swim)',      p: 's',  s: 'swims · swim' },
        { t: 'My mum ___ coffee. (like)',      p: 's',  s: 'likes · like' },
        { t: 'Tom ___ football. (play)',       p: 's',  s: 'plays · play' },
        { t: 'The cat ___ milk. (drink)',      p: 's',  s: 'drinks · drink' },
        { t: 'My teacher ___ a car. (drive)',  p: 's',  s: 'drives · drive' },
        { t: 'Santi ___ to school. (go)',      p: 's',  s: 'goes · go' },
        { t: 'She ___ doing puzzles. (like)',  p: 's',  s: 'likes · like' },
        { t: 'He ___ a tree after school. (climb)', p: 's', s: 'climbs · climb' },
        { t: 'I ___ books. (read)',            p: 'no', s: 'read · reads' },
        { t: 'We ___ English. (study)',        p: 'no', s: 'study · studies' },
        { t: 'They ___ in the sea. (swim)',    p: 'no', s: 'swim · swims' },
        { t: 'You ___ football. (play)',       p: 'no', s: 'play · plays' },
        { t: 'My friends ___ pizza. (like)',   p: 'no', s: 'like · likes' },
        { t: 'Tom and Ana ___ TV. (watch)',    p: 'no', s: 'watch · watches' },
        { t: 'I ___ to school. (go)',          p: 'no', s: 'go · goes' },
        { t: 'The dogs ___ fast. (run)',       p: 'no', s: 'run · runs' },
        { t: 'We ___ swimming in summer. (go)', p: 'no', s: 'go · goes' }
      ]
    },
    hasgot: {
      title: 'has got · have got',
      question: '¿Has got o have got?',
      buckets: [
        { id: 'has',  name: 'has got',  icon: 'fa-user',  cls: 'bucket-emerald' },
        { id: 'have', name: 'have got', icon: 'fa-users', cls: 'bucket-indigo' }
      ],
      items: [
        { t: 'She ___ long hair.',            p: 'has',  s: 'She' },
        { t: 'He ___ a helmet.',              p: 'has',  s: 'He' },
        { t: 'It ___ four legs.',             p: 'has',  s: 'It' },
        { t: 'The giraffe ___ a long neck.',  p: 'has',  s: 'The giraffe = it' },
        { t: 'My grandma ___ a cat.',         p: 'has',  s: 'My grandma = she' },
        { t: 'The eagle ___ wings.',          p: 'has',  s: 'The eagle = it' },
        { t: 'Tom ___ short hair.',           p: 'has',  s: 'Tom = he' },
        { t: 'My teacher ___ glasses.',       p: 'has',  s: 'My teacher = she / he' },
        { t: 'I ___ five friends.',           p: 'have', s: 'I' },
        { t: 'You ___ a new bike.',           p: 'have', s: 'You' },
        { t: 'We ___ English on Mondays.',    p: 'have', s: 'We' },
        { t: 'They ___ headphones.',          p: 'have', s: 'They' },
        { t: 'My friends ___ a ball.',        p: 'have', s: 'My friends = they' },
        { t: 'Lucy and Mary ___ sandals.',    p: 'have', s: 'Lucy and Mary = they' },
        { t: 'I ___ one sister.',             p: 'have', s: 'I' },
        { t: 'Birds ___ wings.',              p: 'have', s: 'Birds = they' }
      ]
    },
    thisthese: {
      title: 'It’s… o They’re…?',
      question: '¿Uno solo o muchos?',
      buckets: [
        { id: 'one',  name: 'It’s a…',   icon: 'fa-1',          cls: 'bucket-amber' },
        { id: 'many', name: 'They’re…',  icon: 'fa-layer-group', cls: 'bucket-sky' }
      ],
      items: [
        { t: '🍉', p: 'one',  s: 'watermelon' },
        { t: '⛑️', p: 'one',  s: 'helmet' },
        { t: '☂️', p: 'one',  s: 'umbrella' },
        { t: '⌚', p: 'one',  s: 'watch' },
        { t: '🥥', p: 'one',  s: 'coconut' },
        { t: '🐻', p: 'one',  s: 'bear' },
        { t: '🦅', p: 'one',  s: 'eagle' },
        { t: '🚆', p: 'one',  s: 'train' },
        { t: '🐚🐚🐚', p: 'many', s: 'shells' },
        { t: '🎧', p: 'many', s: 'headphones' },
        { t: '👓', p: 'many', s: 'glasses' },
        { t: '🩴🩴', p: 'many', s: 'sandals' },
        { t: '🌊🌊', p: 'many', s: 'waves' },
        { t: '🍌🍌🍌', p: 'many', s: 'bananas' },
        { t: '⚽⚽', p: 'many', s: 'balls' },
        { t: '🐞🐞🐞', p: 'many', s: 'ladybirds' }
      ]
    }
  };

  /* =====================================================================
     LISTENING (los audios del examen)
     ===================================================================== */
  /* Cada parte tiene t (segundo donde empieza en el audio) y end (donde
     termina), así se puede escuchar sólo ese pedacito. `tr` es lo que
     se dice en el audio (se muestra después de contestar). */
  const LISTENING = [
    { title: 'Audio 1 · Listen and number', short: 'Activity 1', src: 'audio/listening-1.mp3',
      instr: 'Escuchá y numerá las fotos. Hay dos fotos que sobran.',
      pics: [
        { id: 'bear',    e: '🐻', n: 'bear' },
        { id: 'picnic',  e: '🧺', n: 'picnic' },
        { id: 'coconut', e: '🥥', n: 'coconuts' },
        { id: 'tennis',  e: '🎾', n: 'tennis' },
        { id: 'rainy',   e: '☂️', n: 'rainy' },
        { id: 'flowers', e: '🌷', n: 'planting flowers' },
        { id: 'eagle',   e: '🦅', n: 'eagle' },
        { id: 'snowman', e: '⛄', n: 'snowman' }
      ],
      example: { n: 1, id: 'picnic', t: 6, end: 23 },
      items: [
        { n: 2, ok: 'bear',    t: 23, end: 47, tr: '“This is at the zoo. Can you see the bear?” — “Yes, I can. It’s got brown fur and small ears.”' },
        { n: 3, ok: 'coconut', t: 46, end: 62, tr: '“What are these?” — “Oh, they’re coconuts. Yum, I like coconuts.”' },
        { n: 4, ok: 'rainy',   t: 62, end: 76, tr: '“Look, it’s rainy.” — “Yes, it’s winter. It’s cold and wet.”' },
        { n: 5, ok: 'flowers', t: 76, end: 97, tr: '“Are you planting flowers?” — “Yes, we are. We like planting flowers in spring.”' },
        { n: 6, ok: 'tennis',  t: 97, end: 999, tr: '“Do you like playing tennis?” — “Yes, I do. I’m playing tennis in this picture.”' }
      ] },
    { title: 'Audio 2 · Listen and answer', short: 'Activity 2', src: 'audio/listening-2.mp3',
      instr: 'Escuchá y elegí la respuesta a cada pregunta.',
      items: [
        { n: 1, q: 'What does she like doing?', t: 6, end: 21,
          opts: ['She likes doing puzzles.', 'She likes playing board games.', 'She likes drawing.'], ok: 'She likes doing puzzles.',
          tr: '“Do you like playing board games?” — “No, I don’t. I like doing puzzles.”' },
        { n: 2, q: 'What is he doing?', t: 21, end: 36,
          opts: ['He’s making a sandcastle.', 'He’s collecting shells.', 'He’s drawing in the sand.'], ok: 'He’s drawing in the sand.',
          tr: '“Are you making a sandcastle?” — “No, we aren’t.” “Are you collecting shells?” — “No, I’m drawing in the sand.”' },
        { n: 3, q: 'Whose mat is this?', t: 36, end: 61,
          opts: ['It’s Anna’s mat.', 'It’s Bill’s mat.', 'It’s green.'], ok: 'It’s Bill’s mat.',
          tr: '“Whose mat is this? Is it yours, Bill?” — “It’s Anna’s.” — “No, it isn’t. It’s yours, Bill. Mine’s green.” — “Oh yes, it’s mine.”' },
        { n: 4, q: 'What are they looking at?', t: 65, end: 83,
          opts: ['They’re looking at ducks.', 'They’re looking at swans.', 'They’re looking at boats.'], ok: 'They’re looking at swans.',
          tr: '“What are those?” — “Where?” — “On the river. They’ve got long necks.” — “They’re swans.” (Swan = cisne.)' },
        { n: 5, q: 'What’s Sam’s dad doing in the photo?', t: 83, end: 95,
          opts: ['He’s driving a car.', 'He’s flying a plane.', 'He’s sailing a boat.'], ok: 'He’s flying a plane.',
          tr: '“I like this photo, Sam. Is that your dad?” — “Yes. He’s flying a plane.”' },
        { n: 6, q: 'Where was Uncle John yesterday?', t: 95, end: 999,
          opts: ['He was at the library.', 'He was at the supermarket.', 'He was at the city centre.'], ok: 'He was at the city centre.',
          tr: '“Where were you yesterday, Uncle John?” — “I wasn’t at the library and I wasn’t at the supermarket. I was at the city centre.”' }
      ] }
  ];

  /* =====================================================================
     CATÁLOGO DE JUEGOS
     ===================================================================== */
  const GAMES = [
    { id: 'qwords',   type: 'quiz', name: 'Question words', icon: 'fa-circle-question',
      desc: 'Los 3 cuestionarios de la plataforma (estilo Wordwall) y una mezcla de todo.', tint: 'from-rose-500 to-orange-500' },
    { id: 'speaking', type: 'speaking', name: 'Simulacro de Speaking', icon: 'fa-microphone',
      desc: 'La teacher te pregunta en voz alta, vos contestás y comparás con la respuesta modelo. Part 1 a 4.', tint: 'from-indigo-500 to-violet-600' },
    { id: 'tellme',   type: 'tellme', name: 'Tell me about…', icon: 'fa-comments',
      desc: 'Armá 4 oraciones sobre tu animal, estación, docente, amigo… y después decilas solito.', tint: 'from-fuchsia-500 to-pink-600' },
    { id: 'prepos',   type: 'quiz', name: 'Prepositions', icon: 'fa-location-dot',
      desc: 'Where is the cat? It’s under the chair. in · on · under · next to · between · behind…', tint: 'from-emerald-500 to-teal-600' },
    { id: 'look',     type: 'quiz', name: 'Look and answer', icon: 'fa-image',
      desc: 'What is this? What are these? Big or small? What colour? Como la Part 2.', tint: 'from-sky-500 to-cyan-600' },
    { id: 'unir',     type: 'match', name: 'Pregunta y respuesta', icon: 'fa-diagram-project',
      desc: 'Uní cada pregunta con su respuesta (y cada question word con su significado).', tint: 'from-teal-500 to-emerald-600' },
    { id: 'order',    type: 'order', name: 'Write the question', icon: 'fa-arrow-down-a-z',
      desc: 'Como el Writing del examen: tocá las palabras en orden para armar la pregunta.', tint: 'from-violet-500 to-purple-700' },
    { id: 'listening', type: 'listening', name: 'Listening', icon: 'fa-headphones',
      desc: 'Los dos audios del examen, con las preguntas para contestar.', tint: 'from-amber-500 to-orange-600' },
    { id: 'reading',  type: 'quiz', name: 'Reading', icon: 'fa-book-open-reader',
      desc: 'True or False con imágenes y el texto “The beach” para completar.', tint: 'from-cyan-500 to-blue-600' },
    { id: 'cons',     type: 'classify', name: '¿Con S o sin S?', icon: 'fa-bolt',
      desc: '¡Arcade! He / she / it → reads, studies. I / we / they → read, study.', tint: 'from-pink-500 to-rose-600' },
    { id: 'hasgot',   type: 'classify', name: 'has got · have got', icon: 'fa-hand-holding',
      desc: '¡Arcade! She has got… · They have got… Tirá cada oración al balde correcto.', tint: 'from-lime-500 to-emerald-600' },
    { id: 'thisthese', type: 'classify', name: 'It’s… o They’re…?', icon: 'fa-clone',
      desc: '¡Arcade! ¿Es uno solo (It’s a…) o son muchos (They’re…)?', tint: 'from-orange-500 to-amber-600' },
    { id: 'cartas',   type: 'cards', name: 'Flashcards', icon: 'fa-layer-group',
      desc: 'Question words, respuestas del Speaking, prepositions, gramática y vocabulario. ¡Con voz!', tint: 'from-amber-400 to-yellow-500' },
    { id: 'resumen',  type: 'resumen', name: 'Resumen para leer', icon: 'fa-book',
      desc: 'Cómo es el examen y todo lo que hay que saber, ordenado.', tint: 'from-slate-500 to-slate-700' }
  ];

  /* =====================================================================
     MATERIA
     ===================================================================== */
  APP.SUBJECTS.ingles = {
    id: 'ingles',
    name: 'Inglés',
    short: 'Inglés',
    icon: 'fa-language',
    tint: 'from-sky-500 to-rose-500',
    heroText: 'from-sky-600 via-indigo-600 to-rose-500',
    topic: 'End of Year Test · Speaking',
    intro: 'Question words, “Tell me about…”, prepositions y todo el examen final de Learning Lands 2. ¡Hay juegos con voz para practicar el Speaking!',
    expert: 'Inglés',
    tip: 'empezá por <b>Question words</b> y <b>Pregunta y respuesta</b>. Después hacé el <b>Simulacro de Speaking</b> en voz alta, todos los días un ratito: ¡así se gana seguridad! Acordate: <b>nunca contestes sólo yes o no</b>, siempre con una oración.',
    source: 'Inglés — consejos de la seño, juegos de la plataforma, ficha de Speaking y “Learning Lands 2 · End of Year Test”',
    storeKey: 'estudioSanti.ingles.v1',
    speak: true,
    LEVELS,
    FICHA, RESUMEN, TABLA,
    TRIVIA: [],
    MATCH_ROUNDS, FLASHCARDS, CLASSIFY_GAMES,
    QUIZ, ORDER, TELLME, LISTENING,
    SPEAKING: { build: buildSpeaking },
    GAMES
  };
})(window.APP);
