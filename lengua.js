/* =======================================================================
   ESTUDIO SANTI · MATERIA "Lengua"
   Contenido de las fotocopias de clase: publicidad y propaganda, la
   historieta, la noticia y las reglas de tilde (agudas, graves y
   esdrújulas).

   Se carga después de app.js y agrega la materia a `APP.SUBJECTS`, con la
   misma forma que Ciencias Sociales. Los ejemplos (historietas, noticias
   y avisos) están armados con datos: la app los dibuja y marca sus partes.
   ======================================================================= */

(function (APP) {
  'use strict';

  /* ------------------------------ Niveles ------------------------------- */
  const LEVELS = [
    { min: 0,    name: 'Aprendiz',                  icon: '🌱' },
    { min: 60,   name: 'Lector curioso',            icon: '📖' },
    { min: 150,  name: 'Cazador de tildes',         icon: '🏹' },
    { min: 300,  name: 'Dibujante de historietas', icon: '✏️' },
    { min: 500,  name: 'Periodista estrella',       icon: '📰' },
    { min: 800,  name: 'Publicista genial',         icon: '📣' },
    { min: 1200, name: 'Gran sabio de la lengua',   icon: '👑' }
  ];

  /* =====================================================================
     RESUMEN PARA LEER
     ===================================================================== */
  const FICHA = [
    { k: 'Publicidad',         v: 'Quiere VENDER algo. Pista: COMPRÁ / VENTA' },
    { k: 'Propaganda',         v: 'Quiere CONVENCER de una idea. Pista: CUIDÁ / AYUDÁ / NO TIRES' },
    { k: 'Historieta',         v: 'Cuenta una historia con dibujos, globos, onomatopeyas y menos palabras' },
    { k: 'Cartelera',          v: 'Voz del NARRADOR. Cuadradito rectangular: "Al otro día…"' },
    { k: 'Globo',              v: 'Voz del PERSONAJE. Lo que dice o piensa' },
    { k: 'Onomatopeya',        v: 'Palabras que representan sonidos: ¡PUM! ¡CRASH! ¡ZAS!' },
    { k: 'Metáforas visuales', v: 'Dibujitos que muestran una idea sin palabras: 💡 idea' },
    { k: 'Noticia',            v: 'Texto informativo que cuenta un hecho REAL' },
    { k: 'Partes de la noticia', v: 'Volanta, título, copete, cuerpo, imagen y epígrafe' },
    { k: 'Agudas',             v: 'Fuerza en la ÚLTIMA. Tilde si terminan en N, S o vocal' },
    { k: 'Graves',             v: 'Fuerza en la ANTEÚLTIMA. Tilde si NO terminan en N, S o vocal' },
    { k: 'Esdrújulas',         v: 'Fuerza en la ANTEPENÚLTIMA. ¡SIEMPRE llevan tilde!' }
  ];

  const RESUMEN = [
    { t: '1. Publicidad y propaganda', p: [
      'PUBLICIDAD: quiere VENDER algo. Ej: la juguetería CAPIPLASAN de Santino dice: "¡Comprá nuestros juguetes!". Usa palabras lindas para convencerte: feliz, saludable, emocionante.',
      'PROPAGANDA: quiere CONVENCER de una idea, no vender. Ej: cuidar el ambiente, comer saludable, no tirar basura. No te pide que compres, te pide que cambies tu conducta.',
      '¿Cómo nos damos cuenta? Si dice COMPRÁ / VENTA = Publicidad. Si dice CUIDÁ / AYUDÁ / NO TIRES = Propaganda.'
    ]},
    { t: '2. La historieta', p: [
      'Es un género literario: cuenta una historia, tiene personajes y aventura, igual que un cuento.',
      '¿En qué se parece al cuento? Tiene historia, personajes y aventura.',
      '¿En qué es diferente? Usa dibujos, globos, onomatopeyas y menos palabras. Con la imagen ya se ve la cara de miedo: no hace falta describirlo mucho con palabras.'
    ]},
    { t: '3. Elementos de la historieta', p: [
      'CARTELERA = VOZ DEL NARRADOR. Cuadradito rectangular. Cuenta la historia. Ej: "Al otro día…".',
      'GLOBO = VOZ DEL PERSONAJE. Redondito con colita que sale de la boca. Es lo que dice o piensa.',
      'ONOMATOPEYAS = palabras que representan sonidos. Ej: ¡PUM! ¡CRASH! ¡ZAS! ¡TOC TOC! ¡RING RING!',
      'METÁFORAS VISUALES = dibujitos que nos hacen entender una idea sin palabras: bombita 💡 = se le ocurrió una idea · corazoncitos 💕 = enamorado · estrellitas 💫 = se golpeó · Zzz = durmiendo · nubecita 🌩️ = enojado.'
    ]},
    { t: '4. La noticia', p: [
      '¿Qué es? Es un texto informativo que cuenta un hecho REAL que ocurrió o está ocurriendo y puede ser de interés para la comunidad.',
      'NO es inventada. Por eso es diferente del cuento y la historieta.',
      'Preguntas que responde: ¿QUÉ sucedió? ¿QUIÉNES participan? ¿CUÁNDO ocurrió? ¿DÓNDE ocurrió? ¿CUÁL FUE EL PROPÓSITO?'
    ]},
    { t: '5. Partes de la noticia', p: [
      'VOLANTA: presenta el tema. Va arriba de todo, chiquita.',
      'TÍTULO: expresa lo más importante y busca llamar la atención. Va grande.',
      'COPETE: amplía brevemente la información del título. 1 o 2 renglones.',
      'CUERPO: desarrolla todos los detalles. Cuenta todo.',
      'IMAGEN: acompaña y representa visualmente lo sucedido.',
      'EPÍGRAFE: explica lo que muestra la imagen. Va abajo de la foto.'
    ]},
    { t: '6. Reglas de tilde', p: [
      'AGUDAS: fuerza en la ÚLTIMA sílaba. Llevan tilde si terminan en N, S o VOCAL. Ej: ca-mión, ma-má, pa-pá, co-ra-zón.',
      'GRAVES: fuerza en la ANTEÚLTIMA sílaba. Llevan tilde si NO terminan en N, S o VOCAL. Ej: ár-bol, lá-piz, a-zú-car, cés-ped.',
      'ESDRÚJULAS: fuerza en la ANTEPENÚLTIMA sílaba. SIEMPRE llevan tilde. Ej: pá-ja-ro, te-lé-fo-no, es-drú-ju-la.'
    ]},
    { t: '7. El truco en 2 pasos', p: [
      'Paso 1: partí la palabra en sílabas y buscá dónde suena MÁS FUERTE. Decila en voz alta y aplaudí: ca-MIÓN (suena fuerte al final), ÁR-bol (en el medio), PÁ-ja-ro (al principio).',
      'Paso 2: fijate en qué termina la palabra.',
      '1. Si suena fuerte AL FINAL = AGUDA. ¿Termina en N, S o VOCAL? → SÍ lleva tilde. ca-MIÓN termina en N → lleva tilde. ma-MÁ termina en vocal → lleva tilde. pa-PEL termina en L → NO lleva tilde (se escribe papel, pero igual suena fuerte al final).',
      '2. Si suena fuerte EN EL MEDIO = GRAVE. Es al revés: ¿termina en N, S o VOCAL? → NO lleva tilde. CA-sa y ME-sa terminan en vocal → NO llevan tilde. ÁR-bol termina en L y LÁ-piz en Z → SÍ llevan tilde.',
      '3. Si suena fuerte 3 sílabas antes del final = ESDRÚJULA. Acá no hay que pensar nada: SIEMPRE lleva tilde. PÁ-ja-ro, te-LÉ-fo-no, es-DRÚ-ju-la.'
    ]}
  ];

  const TABLA = {
    title: 'Cuadro de las reglas de tilde',
    cols: ['Clase', '¿Dónde suena fuerte?', '¿Cuándo lleva tilde?', 'Ejemplos'],
    rows: [
      ['Aguda',     'En la última sílaba',       'Si termina en N, S o vocal',    'camión, mamá, corazón · papel (sin tilde)'],
      ['Grave',     'En la anteúltima sílaba',   'Si NO termina en N, S o vocal', 'árbol, lápiz, azúcar · casa (sin tilde)'],
      ['Esdrújula', 'En la antepenúltima sílaba', 'SIEMPRE',                      'pájaro, teléfono, esdrújula']
    ]
  };

  /* =====================================================================
     EJEMPLOS: historietas, noticias y avisos. La app los dibuja y marca
     sus partes (en "Ejemplos con sus partes" y en "Encontrá las partes").
     ===================================================================== */

  /** Nombre, color y explicación de cada parte que se puede marcar. */
  const PART_INFO = {
    cartel:   { n: 'Cartelera',        c: '#d97706', d: 'Voz del narrador. Cuadradito rectangular que cuenta la historia.' },
    globo:    { n: 'Globo',            c: '#2563eb', d: 'Voz del personaje: lo que dice o piensa. Tiene una colita que sale de la boca.' },
    ono:      { n: 'Onomatopeya',      c: '#dc2626', d: 'Palabras que representan sonidos: ¡PUM! ¡CRASH! ¡ZAS!' },
    meta:     { n: 'Metáfora visual',  c: '#9333ea', d: 'Dibujito que hace entender una idea sin palabras.' },
    volanta:  { n: 'Volanta',          c: '#0891b2', d: 'Presenta el tema. Va arriba de todo, chiquita.' },
    titulo:   { n: 'Título',           c: '#dc2626', d: 'Lo más importante; busca llamar la atención. Va grande.' },
    copete:   { n: 'Copete',           c: '#d97706', d: 'Amplía brevemente el título. 1 o 2 renglones.' },
    cuerpo:   { n: 'Cuerpo',           c: '#059669', d: 'Desarrolla todos los detalles. Cuenta todo.' },
    imagen:   { n: 'Imagen',           c: '#9333ea', d: 'Acompaña y representa visualmente lo sucedido.' },
    epigrafe: { n: 'Epígrafe',         c: '#2563eb', d: 'Explica lo que muestra la imagen. Va abajo de la foto.' },
    pista:    { n: 'Palabra pista',    c: '#dc2626', d: 'COMPRÁ / VENTA = publicidad. CUIDÁ / AYUDÁ / NO TIRES = propaganda.' },
    lindas:   { n: 'Palabras lindas',  c: '#059669', d: 'Palabras lindas para convencerte: feliz, saludable, emocionante.' },
    marca:    { n: '¿Quién lo dice?',  c: '#64748b', d: 'La empresa, el negocio o la campaña que hizo el aviso.' },
    publicidad: { n: 'Publicidad',     c: '#d97706', d: 'Quiere VENDER algo. Pista: COMPRÁ / VENTA.' },
    propaganda: { n: 'Propaganda',     c: '#059669', d: 'Quiere CONVENCER de una idea. Pista: CUIDÁ / AYUDÁ / NO TIRES.' }
  };

  /** Metáforas visuales y lo que significan. */
  const METAS = {
    '💡':  'Se le ocurrió una idea',
    '💕':  'Está enamorado',
    '💫':  'Se golpeó',
    'Zzz': 'Está durmiendo',
    '🌩️': 'Está enojado'
  };

  /* Historietas. Cada viñeta: cartel (narrador), ono (onomatopeya), pjs
     (personajes: e = dibujo, n = nombre, globo, piensa = globo de
     pensamiento, meta = metáfora visual, obj = algo que tiene al lado).
     metaQ = la metáfora por la que se pregunta en el juego. */
  const HISTORIETAS = [
    { id: 'h1', titulo: 'La pelota de Santi', metaQ: '🌩️', vinetas: [
      { cartel: 'Un sábado a la tarde, en la plaza…', fondo: 'plaza',
        pjs: [{ e: '👦', n: 'Santi', globo: '¡Qué lindo día para jugar a la pelota!' }, { e: '🐶', n: 'Toby' }] },
      { fondo: 'plaza', ono: '¡PUM!',
        pjs: [{ e: '👦', n: 'Santi', obj: '⚽', globo: '¡Allá va un golazo!' }] },
      { fondo: 'casa', ono: '¡CRASH!',
        pjs: [{ e: '👴', n: 'Don Pepe', meta: '🌩️', globo: '¡Mi ventana! ¿Quién fue?' }] },
      { cartel: 'Al rato…', fondo: 'casa',
        pjs: [{ e: '👦', n: 'Santi', meta: '💡', piensa: true, globo: '¡Ya sé! Le pido perdón y lo ayudo a arreglarla.' }] }
    ]},
    { id: 'h2', titulo: 'Toby y el gato', metaQ: 'Zzz', vinetas: [
      { cartel: 'Esa noche, en la casa de Lucía…', fondo: 'noche',
        pjs: [{ e: '🐶', n: 'Toby', meta: 'Zzz' }] },
      { fondo: 'noche', ono: '¡MIAU!',
        pjs: [{ e: '🐱', n: 'Michi', globo: '¡Ese almohadón es mío!' }, { e: '🐶', n: 'Toby' }] },
      { fondo: 'noche', ono: '¡BOING!',
        pjs: [{ e: '🐱', n: 'Michi', meta: '💫', globo: '¡Ay, mi cabeza!' }] },
      { cartel: 'Al otro día, en la plaza…', fondo: 'plaza',
        pjs: [{ e: '🐶', n: 'Toby', meta: '💕', piensa: true, globo: '¡Qué linda es esa perrita!' }, { e: '🐩', n: 'Lola' }] }
    ]},
    { id: 'h3', titulo: 'La sorpresa para la abuela', metaQ: '💡', vinetas: [
      { cartel: 'Era el cumpleaños de la abuela Rosa.', fondo: 'casa',
        pjs: [{ e: '👧', n: 'Lucía', globo: '¿Qué le podemos regalar?' }, { e: '👦', n: 'Santi' }] },
      { fondo: 'casa',
        pjs: [{ e: '👦', n: 'Santi', meta: '💡', globo: '¡Ya sé! Una torta de chocolate.' }, { e: '👧', n: 'Lucía', obj: '🎂' }] },
      { cartel: 'Mientras tanto, en la puerta…', fondo: 'casa', ono: '¡TOC TOC!',
        pjs: [{ e: '👵', n: 'Abuela Rosa', globo: '¿Hay alguien en casa?' }] },
      { fondo: 'fiesta', ono: '¡PUM!',
        pjs: [{ e: '👧', n: 'Lucía', globo: '¡SORPRESA!' }, { e: '👵', n: 'Abuela', meta: '💕', globo: '¡Los quiero mucho!' }] }
    ]}
  ];

  /* Noticias (inventadas para practicar, con forma de noticia real). */
  const NOTICIAS = [
    { id: 'n1', fecha: 'Viernes 14 de noviembre',
      vol: 'Ambiente',
      tit: 'Los chicos de 4.° grado plantaron 30 árboles en la plaza del barrio',
      cop: 'Lo hicieron el viernes a la mañana con sus maestras, para que la plaza tenga más sombra y sea más verde.',
      cuerpo: [
        'El viernes a la mañana, los alumnos de 4.° grado de la Escuela N.° 12 plantaron 30 árboles en la plaza San Martín, en la ciudad de Santa Fe.',
        'Las maestras contaron que el propósito fue tener una plaza más verde y con más sombra para el verano. Cada grado va a cuidar y regar sus árboles.'
      ],
      pic: '🧒🌳👩‍🏫🌳👧', epi: 'Los alumnos, con palas y regaderas, durante la plantación en la plaza.',
      que: 'Plantaron 30 árboles', quienes: 'Los alumnos de 4.° grado y sus maestras', cuando: 'El viernes a la mañana',
      donde: 'En la plaza San Martín', para: 'Para que la plaza sea más verde y tenga más sombra' },
    { id: 'n2', fecha: 'Martes 18 de noviembre',
      vol: 'Rescate',
      tit: 'Bomberos rescataron a un gatito atrapado en un árbol',
      cop: 'El animal estuvo más de cinco horas arriba de un eucalipto. Los vecinos llamaron al cuartel.',
      cuerpo: [
        'El martes a la tarde, los bomberos voluntarios rescataron a un gatito que estaba atrapado en lo alto de un eucalipto, en el barrio Candioti.',
        'Usaron una escalera larga para bajarlo sano y salvo. El gatito volvió con su familia, que lo buscaba desde la mañana.'
      ],
      pic: '🚒🧑‍🚒🌳🐱', epi: 'Un bombero baja al gatito con la escalera, mientras los vecinos miran.',
      que: 'Rescataron a un gatito', quienes: 'Los bomberos voluntarios', cuando: 'El martes a la tarde',
      donde: 'En el barrio Candioti', para: 'Para bajar al gatito sano y salvo' },
    { id: 'n3', fecha: 'Lunes 3 de noviembre',
      vol: 'Cultura',
      tit: 'Se inauguró una biblioteca nueva en el barrio',
      cop: 'Tiene más de 2000 libros, una sala de cuentos para chicos y es gratis para todos los vecinos.',
      cuerpo: [
        'El lunes a las 10, la intendenta y los vecinos inauguraron la Biblioteca Popular Los Lectores, en la avenida Freyre.',
        'El propósito es que todos los chicos y grandes del barrio puedan leer y llevarse libros gratis a su casa.'
      ],
      pic: '📚🏛️👨‍👩‍👧📖', epi: 'Familias del barrio recorren la sala de cuentos el día de la inauguración.',
      que: 'Se inauguró una biblioteca nueva', quienes: 'La intendenta y los vecinos', cuando: 'El lunes a las 10',
      donde: 'En la avenida Freyre', para: 'Para que todos puedan leer y llevarse libros gratis' },
    { id: 'n4', fecha: 'Domingo 9 de noviembre',
      vol: 'Solidaridad',
      tit: 'Una maratón juntó 500 juguetes para el Día del Niño',
      cop: 'Más de 300 corredores participaron. Cada uno llevó un juguete en lugar de pagar la inscripción.',
      cuerpo: [
        'El domingo a la mañana, más de 300 corredores participaron de la Maratón Solidaria en la Costanera de Santa Fe.',
        'Juntaron 500 juguetes que van a repartir en los comedores del barrio, para que ningún chico se quede sin regalo.'
      ],
      pic: '🏃‍♀️🏃🧸🎁', epi: 'Los corredores, en la largada, con sus juguetes para donar.',
      que: 'Juntaron 500 juguetes en una maratón', quienes: 'Más de 300 corredores', cuando: 'El domingo a la mañana',
      donde: 'En la Costanera', para: 'Para que ningún chico se quede sin regalo' },
    { id: 'n5', fecha: 'Sábado 15 de noviembre',
      vol: 'Mascotas',
      tit: 'Vacunaron gratis a más de 200 perros y gatos',
      cop: 'Fue una jornada de salud para mascotas en el club del barrio. Hubo filas desde temprano.',
      cuerpo: [
        'El sábado de 9 a 13, veterinarios de la Municipalidad vacunaron gratis a más de 200 perros y gatos en el Club Atlético del barrio.',
        'La campaña se hizo para cuidar la salud de las mascotas y de sus familias.'
      ],
      pic: '🐕💉👩‍⚕️🐈', epi: 'Una veterinaria vacuna a un perro mientras su dueña lo acaricia.',
      que: 'Vacunaron gratis a más de 200 mascotas', quienes: 'Los veterinarios de la Municipalidad', cuando: 'El sábado de 9 a 13',
      donde: 'En el club del barrio', para: 'Para cuidar la salud de las mascotas' },
    { id: 'n6', fecha: 'Jueves 20 de noviembre',
      vol: 'Educación',
      tit: 'Alumnos santafesinos ganaron un torneo de robótica',
      cop: 'Armaron un robot que separa la basura para reciclar. Compitieron contra 40 escuelas.',
      cuerpo: [
        'El jueves por la tarde, un grupo de alumnos de 6.° grado ganó el Torneo Provincial de Robótica, que se hizo en Rosario.',
        'Su robot separa el plástico, el papel y el vidrio. Lo inventaron para ayudar a reciclar en la escuela.'
      ],
      pic: '🤖🏆👦👧♻️', epi: 'Los ganadores muestran el trofeo junto al robot que separa la basura.',
      que: 'Ganaron un torneo de robótica', quienes: 'Alumnos de 6.° grado', cuando: 'El jueves por la tarde',
      donde: 'En Rosario', para: 'Para ayudar a reciclar en la escuela' }
  ];

  /* Avisos. [[palabra pista]] y {{palabras lindas}} quedan marcadas. */
  const AVISOS = [
    { id: 'a1', tipo: 'publicidad', color: 'amber', pic: '🧸🚗🪀',
      titulo: '¡[[Comprá]] nuestros juguetes!',
      texto: 'Juguetes que te hacen {{feliz}}. ¡Son {{divertidos}} y {{emocionantes}}!',
      marca: 'Juguetería CAPIPLASAN · de Santino' },
    { id: 'a2', tipo: 'publicidad', color: 'sky', pic: '🥛🍓🐮',
      titulo: '¡Gran [[VENTA]] de yogures Vaquita!',
      texto: 'Un yogur {{saludable}} y {{riquísimo}} para empezar el día {{feliz}}. ¡2 x 1!',
      marca: 'Yogures Vaquita' },
    { id: 'a3', tipo: 'publicidad', color: 'rose', pic: '🚲⚡',
      titulo: '[[Comprá]] tu bici Rayo',
      texto: '¡{{Rápida}}, {{liviana}} y {{emocionante}}! Pedaleá {{feliz}} todo el verano.',
      marca: 'Bicicletería Rayo' },
    { id: 'a4', tipo: 'propaganda', color: 'emerald', pic: '🌍🗑️♻️',
      titulo: '¡[[Cuidá]] el ambiente!',
      texto: '[[No tires]] basura en la calle: usá el cesto. Una ciudad limpia es una ciudad {{feliz}}.',
      marca: 'Campaña "Ciudad limpia"' },
    { id: 'a5', tipo: 'propaganda', color: 'sky', pic: '🚰💧🪥',
      titulo: '[[Ayudá]] a cuidar el agua',
      texto: 'Cerrá la canilla mientras te lavás los dientes. ¡Cada gota es {{importante}}!',
      marca: 'Campaña "Cada gota cuenta"' },
    { id: 'a6', tipo: 'propaganda', color: 'lime', pic: '🍎🥕🍌',
      titulo: '[[Cuidá]] tu cuerpo: comé saludable',
      texto: 'Comé frutas y verduras todos los días para crecer {{fuerte}} y {{sano}}.',
      marca: 'Campaña "Comer bien"' }
  ];

  /* =====================================================================
     PALABRAS PARA LAS TILDES
     w = palabra bien escrita · sil = sílabas · f = sílaba que suena más
     fuerte (0 = la primera). La clase y si lleva tilde se calculan solas.
     ===================================================================== */
  const PALABRAS = [
    // Agudas con tilde (terminan en N, S o vocal)
    { w: 'camión', sil: 'ca-mión', f: 1 }, { w: 'mamá', sil: 'ma-má', f: 1 }, { w: 'papá', sil: 'pa-pá', f: 1 },
    { w: 'corazón', sil: 'co-ra-zón', f: 2 }, { w: 'ratón', sil: 'ra-tón', f: 1 }, { w: 'sofá', sil: 'so-fá', f: 1 },
    { w: 'café', sil: 'ca-fé', f: 1 }, { w: 'compás', sil: 'com-pás', f: 1 }, { w: 'canción', sil: 'can-ción', f: 1 },
    { w: 'avión', sil: 'a-vión', f: 1 }, { w: 'colibrí', sil: 'co-li-brí', f: 2 }, { w: 'bebé', sil: 'be-bé', f: 1 },
    // Agudas sin tilde (no terminan en N, S ni vocal)
    { w: 'papel', sil: 'pa-pel', f: 1 }, { w: 'reloj', sil: 're-loj', f: 1 }, { w: 'feliz', sil: 'fe-liz', f: 1 },
    { w: 'jugar', sil: 'ju-gar', f: 1 }, { w: 'animal', sil: 'a-ni-mal', f: 2 }, { w: 'pared', sil: 'pa-red', f: 1 },
    { w: 'ciudad', sil: 'ciu-dad', f: 1 }, { w: 'tambor', sil: 'tam-bor', f: 1 },
    // Graves con tilde (no terminan en N, S ni vocal)
    { w: 'árbol', sil: 'ár-bol', f: 0 }, { w: 'lápiz', sil: 'lá-piz', f: 0 }, { w: 'azúcar', sil: 'a-zú-car', f: 1 },
    { w: 'césped', sil: 'cés-ped', f: 0 }, { w: 'fútbol', sil: 'fút-bol', f: 0 }, { w: 'cárcel', sil: 'cár-cel', f: 0 },
    { w: 'difícil', sil: 'di-fí-cil', f: 1 }, { w: 'fácil', sil: 'fá-cil', f: 0 }, { w: 'álbum', sil: 'ál-bum', f: 0 },
    // Graves sin tilde (terminan en N, S o vocal)
    { w: 'casa', sil: 'ca-sa', f: 0 }, { w: 'mesa', sil: 'me-sa', f: 0 }, { w: 'libro', sil: 'li-bro', f: 0 },
    { w: 'escuela', sil: 'es-cue-la', f: 1 }, { w: 'zapato', sil: 'za-pa-to', f: 1 }, { w: 'camisa', sil: 'ca-mi-sa', f: 1 },
    { w: 'flores', sil: 'flo-res', f: 0 }, { w: 'examen', sil: 'e-xa-men', f: 1 }, { w: 'joven', sil: 'jo-ven', f: 0 },
    // Esdrújulas (siempre con tilde)
    { w: 'pájaro', sil: 'pá-ja-ro', f: 0 }, { w: 'teléfono', sil: 'te-lé-fo-no', f: 1 }, { w: 'esdrújula', sil: 'es-drú-ju-la', f: 1 },
    { w: 'música', sil: 'mú-si-ca', f: 0 }, { w: 'sábado', sil: 'sá-ba-do', f: 0 }, { w: 'número', sil: 'nú-me-ro', f: 0 },
    { w: 'lámpara', sil: 'lám-pa-ra', f: 0 }, { w: 'murciélago', sil: 'mur-cié-la-go', f: 1 }, { w: 'brújula', sil: 'brú-ju-la', f: 0 },
    { w: 'médico', sil: 'mé-di-co', f: 0 }, { w: 'plátano', sil: 'plá-ta-no', f: 0 }, { w: 'miércoles', sil: 'miér-co-les', f: 0 }
  ];

  /** Saca las tildes (la ñ y la ü quedan). */
  const plain = (t) => t.normalize('NFD').replace(/́/g, '').normalize('NFC');
  const CLASES = ['Aguda', 'Grave', 'Esdrújula'];
  const DONDE = ['al final (última sílaba)', 'en el medio (anteúltima sílaba)', '3 sílabas antes del final (antepenúltima)'];

  /** Todo lo que hay que saber de una palabra para las reglas de tilde. */
  function analizar(p) {
    const sil = p.sil.split('-');
    const pos = sil.length - 1 - p.f;                 // 0 aguda · 1 grave · 2 esdrújula
    const last = plain(p.w).slice(-1);
    const nsv = 'nsaeiou'.indexOf(last) !== -1;
    const fin = 'aeiou'.indexOf(last) !== -1 ? 'vocal' : last.toUpperCase();
    const tilde = plain(p.w) !== p.w;
    const marcada = (txt, k) => sil.map((x, j) => (j === k ? txt(x).toUpperCase() : txt(x))).join('-');
    let regla;
    if (pos === 2) regla = 'Es esdrújula: ¡siempre lleva tilde!';
    else if (pos === 0) regla = 'Es aguda y termina en ' + fin + (nsv ? ': lleva tilde.' : '. Como no es N, S ni vocal, NO lleva tilde.');
    else regla = 'Es grave y termina en ' + fin + (nsv ? ': NO lleva tilde (las graves son al revés).' : '. Como no es N, S ni vocal, SÍ lleva tilde.');
    return {
      w: p.w, f: p.f, sil: sil, pos: pos, clase: CLASES[pos], nsv: nsv, fin: fin, tilde: tilde, regla: regla,
      fuerte: marcada((x) => x, p.f),               // ca-MIÓN
      fuertePlano: marcada(plain, p.f),             // ca-MION
      opcionesFuerte: sil.map((x, k) => marcada(plain, k))
    };
  }
  const TILDES = PALABRAS.map(analizar);

  /* =====================================================================
     TRIVIA
     ===================================================================== */
  const TRIVIA = [
    // --- Publicidad y propaganda ---
    { t: 'Publicidad y propaganda', q: '¿Qué quiere la publicidad?',
      ok: 'Vender algo', bad: ['Convencer de una idea sin vender', 'Contar un hecho real', 'Contar una historia con globos'],
      why: 'La PUBLICIDAD quiere VENDER algo. Ej: "¡Comprá nuestros juguetes!".' },
    { t: 'Publicidad y propaganda', q: '¿Qué quiere la propaganda?',
      ok: 'Convencer de una idea, no vender', bad: ['Vender un producto', 'Hacer reír', 'Explicar qué muestra una foto'],
      why: 'La PROPAGANDA quiere CONVENCER de una idea: cuidar el ambiente, comer saludable, no tirar basura.' },
    { t: 'Publicidad y propaganda', q: '"¡Comprá nuestros juguetes!" es…',
      ok: 'Publicidad', bad: ['Propaganda', 'Una noticia', 'Una onomatopeya'],
      why: 'Dice COMPRÁ: quiere vender. Es publicidad.' },
    { t: 'Publicidad y propaganda', q: '"No tires basura en la calle" es…',
      ok: 'Propaganda', bad: ['Publicidad', 'Una noticia', 'Una cartelera'],
      why: 'Dice NO TIRES: quiere que cambies tu conducta. Es propaganda.' },
    { t: 'Publicidad y propaganda', q: '"¡Cuidá el agua! Cerrá la canilla." es…',
      ok: 'Propaganda', bad: ['Publicidad', 'Un epígrafe', 'Una historieta'],
      why: 'Dice CUIDÁ: no vende nada, te pide que cambies tu conducta. Es propaganda.' },
    { t: 'Publicidad y propaganda', q: '"¡Gran VENTA de zapatillas!" es…',
      ok: 'Publicidad', bad: ['Propaganda', 'Una noticia', 'Una volanta'],
      why: 'Dice VENTA: quiere vender. Es publicidad.' },
    { t: 'Publicidad y propaganda', q: '¿Qué palabras usa la publicidad para convencerte?',
      ok: 'Palabras lindas: feliz, saludable, emocionante', bad: ['Palabras que representan sonidos', 'Fechas y lugares', 'Palabras feas para asustarte'],
      why: 'La publicidad usa palabras lindas para convencerte: feliz, saludable, emocionante.' },
    { t: 'Publicidad y propaganda', q: 'La propaganda NO te pide que compres. ¿Qué te pide?',
      ok: 'Que cambies tu conducta', bad: ['Que leas una historieta', 'Que vayas a un negocio', 'Que pagues menos'],
      why: 'La propaganda no te pide que compres: te pide que cambies tu conducta.' },
    { t: 'Publicidad y propaganda', q: 'Si un aviso dice CUIDÁ, AYUDÁ o NO TIRES, es…',
      ok: 'Propaganda', bad: ['Publicidad', 'Una noticia', 'Un cuento'],
      why: 'CUIDÁ / AYUDÁ / NO TIRES = Propaganda.' },
    { t: 'Publicidad y propaganda', q: 'Si un aviso dice COMPRÁ o VENTA, es…',
      ok: 'Publicidad', bad: ['Propaganda', 'Una historieta', 'Un copete'],
      why: 'COMPRÁ / VENTA = Publicidad.' },

    // --- Historieta ---
    { t: 'Historieta', q: '¿Qué es la historieta?',
      ok: 'Un género literario que cuenta una historia con dibujos', bad: ['Un texto que cuenta un hecho real', 'Un aviso para vender algo', 'Una regla de tildes'],
      why: 'La historieta es un género literario: cuenta una historia, tiene personajes y aventura, igual que un cuento.' },
    { t: 'Historieta', q: '¿En qué se parece la historieta al cuento?',
      ok: 'Tiene historia, personajes y aventura', bad: ['Usa globos y onomatopeyas', 'Cuenta hechos reales', 'Quiere vender algo'],
      why: 'Igual que el cuento, tiene historia, personajes y aventura.' },
    { t: 'Historieta', q: '¿En qué es diferente la historieta del cuento?',
      ok: 'Usa dibujos, globos, onomatopeyas y menos palabras', bad: ['No tiene personajes', 'No cuenta una historia', 'Siempre es real'],
      why: 'La historieta usa dibujos, globos, onomatopeyas y menos palabras. Con la imagen ya se ve la cara de miedo.' },
    { t: 'Historieta', q: '¿Por qué la historieta necesita menos palabras?',
      ok: 'Porque con el dibujo ya se ve lo que pasa', bad: ['Porque es más corta que un cuento', 'Porque no tiene personajes', 'Porque es una noticia'],
      why: 'Con la imagen ya se ve, por ejemplo, la cara de miedo: no hace falta describirlo mucho con palabras.' },
    { t: 'Historieta', q: 'La CARTELERA es la voz del…',
      ok: 'Narrador', bad: ['Personaje', 'Periodista', 'Vendedor'],
      why: 'CARTELERA = VOZ DEL NARRADOR. Es un cuadradito rectangular que cuenta la historia.' },
    { t: 'Historieta', q: '¿Qué forma tiene la cartelera?',
      ok: 'Un cuadradito rectangular', bad: ['Un redondito con colita', 'Una bombita', 'Una nubecita'],
      why: 'La cartelera es un cuadradito rectangular. Ej: "Al otro día…".' },
    { t: 'Historieta', q: '"Al otro día…" va en…',
      ok: 'La cartelera', bad: ['El globo', 'La onomatopeya', 'El epígrafe'],
      why: '"Al otro día…" lo cuenta el narrador: va en la cartelera.' },
    { t: 'Historieta', q: 'El GLOBO es la voz del…',
      ok: 'Personaje', bad: ['Narrador', 'Lector', 'Dibujante'],
      why: 'GLOBO = VOZ DEL PERSONAJE. Es lo que dice o piensa.' },
    { t: 'Historieta', q: '¿Cómo es el globo?',
      ok: 'Redondito, con una colita que sale de la boca', bad: ['Un cuadradito rectangular', 'Va abajo de la foto', 'Es un dibujito de una bombita'],
      why: 'El globo es redondito con una colita que sale de la boca del personaje.' },
    { t: 'Historieta', q: '¿Qué son las onomatopeyas?',
      ok: 'Palabras que representan sonidos', bad: ['Dibujitos que muestran una idea', 'La voz del narrador', 'Palabras para vender'],
      why: 'ONOMATOPEYAS = palabras que representan sonidos. Ej: ¡PUM! ¡CRASH! ¡ZAS!' },
    { t: 'Historieta', q: '¿Cuál de estas es una onomatopeya?',
      ok: '¡TOC TOC!', bad: ['Al otro día…', '¡Comprá ya!', 'Volanta'],
      why: '¡TOC TOC! representa el sonido de golpear la puerta: es una onomatopeya.' },
    { t: 'Historieta', q: '¿Qué onomatopeya usarías para un teléfono que suena?',
      ok: '¡RING RING!', bad: ['¡CRASH!', '¡PUM!', 'Zzz'],
      why: '¡RING RING! representa el sonido del teléfono.' },
    { t: 'Historieta', q: '¿Qué son las metáforas visuales?',
      ok: 'Dibujitos que hacen entender una idea sin palabras', bad: ['Palabras que representan sonidos', 'La voz del narrador', 'La parte que explica la foto'],
      why: 'METÁFORAS VISUALES = dibujitos que nos hacen entender una idea sin palabras.' },
    { t: 'Historieta', q: 'Si al personaje le aparece una bombita 💡, quiere decir que…',
      ok: 'Se le ocurrió una idea', bad: ['Está enojado', 'Está durmiendo', 'Se golpeó'],
      why: 'Bombita = se le ocurrió una idea.' },
    { t: 'Historieta', q: 'Si al personaje le aparecen corazoncitos 💕, quiere decir que…',
      ok: 'Está enamorado', bad: ['Se golpeó', 'Tiene una idea', 'Está enojado'],
      why: 'Corazoncitos = enamorado.' },
    { t: 'Historieta', q: 'Si al personaje le aparecen estrellitas 💫, quiere decir que…',
      ok: 'Se golpeó', bad: ['Está enamorado', 'Está durmiendo', 'Tiene una idea'],
      why: 'Estrellitas = se golpeó.' },
    { t: 'Historieta', q: '"Zzz" quiere decir que el personaje…',
      ok: 'Está durmiendo', bad: ['Está enojado', 'Hace un ruido fuerte', 'Se golpeó'],
      why: 'Zzz = durmiendo.' },
    { t: 'Historieta', q: 'Si arriba del personaje hay una nubecita 🌩️, quiere decir que…',
      ok: 'Está enojado', bad: ['Está contento', 'Está enamorado', 'Tiene frío'],
      why: 'Nubecita = enojado.' },

    // --- Noticia ---
    { t: 'Noticia', q: '¿Qué es la noticia?',
      ok: 'Un texto informativo que cuenta un hecho REAL', bad: ['Una historia inventada con dibujos', 'Un aviso para vender algo', 'Un cuento con personajes mágicos'],
      why: 'La noticia es un texto informativo que cuenta un hecho REAL que ocurrió o está ocurriendo.' },
    { t: 'Noticia', q: '¿En qué es diferente la noticia del cuento y la historieta?',
      ok: 'NO es inventada: cuenta un hecho real', bad: ['Tiene dibujos y globos', 'Tiene onomatopeyas', 'Quiere vender algo'],
      why: 'La noticia NO es inventada. Por eso es diferente del cuento y la historieta.' },
    { t: 'Noticia', q: 'La noticia cuenta hechos que pueden ser de interés para…',
      ok: 'La comunidad', bad: ['Un solo personaje', 'El narrador', 'Los vendedores'],
      why: 'Cuenta un hecho real que puede ser de interés para la comunidad.' },
    { t: 'Noticia', q: '¿Cuál de estas preguntas responde la noticia?',
      ok: '¿Dónde ocurrió?', bad: ['¿Cuánto cuesta?', '¿Qué dice el globo?', '¿Qué significa la bombita?'],
      why: 'La noticia responde: ¿QUÉ sucedió? ¿QUIÉNES participan? ¿CUÁNDO? ¿DÓNDE? ¿CUÁL FUE EL PROPÓSITO?' },
    { t: 'Noticia', q: '"El viernes a la mañana" responde a la pregunta…',
      ok: '¿Cuándo ocurrió?', bad: ['¿Dónde ocurrió?', '¿Quiénes participan?', '¿Qué sucedió?'],
      why: 'Habla del momento: responde ¿CUÁNDO ocurrió?' },
    { t: 'Noticia', q: '"En la plaza San Martín" responde a la pregunta…',
      ok: '¿Dónde ocurrió?', bad: ['¿Cuándo ocurrió?', '¿Cuál fue el propósito?', '¿Quiénes participan?'],
      why: 'Habla del lugar: responde ¿DÓNDE ocurrió?' },
    { t: 'Noticia', q: '"Los bomberos voluntarios" responde a la pregunta…',
      ok: '¿Quiénes participan?', bad: ['¿Dónde ocurrió?', '¿Cuándo ocurrió?', '¿Qué sucedió?'],
      why: 'Son las personas que participan: responde ¿QUIÉNES?' },
    { t: 'Noticia', q: '"Para que la plaza tenga más sombra" responde a…',
      ok: '¿Cuál fue el propósito?', bad: ['¿Cuándo ocurrió?', '¿Dónde ocurrió?', '¿Quiénes participan?'],
      why: 'Dice para qué se hizo: responde ¿CUÁL FUE EL PROPÓSITO?' },
    { t: 'Partes de la noticia', q: '¿Qué parte de la noticia presenta el tema y va arriba de todo, chiquita?',
      ok: 'Volanta', bad: ['Título', 'Copete', 'Epígrafe'],
      why: 'VOLANTA: presenta el tema. Va arriba de todo, chiquita.' },
    { t: 'Partes de la noticia', q: '¿Qué parte expresa lo más importante, busca llamar la atención y va grande?',
      ok: 'Título', bad: ['Volanta', 'Cuerpo', 'Epígrafe'],
      why: 'TÍTULO: expresa lo más importante y busca llamar la atención. Va grande.' },
    { t: 'Partes de la noticia', q: '¿Qué parte amplía brevemente el título en 1 o 2 renglones?',
      ok: 'Copete', bad: ['Cuerpo', 'Volanta', 'Imagen'],
      why: 'COPETE: amplía brevemente la información del título. 1 o 2 renglones.' },
    { t: 'Partes de la noticia', q: '¿Qué parte desarrolla todos los detalles y cuenta todo?',
      ok: 'Cuerpo', bad: ['Copete', 'Título', 'Epígrafe'],
      why: 'CUERPO: desarrolla todos los detalles. Cuenta todo.' },
    { t: 'Partes de la noticia', q: '¿Qué parte acompaña y representa visualmente lo sucedido?',
      ok: 'Imagen', bad: ['Epígrafe', 'Volanta', 'Cuerpo'],
      why: 'IMAGEN: acompaña y representa visualmente lo sucedido.' },
    { t: 'Partes de la noticia', q: '¿Qué es el epígrafe?',
      ok: 'El texto que explica la imagen; va abajo de la foto', bad: ['El título chiquito de arriba', 'La voz del narrador', 'Los detalles de la noticia'],
      why: 'EPÍGRAFE: explica lo que muestra la imagen. Va abajo de la foto.' },
    { t: 'Partes de la noticia', q: '¿Dónde va el epígrafe?',
      ok: 'Abajo de la foto', bad: ['Arriba de todo', 'Antes del título', 'Adentro de un globo'],
      why: 'El epígrafe va abajo de la foto.' },

    // --- Tildes ---
    { t: 'Tildes', q: '¿Dónde tienen la fuerza las palabras AGUDAS?',
      ok: 'En la última sílaba', bad: ['En la anteúltima sílaba', 'En la antepenúltima sílaba', 'En la primera letra'],
      why: 'AGUDAS: fuerza en la ÚLTIMA sílaba. Ej: ca-MIÓN.' },
    { t: 'Tildes', q: '¿Dónde tienen la fuerza las palabras GRAVES?',
      ok: 'En la anteúltima sílaba', bad: ['En la última sílaba', 'En la antepenúltima sílaba', 'En todas las sílabas'],
      why: 'GRAVES: fuerza en la ANTEÚLTIMA sílaba. Ej: ÁR-bol.' },
    { t: 'Tildes', q: '¿Dónde tienen la fuerza las palabras ESDRÚJULAS?',
      ok: 'En la antepenúltima sílaba', bad: ['En la última sílaba', 'En la anteúltima sílaba', 'En la última letra'],
      why: 'ESDRÚJULAS: fuerza en la ANTEPENÚLTIMA sílaba, 3 sílabas antes del final. Ej: PÁ-ja-ro.' },
    { t: 'Tildes', q: '¿Cuándo llevan tilde las agudas?',
      ok: 'Si terminan en N, S o vocal', bad: ['Si NO terminan en N, S o vocal', 'Siempre', 'Nunca'],
      why: 'Las agudas llevan tilde si terminan en N, S o VOCAL. Ej: camión, mamá.' },
    { t: 'Tildes', q: '¿Cuándo llevan tilde las graves?',
      ok: 'Si NO terminan en N, S o vocal', bad: ['Si terminan en N, S o vocal', 'Siempre', 'Nunca'],
      why: 'Las graves son al revés: llevan tilde si NO terminan en N, S o VOCAL. Ej: árbol, lápiz.' },
    { t: 'Tildes', q: '¿Cuándo llevan tilde las esdrújulas?',
      ok: 'Siempre', bad: ['Nunca', 'Si terminan en N, S o vocal', 'Si NO terminan en N, S o vocal'],
      why: 'Con las esdrújulas no hay que pensar nada: SIEMPRE llevan tilde.' },
    { t: 'Tildes', q: '¿Cuál es el Paso 1 del truco?',
      ok: 'Partir la palabra en sílabas y buscar dónde suena más fuerte', bad: ['Fijarse en qué termina la palabra', 'Ponerle tilde a todas', 'Contar las letras'],
      why: 'Paso 1: partí la palabra en sílabas y buscá dónde suena MÁS FUERTE. Decila en voz alta y aplaudí.' },
    { t: 'Tildes', q: '¿Cuál es el Paso 2 del truco?',
      ok: 'Fijarse en qué termina la palabra', bad: ['Partir la palabra en sílabas', 'Buscar la letra más linda', 'Ver si es un sustantivo'],
      why: 'Paso 2: fijate en qué termina la palabra. ¡Ahí está el truco!' },
    { t: 'Tildes', q: '"Papel" suena fuerte al final (pa-PEL). ¿Por qué NO lleva tilde?',
      ok: 'Porque termina en L, no en N, S ni vocal', bad: ['Porque es esdrújula', 'Porque es grave', 'Porque es muy corta'],
      why: 'pa-PEL es aguda y termina en L: no es N, S ni vocal, entonces NO lleva tilde.' },
    { t: 'Tildes', q: '"Árbol" suena fuerte en el medio (ÁR-bol). ¿Por qué lleva tilde?',
      ok: 'Es grave y termina en L, no en N, S ni vocal', bad: ['Es aguda y termina en vocal', 'Es esdrújula', 'Todas las palabras llevan tilde'],
      why: 'ÁR-bol es grave y termina en L. Las graves llevan tilde si NO terminan en N, S o vocal.' },
    { t: 'Tildes', q: '"Casa" suena fuerte en el medio (CA-sa). ¿Lleva tilde?',
      ok: 'No, porque es grave y termina en vocal', bad: ['Sí, porque termina en vocal', 'Sí, porque es esdrújula', 'Sí, siempre'],
      why: 'CA-sa es grave y termina en vocal: NO lleva tilde.' },
    { t: 'Tildes', q: '¿Qué clase de palabra es "pájaro" (PÁ-ja-ro)?',
      ok: 'Esdrújula', bad: ['Aguda', 'Grave', 'Onomatopeya'],
      why: 'Suena fuerte 3 sílabas antes del final: es ESDRÚJULA y siempre lleva tilde.' },
    { t: 'Tildes', q: '¿Qué clase de palabra es "corazón" (co-ra-ZÓN)?',
      ok: 'Aguda', bad: ['Grave', 'Esdrújula', 'Metáfora visual'],
      why: 'Suena fuerte al final: es AGUDA. Termina en N, por eso lleva tilde.' },
    { t: 'Tildes', q: '¿Cuál está bien escrita?',
      ok: 'Teléfono', bad: ['Telefono', 'Telefóno', 'Teléfonó'],
      why: 'te-LÉ-fo-no es esdrújula: siempre lleva tilde, en la sílaba que suena fuerte.' },
    { t: 'Tildes', q: '¿Cuál está bien escrita?',
      ok: 'Lápiz', bad: ['Lapiz', 'Lapíz', 'Lápíz'],
      why: 'LÁ-piz es grave y termina en Z: lleva tilde.' },
    { t: 'Tildes', q: '¿Cuál está bien escrita?',
      ok: 'Mesa', bad: ['Mésa', 'Mesá', 'Mésá'],
      why: 'ME-sa es grave y termina en vocal: NO lleva tilde.' }
  ];

  /* =====================================================================
     UNIR CON FLECHAS
     ===================================================================== */
  const MATCH_ROUNDS = [
    { title: 'Publicidad y propaganda', pairs: [
      { id: 'p1', a: 'Publicidad', b: 'Quiere VENDER algo' },
      { id: 'p2', a: 'Propaganda', b: 'Quiere CONVENCER de una idea' },
      { id: 'p3', a: 'COMPRÁ / VENTA', b: 'Pista de publicidad' },
      { id: 'p4', a: 'CUIDÁ / AYUDÁ / NO TIRES', b: 'Pista de propaganda' }
    ]},
    { title: 'Elementos de la historieta', pairs: [
      { id: 'h1', a: 'Cartelera', b: 'Voz del narrador: cuadradito rectangular' },
      { id: 'h2', a: 'Globo', b: 'Voz del personaje: lo que dice o piensa' },
      { id: 'h3', a: 'Onomatopeya', b: 'Palabras que representan sonidos' },
      { id: 'h4', a: 'Metáfora visual', b: 'Dibujito que muestra una idea sin palabras' }
    ]},
    { title: 'Metáforas visuales', pairs: [
      { id: 'm1', a: '💡 Bombita', b: 'Se le ocurrió una idea' },
      { id: 'm2', a: '💕 Corazoncitos', b: 'Enamorado' },
      { id: 'm3', a: '💫 Estrellitas', b: 'Se golpeó' },
      { id: 'm4', a: 'Zzz', b: 'Durmiendo' },
      { id: 'm5', a: '🌩️ Nubecita', b: 'Enojado' }
    ]},
    { title: '¿Qué es cada texto?', pairs: [
      { id: 'c1', a: 'Cuento', b: 'Historia inventada contada con palabras' },
      { id: 'c2', a: 'Historieta', b: 'Historia con dibujos, globos y menos palabras' },
      { id: 'c3', a: 'Noticia', b: 'Cuenta un hecho REAL de interés para la comunidad' },
      { id: 'c4', a: 'Publicidad', b: 'Aviso que quiere vender algo' }
    ]},
    { title: 'Partes de la noticia (1)', pairs: [
      { id: 'n1', a: 'Volanta', b: 'Presenta el tema. Arriba de todo, chiquita' },
      { id: 'n2', a: 'Título', b: 'Lo más importante. Va grande' },
      { id: 'n3', a: 'Copete', b: 'Amplía el título en 1 o 2 renglones' },
      { id: 'n4', a: 'Cuerpo', b: 'Desarrolla todos los detalles' }
    ]},
    { title: 'Partes de la noticia (2)', pairs: [
      { id: 'q1', a: 'Imagen', b: 'Representa visualmente lo sucedido' },
      { id: 'q2', a: 'Epígrafe', b: 'Explica la imagen. Va abajo de la foto' },
      { id: 'q3', a: 'Título', b: 'Busca llamar la atención' },
      { id: 'q4', a: 'Volanta', b: 'Va arriba del título' }
    ]},
    { title: 'Preguntas de la noticia', pairs: [
      { id: 'w1', a: '¿QUÉ?', b: 'Lo que sucedió' },
      { id: 'w2', a: '¿QUIÉNES?', b: 'Los que participan' },
      { id: 'w3', a: '¿CUÁNDO?', b: 'El día y la hora' },
      { id: 'w4', a: '¿DÓNDE?', b: 'El lugar' },
      { id: 'w5', a: '¿PROPÓSITO?', b: 'Para qué se hizo' }
    ]},
    { title: 'Agudas, graves y esdrújulas', pairs: [
      { id: 't1', a: 'Agudas', b: 'Fuerza en la ÚLTIMA sílaba' },
      { id: 't2', a: 'Graves', b: 'Fuerza en la ANTEÚLTIMA sílaba' },
      { id: 't3', a: 'Esdrújulas', b: 'Fuerza en la ANTEPENÚLTIMA sílaba' },
      { id: 't4', a: 'Paso 1', b: 'Partir en sílabas y buscar dónde suena más fuerte' },
      { id: 't5', a: 'Paso 2', b: 'Fijarse en qué termina la palabra' }
    ]},
    { title: '¿Cuándo llevan tilde?', pairs: [
      { id: 'r1', a: 'Agudas', b: 'Si terminan en N, S o vocal' },
      { id: 'r2', a: 'Graves', b: 'Si NO terminan en N, S o vocal' },
      { id: 'r3', a: 'Esdrújulas', b: 'SIEMPRE' },
      { id: 'r4', a: 'CA-sa, ME-sa', b: 'Graves que terminan en vocal: sin tilde' }
    ]},
    { title: 'Ejemplos de tildes', pairs: [
      { id: 'e1', a: 'ca-MIÓN', b: 'Aguda que termina en N: con tilde' },
      { id: 'e2', a: 'pa-PEL', b: 'Aguda que termina en L: sin tilde' },
      { id: 'e3', a: 'ÁR-bol', b: 'Grave que termina en L: con tilde' },
      { id: 'e4', a: 'PÁ-ja-ro', b: 'Esdrújula: siempre con tilde' }
    ]}
  ];

  /* =====================================================================
     FLASHCARDS
     ===================================================================== */
  const FLASHCARDS = [
    { id: 'lfc01', deck: 'Publicidad y propaganda', f: 'Publicidad', b: 'Quiere VENDER algo. Usa palabras lindas para convencerte: feliz, saludable, emocionante. Ej: "¡Comprá nuestros juguetes!".' },
    { id: 'lfc02', deck: 'Publicidad y propaganda', f: 'Propaganda', b: 'Quiere CONVENCER de una idea, no vender. Ej: cuidar el ambiente, comer saludable, no tirar basura. Te pide que cambies tu conducta.' },
    { id: 'lfc03', deck: 'Publicidad y propaganda', f: '¿Cómo nos damos cuenta?', b: 'COMPRÁ / VENTA = Publicidad. CUIDÁ / AYUDÁ / NO TIRES = Propaganda.' },

    { id: 'lfc04', deck: 'Historieta', f: '¿Qué es la historieta?', b: 'Un género literario: cuenta una historia, tiene personajes y aventura, igual que un cuento.' },
    { id: 'lfc05', deck: 'Historieta', f: 'Historieta vs. cuento', b: 'Se parecen: historia, personajes y aventura. Diferente: la historieta usa dibujos, globos, onomatopeyas y menos palabras.' },
    { id: 'lfc06', deck: 'Historieta', f: 'Cartelera', b: 'VOZ DEL NARRADOR. Cuadradito rectangular que cuenta la historia. Ej: "Al otro día…".' },
    { id: 'lfc07', deck: 'Historieta', f: 'Globo', b: 'VOZ DEL PERSONAJE. Redondito con colita que sale de la boca. Es lo que dice o piensa.' },
    { id: 'lfc08', deck: 'Historieta', f: 'Onomatopeyas', b: 'Palabras que representan sonidos. Ej: ¡PUM! ¡CRASH! ¡ZAS! ¡TOC TOC! ¡RING RING!' },
    { id: 'lfc09', deck: 'Historieta', f: 'Metáforas visuales', b: 'Dibujitos que nos hacen entender una idea sin palabras.' },
    { id: 'lfc10', deck: 'Historieta', f: '💡  💕  💫  Zzz  🌩️', b: 'Bombita = idea · Corazoncitos = enamorado · Estrellitas = se golpeó · Zzz = durmiendo · Nubecita = enojado.' },

    { id: 'lfc11', deck: 'Noticia', f: '¿Qué es la noticia?', b: 'Un texto informativo que cuenta un hecho REAL que ocurrió o está ocurriendo y puede ser de interés para la comunidad. NO es inventada.' },
    { id: 'lfc12', deck: 'Noticia', f: 'Preguntas que responde', b: '¿QUÉ sucedió? ¿QUIÉNES participan? ¿CUÁNDO ocurrió? ¿DÓNDE ocurrió? ¿CUÁL FUE EL PROPÓSITO?' },
    { id: 'lfc13', deck: 'Noticia', f: 'Volanta', b: 'Presenta el tema. Va arriba de todo, chiquita.' },
    { id: 'lfc14', deck: 'Noticia', f: 'Título', b: 'Expresa lo más importante y busca llamar la atención. Va grande.' },
    { id: 'lfc15', deck: 'Noticia', f: 'Copete', b: 'Amplía brevemente la información del título. 1 o 2 renglones.' },
    { id: 'lfc16', deck: 'Noticia', f: 'Cuerpo', b: 'Desarrolla todos los detalles. Cuenta todo.' },
    { id: 'lfc17', deck: 'Noticia', f: 'Imagen', b: 'Acompaña y representa visualmente lo sucedido.' },
    { id: 'lfc18', deck: 'Noticia', f: 'Epígrafe', b: 'Explica lo que muestra la imagen. Va abajo de la foto.' },

    { id: 'lfc19', deck: 'Tildes', f: 'Agudas', b: 'Fuerza en la ÚLTIMA sílaba. Llevan tilde si terminan en N, S o VOCAL. Ej: ca-mión, ma-má, co-ra-zón. (pa-pel no lleva).' },
    { id: 'lfc20', deck: 'Tildes', f: 'Graves', b: 'Fuerza en la ANTEÚLTIMA sílaba. Llevan tilde si NO terminan en N, S o VOCAL. Ej: ár-bol, lá-piz, a-zú-car, cés-ped. (ca-sa no lleva).' },
    { id: 'lfc21', deck: 'Tildes', f: 'Esdrújulas', b: 'Fuerza en la ANTEPENÚLTIMA sílaba. SIEMPRE llevan tilde. Ej: pá-ja-ro, te-lé-fo-no, es-drú-ju-la.' },
    { id: 'lfc22', deck: 'Tildes', f: 'Paso 1', b: 'Partí la palabra en sílabas y buscá dónde suena MÁS FUERTE. Decila en voz alta y aplaudí.' },
    { id: 'lfc23', deck: 'Tildes', f: 'Paso 2', b: 'Fijate en qué termina la palabra: ¿N, S o vocal? Ahí está el truco.' }
  ];

  /* =====================================================================
     ARCADES: CLASIFICAR EN BALDES
     ===================================================================== */
  const CLASSIFY_GAMES = {
    pubprop: {
      title: '¿Publicidad o propaganda?',
      question: '¿Quiere vender o convencer de una idea?',
      buckets: [
        { id: 'pub',  name: 'Publicidad', icon: 'fa-cart-shopping',      cls: 'bucket-amber' },
        { id: 'prop', name: 'Propaganda', icon: 'fa-hand-holding-heart', cls: 'bucket-emerald' }
      ],
      items: [
        { t: '¡Comprá los juguetes de Capiplasan!',                   p: 'pub',  s: 'Aviso', why: 'Dice COMPRÁ: quiere vender.' },
        { t: '¡Gran VENTA de zapatillas! 2 x 1',                       p: 'pub',  s: 'Aviso', why: 'Dice VENTA: quiere vender.' },
        { t: 'Probá el alfajor Chocotón: ¡feliz en cada mordida!',    p: 'pub',  s: 'Aviso', why: 'Quiere que compres el alfajor: es publicidad.' },
        { t: 'Helados Polito: comprá 1 kilo y llevate un cucurucho',   p: 'pub',  s: 'Aviso', why: 'Dice COMPRÁ: quiere vender helado.' },
        { t: '¡Liquidación de bicicletas en Rodados Veloz!',          p: 'pub',  s: 'Aviso', why: 'Una liquidación es una venta: quiere vender.' },
        { t: 'Pizza Muzzapop: emocionante y deliciosa. ¡Pedila ya!',   p: 'pub',  s: 'Aviso', why: 'Quiere que compres la pizza y usa palabras lindas: publicidad.' },
        { t: 'Comprá tu mochila en Librería El Lápiz',                 p: 'pub',  s: 'Aviso', why: 'Dice COMPRÁ: quiere vender.' },
        { t: 'Yogur Vaquita: ¡saludable y riquísimo! En tu súper',     p: 'pub',  s: 'Aviso', why: 'Quiere vender el yogur y usa palabras lindas: publicidad.' },
        { t: 'Pelotas Gol: ¡comprá la tuya en oferta!',                p: 'pub',  s: 'Aviso', why: 'Dice COMPRÁ: quiere vender.' },
        { t: '¡Cuidá el agua! Cerrá la canilla.',                      p: 'prop', s: 'Aviso', why: 'Dice CUIDÁ: quiere que cambies tu conducta.' },
        { t: 'No tires basura en la calle.',                           p: 'prop', s: 'Aviso', why: 'Dice NO TIRES: es propaganda.' },
        { t: 'Comé frutas y verduras todos los días.',                 p: 'prop', s: 'Aviso', why: 'Quiere convencerte de comer saludable, no vende nada.' },
        { t: 'Ayudá a los animales de la calle: adoptá un perrito.',   p: 'prop', s: 'Aviso', why: 'Dice AYUDÁ: quiere convencerte de una idea.' },
        { t: 'Cruzá siempre por la senda peatonal.',                   p: 'prop', s: 'Aviso', why: 'Te pide que cambies tu conducta: es propaganda.' },
        { t: 'Cuidá las plantas de la plaza.',                         p: 'prop', s: 'Aviso', why: 'Dice CUIDÁ: es propaganda.' },
        { t: 'Separá la basura: ¡reciclar ayuda al planeta!',          p: 'prop', s: 'Aviso', why: 'Quiere convencerte de cuidar el ambiente.' },
        { t: 'Lavate las manos antes de comer.',                       p: 'prop', s: 'Aviso', why: 'Quiere que cambies tu conducta: es propaganda.' },
        { t: 'Apagá la luz cuando salís de una habitación.',           p: 'prop', s: 'Aviso', why: 'Quiere convencerte de ahorrar energía, no vende nada.' }
      ]
    },
    historieta: {
      title: '¿Cartelera, globo u onomatopeya?',
      question: '¿Quién habla: el narrador, el personaje o es un sonido?',
      buckets: [
        { id: 'cartel', name: 'Cartelera',   icon: 'fa-note-sticky',  cls: 'bucket-amber' },
        { id: 'globo',  name: 'Globo',       icon: 'fa-comment',      cls: 'bucket-sky' },
        { id: 'ono',    name: 'Onomatopeya', icon: 'fa-volume-high',  cls: 'bucket-indigo' }
      ],
      items: [
        { t: 'Al otro día…',                         p: 'cartel', s: 'Texto de la historieta', why: 'Lo cuenta el narrador: va en la cartelera.' },
        { t: 'Mientras tanto, en la escuela…',       p: 'cartel', s: 'Texto de la historieta', why: 'Lo cuenta el narrador: va en la cartelera.' },
        { t: 'Esa noche, en el bosque…',             p: 'cartel', s: 'Texto de la historieta', why: 'Lo cuenta el narrador: va en la cartelera.' },
        { t: 'Había una vez un perro muy travieso.', p: 'cartel', s: 'Texto de la historieta', why: 'Lo cuenta el narrador: va en la cartelera.' },
        { t: 'Dos horas más tarde…',                 p: 'cartel', s: 'Texto de la historieta', why: 'Lo cuenta el narrador: va en la cartelera.' },
        { t: 'Al llegar a la plaza…',                p: 'cartel', s: 'Texto de la historieta', why: 'Lo cuenta el narrador: va en la cartelera.' },
        { t: '¡Hola, Lucas! ¿Jugamos a la pelota?',  p: 'globo',  s: 'Texto de la historieta', why: 'Lo dice un personaje: va en un globo.' },
        { t: '¡Qué hambre tengo!',                   p: 'globo',  s: 'Texto de la historieta', why: 'Lo dice un personaje: va en un globo.' },
        { t: '¿Dónde dejé mi mochila?',              p: 'globo',  s: 'Texto de la historieta', why: 'Lo dice un personaje: va en un globo.' },
        { t: '¡Socorro, un fantasma!',               p: 'globo',  s: 'Texto de la historieta', why: 'Lo dice un personaje: va en un globo.' },
        { t: 'Mmm… ¿y si hago una torta?',           p: 'globo',  s: 'Texto de la historieta', why: 'Lo piensa un personaje: va en un globo.' },
        { t: '¡Te quiero mucho, abuela!',            p: 'globo',  s: 'Texto de la historieta', why: 'Lo dice un personaje: va en un globo.' },
        { t: '¡PUM!',        p: 'ono', s: 'Texto de la historieta', why: 'Representa un sonido: es una onomatopeya.' },
        { t: '¡CRASH!',      p: 'ono', s: 'Texto de la historieta', why: 'Representa un sonido: es una onomatopeya.' },
        { t: '¡ZAS!',        p: 'ono', s: 'Texto de la historieta', why: 'Representa un sonido: es una onomatopeya.' },
        { t: '¡TOC TOC!',    p: 'ono', s: 'Texto de la historieta', why: 'Representa un sonido: es una onomatopeya.' },
        { t: '¡RING RING!',  p: 'ono', s: 'Texto de la historieta', why: 'Representa un sonido: es una onomatopeya.' },
        { t: '¡GUAU GUAU!',  p: 'ono', s: 'Texto de la historieta', why: 'Representa un sonido: es una onomatopeya.' },
        { t: '¡BOING!',      p: 'ono', s: 'Texto de la historieta', why: 'Representa un sonido: es una onomatopeya.' }
      ]
    },
    acento: {
      title: '¿Aguda, grave o esdrújula?',
      question: '¿Dónde suena más fuerte?',
      buckets: [
        { id: 'Aguda',     name: 'Aguda',     icon: 'fa-forward-step',  cls: 'bucket-sky' },
        { id: 'Grave',     name: 'Grave',     icon: 'fa-pause',         cls: 'bucket-emerald' },
        { id: 'Esdrújula', name: 'Esdrújula', icon: 'fa-backward-step', cls: 'bucket-amber' }
      ],
      items: TILDES.map((x) => ({ t: x.w, p: x.clase, s: 'Decila en voz alta y aplaudí',
        why: x.fuerte + ': suena fuerte ' + DONDE[x.pos] + '.' }))
    },
    tilde: {
      title: '¿Lleva tilde?',
      question: 'Mirá dónde suena fuerte (en MAYÚSCULA) y en qué termina.',
      buckets: [
        { id: 'si', name: 'Sí, lleva tilde', icon: 'fa-check', cls: 'bucket-emerald' },
        { id: 'no', name: 'No lleva tilde',  icon: 'fa-xmark', cls: 'bucket-indigo' }
      ],
      items: TILDES.map((x) => ({ t: x.fuertePlano, p: x.tilde ? 'si' : 'no',
        s: 'La sílaba fuerte está en MAYÚSCULA',
        why: 'Se escribe «' + x.w + '». ' + x.regla }))
    }
  };

  /* =====================================================================
     DETECTIVES (juego de pasos con pistas)
     ===================================================================== */

  /** La palabra con una tilde de más (en la sílaba fuerte), para las opciones. */
  const conTilde = (x) => x.sil.map((s, k) => (k === x.f
    ? s.replace(/[aeiou](?=[^aeiou]*$)/, (v) => ({ a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' })[v]) : s)).join('');

  /** Detective de tildes: Paso 1 (dónde suena fuerte), clase, Paso 2 (en
      qué termina) y si lleva tilde. La palabra se muestra sin tilde. */
  function tildeCase(x) {
    const p = plain(x.w);
    const steps = [
      { tag: 'Paso 1 · ¿Dónde suena fuerte?', mix: false,
        q: 'Decí «' + p + '» en voz alta y aplaudí. ¿Qué sílaba suena MÁS FUERTE?',
        ok: x.opcionesFuerte[x.f], opts: x.opcionesFuerte,
        why: 'Suena fuerte ' + DONDE[x.pos] + ': ' + x.fuertePlano + '.' },
      { tag: '¿Aguda, grave o esdrújula?',
        q: 'Si suena fuerte ' + DONDE[x.pos].split(' (')[0] + ', la palabra es…',
        ok: x.clase, opts: CLASES,
        why: ['Aguda: fuerza en la ÚLTIMA sílaba.', 'Grave: fuerza en la ANTEÚLTIMA sílaba.', 'Esdrújula: fuerza en la ANTEPENÚLTIMA sílaba.'][x.pos] }
    ];
    if (x.pos < 2) {
      steps.push({ tag: 'Paso 2 · ¿En qué termina?',
        q: '¿En qué termina «' + p + '»?',
        ok: x.nsv ? 'En N, S o vocal' : 'En otra letra', opts: ['En N, S o vocal', 'En otra letra'],
        why: 'Termina en ' + x.fin + (x.nsv ? '.' : ': no es N, S ni vocal.') });
    }
    steps.push({ tag: '¿Lleva tilde?', mix: true,
      q: '¿Cómo se escribe?',
      ok: x.w, opts: x.tilde ? [x.w, p] : [x.w, conTilde(x)],
      why: x.regla });
    return { s: '*' + p + '*', w: p, sil: x.sil.map(plain).join(' - '), steps: steps };
  }

  /** Detective de noticias: preguntas de la noticia, con distractores
      sacados de las otras noticias. */
  const PREGUNTAS = [
    { k: 'que',     tag: '¿Qué sucedió?',        q: '¿QUÉ sucedió?' },
    { k: 'quienes', tag: '¿Quiénes participan?', q: '¿QUIÉNES participan?' },
    { k: 'cuando',  tag: '¿Cuándo ocurrió?',     q: '¿CUÁNDO ocurrió?' },
    { k: 'donde',   tag: '¿Dónde ocurrió?',      q: '¿DÓNDE ocurrió?' },
    { k: 'para',    tag: '¿Cuál fue el propósito?', q: '¿CUÁL FUE EL PROPÓSITO?' }
  ];
  function noticiaCase(n) {
    const otras = NOTICIAS.filter((x) => x !== n);
    const steps = APP.pick(PREGUNTAS, 3).map((P) => ({
      tag: P.tag, mix: true, q: P.q, ok: n[P.k],
      opts: [n[P.k]].concat(APP.pick(otras, 3).map((x) => x[P.k])),
      why: P.q + ' → ' + n[P.k] + '.'
    }));
    steps.push({ tag: '¿Real o inventada?', q: 'Esta noticia, ¿cuenta un hecho real o una historia inventada?',
      ok: 'Un hecho real', opts: ['Un hecho real', 'Una historia inventada', 'Un aviso para vender algo'],
      why: 'La noticia cuenta un hecho REAL. No es inventada: por eso es diferente del cuento y la historieta.' });
    return { news: n, steps: steps };
  }

  const DETECTIVES = {
    tildes: {
      unit: 'palabra', units: 'palabras',
      build: () => APP.shuffle(
        APP.pick(TILDES.filter((x) => x.pos === 0), 2)
          .concat(APP.pick(TILDES.filter((x) => x.pos === 1), 2))
          .concat(APP.pick(TILDES.filter((x) => x.pos === 2), 1))
      ).map(tildeCase)
    },
    noticias: {
      unit: 'noticia', units: 'noticias',
      build: () => APP.pick(NOTICIAS, 4).map(noticiaCase)
    }
  };

  /* =====================================================================
     ENCONTRÁ LAS PARTES
     Cada ronda muestra un ejemplo dibujado. Los pasos son "tocá tal
     parte" (tap) o una pregunta con opciones (ok/opts).
     ===================================================================== */
  function historietaRonda(h) {
    const meta = h.metaQ;
    return { kind: 'historieta', ex: h, steps: APP.shuffle([
      { tap: 'cartel', q: 'Tocá una CARTELERA (la voz del narrador).', why: PART_INFO.cartel.d },
      { tap: 'globo',  q: 'Tocá un GLOBO (la voz de un personaje).',   why: PART_INFO.globo.d },
      { tap: 'ono',    q: 'Tocá una ONOMATOPEYA (un sonido).',        why: PART_INFO.ono.d },
      { tap: 'meta',   q: 'Tocá una METÁFORA VISUAL.',                 why: PART_INFO.meta.d + ' Ej: 💡 = se le ocurrió una idea.' }
    ]).concat([
      { q: 'En esta historieta aparece «' + meta + '». ¿Qué quiere decir?', mix: true,
        ok: METAS[meta], opts: [METAS[meta]].concat(APP.pick(Object.keys(METAS).filter((k) => k !== meta).map((k) => METAS[k]), 3)),
        why: 'Es una metáfora visual: ' + meta + ' = ' + METAS[meta].toLowerCase() + '.' }
    ])};
  }
  function noticiaRonda(n) {
    const partes = ['volanta', 'titulo', 'copete', 'cuerpo', 'imagen', 'epigrafe'];
    return { kind: 'noticia', ex: n, steps: APP.pick(partes, 5).map((p) => ({
      tap: p, q: 'Tocá ' + (p === 'volanta' || p === 'imagen' ? 'la ' : 'el ') + PART_INFO[p].n.toUpperCase() + '.',
      why: PART_INFO[p].n + ': ' + PART_INFO[p].d
    })) };
  }
  function avisoRonda(a) {
    const pub = a.tipo === 'publicidad';
    return { kind: 'aviso', ex: a, steps: [
      { q: '¿Este aviso es publicidad o propaganda?', ok: pub ? 'Publicidad' : 'Propaganda', opts: ['Publicidad', 'Propaganda'],
        why: pub ? 'Quiere VENDER algo: es publicidad.' : 'Quiere CONVENCER de una idea, no vende nada: es propaganda.' },
      { tap: 'pista', q: 'Tocá la palabra que te da la pista.',
        why: pub ? 'COMPRÁ / VENTA = publicidad.' : 'CUIDÁ / AYUDÁ / NO TIRES = propaganda.' },
      { q: '¿Qué te pide este aviso?', ok: pub ? 'Que compres algo' : 'Que cambies tu conducta',
        opts: ['Que compres algo', 'Que cambies tu conducta'],
        why: pub ? 'La publicidad quiere que compres.' : 'La propaganda no te pide que compres: te pide que cambies tu conducta.' }
    ]};
  }
  const PARTES = {
    build() {
      const pubs = AVISOS.filter((a) => a.tipo === 'publicidad');
      const props = AVISOS.filter((a) => a.tipo === 'propaganda');
      return APP.pick(HISTORIETAS, 2).map(historietaRonda)
        .concat(APP.pick(NOTICIAS, 1).map(noticiaRonda))
        .concat(APP.shuffle(APP.pick(pubs, 1).concat(APP.pick(props, 1))).map(avisoRonda));
    }
  };

  /* =====================================================================
     PONÉ LOS NOMBRES
     Cada parte del ejemplo aparece con un "?". Santi elige un nombre del
     banco y toca la parte donde va. `types` = las partes a nombrar;
     `extra` = nombres que sobran (de otros textos), para no adivinar.
     ===================================================================== */
  const NOMBRAR = {
    build() {
      const pub  = APP.pick(AVISOS.filter((a) => a.tipo === 'publicidad'), 1)[0];
      const prop = APP.pick(AVISOS.filter((a) => a.tipo === 'propaganda'), 1)[0];
      return [
        { kind: 'historieta', ex: APP.pick(HISTORIETAS, 1)[0],
          types: ['cartel', 'globo', 'ono', 'meta'],
          extra: APP.pick(['volanta', 'epigrafe', 'copete', 'pista'], 2) },
        { kind: 'noticia', ex: APP.pick(NOTICIAS, 1)[0],
          types: ['volanta', 'titulo', 'copete', 'cuerpo', 'imagen', 'epigrafe'],
          extra: APP.pick(['cartel', 'globo', 'ono', 'lindas'], 2) }
      ].concat(APP.shuffle([pub, prop]).map((a) => ({
        kind: 'aviso', ex: a,
        types: [a.tipo, 'pista', 'lindas', 'marca'],
        extra: [a.tipo === 'publicidad' ? 'propaganda' : 'publicidad'].concat(APP.pick(['ono', 'epigrafe', 'volanta'], 1))
      })));
    }
  };

  const EJEMPLOS = { HISTORIETAS, NOTICIAS, AVISOS, METAS, TILDES };

  /* =====================================================================
     CATÁLOGO DE JUEGOS
     ===================================================================== */
  const GAMES = [
    { id: 'ejemplos',   type: 'ejemplos', name: 'Ejemplos con sus partes', icon: 'fa-shapes',
      desc: 'Historietas, noticias y avisos de verdad, con cada parte marcada. ¡Mirá antes de jugar!', tint: 'from-pink-500 to-rose-600' },
    { id: 'partes',     type: 'partes', name: 'Encontrá las partes', icon: 'fa-hand-pointer',
      desc: 'Tocá la cartelera, el globo, la volanta, el epígrafe… en historietas, noticias y avisos.', tint: 'from-orange-500 to-amber-500' },
    { id: 'nombrar',    type: 'nombrar', name: 'Poné los nombres', icon: 'fa-tags',
      desc: 'Elegí cada nombre y ponelo en su parte: en la historieta, la noticia, la publicidad y la propaganda.', tint: 'from-lime-500 to-emerald-600' },
    { id: 'trivia',     type: 'trivia', name: 'Trivia contrarreloj', icon: 'fa-brain',
      desc: '10 preguntas con reloj, racha y puntos extra.', tint: 'from-indigo-500 to-violet-600' },
    { id: 'tildes',     type: 'detective', name: 'Detective de tildes', icon: 'fa-magnifying-glass',
      desc: 'Paso 1: ¿dónde suena fuerte? Paso 2: ¿en qué termina? ¿Lleva tilde?', tint: 'from-teal-500 to-sky-600' },
    { id: 'noticias',   type: 'detective', name: 'Detective de noticias', icon: 'fa-newspaper',
      desc: 'Leé la noticia: ¿qué pasó, quiénes, cuándo, dónde y para qué?', tint: 'from-cyan-500 to-blue-600' },
    { id: 'unir',       type: 'match', name: 'Unir con flechas', icon: 'fa-diagram-project',
      desc: 'Arrastrá cada concepto hasta su definición.', tint: 'from-emerald-500 to-teal-600' },
    { id: 'cartas',     type: 'cards', name: 'Flashcards', icon: 'fa-clone',
      desc: 'Repaso rápido: tocá la tarjeta para darla vuelta.', tint: 'from-amber-500 to-orange-600' },
    { id: 'pubprop',    type: 'classify', name: '¿Publicidad o propaganda?', icon: 'fa-bullhorn',
      desc: '¡Arcade! ¿Quiere vender o convencer de una idea? Tirá cada aviso al balde correcto.', tint: 'from-fuchsia-500 to-pink-600' },
    { id: 'historieta', type: 'classify', name: '¿Cartelera, globo u onomatopeya?', icon: 'fa-comment-dots',
      desc: '¡Arcade! ¿Habla el narrador, un personaje o es un sonido?', tint: 'from-sky-500 to-indigo-600' },
    { id: 'acento',     type: 'classify', name: '¿Aguda, grave o esdrújula?', icon: 'fa-volume-high',
      desc: '¡Arcade! Decí la palabra en voz alta y buscá dónde suena fuerte.', tint: 'from-violet-500 to-purple-700' },
    { id: 'tilde',      type: 'classify', name: '¿Lleva tilde?', icon: 'fa-pen-nib',
      desc: '¡Arcade! Aplicá la regla: ¿lleva tilde o no?', tint: 'from-rose-500 to-orange-500' },
    { id: 'resumen',    type: 'resumen', name: 'Resumen para leer', icon: 'fa-book-open',
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
    topic: 'Avisos, historietas, noticias y tildes',
    intro: 'Publicidad y propaganda, la historieta, la noticia y las reglas de tilde. ¡Elegí un juego y a jugar!',
    expert: 'Lengua',
    tip: 'arrancá por <b>Ejemplos con sus partes</b> y el <b>Resumen</b>, después probá <b>Encontrá las partes</b>, los <b>Detectives</b> y los arcades para ver cuánto te acordás. Cada partida te da XP para subir de nivel.',
    source: 'Lengua — fotocopias de clase',
    storeKey: 'estudioSanti.lengua.v2',   // temas nuevos: arranca de cero
    LEVELS,
    FICHA, RESUMEN, TABLA,
    TRIVIA,
    MATCH_ROUNDS, FLASHCARDS, CLASSIFY_GAMES, DETECTIVES, PARTES, NOMBRAR, PART_INFO, EJEMPLOS, GAMES
  };
})(window.APP);
