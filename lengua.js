/* =======================================================================
   ESTUDIO SANTI · MATERIA "Lengua"
   Contenido de apuntes_de_lengua.md: textos humorísticos, verbos,
   sustantivos, género y número, y adjetivos.

   Se carga después de app.js y agrega la materia a `APP.SUBJECTS`, con la
   misma forma que Ciencias Sociales. Los ejemplos extra (otros verbos,
   sustantivos y adjetivos) sirven para practicar los mismos conceptos.
   ======================================================================= */

(function (APP) {
  'use strict';

  /* ------------------------------ Niveles ------------------------------- */
  const LEVELS = [
    { min: 0,    name: 'Aprendiz',                icon: '🌱' },
    { min: 60,   name: 'Lector curioso',          icon: '📖' },
    { min: 150,  name: 'Buscador de palabras',    icon: '🔎' },
    { min: 300,  name: 'Cazador de verbos',       icon: '🏹' },
    { min: 500,  name: 'Domador de sustantivos',  icon: '🦁' },
    { min: 800,  name: 'Maestro de los adjetivos', icon: '🎓' },
    { min: 1200, name: 'Gran sabio de la lengua', icon: '👑' }
  ];

  /* =====================================================================
     RESUMEN PARA LEER
     ===================================================================== */
  const FICHA = [
    { k: 'Textos humorísticos',  v: 'Buscan provocar risa y diversión' },
    { k: 'Verbos',               v: 'Expresan acciones, situaciones o estados' },
    { k: 'Infinitivo',           v: 'Terminan en AR - ER - IR (jugar, comer, escribir)' },
    { k: 'Raíz',                 v: 'Parte que se mantiene y tiene el significado: JUG(AR)' },
    { k: 'Desinencia',           v: 'Parte que cambia: persona, número y tiempo' },
    { k: 'Tiempos verbales',     v: 'Pasado (ayer jugué), presente (hoy juego), futuro (mañana jugaré)' },
    { k: 'Género',               v: 'Masculino (el, los) · Femenino (la, las)' },
    { k: 'Número',               v: 'Singular (1 solo) · Plural (más de 1)' },
    { k: 'Adjetivos',            v: 'Dicen cómo es o cómo está el sustantivo' },
    { k: 'Clases de adjetivos',  v: 'Calificativos, gentilicios, numerales y ordinales' }
  ];

  const RESUMEN = [
    { t: '1. Textos humorísticos', p: [
      'Son aquellos que buscan provocar risa y diversión mediante situaciones graciosas o exageradas, juegos de palabras y hechos inesperados.'
    ]},
    { t: '2. Verbos', p: [
      'Expresan acciones, situaciones o estados.',
      'Verbos en infinitivo: es la forma en que nombramos a los verbos que terminan en AR - ER - IR. Ejemplos: jugar - comer - escribir.',
      'Raíz: es la parte del verbo que se mantiene y contiene un significado. Ej: JUG(AR).',
      'Desinencia: es la parte del verbo que cambia y nos permite conocer información como la persona, el número y el tiempo verbal. Ej: COM(ER).',
      'Tiempos verbales: pasado (ya pasó: ayer jugué), presente (pasa ahora: hoy juego) y futuro (va a pasar: mañana jugaré).'
    ]},
    { t: '3. Sustantivos', p: [
      'Comunes (ej. mesa) y propios: nombres, ciudades, países (ej. Miguel).',
      'Abstractos: cuando no se pueden ver ni tocar. Son ideas, sentimientos o cualidades. Ej: paz, amor.',
      'Concretos: cuando se pueden ver y tocar. Ej: mesa, lápiz.'
    ]},
    { t: '4. Más sobre sustantivos', p: [
      'Contables: se pueden contar por unidad (1, 2, 3) y admiten forma singular o plural. Ej: niño, 2 niños.',
      'No contables: nombran sustancias, materias, sentimientos o ideas que solo se pueden medir, pesar o dividir, pero no aumentan. Generalmente se usan en singular. Ej: agua.',
      'Individuales: nombran uno solo, se refieren a un solo ejemplar. Ej: alumno, abeja, árbol.',
      'Colectivos: nombran un conjunto formado por muchos del mismo tipo. A pesar de que nombran a muchos, pueden ser singular o plural. Ej: curso (muchos alumnos), enjambre (muchas abejas).'
    ]},
    { t: '5. Género y número del sustantivo', p: [
      'Género masculino: concuerda con EL o LOS. Ej: el libro, los libros.',
      'Género femenino: concuerda con LA o LAS. Ej: la mesa, las mesas.',
      'Número singular: 1 solo elemento. Ej: el libro, la mesa.',
      'Número plural: más de 1 elemento. Ej: los libros, las mesas.'
    ]},
    { t: '6. Adjetivos', p: [
      'Son las palabras que dicen cómo es o cómo está el sustantivo. Siempre acompañan al sustantivo.',
      'Calificativos: dicen cualidades, cómo es. Ej: lindo, feo, alto, bajo.',
      'Gentilicios: dicen de dónde es, de qué país, provincia o ciudad. Ej: argentino, rosarino, santafesino.',
      'Numerales (cardinales): dicen cuántos. Ej: dos perros, cinco lápices, un alumno.',
      'Ordinales: dicen el orden. Ej: primer grado, segundo recreo, tercera fila.'
    ]}
  ];

  /** Cuadro resumen de sustantivos: cada clase con su pareja. */
  const TABLA = {
    title: 'Cuadro resumen de sustantivos',
    cols: ['Una clase', 'Su pareja'],
    rows: [
      ['Común (ej. mesa)',           'Propio (ej. Miguel)'],
      ['Abstracto (ej. paz, alegría)', 'Concreto (ej. lápiz, mesa)'],
      ['Individual (ej. alumno, abeja)', 'Colectivo (ej. dentadura, alumnado)'],
      ['No contable (ej. agua)',     'Contable (ej. niño)']
    ]
  };

  /* =====================================================================
     TRIVIA
     ===================================================================== */
  const TRIVIA = [
    // --- Textos humorísticos ---
    { t: 'Textos humorísticos', q: '¿Qué buscan los textos humorísticos?',
      ok: 'Provocar risa y diversión', bad: ['Enseñar fechas históricas', 'Dar instrucciones', 'Asustar al lector'],
      why: 'Los textos humorísticos buscan provocar risa y diversión.' },
    { t: 'Textos humorísticos', q: '¿Qué usan los textos humorísticos para hacer reír?',
      ok: 'Situaciones graciosas o exageradas, juegos de palabras y hechos inesperados',
      bad: ['Solo fechas y números', 'Definiciones de diccionario', 'Instrucciones paso a paso'],
      why: 'Provocan risa mediante situaciones graciosas o exageradas, juegos de palabras y hechos inesperados.' },

    // --- Verbos ---
    { t: 'Verbos', q: '¿Qué expresan los verbos?',
      ok: 'Acciones, situaciones o estados', bad: ['Cómo es el sustantivo', 'Nombres de personas y lugares', 'De dónde es alguien'],
      why: 'Los verbos expresan acciones, situaciones o estados.' },
    { t: 'Verbos', q: '¿Cómo se llama la forma en que nombramos a los verbos?',
      ok: 'Infinitivo', bad: ['Desinencia', 'Gentilicio', 'Plural'],
      why: 'El infinitivo es la forma en que nombramos a los verbos: terminan en AR - ER - IR.' },
    { t: 'Verbos', q: '¿En qué terminan los verbos en infinitivo?',
      ok: 'AR - ER - IR', bad: ['O - AS - A', 'EL - LA - LOS', 'ADO - IDO'],
      why: 'Los verbos en infinitivo terminan en AR - ER - IR. Ej: jugar, comer, escribir.' },
    { t: 'Verbos', q: '¿Cuál de estos verbos está en infinitivo?',
      ok: 'Escribir', bad: ['Escribí', 'Escribo', 'Escribiré'],
      why: 'Escribir termina en IR: está en infinitivo.' },
    { t: 'Verbos', q: '¿Cuál de estos verbos está en infinitivo?',
      ok: 'Jugar', bad: ['Jugué', 'Juego', 'Jugaré'],
      why: 'Jugar termina en AR: está en infinitivo.' },
    { t: 'Verbos', q: '¿Qué es la raíz de un verbo?',
      ok: 'La parte que se mantiene y contiene el significado', bad: ['La parte que cambia', 'El tiempo verbal', 'El sustantivo que lo acompaña'],
      why: 'La raíz es la parte del verbo que se mantiene y contiene un significado. Ej: JUG(AR).' },
    { t: 'Verbos', q: '¿Qué es la desinencia de un verbo?',
      ok: 'La parte que cambia y nos da información', bad: ['La parte que se mantiene siempre igual', 'Un tipo de adjetivo', 'El nombre de una persona'],
      why: 'La desinencia es la parte del verbo que cambia y nos permite conocer la persona, el número y el tiempo verbal.' },
    { t: 'Verbos', q: '¿Qué información nos da la desinencia?',
      ok: 'La persona, el número y el tiempo verbal', bad: ['El significado del verbo', 'Si es abstracto o concreto', 'De qué país es'],
      why: 'La desinencia nos permite conocer la persona, el número y el tiempo verbal.' },
    { t: 'Verbos', q: 'En el verbo JUGAR, ¿cuál es la raíz?',
      ok: 'JUG', bad: ['AR', 'GAR', 'JUGAR'],
      why: 'JUG(AR): JUG es la raíz, la parte que se mantiene.' },
    { t: 'Verbos', q: 'En el verbo COMER, ¿cuál es la desinencia?',
      ok: 'ER', bad: ['COM', 'CO', 'COMER'],
      why: 'COM(ER): COM es la raíz y ER es la desinencia, la parte que cambia.' },

    // --- Tiempos verbales ---
    { t: 'Tiempos verbales', q: '"Ayer jugué" está en tiempo…',
      ok: 'Pasado', bad: ['Presente', 'Futuro', 'Infinitivo'],
      why: 'Pasado: ya pasó. Ayer jugué.' },
    { t: 'Tiempos verbales', q: '"Hoy juego" está en tiempo…',
      ok: 'Presente', bad: ['Pasado', 'Futuro', 'Infinitivo'],
      why: 'Presente: pasa ahora. Hoy juego.' },
    { t: 'Tiempos verbales', q: '"Mañana jugaré" está en tiempo…',
      ok: 'Futuro', bad: ['Pasado', 'Presente', 'Infinitivo'],
      why: 'Futuro: va a pasar. Mañana jugaré.' },
    { t: 'Tiempos verbales', q: '¿Qué tiempo verbal usamos para algo que YA PASÓ?',
      ok: 'Pasado', bad: ['Presente', 'Futuro', 'Plural'],
      why: 'Pasado: ya pasó.' },
    { t: 'Tiempos verbales', q: '¿Qué tiempo verbal usamos para algo que VA A PASAR?',
      ok: 'Futuro', bad: ['Pasado', 'Presente', 'Singular'],
      why: 'Futuro: va a pasar.' },
    { t: 'Tiempos verbales', q: '"Escribiré un cuento" está en tiempo…',
      ok: 'Futuro', bad: ['Pasado', 'Presente', 'Infinitivo'],
      why: 'Escribiré: es algo que va a pasar, está en futuro.' },
    { t: 'Tiempos verbales', q: '"Comí una manzana" está en tiempo…',
      ok: 'Pasado', bad: ['Presente', 'Futuro', 'Infinitivo'],
      why: 'Comí: ya pasó, está en pasado.' },

    // --- Sustantivos ---
    { t: 'Sustantivos', q: '¿Qué tipo de sustantivo es "Miguel"?',
      ok: 'Propio', bad: ['Común', 'Abstracto', 'Colectivo'],
      why: 'Los sustantivos propios son nombres, ciudades y países. Ej: Miguel.' },
    { t: 'Sustantivos', q: '¿Qué nombran los sustantivos propios?',
      ok: 'Nombres, ciudades y países', bad: ['Ideas y sentimientos', 'Conjuntos de muchos', 'Sustancias que se miden'],
      why: 'Propios: nombres, ciudades, países.' },
    { t: 'Sustantivos', q: '¿Qué es un sustantivo abstracto?',
      ok: 'El que no se puede ver ni tocar', bad: ['El que se puede ver y tocar', 'El que nombra un conjunto', 'El que nombra un país'],
      why: 'Abstractos: no se pueden ver ni tocar. Son ideas, sentimientos o cualidades.' },
    { t: 'Sustantivos', q: '¿Cuál de estos es un sustantivo abstracto?',
      ok: 'Paz', bad: ['Mesa', 'Lápiz', 'Niño'],
      why: 'La paz no se puede ver ni tocar: es abstracto.' },
    { t: 'Sustantivos', q: '¿Cuál de estos es un sustantivo concreto?',
      ok: 'Lápiz', bad: ['Amor', 'Paz', 'Alegría'],
      why: 'El lápiz se puede ver y tocar: es concreto.' },
    { t: 'Sustantivos', q: 'Los sustantivos abstractos son…',
      ok: 'Ideas, sentimientos o cualidades', bad: ['Cosas que se pueden tocar', 'Nombres de ciudades', 'Acciones'],
      why: 'Abstractos: son ideas, sentimientos o cualidades. Ej: paz, amor.' },
    { t: 'Sustantivos', q: '¿Qué es un sustantivo contable?',
      ok: 'Se puede contar por unidad y tiene singular y plural', bad: ['Solo se puede medir o pesar', 'Nombra un conjunto', 'No se puede ver ni tocar'],
      why: 'Contables: se pueden contar por unidad (1, 2, 3) y admiten singular o plural. Ej: niño, 2 niños.' },
    { t: 'Sustantivos', q: '¿Cuál de estos es un sustantivo NO contable?',
      ok: 'Agua', bad: ['Niño', 'Lápiz', 'Mesa'],
      why: 'El agua solo se puede medir, pesar o dividir: es no contable.' },
    { t: 'Sustantivos', q: 'Los sustantivos no contables generalmente se usan en…',
      ok: 'Singular', bad: ['Plural', 'Futuro', 'Infinitivo'],
      why: 'Los no contables generalmente se usan en singular.' },
    { t: 'Sustantivos', q: '¿Qué es un sustantivo colectivo?',
      ok: 'Nombra un conjunto de muchos del mismo tipo', bad: ['Nombra uno solo', 'Nombra un sentimiento', 'Nombra una ciudad'],
      why: 'Colectivos: nombran un conjunto formado por muchos del mismo tipo. Ej: curso, enjambre.' },
    { t: 'Sustantivos', q: '¿Qué nombra la palabra "enjambre"?',
      ok: 'Muchas abejas', bad: ['Una sola abeja', 'Muchos alumnos', 'Un sentimiento'],
      why: 'Enjambre es colectivo: nombra muchas abejas.' },
    { t: 'Sustantivos', q: '"Curso" es un sustantivo colectivo porque nombra…',
      ok: 'Muchos alumnos', bad: ['Un solo alumno', 'Muchas abejas', 'Una idea'],
      why: 'Curso: muchos alumnos.' },
    { t: 'Sustantivos', q: '¿Cuál de estos es un sustantivo individual?',
      ok: 'Abeja', bad: ['Enjambre', 'Alumnado', 'Dentadura'],
      why: 'Individuales: nombran uno solo. Ej: alumno, abeja, árbol.' },
    { t: 'Sustantivos', q: '¿Cuál de estos es un sustantivo colectivo?',
      ok: 'Alumnado', bad: ['Alumno', 'Árbol', 'Abeja'],
      why: 'Alumnado nombra a muchos alumnos: es colectivo.' },

    // --- Género y número ---
    { t: 'Género y número', q: '"El libro" es de género…',
      ok: 'Masculino', bad: ['Femenino', 'Plural', 'Abstracto'],
      why: 'Masculino: concuerda con EL o LOS. El libro.' },
    { t: 'Género y número', q: 'Los sustantivos femeninos concuerdan con…',
      ok: 'LA o LAS', bad: ['EL o LOS', 'AR, ER o IR', 'UNO o DOS'],
      why: 'Femenino: concuerda con LA o LAS. La mesa, las mesas.' },
    { t: 'Género y número', q: '"Las mesas" es…',
      ok: 'Femenino y plural', bad: ['Masculino y singular', 'Femenino y singular', 'Masculino y plural'],
      why: 'LAS: femenino. Más de 1 elemento: plural.' },
    { t: 'Género y número', q: '"Los libros" es…',
      ok: 'Masculino y plural', bad: ['Femenino y plural', 'Masculino y singular', 'Femenino y singular'],
      why: 'LOS: masculino. Más de 1 elemento: plural.' },
    { t: 'Género y número', q: '¿Qué nos dice el número del sustantivo?',
      ok: 'Si es 1 solo elemento o más de 1', bad: ['Si es masculino o femenino', 'En qué orden está', 'De dónde es'],
      why: 'Número: singular (1 solo elemento) o plural (más de 1 elemento).' },
    { t: 'Género y número', q: '"La mesa" está en número…',
      ok: 'Singular', bad: ['Plural', 'Masculino', 'Futuro'],
      why: 'Singular: 1 solo elemento. La mesa.' },

    // --- Adjetivos ---
    { t: 'Adjetivos', q: '¿Qué son los adjetivos?',
      ok: 'Palabras que dicen cómo es o cómo está el sustantivo', bad: ['Palabras que expresan acciones', 'Nombres de personas', 'La parte que cambia del verbo'],
      why: 'Los adjetivos dicen cómo es o cómo está el sustantivo.' },
    { t: 'Adjetivos', q: 'Los adjetivos siempre acompañan al…',
      ok: 'Sustantivo', bad: ['Verbo', 'Infinitivo', 'Texto humorístico'],
      why: 'Los adjetivos siempre acompañan al sustantivo.' },
    { t: 'Adjetivos', q: '"Alto" es un adjetivo…',
      ok: 'Calificativo', bad: ['Gentilicio', 'Numeral', 'Ordinal'],
      why: 'Calificativos: dicen cualidades, cómo es. Ej: lindo, feo, alto, bajo.' },
    { t: 'Adjetivos', q: '¿Qué dicen los adjetivos gentilicios?',
      ok: 'De dónde es: país, provincia o ciudad', bad: ['Cuántos son', 'En qué orden está', 'Cómo es'],
      why: 'Gentilicios: dicen de dónde es, de qué país, provincia o ciudad.' },
    { t: 'Adjetivos', q: '"Rosarino" es un adjetivo…',
      ok: 'Gentilicio', bad: ['Calificativo', 'Numeral', 'Ordinal'],
      why: 'Rosarino dice de dónde es (de Rosario): es gentilicio.' },
    { t: 'Adjetivos', q: '¿Cuál de estos adjetivos es gentilicio?',
      ok: 'Santafesino', bad: ['Lindo', 'Primer', 'Dos'],
      why: 'Santafesino dice de qué provincia es: es gentilicio.' },
    { t: 'Adjetivos', q: 'En "cinco lápices", la palabra "cinco" es un adjetivo…',
      ok: 'Numeral (cardinal)', bad: ['Ordinal', 'Gentilicio', 'Calificativo'],
      why: 'Numerales (cardinales): dicen cuántos. Ej: dos perros, cinco lápices.' },
    { t: 'Adjetivos', q: 'En "tercera fila", la palabra "tercera" es un adjetivo…',
      ok: 'Ordinal', bad: ['Numeral (cardinal)', 'Gentilicio', 'Calificativo'],
      why: 'Ordinales: dicen el orden. Ej: primer grado, segundo recreo, tercera fila.' },
    { t: 'Adjetivos', q: '¿Qué dicen los adjetivos ordinales?',
      ok: 'El orden', bad: ['Cuántos son', 'De dónde es', 'Cómo es'],
      why: 'Ordinales: dicen el orden.' },
    { t: 'Adjetivos', q: '¿Qué dicen los adjetivos numerales (cardinales)?',
      ok: 'Cuántos', bad: ['El orden', 'De dónde es', 'Cómo está'],
      why: 'Numerales (cardinales): dicen cuántos.' }
  ];

  /* =====================================================================
     PASADO, PRESENTE Y FUTURO (usa el juego "línea de tiempo")
     Cada ronda: la misma oración en pasado, presente y futuro. Hay que
     mirar la desinencia del verbo para ordenarlas.
     ===================================================================== */
  const TIMELINE_ROUNDS = [
    { title: 'Verbo jugar', events: [
      { y: 'Pasado',   t: 'Santi jugó a la pelota con sus amigos.' },
      { y: 'Presente', t: 'Santi juega a la pelota con sus amigos.' },
      { y: 'Futuro',   t: 'Santi jugará a la pelota con sus amigos.' }
    ]},
    { title: 'Verbo comer', events: [
      { y: 'Pasado',   t: 'Comimos milanesas con puré.' },
      { y: 'Presente', t: 'Comemos milanesas con puré.' },
      { y: 'Futuro',   t: 'Comeremos milanesas con puré.' }
    ]},
    { title: 'Verbo escribir', events: [
      { y: 'Pasado',   t: 'Escribí un cuento muy gracioso.' },
      { y: 'Presente', t: 'Escribo un cuento muy gracioso.' },
      { y: 'Futuro',   t: 'Escribiré un cuento muy gracioso.' }
    ]},
    { title: 'Verbo correr', events: [
      { y: 'Pasado',   t: 'El perro corrió por el patio.' },
      { y: 'Presente', t: 'El perro corre por el patio.' },
      { y: 'Futuro',   t: 'El perro correrá por el patio.' }
    ]}
  ];

  /* =====================================================================
     UNIR CON FLECHAS
     ===================================================================== */
  const MATCH_ROUNDS = [
    { title: 'Partes del verbo', pairs: [
      { id: 'v1', a: 'Verbo', b: 'Expresa acciones, situaciones o estados' },
      { id: 'v2', a: 'Infinitivo', b: 'Forma en que nombramos a los verbos: AR - ER - IR' },
      { id: 'v3', a: 'Raíz', b: 'Parte que se mantiene y tiene el significado' },
      { id: 'v4', a: 'Desinencia', b: 'Parte que cambia: persona, número y tiempo' }
    ]},
    { title: 'Tiempos verbales', pairs: [
      { id: 't1', a: 'Pasado', b: 'Ya pasó: ayer jugué' },
      { id: 't2', a: 'Presente', b: 'Pasa ahora: hoy juego' },
      { id: 't3', a: 'Futuro', b: 'Va a pasar: mañana jugaré' },
      { id: 't4', a: 'JUG(AR)', b: 'JUG es la raíz' },
      { id: 't5', a: 'COM(ER)', b: 'ER es la desinencia' }
    ]},
    { title: 'Definiciones para recordar', pairs: [
      { id: 's1', a: 'Propios', b: 'Nombres, ciudades, países' },
      { id: 's2', a: 'Abstractos', b: 'No se pueden ver ni tocar: ideas, sentimientos o cualidades' },
      { id: 's3', a: 'Concretos', b: 'Se pueden ver y tocar' },
      { id: 's4', a: 'Textos humorísticos', b: 'Buscan provocar risa y diversión' }
    ]},
    { title: 'Más sobre sustantivos', pairs: [
      { id: 'm1', a: 'Contables', b: 'Se cuentan por unidad: niño, 2 niños' },
      { id: 'm2', a: 'No contables', b: 'Solo se pueden medir, pesar o dividir: agua' },
      { id: 'm3', a: 'Individuales', b: 'Nombran uno solo: alumno, abeja' },
      { id: 'm4', a: 'Colectivos', b: 'Nombran un conjunto de muchos: curso, enjambre' }
    ]},
    { title: 'Cuadro resumen: cada clase con su pareja', pairs: [
      { id: 'p1', a: 'Común (mesa)', b: 'Propio (Miguel)' },
      { id: 'p2', a: 'Abstracto (paz)', b: 'Concreto (lápiz)' },
      { id: 'p3', a: 'Individual (alumno)', b: 'Colectivo (alumnado)' },
      { id: 'p4', a: 'No contable (agua)', b: 'Contable (niño)' }
    ]},
    { title: 'Género y número', pairs: [
      { id: 'g1', a: 'Masculino', b: 'Concuerda con EL o LOS' },
      { id: 'g2', a: 'Femenino', b: 'Concuerda con LA o LAS' },
      { id: 'g3', a: 'Singular', b: '1 solo elemento: el libro, la mesa' },
      { id: 'g4', a: 'Plural', b: 'Más de 1 elemento: los libros, las mesas' }
    ]},
    { title: 'Clases de adjetivos', pairs: [
      { id: 'a1', a: 'Calificativos', b: 'Dicen cualidades: cómo es' },
      { id: 'a2', a: 'Gentilicios', b: 'Dicen de dónde es: país, provincia o ciudad' },
      { id: 'a3', a: 'Numerales (cardinales)', b: 'Dicen cuántos' },
      { id: 'a4', a: 'Ordinales', b: 'Dicen el orden' }
    ]},
    { title: 'Ejemplos de adjetivos', pairs: [
      { id: 'e1', a: 'Lindo, feo, alto, bajo', b: 'Calificativos' },
      { id: 'e2', a: 'Argentino, rosarino, santafesino', b: 'Gentilicios' },
      { id: 'e3', a: 'Dos perros, cinco lápices', b: 'Numerales (cardinales)' },
      { id: 'e4', a: 'Primer grado, tercera fila', b: 'Ordinales' }
    ]}
  ];

  /* =====================================================================
     FLASHCARDS
     ===================================================================== */
  const FLASHCARDS = [
    { id: 'lfc01', deck: 'Textos humorísticos', f: '¿Qué son los textos humorísticos?', b: 'Los que buscan provocar risa y diversión mediante situaciones graciosas o exageradas, juegos de palabras y hechos inesperados.' },

    { id: 'lfc02', deck: 'Verbos', f: '¿Qué expresan los verbos?', b: 'Acciones, situaciones o estados.' },
    { id: 'lfc03', deck: 'Verbos', f: 'Verbos en infinitivo', b: 'Es la forma en que nombramos a los verbos. Terminan en AR - ER - IR. Ej: jugar, comer, escribir.' },
    { id: 'lfc04', deck: 'Verbos', f: 'Raíz', b: 'La parte del verbo que se mantiene y contiene un significado. Ej: JUG(AR).' },
    { id: 'lfc05', deck: 'Verbos', f: 'Desinencia', b: 'La parte del verbo que cambia. Nos dice la persona, el número y el tiempo verbal. Ej: COM(ER).' },
    { id: 'lfc06', deck: 'Verbos', f: 'Pasado', b: 'Ya pasó. Ayer jugué.' },
    { id: 'lfc07', deck: 'Verbos', f: 'Presente', b: 'Pasa ahora. Hoy juego.' },
    { id: 'lfc08', deck: 'Verbos', f: 'Futuro', b: 'Va a pasar. Mañana jugaré.' },

    { id: 'lfc09', deck: 'Sustantivos', f: 'Sustantivos comunes y propios', b: 'Común: mesa. Propios: nombres, ciudades, países. Ej: Miguel.' },
    { id: 'lfc10', deck: 'Sustantivos', f: 'Sustantivos abstractos', b: 'No se pueden ver ni tocar. Son ideas, sentimientos o cualidades. Ej: paz, amor.' },
    { id: 'lfc11', deck: 'Sustantivos', f: 'Sustantivos concretos', b: 'Se pueden ver y tocar. Ej: mesa, lápiz.' },
    { id: 'lfc12', deck: 'Sustantivos', f: 'Sustantivos contables', b: 'Se pueden contar por unidad (1, 2, 3) y admiten singular o plural. Ej: niño, 2 niños.' },
    { id: 'lfc13', deck: 'Sustantivos', f: 'Sustantivos no contables', b: 'Sustancias, materias, sentimientos o ideas que solo se pueden medir, pesar o dividir. Generalmente en singular. Ej: agua.' },
    { id: 'lfc14', deck: 'Sustantivos', f: 'Sustantivos individuales', b: 'Nombran uno solo, un solo ejemplar. Ej: alumno, abeja, árbol.' },
    { id: 'lfc15', deck: 'Sustantivos', f: 'Sustantivos colectivos', b: 'Nombran un conjunto de muchos del mismo tipo. Ej: curso (muchos alumnos), enjambre (muchas abejas).' },
    { id: 'lfc16', deck: 'Sustantivos', f: 'Cuadro resumen', b: 'Común / propio · Abstracto / concreto · Individual / colectivo · No contable / contable.' },

    { id: 'lfc17', deck: 'Género y número', f: 'Género masculino', b: 'Concuerda con EL o LOS. Ej: el libro, los libros.' },
    { id: 'lfc18', deck: 'Género y número', f: 'Género femenino', b: 'Concuerda con LA o LAS. Ej: la mesa, las mesas.' },
    { id: 'lfc19', deck: 'Género y número', f: 'Número singular', b: '1 solo elemento. Ej: el libro, la mesa.' },
    { id: 'lfc20', deck: 'Género y número', f: 'Número plural', b: 'Más de 1 elemento. Ej: los libros, las mesas.' },

    { id: 'lfc21', deck: 'Adjetivos', f: '¿Qué son los adjetivos?', b: 'Palabras que dicen cómo es o cómo está el sustantivo. Siempre acompañan al sustantivo.' },
    { id: 'lfc22', deck: 'Adjetivos', f: 'Adjetivos calificativos', b: 'Dicen cualidades, cómo es. Ej: lindo, feo, alto, bajo.' },
    { id: 'lfc23', deck: 'Adjetivos', f: 'Adjetivos gentilicios', b: 'Dicen de dónde es: de qué país, provincia o ciudad. Ej: argentino, rosarino, santafesino.' },
    { id: 'lfc24', deck: 'Adjetivos', f: 'Adjetivos numerales (cardinales)', b: 'Dicen cuántos. Ej: dos perros, cinco lápices, un alumno.' },
    { id: 'lfc25', deck: 'Adjetivos', f: 'Adjetivos ordinales', b: 'Dicen el orden. Ej: primer grado, segundo recreo, tercera fila.' }
  ];

  /* =====================================================================
     ARCADES: CLASIFICAR EN BALDES
     ===================================================================== */
  const CLASSIFY_GAMES = {
    adjetivos: {
      title: 'Cazador de adjetivos',
      question: '¿Qué clase de adjetivo es?',
      buckets: [
        { id: 'calif',  name: 'Calificativo', icon: 'fa-wand-magic-sparkles', cls: 'bucket-amber' },
        { id: 'gent',   name: 'Gentilicio',   icon: 'fa-location-dot',        cls: 'bucket-sky' },
        { id: 'num',    name: 'Numeral',      icon: 'fa-hashtag',             cls: 'bucket-emerald' },
        { id: 'ord',    name: 'Ordinal',      icon: 'fa-list-ol',             cls: 'bucket-indigo' }
      ],
      items: [
        { t: 'Un chico alto',        p: 'calif', s: 'Adjetivo: alto' },
        { t: 'Un árbol bajo',        p: 'calif', s: 'Adjetivo: bajo' },
        { t: 'Un dibujo lindo',      p: 'calif', s: 'Adjetivo: lindo' },
        { t: 'Un monstruo feo',      p: 'calif', s: 'Adjetivo: feo' },
        { t: 'Un perro grande',      p: 'calif', s: 'Adjetivo: grande' },
        { t: 'Un chiste divertido',  p: 'calif', s: 'Adjetivo: divertido' },

        { t: 'Un jugador argentino', p: 'gent', s: 'Adjetivo: argentino' },
        { t: 'Un chico rosarino',    p: 'gent', s: 'Adjetivo: rosarino' },
        { t: 'Un pueblo santafesino', p: 'gent', s: 'Adjetivo: santafesino' },
        { t: 'Un alfajor cordobés',  p: 'gent', s: 'Adjetivo: cordobés' },
        { t: 'Una cantante brasileña', p: 'gent', s: 'Adjetivo: brasileña' },

        { t: 'Dos perros',           p: 'num', s: 'Adjetivo: dos' },
        { t: 'Cinco lápices',        p: 'num', s: 'Adjetivo: cinco' },
        { t: 'Un alumno',            p: 'num', s: 'Adjetivo: un' },
        { t: 'Tres libros',          p: 'num', s: 'Adjetivo: tres' },
        { t: 'Diez figuritas',       p: 'num', s: 'Adjetivo: diez' },

        { t: 'Primer grado',         p: 'ord', s: 'Adjetivo: primer' },
        { t: 'Segundo recreo',       p: 'ord', s: 'Adjetivo: segundo' },
        { t: 'Tercera fila',         p: 'ord', s: 'Adjetivo: tercera' },
        { t: 'Cuarto piso',          p: 'ord', s: 'Adjetivo: cuarto' },
        { t: 'Quinto lugar',         p: 'ord', s: 'Adjetivo: quinto' }
      ]
    },
    sustantivos: {
      title: '¿Abstracto o concreto?',
      question: '¿Se puede ver y tocar?',
      buckets: [
        { id: 'abstracto', name: 'Abstracto', icon: 'fa-heart', cls: 'bucket-indigo' },
        { id: 'concreto',  name: 'Concreto',  icon: 'fa-cube',  cls: 'bucket-amber' }
      ],
      items: [
        { t: 'Paz',        p: 'abstracto', s: 'Sustantivo' },
        { t: 'Amor',       p: 'abstracto', s: 'Sustantivo' },
        { t: 'Alegría',    p: 'abstracto', s: 'Sustantivo' },
        { t: 'Amistad',    p: 'abstracto', s: 'Sustantivo' },
        { t: 'Tristeza',   p: 'abstracto', s: 'Sustantivo' },
        { t: 'Miedo',      p: 'abstracto', s: 'Sustantivo' },
        { t: 'Valentía',   p: 'abstracto', s: 'Sustantivo' },
        { t: 'Felicidad',  p: 'abstracto', s: 'Sustantivo' },
        { t: 'Libertad',   p: 'abstracto', s: 'Sustantivo' },

        { t: 'Mesa',       p: 'concreto', s: 'Sustantivo' },
        { t: 'Lápiz',      p: 'concreto', s: 'Sustantivo' },
        { t: 'Niño',       p: 'concreto', s: 'Sustantivo' },
        { t: 'Abeja',      p: 'concreto', s: 'Sustantivo' },
        { t: 'Árbol',      p: 'concreto', s: 'Sustantivo' },
        { t: 'Libro',      p: 'concreto', s: 'Sustantivo' },
        { t: 'Pelota',     p: 'concreto', s: 'Sustantivo' },
        { t: 'Agua',       p: 'concreto', s: 'Sustantivo' },
        { t: 'Perro',      p: 'concreto', s: 'Sustantivo' }
      ]
    },
    verbos: {
      title: '¿Pasado, presente o futuro?',
      question: '¿En qué tiempo está el verbo?',
      buckets: [
        { id: 'pasado',   name: 'Pasado',   icon: 'fa-backward', cls: 'bucket-sky' },
        { id: 'presente', name: 'Presente', icon: 'fa-play',     cls: 'bucket-emerald' },
        { id: 'futuro',   name: 'Futuro',   icon: 'fa-forward',  cls: 'bucket-amber' }
      ],
      items: [
        { t: 'Jugué',     p: 'pasado',   s: 'Verbo jugar' },
        { t: 'Juego',     p: 'presente', s: 'Verbo jugar' },
        { t: 'Jugaré',    p: 'futuro',   s: 'Verbo jugar' },
        { t: 'Comí',      p: 'pasado',   s: 'Verbo comer' },
        { t: 'Como',      p: 'presente', s: 'Verbo comer' },
        { t: 'Comeré',    p: 'futuro',   s: 'Verbo comer' },
        { t: 'Escribí',   p: 'pasado',   s: 'Verbo escribir' },
        { t: 'Escribo',   p: 'presente', s: 'Verbo escribir' },
        { t: 'Escribiré', p: 'futuro',   s: 'Verbo escribir' },
        { t: 'Corrí',     p: 'pasado',   s: 'Verbo correr' },
        { t: 'Corro',     p: 'presente', s: 'Verbo correr' },
        { t: 'Correré',   p: 'futuro',   s: 'Verbo correr' },
        { t: 'Canté',     p: 'pasado',   s: 'Verbo cantar' },
        { t: 'Canto',     p: 'presente', s: 'Verbo cantar' },
        { t: 'Cantaré',   p: 'futuro',   s: 'Verbo cantar' },
        { t: 'Leí',       p: 'pasado',   s: 'Verbo leer' },
        { t: 'Leo',       p: 'presente', s: 'Verbo leer' },
        { t: 'Leeré',     p: 'futuro',   s: 'Verbo leer' }
      ]
    }
  };

  /* =====================================================================
     DETECTIVE DE PALABRAS
     Una oración con una palabra marcada entre *asteriscos*. Primero hay
     que decir qué clase de palabra es y después contestar dos preguntas
     más sobre ella (tipo de sustantivo, tiempo verbal, raíz y desinencia,
     tipo de adjetivo…). Las preguntas se arman solas a partir de los datos.
     ===================================================================== */

  /* Sustantivos. tipo: comun/propio · abs: abstracto/concreto ·
     ind: individual/colectivo · cont: contable/no contable ·
     gen: masc/fem · num: sing/plural. null = esa pregunta no se hace. */
  const D_SUSTANTIVOS = [
    { s: 'El *perro* de Juan ladra fuerte.',            tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'masc', num: 'sing' },
    { s: 'Las *mesas* del aula son nuevas.',            tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'fem',  num: 'plural' },
    { s: 'Los *lápices* están en la cartuchera.',       tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'masc', num: 'plural' },
    { s: 'Los *niños* juegan en la plaza.',             tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'masc', num: 'plural' },
    { s: 'Las *abejas* hacen miel.',                    tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'fem',  num: 'plural' },
    { s: 'El *árbol* del patio es muy alto.',           tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'masc', num: 'sing' },
    { s: 'Los *libros* están en la biblioteca.',        tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'masc', num: 'plural' },
    { s: 'La *pelota* quedó en el techo.',              tipo: 'comun', abs: 'concreto', ind: 'individual', cont: 'contable', gen: 'fem',  num: 'sing' },
    { s: 'Un *enjambre* voló sobre el jardín.',         tipo: 'comun', abs: 'concreto', ind: 'colectivo', de: 'muchas abejas',   cont: 'contable', gen: 'masc', num: 'sing' },
    { s: 'El *alumnado* salió al recreo.',              tipo: 'comun', abs: 'concreto', ind: 'colectivo', de: 'muchos alumnos',  cont: null,       gen: 'masc', num: 'sing' },
    { s: 'El *rebaño* come pasto en el campo.',         tipo: 'comun', abs: 'concreto', ind: 'colectivo', de: 'muchas ovejas',   cont: 'contable', gen: 'masc', num: 'sing' },
    { s: 'Los *rebaños* bajan de la montaña.',          tipo: 'comun', abs: 'concreto', ind: 'colectivo', de: 'muchas ovejas',   cont: 'contable', gen: 'masc', num: 'plural' },
    { s: 'Vimos un *cardumen* en el río.',              tipo: 'comun', abs: 'concreto', ind: 'colectivo', de: 'muchos peces',    cont: 'contable', gen: 'masc', num: 'sing' },
    { s: 'La *dentadura* del tiburón es filosa.',       tipo: 'comun', abs: 'concreto', ind: 'colectivo', de: 'muchos dientes',  cont: null,       gen: 'fem',  num: 'sing' },
    { s: 'Una *jauría* corría por el bosque.',          tipo: 'comun', abs: 'concreto', ind: 'colectivo', de: 'muchos perros',   cont: 'contable', gen: 'fem',  num: 'sing' },
    { s: 'Tomé un vaso de *agua* fresca.',              tipo: 'comun', abs: 'concreto', ind: null, cont: 'no contable', gen: null,  num: 'sing' },
    { s: 'Jugamos con la *arena* de la playa.',         tipo: 'comun', abs: 'concreto', ind: null, cont: 'no contable', gen: 'fem', num: 'sing' },
    { s: 'Compré *leche* en el almacén.',               tipo: 'comun', abs: 'concreto', ind: null, cont: 'no contable', gen: 'fem', num: 'sing' },
    { s: 'Mamá usó *harina* para la torta.',            tipo: 'comun', abs: 'concreto', ind: null, cont: 'no contable', gen: 'fem', num: 'sing' },
    { s: 'Siento mucha *alegría* hoy.',                 tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'fem',  num: 'sing' },
    { s: 'Queremos *paz* en el mundo.',                 tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'fem',  num: 'sing' },
    { s: 'El *amor* de mi mamá es enorme.',             tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'masc', num: 'sing' },
    { s: 'Tuve *miedo* durante la tormenta.',           tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'masc', num: 'sing' },
    { s: 'La *amistad* es muy importante.',             tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'fem',  num: 'sing' },
    { s: 'La *bondad* de Ana es admirable.',            tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'fem',  num: 'sing' },
    { s: 'Me dio mucha *tristeza* la película.',        tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'fem',  num: 'sing' },
    { s: 'Tus *ideas* son geniales.',                   tipo: 'comun', abs: 'abstracto', ind: null, cont: null, gen: 'fem',  num: 'plural' },
    { s: '*Miguel* juega al fútbol.',                   tipo: 'propio', abs: null, ind: null, cont: null, gen: 'masc', num: 'sing' },
    { s: 'Mañana viajamos a *Rosario*.',                tipo: 'propio', abs: null, ind: null, cont: null, gen: null,   num: 'sing' },
    { s: 'Vivo en *Argentina*.',                        tipo: 'propio', abs: null, ind: null, cont: null, gen: null,   num: 'sing' },
    { s: '*Santa Fe* es mi provincia.',                 tipo: 'propio', abs: null, ind: null, cont: null, gen: null,   num: 'sing' },
    { s: '*Lucía* trajo galletitas.',                   tipo: 'propio', abs: null, ind: null, cont: null, gen: 'fem',  num: 'sing' }
  ];

  /* Verbos regulares: tiempo, infinitivo y dónde termina la raíz. */
  const D_VERBOS = [
    { s: 'Ayer *canté* en el acto.',                    tiempo: 'pasado',   inf: 'cantar',   raiz: 'cant' },
    { s: 'Ayer *comí* fideos con salsa.',               tiempo: 'pasado',   inf: 'comer',    raiz: 'com' },
    { s: 'El sábado *corrimos* en el parque.',          tiempo: 'pasado',   inf: 'correr',   raiz: 'corr' },
    { s: 'Anoche Sofía *escribió* un cuento.',          tiempo: 'pasado',   inf: 'escribir', raiz: 'escrib' },
    { s: 'En la fiesta *bailaron* toda la noche.',      tiempo: 'pasado',   inf: 'bailar',   raiz: 'bail' },
    { s: 'Ayer *saltaste* la soga en el recreo.',       tiempo: 'pasado',   inf: 'saltar',   raiz: 'salt' },
    { s: 'El verano pasado *aprendí* a nadar.',         tiempo: 'pasado',   inf: 'aprender', raiz: 'aprend' },
    { s: 'Mi abuelo *vivió* en el campo.',              tiempo: 'pasado',   inf: 'vivir',    raiz: 'viv' },

    { s: 'Hoy *canto* en el coro.',                     tiempo: 'presente', inf: 'cantar',   raiz: 'cant' },
    { s: 'Ahora *como* una manzana.',                   tiempo: 'presente', inf: 'comer',    raiz: 'com' },
    { s: 'Mi hermana *escribe* una carta.',             tiempo: 'presente', inf: 'escribir', raiz: 'escrib' },
    { s: 'Los chicos *corren* en el patio.',            tiempo: 'presente', inf: 'correr',   raiz: 'corr' },
    { s: 'Nosotros *comemos* a las doce.',              tiempo: 'presente', inf: 'comer',    raiz: 'com' },
    { s: 'Ella *salta* muy alto.',                      tiempo: 'presente', inf: 'saltar',   raiz: 'salt' },
    { s: 'Hoy *vivo* en Santa Fe.',                     tiempo: 'presente', inf: 'vivir',    raiz: 'viv' },
    { s: 'Ustedes *aprenden* muy rápido.',              tiempo: 'presente', inf: 'aprender', raiz: 'aprend' },

    { s: 'Mañana *jugaré* al fútbol.',                  tiempo: 'futuro',   inf: 'jugar',    raiz: 'jug' },
    { s: 'Mañana *comeremos* pizza.',                   tiempo: 'futuro',   inf: 'comer',    raiz: 'com' },
    { s: 'En las vacaciones *viajaré* a Córdoba.',      tiempo: 'futuro',   inf: 'viajar',   raiz: 'viaj' },
    { s: 'Mañana *escribirás* el final del cuento.',    tiempo: 'futuro',   inf: 'escribir', raiz: 'escrib' },
    { s: 'El domingo *correrán* una carrera.',          tiempo: 'futuro',   inf: 'correr',   raiz: 'corr' },
    { s: 'En el acto *cantaremos* el himno.',           tiempo: 'futuro',   inf: 'cantar',   raiz: 'cant' },
    { s: 'Pronto mi hermanito *aprenderá* a leer.',     tiempo: 'futuro',   inf: 'aprender', raiz: 'aprend' },
    { s: 'El sábado *bailaré* en la fiesta.',           tiempo: 'futuro',   inf: 'bailar',   raiz: 'bail' }
  ];

  /* Adjetivos: tipo y el sustantivo al que acompañan. */
  const D_ADJETIVOS = [
    { s: 'Tengo un perro *juguetón*.',                  tipo: 'calif', sus: 'perro' },
    { s: 'Esa casa es muy *linda*.',                    tipo: 'calif', sus: 'casa' },
    { s: 'El gato *negro* duerme en el sillón.',        tipo: 'calif', sus: 'gato' },
    { s: 'Las flores *rojas* son de mi mamá.',          tipo: 'calif', sus: 'flores' },
    { s: 'El payaso contó un chiste *gracioso*.',       tipo: 'calif', sus: 'chiste' },
    { s: 'La sopa está *caliente*.',                    tipo: 'calif', sus: 'sopa' },
    { s: 'Mi hermano es *alto*.',                       tipo: 'calif', sus: 'hermano' },

    { s: 'Messi es un jugador *rosarino*.',             tipo: 'gent',  sus: 'jugador' },
    { s: 'La bandera *argentina* es celeste y blanca.', tipo: 'gent',  sus: 'bandera' },
    { s: 'Mi tía es una maestra *santafesina*.',        tipo: 'gent',  sus: 'maestra' },
    { s: 'Comimos unos alfajores *cordobeses*.',        tipo: 'gent',  sus: 'alfajores' },
    { s: 'Conocí a un chico *brasileño*.',              tipo: 'gent',  sus: 'chico' },
    { s: 'La pizza *italiana* es riquísima.',           tipo: 'gent',  sus: 'pizza' },

    { s: 'Tengo *dos* perros en mi casa.',              tipo: 'num',   sus: 'perros' },
    { s: 'Compré *cinco* lápices nuevos.',              tipo: 'num',   sus: 'lápices' },
    { s: 'En el aula hay *veinte* sillas.',             tipo: 'num',   sus: 'sillas' },
    { s: 'La araña tiene *ocho* patas.',                tipo: 'num',   sus: 'patas' },
    { s: 'Anoche leí *tres* cuentos.',                  tipo: 'num',   sus: 'cuentos' },
    { s: 'El equipo metió *cuatro* goles.',             tipo: 'num',   sus: 'goles' },

    { s: 'Estoy en *cuarto* grado.',                    tipo: 'ord',   sus: 'grado' },
    { s: 'Me senté en la *tercera* fila.',              tipo: 'ord',   sus: 'fila' },
    { s: 'Después del *segundo* recreo tenemos Lengua.', tipo: 'ord',  sus: 'recreo' },
    { s: 'Vivo en el *quinto* piso.',                   tipo: 'ord',   sus: 'piso' },
    { s: 'Hoy es el *primer* día de clases.',           tipo: 'ord',   sus: 'día' },
    { s: 'Mi caballo llegó en *sexto* lugar.',          tipo: 'ord',   sus: 'lugar' }
  ];

  const wordOf = (s) => s.split('*')[1];
  const ADJ_TIPOS = {
    calif: { n: 'Calificativo',          why: 'dice una cualidad: cómo es o cómo está.' },
    gent:  { n: 'Gentilicio',            why: 'dice de dónde es: de qué país, provincia o ciudad.' },
    num:   { n: 'Numeral (cardinal)',    why: 'dice cuántos hay.' },
    ord:   { n: 'Ordinal',               why: 'dice el orden.' }
  };
  const TIEMPOS = {
    pasado:   'ya pasó',
    presente: 'pasa ahora',
    futuro:   'va a pasar'
  };
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const art = (gen, num) => (gen === 'masc' ? (num === 'sing' ? 'el' : 'los') : (num === 'sing' ? 'la' : 'las'));

  /* Cada paso: { tag, q, ok, opts, why, mix }. Con mix: true el juego mezcla
     las opciones; sin él quedan en orden (Sustantivo/Verbo/Adjetivo, etc.). */

  /** Pregunta 1, igual para todas: ¿qué clase de palabra es? */
  function claseStep(w, clase, why) {
    return { tag: 'Clase de palabra', q: '¿Qué clase de palabra es «' + w + '»?',
      ok: clase, opts: ['Sustantivo', 'Verbo', 'Adjetivo'], why: why };
  }

  function sustantivoCase(d) {
    const w = wordOf(d.s);
    const pool = [];
    if (d.tipo) pool.push({ tag: 'Común o propio', q: '«' + w + '» es un sustantivo…',
      ok: d.tipo === 'propio' ? 'Propio' : 'Común', opts: ['Común', 'Propio'],
      why: d.tipo === 'propio' ? 'Es propio: es el nombre de una persona, ciudad o país, y va con mayúscula.' : 'Es común: nombra a cualquiera de su clase, como «mesa».' });
    if (d.abs) pool.push({ tag: 'Abstracto o concreto', q: '«' + w + '» es…',
      ok: cap(d.abs), opts: ['Concreto', 'Abstracto'],
      why: d.abs === 'abstracto' ? 'Es abstracto: no se puede ver ni tocar, es una idea, un sentimiento o una cualidad.' : 'Es concreto: se puede ver y tocar.' });
    if (d.ind) pool.push({ tag: 'Individual o colectivo', q: '«' + w + '» es…',
      ok: cap(d.ind), opts: ['Individual', 'Colectivo'],
      why: d.ind === 'colectivo' ? 'Es colectivo: nombra un conjunto de ' + d.de + '.' : 'Es individual: nombra uno solo.' });
    if (d.cont) pool.push({ tag: 'Contable o no contable', q: '«' + w + '» es…',
      ok: cap(d.cont), opts: ['Contable', 'No contable'],
      why: d.cont === 'contable' ? 'Es contable: se puede contar por unidad (1, 2, 3).' : 'Es no contable: solo se puede medir, pesar o dividir.' });
    if (d.gen) pool.push({ tag: 'Género', q: '¿De qué género es «' + w + '»?',
      ok: d.gen === 'masc' ? 'Masculino' : 'Femenino', opts: ['Masculino', 'Femenino'],
      why: 'Concuerda con ' + art(d.gen, d.num).toUpperCase() + ': «' + art(d.gen, d.num) + ' ' + w + '». ' + (d.gen === 'masc' ? 'Masculino va con EL o LOS.' : 'Femenino va con LA o LAS.') });
    if (d.num) pool.push({ tag: 'Número', q: '¿«' + w + '» está en singular o en plural?',
      ok: d.num === 'sing' ? 'Singular' : 'Plural', opts: ['Singular', 'Plural'],
      why: d.num === 'sing' ? 'Singular: nombra 1 solo elemento.' : 'Plural: nombra más de 1 elemento.' });
    return { s: d.s, w: w, steps: [claseStep(w, 'Sustantivo', 'Es un sustantivo: nombra personas, animales, cosas, lugares, ideas o sentimientos.')].concat(APP.pick(pool, 2)) };
  }

  /** Opciones para separar raíz y desinencia: la buena y cortes corridos. */
  function cortes(w, p) {
    const cut = (k) => w.slice(0, k) + ' | ' + w.slice(k);
    const alt = [p - 1, p + 1, p + 2, p - 2].filter((k) => k >= 1 && k < w.length).slice(0, 3);
    return { ok: cut(p), opts: [cut(p)].concat(alt.map(cut)) };
  }

  function verboCase(d) {
    const w = wordOf(d.s);
    const c = cortes(w, d.raiz.length);
    const des = w.slice(d.raiz.length);
    const steps = [
      claseStep(w, 'Verbo', 'Es un verbo: expresa una acción, situación o estado. Su infinitivo es «' + d.inf + '».'),
      { tag: 'Tiempo verbal', q: '¿En qué tiempo está «' + w + '»?',
        ok: cap(d.tiempo), opts: ['Pasado', 'Presente', 'Futuro'],
        why: cap(d.tiempo) + ': ' + TIEMPOS[d.tiempo] + '. Lo dice la desinencia «' + des + '».' }
    ];
    const why = 'Viene de ' + d.inf.toUpperCase() + '. La raíz «' + d.raiz + '» se mantiene y tiene el significado; la desinencia «' + des + '» cambia y dice la persona, el número y el tiempo.';
    steps.push(APP.pick([
      { tag: 'Raíz y desinencia', q: '¿Cómo se separa «' + w + '» en raíz | desinencia?', mix: true, ok: c.ok, opts: c.opts, why: why },
      { tag: 'Raíz', mix: true, q: '¿Cuál es la raíz de «' + w + '»?', ok: d.raiz,
        opts: [d.raiz, w.slice(0, d.raiz.length + 1), d.raiz.slice(0, -1), d.inf], why: why },
      { tag: 'Desinencia', mix: true, q: '¿Cuál es la desinencia de «' + w + '»?', ok: des,
        opts: [des, des.slice(1) || w, d.raiz.slice(-1) + des, w], why: why }
    ], 1)[0]);
    return { s: d.s, w: w, steps: steps };
  }

  function adjetivoCase(d) {
    const w = wordOf(d.s);
    const t = ADJ_TIPOS[d.tipo];
    // Distractores para "¿a qué sustantivo acompaña?": otras palabras de la oración.
    const otras = d.s.replace(/\*[^*]+\*/, '').replace(/[.,]/g, '').split(/\s+/)
      .filter((x) => x.length > 3 && x !== d.sus);
    const extra = APP.pick(otras, 2);
    while (extra.length < 2) extra.push(['mesa', 'escuela', 'amigo'][extra.length]);
    return { s: d.s, w: w, steps: [
      claseStep(w, 'Adjetivo', 'Es un adjetivo: dice cómo es el sustantivo «' + d.sus + '» y siempre lo acompaña.'),
      { tag: 'Tipo de adjetivo', q: '¿Qué tipo de adjetivo es «' + w + '»?',
        ok: t.n, opts: ['Calificativo', 'Gentilicio', 'Numeral (cardinal)', 'Ordinal'],
        why: 'Es ' + t.n.toLowerCase() + ': ' + t.why },
      { tag: '¿A quién acompaña?', mix: true, q: '¿A qué sustantivo acompaña «' + w + '»?',
        ok: d.sus, opts: [d.sus].concat(extra),
        why: 'Los adjetivos siempre acompañan al sustantivo: «' + w + '» dice algo de «' + d.sus + '».' }
    ]};
  }

  const DETECTIVE = {
    title: 'Detective de palabras',
    /** Arma una partida: 2 sustantivos, 2 verbos y 2 adjetivos, mezclados. */
    build() {
      return APP.shuffle(
        APP.pick(D_SUSTANTIVOS, 2).map(sustantivoCase)
          .concat(APP.pick(D_VERBOS, 2).map(verboCase))
          .concat(APP.pick(D_ADJETIVOS, 2).map(adjetivoCase))
      );
    }
  };

  /* =====================================================================
     CATÁLOGO DE JUEGOS
     ===================================================================== */
  const GAMES = [
    { id: 'trivia',      type: 'trivia', name: 'Trivia contrarreloj', icon: 'fa-brain',
      desc: '10 preguntas con reloj, racha y puntos extra.', tint: 'from-indigo-500 to-violet-600' },
    { id: 'tiempo',      type: 'timeline', name: 'Pasado, presente y futuro', icon: 'fa-clock-rotate-left',
      desc: 'Ordená cada oración: primero el pasado, después el presente y al final el futuro.', tint: 'from-sky-500 to-cyan-600' },
    { id: 'unir',        type: 'match', name: 'Unir con flechas', icon: 'fa-diagram-project',
      desc: 'Arrastrá cada concepto hasta su definición.', tint: 'from-emerald-500 to-teal-600' },
    { id: 'detective',   type: 'detective', name: 'Detective de palabras', icon: 'fa-magnifying-glass',
      desc: '¿Sustantivo, verbo o adjetivo? Descubrí la clase, el tipo, el tiempo, la raíz y la desinencia.', tint: 'from-teal-500 to-sky-600' },
    { id: 'cartas',      type: 'cards', name: 'Flashcards', icon: 'fa-clone',
      desc: 'Repaso rápido: tocá la tarjeta para darla vuelta.', tint: 'from-amber-500 to-orange-600' },
    { id: 'adjetivos',   type: 'classify', name: 'Cazador de adjetivos', icon: 'fa-bolt',
      desc: '¡Arcade! ¿Calificativo, gentilicio, numeral u ordinal? Clasificá antes de que se acabe el tiempo.', tint: 'from-fuchsia-500 to-pink-600' },
    { id: 'sustantivos', type: 'classify', name: '¿Abstracto o concreto?', icon: 'fa-cube',
      desc: '¡Arcade! ¿Se puede ver y tocar? Tirá cada sustantivo al balde correcto.', tint: 'from-rose-500 to-orange-500' },
    { id: 'verbos',      type: 'classify', name: '¿Pasado, presente o futuro?', icon: 'fa-forward',
      desc: '¡Arcade! Mirá la desinencia y tirá cada verbo al balde de su tiempo.', tint: 'from-violet-500 to-purple-700' },
    { id: 'resumen',     type: 'resumen', name: 'Resumen para leer', icon: 'fa-book-open',
      desc: 'Todo el tema ordenado, para repasar antes de jugar.', tint: 'from-slate-500 to-slate-700' }
  ];

  /* =====================================================================
     MATERIA
     ===================================================================== */
  APP.SUBJECTS.lengua = {
    id: 'lengua',
    name: 'Lengua',
    short: 'Lengua',
    icon: 'fa-spell-check',
    tint: 'from-rose-500 to-amber-500',
    heroText: 'from-rose-600 via-pink-600 to-amber-500',
    topic: 'Verbos, sustantivos y adjetivos',
    intro: 'Textos humorísticos, verbos y sus tiempos, clases de sustantivos, género y número, y adjetivos. ¡Elegí un juego y a jugar!',
    expert: 'Lengua',
    tip: 'arrancá por el <b>Resumen</b> o las <b>Flashcards</b>, y después probá la <b>Trivia</b>, el <b>Detective de palabras</b>, <b>Pasado, presente y futuro</b> y los arcades para ver cuánto te acordás. Cada partida te da XP para subir de nivel.',
    source: 'Lengua — apuntes de clase',
    storeKey: 'estudioSanti.lengua.v1',
    LEVELS,
    FICHA, RESUMEN, TABLA,
    TRIVIA,
    TIMELINE: {
      rounds: TIMELINE_ROUNDS,
      hint: 'Mirá el verbo y tocá las oraciones <b>en orden</b>: primero el pasado, después el presente y al final el futuro.',
      art: 'las', noun: 'oraciones'
    },
    MATCH_ROUNDS, FLASHCARDS, CLASSIFY_GAMES, DETECTIVE, GAMES
  };
})(window.APP);
