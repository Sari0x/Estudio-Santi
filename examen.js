/* =======================================================================
   ESTUDIO SANTI · LENGUA · EVALUACIÓN Y RECUPERATORIO

   Dos exámenes con la misma forma:
     1. ¿Qué es cada cosa?  → escribe la definición (publicidad, propaganda…)
     2-5. Ejemplos dibujados (historieta, noticia, publicidad y propaganda)
          con partes NUMERADAS: escribe el nombre de cada parte.
     6. Tildes: un texto donde marca 5 agudas, 5 graves y 5 esdrújulas.

   Santi responde y entrega. Después un adulto corrige cada respuesta
   (✓ / ✗) mirando la "respuesta esperada", y la app calcula la nota
   de 0 a 10 (con + y -: "-10" es un 10 flojito, "+9" un 9 alto).

   Se carga después de lengua.js y agrega EXAMENES y EXAM_STORE a Lengua,
   más dos tarjetas al menú.
   ======================================================================= */

(function (APP) {
  'use strict';

  const L = APP.SUBJECTS.lengua;
  const APROBADO = 6;   // nota mínima para aprobar
  const CUPO = 5;       // palabras de cada clase que hay que encontrar

  /* ----------------------------------------------------------------------
     Texto de tildes: se parte en palabras tocables. `lex` dice la clase de
     cada palabra (A aguda · G grave · E esdrújula · M monosílaba), sólo
     como ayuda para el adulto que corrige.
     ---------------------------------------------------------------------- */
  function lexicon(o) {
    const m = {};
    Object.keys(o).forEach((cls) => o[cls].split(/\s+/).forEach((w) => { if (w) m[w.toLowerCase()] = cls; }));
    return m;
  }
  function tokenize(texto, lex) {
    let idx = 0;
    return texto.split(/(\s+)/).map((t) => {
      if (!t || /^\s+$/.test(t)) return t;
      const m = t.match(/^([^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*)([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)(.*)$/);
      if (!m) return t;
      const low = m[2].toLowerCase();
      return { i: idx++, lead: m[1], word: m[2], trail: m[3], cls: lex[low] || null };
    });
  }

  const CLASES = {
    A: { n: 'Aguda',     pl: 'Agudas',     c: '#2563eb', d: 'suena fuerte en la ÚLTIMA sílaba' },
    G: { n: 'Grave',     pl: 'Graves',     c: '#d97706', d: 'suena fuerte en la ANTEÚLTIMA sílaba' },
    E: { n: 'Esdrújula', pl: 'Esdrújulas', c: '#9333ea', d: 'suena fuerte en la ANTEPENÚLTIMA (siempre con tilde)' },
    M: { n: 'Monosílaba', pl: 'Monosílabas', c: '#64748b', d: 'tiene una sola sílaba: no cuenta' }
  };

  /* ======================================================================
     EVALUACIÓN 1
     ====================================================================== */
  const TEXTO1 = 'El sábado a la mañana, Santiago fue con su papá al zoológico de la ciudad. ' +
    'Vieron un camión lleno de plátanos para los monos y un pájaro de colores que cantaba una canción muy bonita. ' +
    'Después merendaron en el césped, al lado de un árbol enorme. ' +
    'Un murciélago dormía colgado de una rama y un ratón miraba la lámpara del kiosco. ' +
    'Santiago sacó su lápiz y dibujó todo en su cuaderno. ¡Fue un día fantástico, el mejor de la semana!';
  const LEX1 = lexicon({
    A: 'papá ciudad camión canción después ratón sacó dibujó mejor',
    G: 'mañana Santiago vieron lleno para monos colores cantaba una bonita merendaron césped lado árbol enorme dormía colgado rama miraba kiosco lápiz todo cuaderno día semana',
    E: 'sábado zoológico plátanos pájaro murciélago lámpara fantástico',
    M: 'el a la fue con su al de un los y que muy en del'
  });

  const EXAMEN1 = {
    id: 'examen1', name: 'Evaluación', titulo: 'Evaluación de Lengua',
    secciones: [
      { id: 'def', tipo: 'preguntas', titulo: '1. ¿Qué es cada cosa?',
        consigna: 'Escribí con tus palabras qué es cada cosa y para qué sirve.',
        items: [
          { id: 'd1', q: '¿Qué es la PUBLICIDAD? ¿Qué quiere?', largo: true,
            esperada: 'Quiere VENDER algo (un producto). Pista: COMPRÁ / VENTA.' },
          { id: 'd2', q: '¿Qué es la PROPAGANDA? ¿Qué quiere?', largo: true,
            esperada: 'Quiere CONVENCER de una idea, NO vende nada. Te pide que cambies tu conducta (cuidá, ayudá, no tires).' },
          { id: 'd3', q: '¿Qué es una HISTORIETA?', largo: true,
            esperada: 'Un texto que cuenta una historia con dibujos (viñetas), globos, onomatopeyas y pocas palabras.' },
          { id: 'd4', q: '¿Qué es una NOTICIA?', largo: true,
            esperada: 'Un texto informativo que cuenta un hecho REAL que pasó y le interesa a la comunidad.' },
          { id: 'd5', q: '¿Qué es la CARTELERA de una historieta?',
            esperada: 'La voz del NARRADOR. Es el cuadradito rectangular que cuenta la historia ("Al otro día…").' },
          { id: 'd6', q: '¿Qué es el GLOBO de una historieta?',
            esperada: 'La voz del PERSONAJE: lo que dice o piensa. Tiene una colita que sale de la boca.' },
          { id: 'd7', q: '¿Qué es una ONOMATOPEYA? Escribí un ejemplo.',
            esperada: 'Una palabra que representa un sonido. Ej: ¡PUM! ¡CRASH! ¡ZAS! ¡TOC TOC!' },
          { id: 'd8', q: '¿Qué es una METÁFORA VISUAL? Escribí un ejemplo.',
            esperada: 'Un dibujito que muestra una idea sin palabras. Ej: 💡 = se le ocurrió una idea · 💫 = se golpeó.' }
        ] },

      { id: 'hist', tipo: 'ejemplo', kind: 'historieta', titulo: '2. La historieta',
        consigna: 'Escribí el nombre de cada parte marcada con un número.',
        ex: { id: 'x1', titulo: 'El partido del domingo', vinetas: [
          { cartel: 'El domingo, en la cancha del club…', fondo: 'plaza',
            pjs: [{ e: '👦', n: 'Santi', globo: '¡Hoy ganamos seguro!' }, { e: '🧒', n: 'Mateo' }] },
          { fondo: 'plaza', ono: '¡ZAS!',
            pjs: [{ e: '👦', n: 'Santi', obj: '⚽' }, { e: '🧒', n: 'Mateo', meta: '💫', globo: '¡Ay! ¡Me pegó en la cabeza!' }] },
          { cartel: 'En el segundo tiempo…', fondo: 'plaza',
            pjs: [{ e: '🧒', n: 'Mateo', meta: '💡', piensa: true, globo: '¡Ya sé! Pateo al arco desde lejos.' }] },
          { fondo: 'fiesta', ono: '¡GOOOL!',
            pjs: [{ e: '👦', n: 'Santi', globo: '¡Sos un crack!' }, { e: '🧒', n: 'Mateo', obj: '🏆' }] }
        ] },
        items: [
          { id: 'h1', num: 1, key: 'c0',  esperada: 'Cartelera (voz del narrador)' },
          { id: 'h2', num: 2, key: 'g11', esperada: 'Globo (voz del personaje)' },
          { id: 'h3', num: 3, key: 'o3',  esperada: 'Onomatopeya (un sonido)' },
          { id: 'h4', num: 4, key: 'm20', esperada: 'Metáfora visual' },
          { id: 'h5', q: 'En la viñeta 2, Mateo tiene 💫 en la cabeza. ¿Qué quiere decir?',
            esperada: 'Que se golpeó (le pegaron con la pelota).' }
        ] },

      { id: 'noti', tipo: 'ejemplo', kind: 'noticia', titulo: '3. La noticia',
        consigna: 'Escribí el nombre de cada parte de la noticia. Después contestá las preguntas.',
        ex: { id: 'x2', fecha: 'Miércoles 12 de noviembre', vol: 'Clima',
          tit: 'Una fuerte tormenta dejó calles inundadas en Santa Fe',
          cop: 'Llovieron más de 100 milímetros en pocas horas. Varias escuelas suspendieron las clases.',
          cuerpo: [
            'El martes a la noche, una fuerte tormenta cayó sobre la ciudad de Santa Fe. En pocas horas llovieron más de 100 milímetros y muchas calles del centro y de los barrios quedaron bajo el agua.',
            'Los bomberos y el personal de la Municipalidad trabajaron toda la noche para destapar los desagües. Pidieron a los vecinos que no salgan de sus casas si no es necesario.'
          ],
          pic: '⛈️🌧️🚗🌊', epi: 'Un auto intenta avanzar por una calle inundada del centro de la ciudad.' },
        items: [
          { id: 'n1', num: 1, key: 'copete',   esperada: 'Copete (amplía el título en 1 o 2 renglones)' },
          { id: 'n2', num: 2, key: 'epigrafe', esperada: 'Epígrafe (explica lo que muestra la imagen)' },
          { id: 'n3', num: 3, key: 'titulo',   esperada: 'Título (lo más importante, va grande)' },
          { id: 'n4', num: 4, key: 'cuerpo',   esperada: 'Cuerpo (desarrolla todos los detalles)' },
          { id: 'n5', num: 5, key: 'volanta',  esperada: 'Volanta (presenta el tema, arriba de todo)' },
          { id: 'n6', num: 6, key: 'imagen',   esperada: 'Imagen (la foto)' },
          { id: 'n7', q: '¿QUÉ pasó?',    esperada: 'Una fuerte tormenta inundó las calles.' },
          { id: 'n8', q: '¿CUÁNDO pasó?', esperada: 'El martes a la noche.' },
          { id: 'n9', q: '¿DÓNDE pasó?',  esperada: 'En la ciudad de Santa Fe.' }
        ] },

      { id: 'pub', tipo: 'ejemplo', kind: 'aviso', titulo: '4. Un aviso',
        consigna: 'Leé el aviso, contestá y escribí el nombre de cada parte marcada.',
        ex: { id: 'x3', tipo: 'publicidad', color: 'amber', pic: '🍫🍪✨',
          titulo: '¡[[Comprá]] los nuevos alfajores Doble Dulce!',
          texto: 'Con dulce de leche {{riquísimo}} y mucho chocolate. ¡El recreo más {{feliz}}! Ahora en oferta: 3 x 2.',
          marca: 'Alfajores Doble Dulce' },
        items: [
          { id: 'p1', q: '¿Este aviso es PUBLICIDAD o PROPAGANDA? ¿Por qué?', largo: true,
            esperada: 'PUBLICIDAD, porque quiere VENDER algo (alfajores). Dice "Comprá".' },
          { id: 'p2', num: 1, key: 'pista',  esperada: 'Palabra pista ("Comprá")' },
          { id: 'p3', num: 2, key: 'lindas', esperada: 'Palabras lindas (para convencerte)' },
          { id: 'p4', num: 3, key: 'marca',  esperada: '¿Quién lo dice? / La marca (la empresa que vende)' }
        ] },

      { id: 'prop', tipo: 'ejemplo', kind: 'aviso', titulo: '5. Otro aviso',
        consigna: 'Leé el aviso, contestá y escribí el nombre de cada parte marcada.',
        ex: { id: 'x4', tipo: 'propaganda', color: 'sky', pic: '💉🩹👨‍👩‍👧',
          titulo: '¡[[Cuidá]] tu salud: vacunate!',
          texto: 'Para crecer {{sano}} y {{fuerte}}, tené las vacunas al día. Son gratis en el centro de salud de tu barrio.',
          marca: 'Campaña provincial de vacunación' },
        items: [
          { id: 'q1', q: '¿Este aviso es PUBLICIDAD o PROPAGANDA? ¿Por qué?', largo: true,
            esperada: 'PROPAGANDA, porque quiere CONVENCER de una idea (vacunarse), no vende nada. Dice "Cuidá".' },
          { id: 'q2', num: 1, key: 'marca',  esperada: '¿Quién lo dice? (la campaña)' },
          { id: 'q3', num: 2, key: 'pista',  esperada: 'Palabra pista ("Cuidá")' },
          { id: 'q4', num: 3, key: 'lindas', esperada: 'Palabras lindas' }
        ] },

      { id: 'sil', tipo: 'tildes', titulo: '6. Agudas, graves y esdrújulas',
        consigna: 'Leé el texto y encontrá 5 palabras AGUDAS, 5 GRAVES y 5 ESDRÚJULAS. Elegí el color de arriba y tocá la palabra.',
        tokens: tokenize(TEXTO1, LEX1) }
    ]
  };

  /* ======================================================================
     EVALUACIÓN 2 · RECUPERATORIO
     ====================================================================== */
  const TEXTO2 = 'El miércoles, Lucía y su mamá viajaron en avión a la ciudad de Córdoba. ' +
    'En el hotel había un teléfono antiguo, una brújula y un sofá muy cómodo. ' +
    'Por la tarde visitaron un museo de música y escucharon un tambor gigante. ' +
    'Lucía compró un álbum de fotos y un lápiz azul. ' +
    'A la noche comieron un plato riquísimo y tomaron café con azúcar. ' +
    'Antes de dormir, Lucía escribió en su cuaderno: «¡Fue un viaje mágico!»';
  const LEX2 = lexicon({
    A: 'mamá avión ciudad hotel sofá tambor compró azul café dormir escribió',
    G: 'Lucía viajaron había antiguo una tarde visitaron museo escucharon gigante álbum fotos lápiz noche comieron plato tomaron azúcar antes cuaderno viaje',
    E: 'miércoles Córdoba teléfono brújula cómodo música riquísimo mágico',
    M: 'el y su en a la de un muy por con fue'
  });

  const EXAMEN2 = {
    id: 'examen2', name: 'Recuperatorio', titulo: 'Recuperatorio de Lengua',
    secciones: [
      { id: 'def', tipo: 'preguntas', titulo: '1. ¿Qué es cada cosa?',
        consigna: 'Escribí con tus palabras qué es cada cosa y para qué sirve.',
        items: [
          { id: 'd1', q: '¿Qué quiere la PUBLICIDAD? ¿Qué palabra te da la pista?', largo: true,
            esperada: 'Quiere VENDER algo. Pista: COMPRÁ / VENTA.' },
          { id: 'd2', q: '¿Qué quiere la PROPAGANDA? ¿Vende algo?', largo: true,
            esperada: 'Quiere CONVENCER de una idea. NO vende nada: pide que cambies tu conducta (cuidá, ayudá, no tires).' },
          { id: 'd3', q: '¿Qué es una NOTICIA? ¿Es inventada?', largo: true,
            esperada: 'Un texto informativo que cuenta un hecho REAL. No es inventada (por eso no es como el cuento).' },
          { id: 'd4', q: '¿En qué se parece la HISTORIETA al cuento y en qué es diferente?', largo: true,
            esperada: 'Se parece: tiene historia, personajes y aventura. Es diferente: usa dibujos, globos, onomatopeyas y menos palabras.' },
          { id: 'd5', q: '¿Qué es la VOLANTA de una noticia?',
            esperada: 'Presenta el tema. Va arriba de todo, chiquita.' },
          { id: 'd6', q: '¿Qué es el COPETE de una noticia?',
            esperada: 'Amplía brevemente la información del título (1 o 2 renglones).' },
          { id: 'd7', q: '¿Qué es el EPÍGRAFE de una noticia?',
            esperada: 'Explica lo que muestra la imagen. Va abajo de la foto.' },
          { id: 'd8', q: '¿Qué es la CARTELERA de una historieta?',
            esperada: 'La voz del NARRADOR: el cuadradito rectangular que cuenta la historia.' }
        ] },

      { id: 'hist', tipo: 'ejemplo', kind: 'historieta', titulo: '2. La historieta',
        consigna: 'Escribí el nombre de cada parte marcada con un número.',
        ex: { id: 'y1', titulo: 'Una noche de tormenta', vinetas: [
          { cartel: 'Una noche de tormenta, en la casa de Lucía…', fondo: 'noche',
            pjs: [{ e: '👧', n: 'Lucía', globo: '¡Qué miedo! ¿Dónde está Michi?' }] },
          { fondo: 'noche', ono: '¡BRRRUM!',
            pjs: [{ e: '🐱', n: 'Michi', globo: '¡Miau! ¡Qué ruido!' }] },
          { fondo: 'casa',
            pjs: [{ e: '🐶', n: 'Toby', meta: 'Zzz' }, { e: '🐱', n: 'Michi', meta: '🌩️', globo: '¡Ese perro me sacó la cama!' }] },
          { cartel: 'A la mañana siguiente…', fondo: 'plaza',
            pjs: [{ e: '👧', n: 'Lucía', meta: '💡', piensa: true, globo: '¡Ya sé! Una camita para cada uno.' }] }
        ] },
        items: [
          { id: 'h1', num: 1, key: 'm21', esperada: 'Metáfora visual (🌩️ = está enojado)' },
          { id: 'h2', num: 2, key: 'c3',  esperada: 'Cartelera (voz del narrador)' },
          { id: 'h3', num: 3, key: 'o1',  esperada: 'Onomatopeya (el ruido del trueno)' },
          { id: 'h4', num: 4, key: 'g00', esperada: 'Globo (voz del personaje)' },
          { id: 'h5', q: 'En la viñeta 3, Toby tiene «Zzz». ¿Qué quiere decir?',
            esperada: 'Que está durmiendo.' }
        ] },

      { id: 'noti', tipo: 'ejemplo', kind: 'noticia', titulo: '3. La noticia',
        consigna: 'Escribí el nombre de cada parte de la noticia. Después contestá las preguntas.',
        ex: { id: 'y2', fecha: 'Lunes 17 de noviembre', vol: 'Cultura',
          tit: 'Miles de chicos visitaron la Feria del Libro en la Costanera',
          cop: 'Durante el fin de semana hubo cuentos, títeres y talleres. La entrada fue libre y gratuita.',
          cuerpo: [
            'El sábado y el domingo, más de 5000 chicos y familias visitaron la Feria del Libro Infantil, que se hizo en la Costanera de Santa Fe.',
            'Los organizadores contaron que el propósito fue que los chicos se acerquen a la lectura. Hubo narradores, títeres y talleres para hacer historietas.'
          ],
          pic: '📚🧒👧🎭📖', epi: 'Un grupo de chicos escucha un cuento en la carpa de narración.' },
        items: [
          { id: 'n1', num: 1, key: 'epigrafe', esperada: 'Epígrafe (explica lo que muestra la imagen)' },
          { id: 'n2', num: 2, key: 'volanta',  esperada: 'Volanta (presenta el tema)' },
          { id: 'n3', num: 3, key: 'cuerpo',   esperada: 'Cuerpo (desarrolla todos los detalles)' },
          { id: 'n4', num: 4, key: 'titulo',   esperada: 'Título (lo más importante)' },
          { id: 'n5', num: 5, key: 'imagen',   esperada: 'Imagen (la foto)' },
          { id: 'n6', num: 6, key: 'copete',   esperada: 'Copete (amplía el título)' },
          { id: 'n7', q: '¿QUIÉNES participaron?', esperada: 'Más de 5000 chicos y familias (y los organizadores).' },
          { id: 'n8', q: '¿CUÁNDO pasó?',          esperada: 'El sábado y el domingo (el fin de semana).' },
          { id: 'n9', q: '¿PARA QUÉ se hizo? (el propósito)', esperada: 'Para que los chicos se acerquen a la lectura.' }
        ] },

      { id: 'pub', tipo: 'ejemplo', kind: 'aviso', titulo: '4. Un aviso',
        consigna: 'Leé el aviso, contestá y escribí el nombre de cada parte marcada.',
        ex: { id: 'y3', tipo: 'propaganda', color: 'emerald', pic: '🚦🚸👧',
          titulo: '[[Cuidá]] tu vida: cruzá por la senda peatonal',
          texto: 'Esperá el semáforo en verde y mirá para los dos lados. ¡Un barrio {{seguro}} es un barrio {{feliz}}!',
          marca: 'Campaña de Educación Vial' },
        items: [
          { id: 'p1', q: '¿Este aviso es PUBLICIDAD o PROPAGANDA? ¿Por qué?', largo: true,
            esperada: 'PROPAGANDA, porque quiere CONVENCER de una idea (cruzar con cuidado), no vende nada. Dice "Cuidá".' },
          { id: 'p2', num: 1, key: 'lindas', esperada: 'Palabras lindas' },
          { id: 'p3', num: 2, key: 'marca',  esperada: '¿Quién lo dice? (la campaña)' },
          { id: 'p4', num: 3, key: 'pista',  esperada: 'Palabra pista ("Cuidá")' }
        ] },

      { id: 'prop', tipo: 'ejemplo', kind: 'aviso', titulo: '5. Otro aviso',
        consigna: 'Leé el aviso, contestá y escribí el nombre de cada parte marcada.',
        ex: { id: 'y4', tipo: 'publicidad', color: 'rose', pic: '👟⚡🏃',
          titulo: '¡Gran [[VENTA]] de zapatillas Saltarín!',
          texto: 'Livianas, {{cómodas}} y súper {{rápidas}}. ¡Corré más feliz! 30 % de descuento.',
          marca: 'Zapatillas Saltarín' },
        items: [
          { id: 'q1', q: '¿Este aviso es PUBLICIDAD o PROPAGANDA? ¿Por qué?', largo: true,
            esperada: 'PUBLICIDAD, porque quiere VENDER algo (zapatillas). Dice "VENTA".' },
          { id: 'q2', num: 1, key: 'pista',  esperada: 'Palabra pista ("VENTA")' },
          { id: 'q3', num: 2, key: 'marca',  esperada: '¿Quién lo dice? / La marca (la empresa que vende)' },
          { id: 'q4', num: 3, key: 'lindas', esperada: 'Palabras lindas' }
        ] },

      { id: 'sil', tipo: 'tildes', titulo: '6. Agudas, graves y esdrújulas',
        consigna: 'Leé el texto y encontrá 5 palabras AGUDAS, 5 GRAVES y 5 ESDRÚJULAS. Elegí el color de arriba y tocá la palabra.',
        tokens: tokenize(TEXTO2, LEX2) }
    ]
  };

  const EXAMENES = { examen1: EXAMEN1, examen2: EXAMEN2 };

  /* ----------------------------------------------------------------------
     Nota: 0 a 10 con + y -. Se redondea al entero más cercano; si quedó
     bastante por debajo es "-N" (ej. 9,7 → -10) y si quedó bastante por
     arriba es "+N" (ej. 9,3 → +9).
     ---------------------------------------------------------------------- */
  function nota(correct, total) {
    const raw = total ? (10 * correct) / total : 0;
    const n = Math.round(raw);
    const diff = raw - n;
    let signo = '';
    if (diff <= -0.15 && n > 0) signo = '-';
    else if (diff >= 0.15 && n < 10) signo = '+';
    return { raw: raw, n: n, signo: signo, txt: (signo === '-' ? '-' : signo === '+' ? '+' : '') + n, aprobado: n >= APROBADO };
  }

  /** Todos los puntos del examen: un ítem = 1 punto; tildes = 3 × CUPO. */
  function totalPuntos(ex) {
    return ex.secciones.reduce((a, s) => a + (s.tipo === 'tildes' ? 3 * CUPO : s.items.length), 0);
  }

  /* ----------------------------- Guardado -------------------------------
     Cada examen guarda: stage ('doing' | 'review' | 'done'), answers
     (texto de cada ítem), sil ({ índice de palabra: 'A' | 'G' | 'E' }),
     marks ({ id: true | false }) y la nota. */
  const KEY = 'estudioSanti.lengua.examenes.v1';
  const EMPTY = { stage: 'doing', answers: {}, sil: {}, marks: {}, nota: null, fecha: null };
  const EXAM_STORE = {
    all() {
      try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; }
    },
    get(id) { return Object.assign({}, EMPTY, this.all()[id] || {}); },
    set(id, data) {
      const all = this.all();
      all[id] = data;
      try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) { /* modo privado */ }
    },
    reset(id) {
      const all = this.all();
      delete all[id];
      try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) { /* ignorar */ }
      return Object.assign({}, EMPTY);
    }
  };

  Object.assign(L, { EXAMENES, EXAM_STORE, EXAM_CLASES: CLASES, EXAM_CUPO: CUPO, EXAM_APROBADO: APROBADO,
    examNota: nota, examTotal: totalPuntos });

  /* Las dos tarjetas van primeras en el menú de Lengua. */
  L.GAMES.unshift(
    { id: 'examen1', type: 'examen', name: '📝 Evaluación', icon: 'fa-file-pen',
      desc: 'El examen de Lengua: qué es cada cosa, las partes de cada texto y agudas, graves y esdrújulas. Lo corrige un adulto.', tint: 'from-red-500 to-rose-700' },
    { id: 'examen2', type: 'examen', name: '🔁 Recuperatorio', icon: 'fa-rotate',
      desc: 'Otro examen con los mismos temas y ejemplos nuevos, por si la Evaluación no salió aprobada.', tint: 'from-slate-600 to-indigo-700' }
  );
})(window.APP);
