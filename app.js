/* =======================================================================
   ESTUDIO SANTI · "Pueblos originarios de Santa Fe"
   Ciencias Sociales — contenido de pueblos_originarios_de_santa_fe.md

   app.js  ->  1) DATOS del resumen (banco de contenido educativo)
               2) UTILIDADES (sonido sintetizado, confeti, vibración, storage)

   Todo se expone en el objeto global `window.APP` para que index.html
   (donde viven los componentes de React) lo consuma.
   ======================================================================= */

window.APP = (function () {
  'use strict';

  /* =====================================================================
     SECCIÓN 1 · UTILIDADES GENERALES
     ===================================================================== */

  /** Mezcla un array (Fisher-Yates) sin mutar el original. */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Devuelve n elementos al azar de un array. */
  function pick(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  /* ------------------------- Sonido (Web Audio) -------------------------
     No usamos archivos mp3: generamos los efectos con osciladores para que
     la app funcione 100% offline una vez cargada. */
  const sfx = (function () {
    let ctx = null;
    let muted = false;

    function ac() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    /** Toca una nota simple. */
    function tone(freq, start, dur, type, vol) {
      const c = ac();
      if (!c) return;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, c.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(vol || 0.18, c.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
      osc.connect(gain).connect(c.destination);
      osc.start(c.currentTime + start);
      osc.stop(c.currentTime + start + dur + 0.05);
    }

    /** Melodías por evento. */
    const patterns = {
      click:   [[520, 0, 0.07, 'triangle', 0.08]],
      correct: [[660, 0, 0.11, 'sine', 0.16], [880, 0.09, 0.13, 'sine', 0.16], [1180, 0.19, 0.2, 'sine', 0.13]],
      wrong:   [[240, 0, 0.16, 'sawtooth', 0.10], [170, 0.13, 0.24, 'sawtooth', 0.09]],
      win:     [[523, 0, 0.13, 'sine', 0.16], [659, 0.12, 0.13, 'sine', 0.16],
                [784, 0.24, 0.13, 'sine', 0.16], [1046, 0.36, 0.34, 'sine', 0.16]],
      lose:    [[392, 0, 0.18, 'triangle', 0.13], [330, 0.16, 0.2, 'triangle', 0.12], [247, 0.34, 0.35, 'triangle', 0.11]],
      flip:    [[420, 0, 0.06, 'sine', 0.07], [620, 0.05, 0.07, 'sine', 0.07]],
      tick:    [[900, 0, 0.04, 'square', 0.05]]
    };

    return {
      play(name) {
        if (muted) return;
        const p = patterns[name];
        if (!p) return;
        try { p.forEach((n) => tone.apply(null, n)); } catch (e) { /* audio no disponible */ }
      },
      setMuted(v) { muted = !!v; },
      isMuted() { return muted; }
    };
  })();

  /** Vibración corta (sólo en celulares que la soportan). */
  function vibrate(pattern) {
    if (navigator.vibrate) {
      try { navigator.vibrate(pattern); } catch (e) { /* ignorar */ }
    }
  }

  /* ---------------------------- Confeti --------------------------------
     Canvas a pantalla completa, sin librerías externas. */
  const confetti = (function () {
    let canvas = null, ctx = null, parts = [], running = false;
    const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#38bdf8', '#a855f7', '#fbbf24'];

    function ensure() {
      if (canvas) return;
      canvas = document.createElement('canvas');
      canvas.className = 'confetti-canvas';
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts = parts.filter((p) => p.life > 0);
      parts.forEach((p) => {
        p.vy += 0.16;              // gravedad
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      });
      if (parts.length) {
        requestAnimationFrame(loop);
      } else {
        running = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    /**
     * Lanza confeti.
     * @param {number} amount cantidad de papelitos
     * @param {{x:number,y:number}} [origin] origen en píxeles (por defecto: centro-arriba)
     */
    return function burst(amount, origin) {
      ensure();
      const n = amount || 70;
      const ox = origin ? origin.x : window.innerWidth / 2;
      const oy = origin ? origin.y : window.innerHeight * 0.32;
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 8;
        parts.push({
          x: ox, y: oy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          s: 6 + Math.random() * 8,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          life: 70 + Math.random() * 50,
          color: COLORS[(Math.random() * COLORS.length) | 0]
        });
      }
      if (!running) { running = true; requestAnimationFrame(loop); }
    };
  })();

  /* ------------------------- Progreso guardado -------------------------- */
  const STORE_KEY = 'estudioSanti.pueblos.v1';
  const DEFAULT_STATE = {
    xp: 0,
    muted: false,
    bestStars: {},   // { trivia: 3, tiempo: 2, ... }
    bestScore: {},   // { trivia: 1250, ... }
    played: {},      // { trivia: 4, ... }  cantidad de partidas
    knownCards: []   // ids de flashcards marcadas como "ya la sé"
  };

  const store = {
    get() {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        return raw ? Object.assign({}, DEFAULT_STATE, JSON.parse(raw)) : Object.assign({}, DEFAULT_STATE);
      } catch (e) {
        return Object.assign({}, DEFAULT_STATE);
      }
    },
    set(patch) {
      const next = Object.assign(this.get(), patch);
      try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch (e) { /* modo privado */ }
      return next;
    },
    reset() {
      try { localStorage.removeItem(STORE_KEY); } catch (e) { /* ignorar */ }
      return Object.assign({}, DEFAULT_STATE);
    }
  };

  /** Convierte un porcentaje de acierto en estrellas (0 a 3). */
  function starsFor(pct) {
    if (pct >= 0.9) return 3;
    if (pct >= 0.7) return 2;
    if (pct >= 0.5) return 1;
    return 0;
  }

  /** Mensajes de refuerzo positivo (nunca retos negativos). */
  const PRAISE = [
    '¡Excelente, Santi!', '¡Muy bien!', '¡Lo clavaste!', '¡Genial!',
    '¡Eso es!', '¡Sos un crack!', '¡Perfecto!', '¡Increíble memoria!'
  ];
  const ENCOURAGE = [
    'Casi... ¡mirá la pista y seguimos!', 'No pasa nada, ahora ya lo sabés.',
    '¡Buen intento! Este dato es difícil.', 'Tranqui, con esta aprendiste algo nuevo.',
    'Ups, esa no era. ¡La próxima sale!'
  ];
  const FINAL_MSG = [
    { min: 0.9, t: '¡Sos un experto en pueblos originarios! 🏆', d: 'Dominás el tema de punta a punta.' },
    { min: 0.7, t: '¡Muy buen trabajo! 🌟', d: 'Casi todo perfecto. Repasá los datos que fallaste y sos imparable.' },
    { min: 0.5, t: '¡Vas por buen camino! 💪', d: 'Ya sabés más de la mitad. Una vuelta más y lo tenés.' },
    { min: 0,   t: '¡Buen comienzo! 🚀', d: 'Pasá por las Flashcards y volvé a jugar: vas a ver la diferencia.' }
  ];
  function finalMessage(pct) {
    return FINAL_MSG.find((m) => pct >= m.min);
  }


  /* ------------------------------ Niveles -------------------------------
     El XP que se gana jugando hace subir de nivel. */
  const LEVELS = [
    { min: 0,    name: 'Aprendiz',              icon: '🌱' },
    { min: 60,   name: 'Explorador',            icon: '🧭' },
    { min: 150,  name: 'Rastreador',            icon: '🔎' },
    { min: 300,  name: 'Navegante del Paraná',  icon: '🛶' },
    { min: 500,  name: 'Guardián de la historia', icon: '🛡️' },
    { min: 800,  name: 'Sabio de los pueblos',  icon: '🦉' },
    { min: 1200, name: 'Gran cacique del saber', icon: '👑' }
  ];
  /** Nivel actual a partir del XP: { n, name, icon, min, next } */
  function levelFor(xp) {
    let k = 0;
    while (k + 1 < LEVELS.length && xp >= LEVELS[k + 1].min) k++;
    const cur = LEVELS[k], nxt = LEVELS[k + 1];
    return { n: k + 1, name: cur.name, icon: cur.icon, min: cur.min, next: nxt ? nxt.min : null };
  }

  /* =====================================================================
     SECCIÓN 2 · DATOS (todo tomado de pueblos_originarios_de_santa_fe.md)
     ===================================================================== */

  /** Ficha de datos clave, usada en el modo Resumen. */
  const FICHA = [
    { k: 'Al principio eran…',             v: 'Nómades (se movían de un lugar a otro)' },
    { k: 'Después algunos se volvieron…',  v: 'Sedentarios (se quedaron a vivir fijos en un lugar)' },
    { k: 'Chaco Santafesino (el norte)',   v: 'Cultura Guaycurú: Mocovíes y Abipones' },
    { k: 'Litoral del Río Paraná',         v: 'Cultura Chaná-Timbú y los Guaraníes' },
    { k: 'Guaraníes',                      v: 'En el delta del Paraná' },
    { k: 'Primera expedición española',    v: 'Juan Díaz de Solís, 1516, al Río de la Plata' },
    { k: 'Fundación de Santa Fe',          v: '15 de noviembre de 1573' },
    { k: 'Traslado a su ubicación actual', v: '1649' },
    { k: 'Corrientes colonizadoras',       v: 'Tres corrientes u oleadas' },
    { k: 'Pueblos originarios hoy',        v: '12 pueblos viven en la provincia' },
    { k: 'Los que más territorio ocupan',  v: 'Mocovíes y Abipones (grupo Guaycurú)' },
    { k: 'Semana de los pueblos originarios', v: 'Del 19 al 25 de abril' },
    { k: 'Escuelas interculturales bilingües', v: '36 en Santa Fe' }
  ];

  /** Texto del resumen, por secciones. */
  const RESUMEN = [
    { t: '1. Quiénes vivían acá antes de los españoles', p: [
      'Al principio eran nómades (se movían de un lugar a otro). Después algunos se volvieron sedentarios (se quedaron a vivir fijos en un lugar).',
      'En Santa Fe se distribuyeron así: en el Litoral del Río Paraná, la cultura Chaná-Timbú y los Guaraníes; en el Chaco Santafesino (el norte), pueblos de la cultura Guaycurú.',
      'Hoy todavía viven descendientes: en el norte y en el litoral del Río Paraná viven los Mocovíes y los Qom. Van a escuelas y hospitales con educación y salud intercultural (respetando su cultura).'
    ]},
    { t: '2. La conquista del actual territorio argentino', p: [
      'No llegaron todos de golpe: hubo tres corrientes u oleadas colonizadoras.',
      'La primera expedición española en arribar al Río de la Plata fue encabezada por Juan Díaz de Solís en 1516.',
      'El 15 de noviembre de 1573 se fundó la ciudad de Santa Fe.',
      'En 1649 fue trasladada a su actual ubicación.'
    ]},
    { t: '3. Pueblos nómades (los primeros de todos)', p: [
      'No tenían casa fija. Se trasladaban a pie por el territorio para conseguir sus alimentos.',
      'Cazaban venados, ñandúes y roedores. Recolectaban frutas, semillas y raíces. Cuando esos recursos escaseaban se trasladaban a otros territorios.',
      'Construían casas fáciles de desarmar con ramas, pajas y pieles para poder irse a otros lugares.'
    ]},
    { t: '4. Pueblos sedentarios', p: [
      'Aprendieron a cultivar plantas y a domesticar animales. Construían vasijas de barro (alfarería).',
      'Así nacieron las primeras sociedades agrícolas-ganaderas. Cosechaban porotos, papas, mandioca, maíz. Criaban llamas, pavos y cobayos.',
      'Se asentaron en un lugar fijo y construyeron casas permanentes de piedra y madera, por eso se llamaban sedentarios.'
    ]},
    { t: '5. Los pueblos originarios en la actualidad', p: [
      'En la provincia de Santa Fe aún viven descendientes de los pueblos originarios. Hoy siguen viviendo los Mocovíes y los Qom (en el norte y litoral), que son descendientes de los Guaycurúes.',
      'Hoy viven 12 pueblos originarios en la provincia.',
      'Mocovíes y Abipones: son del grupo Guaycurú, de la zona del Chaco. Son los que más territorios ocupan hoy. Los Mocovíes están en gran parte del centro, norte y también en el sur de la provincia.',
      'Qom (Tobas): viven en los departamentos de Castellanos, General Obligado, Rosario y La Capital.',
      'Otros pueblos que llegaron de otras provincias: Kolla (norte de General López y un poquito en Rosario), Corondas (departamento San Jerónimo), Diaguitas (un sector chiquito de la capital) y Mapuche (norte del departamento General López y sur de Rosario).',
      'Cada año se realiza la semana de los pueblos originarios, del 19 al 25 de abril, para mostrar su cultura y artesanías. Para no perder su identidad, el estado hoy reconoce sus derechos.'
    ]},
    { t: '6. Las escuelas interculturales bilingües', p: [
      '¿Qué son? Una modalidad de escuela (jardín, primaria, secundaria) que garantiza que los pueblos indígenas puedan estudiar en su propia lengua y manteniendo su cultura, su forma de ver el mundo (cosmovisión) y su identidad.',
      'Bilingüe: que hablan dos idiomas (el propio y el español). Cosmovisión: cómo cada pueblo ve y explica el mundo.',
      '¿Para qué sirven? Para preservar su lengua y cultura, para que puedan vivir en un mundo con muchas culturas diferentes y para mejorar su calidad de vida.',
      'En Santa Fe: 1993, se crea la Ley Provincial Aborigen. 2005, con el decreto 1719 se les da prioridad a estas escuelas. 2020, recién se reconoce oficialmente como modalidad por la Ley Nacional.',
      'Hoy hay 36 escuelas interculturales bilingües en Santa Fe. La mayoría están en el norte y centro-norte, donde viven más Mocovíes y Qom. En el sur hay algunas cerca de Rosario.'
    ]}
  ];

  /** Cuadro de los tres pueblos (para el Resumen). */
  const PUEBLOS_TABLA = [
    ['Guaycurú', 'Chaco Santafesino, al norte de la provincia. Así le decían a los Mocovíes y Abipones.',
      'En tribus de pocas familias, con un jefe o cacique que podía ser hombre o mujer. Eran guerreros. Los hombres cazaban, las mujeres recolectaban frutos y leñas.'],
    ['Chaná Timbú', 'En toda la costa del Río Paraná. Usaban canoas/embarcaciones para moverse. Tribus: Mepene, Mocoretá, Quiloazas, Corondas, Timbúes, Carcaraes y Chanás.',
      'En aldeas con casas grandes comunales de paja y junco, protegidas de las inundaciones por médanos. Tenían un cacique que organizaba el trabajo de todos.'],
    ['Guaraníes', 'En el delta del Paraná.',
      'Pescadores; cazaban animales, recolectaban frutos y raíces. Cultivaban maíz, porotos, maní, algodón, tabaco y calabazas. Eran sedentarios y guerreros muy valientes, buscaban tierras para conquistar. El cacique era el guerrero más valiente.']
  ];

  /* =====================================================================
     SECCIÓN 3 · JUEGO 1: TRIVIA
     Cada pregunta: tema, enunciado, respuesta correcta, opciones
     incorrectas y explicación.
     ===================================================================== */
  const TRIVIA = [
    // --- Nómades y sedentarios ---
    { t: 'Nómades y sedentarios', q: '¿Qué quiere decir que un pueblo era nómade?',
      ok: 'Que se movía de un lugar a otro', bad: ['Que vivía fijo en un lugar', 'Que vivía en el delta', 'Que hablaba dos idiomas'],
      why: 'Nómades: se movían de un lugar a otro.' },
    { t: 'Nómades y sedentarios', q: '¿Qué quiere decir que un pueblo era sedentario?',
      ok: 'Que se quedaba a vivir fijo en un lugar', bad: ['Que se movía de un lugar a otro', 'Que vivía en canoas', 'Que no tenía cacique'],
      why: 'Sedentarios: se quedaron a vivir fijos en un lugar.' },
    { t: 'Nómades y sedentarios', q: '¿Cómo eran los pueblos al principio?',
      ok: 'Nómades', bad: ['Sedentarios', 'Agrícolas-ganaderos', 'Bilingües'],
      why: 'Al principio eran nómades; después algunos se volvieron sedentarios.' },
    { t: 'Nómades y sedentarios', q: '¿Cómo se trasladaban los pueblos nómades?',
      ok: 'A pie', bad: ['A caballo', 'En carretas', 'En barcos españoles'],
      why: 'Se trasladaban a pie por el territorio para conseguir sus alimentos.' },
    { t: 'Nómades y sedentarios', q: '¿Qué animales cazaban los pueblos nómades?',
      ok: 'Venados, ñandúes y roedores', bad: ['Llamas, pavos y cobayos', 'Vacas y ovejas', 'Peces y tortugas'],
      why: 'Cazaban venados, ñandúes y roedores.' },
    { t: 'Nómades y sedentarios', q: '¿Qué recolectaban los pueblos nómades?',
      ok: 'Frutas, semillas y raíces', bad: ['Algodón y tabaco', 'Piedras y madera', 'Papas y mandioca cultivadas'],
      why: 'Recolectaban frutas, semillas y raíces.' },
    { t: 'Nómades y sedentarios', q: '¿Qué hacían los nómades cuando los recursos escaseaban?',
      ok: 'Se trasladaban a otros territorios', bad: ['Empezaban a cultivar', 'Construían casas de piedra', 'Pedían ayuda a los españoles'],
      why: 'Cuando esos recursos escaseaban se trasladaban a otros territorios.' },
    { t: 'Nómades y sedentarios', q: '¿Con qué construían sus casas los pueblos nómades?',
      ok: 'Con ramas, pajas y pieles', bad: ['Con piedra y madera', 'Con barro cocido', 'Con ladrillos'],
      why: 'Construían casas fáciles de desarmar con ramas, pajas y pieles para poder irse a otros lugares.' },
    { t: 'Nómades y sedentarios', q: '¿Por qué los nómades hacían casas fáciles de desarmar?',
      ok: 'Para poder irse a otros lugares', bad: ['Porque no sabían construir', 'Para protegerse de las inundaciones', 'Para que duraran para siempre'],
      why: 'Las casas fáciles de desarmar les permitían irse a otros lugares.' },
    { t: 'Nómades y sedentarios', q: '¿Qué aprendieron a hacer los pueblos sedentarios?',
      ok: 'Cultivar plantas y domesticar animales', bad: ['Navegar en barcos de vela', 'Construir casas de pieles', 'Escribir libros'],
      why: 'Aprendieron a cultivar plantas y a domesticar animales.' },
    { t: 'Nómades y sedentarios', q: '¿Qué es la alfarería?',
      ok: 'Construir vasijas de barro', bad: ['Cazar ñandúes', 'Tejer con algodón', 'Construir canoas'],
      why: 'Construían vasijas de barro (alfarería).' },
    { t: 'Nómades y sedentarios', q: '¿Qué tipo de sociedades nacieron con los pueblos sedentarios?',
      ok: 'Las primeras sociedades agrícolas-ganaderas', bad: ['Las primeras ciudades españolas', 'Las sociedades cazadoras nómades', 'Las escuelas bilingües'],
      why: 'Así nacieron las primeras sociedades agrícolas-ganaderas.' },
    { t: 'Nómades y sedentarios', q: '¿Qué animales criaban los pueblos sedentarios?',
      ok: 'Llamas, pavos y cobayos', bad: ['Venados, ñandúes y roedores', 'Caballos y vacas', 'Perros y gatos'],
      why: 'Criaban llamas, pavos y cobayos.' },
    { t: 'Nómades y sedentarios', q: '¿Qué cosechaban los pueblos sedentarios?',
      ok: 'Porotos, papas, mandioca y maíz', bad: ['Trigo, uvas y olivas', 'Frutas, semillas y raíces silvestres', 'Arroz y soja'],
      why: 'Cosechaban porotos, papas, mandioca, maíz.' },
    { t: 'Nómades y sedentarios', q: '¿Cómo eran las casas de los pueblos sedentarios?',
      ok: 'Permanentes, de piedra y madera', bad: ['Fáciles de desarmar, de ramas y pieles', 'Carpas de tela', 'Canoas grandes'],
      why: 'Construyeron casas permanentes de piedra y madera, por eso se llamaban sedentarios.' },

    // --- Los tres pueblos ---
    { t: 'Chaco Santafesino', q: '¿Qué cultura vivía en el Chaco Santafesino?',
      ok: 'La cultura Guaycurú', bad: ['La cultura Chaná-Timbú', 'Los Guaraníes', 'Los Diaguitas'],
      why: 'En el Chaco Santafesino (el norte) vivían pueblos de la cultura Guaycurú.' },
    { t: 'Chaco Santafesino', q: '¿Dónde está el Chaco Santafesino?',
      ok: 'Al norte de la provincia', bad: ['Al sur de la provincia', 'En el delta del Paraná', 'En la ciudad de Rosario'],
      why: 'El Chaco Santafesino está al norte de la provincia.' },
    { t: 'Chaco Santafesino', q: '¿A qué pueblos les decían Guaycurú?',
      ok: 'A los Mocovíes y Abipones', bad: ['A los Timbúes y Chanás', 'A los Kolla y Mapuche', 'A los Guaraníes'],
      why: 'Guaycurú: así le decían a los Mocovíes y Abipones.' },
    { t: 'Chaco Santafesino', q: 'En los pueblos Guaycurú, ¿quién podía ser cacique?',
      ok: 'Un hombre o una mujer', bad: ['Solo el guerrero más valiente', 'Solo un español', 'Nadie: no tenían jefe'],
      why: 'Tenían un jefe o cacique, que podía ser hombre o mujer.' },
    { t: 'Chaco Santafesino', q: 'En los pueblos Guaycurú, ¿qué hacían las mujeres?',
      ok: 'Recolectaban frutos y leñas', bad: ['Cazaban', 'Pescaban en canoas', 'Construían casas de piedra'],
      why: 'Los hombres cazaban, las mujeres recolectaban frutos y leñas.' },
    { t: 'Chaco Santafesino', q: '¿Cómo vivían los pueblos Guaycurú?',
      ok: 'En tribus de pocas familias', bad: ['En grandes ciudades', 'En aldeas sobre médanos', 'En el delta del Paraná'],
      why: 'Vivían en tribus de pocas familias, con un jefe o cacique. Eran guerreros.' },

    { t: 'Chaná-Timbú', q: '¿Dónde vivía la cultura Chaná-Timbú?',
      ok: 'En toda la costa del Río Paraná', bad: ['En el Chaco Santafesino', 'En el sur de General López', 'Solo en la capital'],
      why: 'Vivían en toda la costa del Río Paraná.' },
    { t: 'Chaná-Timbú', q: '¿Qué usaban los Chaná-Timbú para moverse?',
      ok: 'Canoas / embarcaciones', bad: ['Caballos', 'Carretas', 'Iban siempre a pie'],
      why: 'Usaban canoas/embarcaciones para moverse.' },
    { t: 'Chaná-Timbú', q: '¿Con qué hacían sus casas los Chaná-Timbú?',
      ok: 'Con paja y junco', bad: ['Con piedra y madera', 'Con pieles', 'Con ladrillos'],
      why: 'Vivían en aldeas con casas grandes comunales hechas de paja y junco.' },
    { t: 'Chaná-Timbú', q: '¿Qué protegía de las inundaciones a las aldeas Chaná-Timbú?',
      ok: 'Los médanos', bad: ['Murallas de piedra', 'Los árboles', 'Los ríos'],
      why: 'Sus aldeas estaban protegidas de las inundaciones por médanos.' },
    { t: 'Chaná-Timbú', q: '¿Qué hacía el cacique de los Chaná-Timbú?',
      ok: 'Organizaba el trabajo de todos', bad: ['Era el guerrero más valiente', 'Podía ser solo mujer', 'Fundaba ciudades'],
      why: 'Tenían un cacique que organizaba el trabajo de todos.' },
    { t: 'Chaná-Timbú', q: '¿Cuál de estas era una tribu Chaná-Timbú?',
      ok: 'Los Carcaraes', bad: ['Los Abipones', 'Los Kolla', 'Los Mapuche'],
      why: 'Tribus Chaná-Timbú: Mepene, Mocoretá, Quiloazas, Corondas, Timbúes, Carcaraes y Chanás.' },
    { t: 'Chaná-Timbú', q: '¿Cómo eran las casas de las aldeas Chaná-Timbú?',
      ok: 'Grandes y comunales', bad: ['Chiquitas y para una sola persona', 'Fáciles de desarmar', 'De piedra'],
      why: 'Eran casas grandes comunales de paja y junco.' },

    { t: 'Guaraníes', q: '¿Dónde vivían los Guaraníes?',
      ok: 'En el delta del Paraná', bad: ['En el Chaco Santafesino', 'En el departamento San Jerónimo', 'En la montaña'],
      why: 'Los Guaraníes vivían en el delta del Paraná.' },
    { t: 'Guaraníes', q: '¿Quién era el cacique de los Guaraníes?',
      ok: 'El guerrero más valiente', bad: ['Una mujer siempre', 'El más anciano', 'El que organizaba el trabajo'],
      why: 'El jefe o cacique era el guerrero más valiente.' },
    { t: 'Guaraníes', q: '¿Qué cultivaban los Guaraníes?',
      ok: 'Maíz, porotos, maní, algodón, tabaco y calabazas', bad: ['Trigo y uvas', 'Solo papas', 'No cultivaban nada'],
      why: 'Cultivaban maíz, porotos, maní, algodón, tabaco y calabazas.' },
    { t: 'Guaraníes', q: 'Los Guaraníes, ¿eran nómades o sedentarios?',
      ok: 'Sedentarios', bad: ['Nómades', 'No se sabe', 'Primero sedentarios y después nómades'],
      why: 'Eran sedentarios y también guerreros muy valientes.' },
    { t: 'Guaraníes', q: '¿Qué buscaban los Guaraníes, que eran guerreros muy valientes?',
      ok: 'Tierras para conquistar', bad: ['Oro para los españoles', 'Escuelas', 'Médanos para sus casas'],
      why: 'Eran guerreros muy valientes, buscaban tierras para conquistar.' },
    { t: 'Guaraníes', q: '¿De qué vivían los Guaraníes, además de cultivar?',
      ok: 'Pescaban, cazaban y recolectaban frutos y raíces', bad: ['Solo de la ganadería', 'Del comercio con los españoles', 'Solo de la caza de venados'],
      why: 'Eran pescadores, cazaban animales, recolectaban frutos y raíces.' },

    // --- Distribución ---
    { t: 'Distribución', q: '¿Qué pueblos vivían en el Litoral del Río Paraná?',
      ok: 'La cultura Chaná-Timbú y los Guaraníes', bad: ['Los Guaycurú', 'Los Kolla y los Diaguitas', 'Solo los Qom'],
      why: 'En el Litoral del Río Paraná: cultura Chaná-Timbú y los Guaraníes.' },

    // --- La conquista ---
    { t: 'La conquista', q: '¿Cuántas corrientes u oleadas colonizadoras hubo?',
      ok: 'Tres', bad: ['Una sola', 'Dos', 'Doce'],
      why: 'No llegaron todos de golpe: hubo tres corrientes u oleadas colonizadoras.' },
    { t: 'La conquista', q: '¿Quién encabezó la primera expedición española al Río de la Plata?',
      ok: 'Juan Díaz de Solís', bad: ['Un cacique Chaná-Timbú', 'El jefe de los Qom', 'Nadie: llegaron todos de golpe'],
      why: 'La primera expedición española en arribar al Río de la Plata fue encabezada por Juan Díaz de Solís.' },
    { t: 'La conquista', q: '¿En qué año llegó Solís al Río de la Plata?',
      ok: '1516', bad: ['1573', '1649', '1492'],
      why: 'Juan Díaz de Solís llegó en 1516.' },
    { t: 'La conquista', q: '¿Cuándo se fundó la ciudad de Santa Fe?',
      ok: 'El 15 de noviembre de 1573', bad: ['En 1516', 'En 1649', 'El 19 de abril de 1573'],
      why: 'El 15 de noviembre de 1573 se fundó la ciudad de Santa Fe.' },
    { t: 'La conquista', q: '¿Qué pasó con la ciudad de Santa Fe en 1649?',
      ok: 'Fue trasladada a su actual ubicación', bad: ['Fue fundada', 'Llegó Solís', 'Se creó la Ley Provincial Aborigen'],
      why: 'En 1649 Santa Fe fue trasladada a su actual ubicación.' },

    // --- Hoy ---
    { t: 'En la actualidad', q: '¿Cuántos pueblos originarios viven hoy en la provincia?',
      ok: '12', bad: ['3', '36', '7'],
      why: 'Hoy viven 12 pueblos originarios en la provincia.' },
    { t: 'En la actualidad', q: '¿Qué pueblos siguen viviendo hoy en el norte y el litoral, descendientes de los Guaycurúes?',
      ok: 'Los Mocovíes y los Qom', bad: ['Los Kolla y los Mapuche', 'Los Timbúes y los Chanás', 'Los Diaguitas'],
      why: 'Hoy siguen viviendo los Mocovíes y los Qom, descendientes de los Guaycurúes.' },
    { t: 'En la actualidad', q: '¿Qué pueblos son los que más territorio ocupan hoy?',
      ok: 'Mocovíes y Abipones', bad: ['Kolla', 'Diaguitas', 'Mapuche'],
      why: 'Mocovíes y Abipones son los que más territorios ocupan hoy.' },
    { t: 'En la actualidad', q: '¿Qué otro nombre tienen los Qom?',
      ok: 'Tobas', bad: ['Abipones', 'Timbúes', 'Kolla'],
      why: 'Qom (Tobas).' },
    { t: 'En la actualidad', q: '¿En qué departamento viven hoy los Corondas?',
      ok: 'San Jerónimo', bad: ['General Obligado', 'General López', 'Castellanos'],
      why: 'Corondas: en el departamento San Jerónimo.' },
    { t: 'En la actualidad', q: '¿Dónde viven hoy los Diaguitas en Santa Fe?',
      ok: 'En un sector chiquito de la capital', bad: ['En todo el norte', 'En el delta', 'En San Jerónimo'],
      why: 'Diaguitas: en un sector chiquito de la capital.' },
    { t: 'En la actualidad', q: '¿Cuál de estos pueblos llegó de otras provincias?',
      ok: 'Mapuche', bad: ['Mocovíes', 'Abipones', 'Qom'],
      why: 'Kolla, Corondas, Diaguitas y Mapuche son pueblos que llegaron de otras provincias.' },
    { t: 'En la actualidad', q: '¿Cuándo es la semana de los pueblos originarios?',
      ok: 'Del 19 al 25 de abril', bad: ['Del 15 al 21 de noviembre', 'Del 1 al 7 de enero', 'Del 19 al 25 de octubre'],
      why: 'Cada año se realiza del 19 al 25 de abril, para mostrar su cultura y artesanías.' },
    { t: 'En la actualidad', q: '¿Qué hace hoy el estado para que no pierdan su identidad?',
      ok: 'Reconoce sus derechos', bad: ['Los traslada a otras provincias', 'Les prohíbe su lengua', 'Nada'],
      why: 'Para no perder su identidad, el estado hoy reconoce sus derechos.' },

    // --- Escuelas ---
    { t: 'Escuelas interculturales', q: '¿Qué significa "bilingüe"?',
      ok: 'Que hablan dos idiomas (el propio y el español)', bad: ['Que hablan solo español', 'Que viven en dos lugares', 'Que tienen dos caciques'],
      why: 'Bilingüe: que hablan dos idiomas (el propio y el español).' },
    { t: 'Escuelas interculturales', q: '¿Qué es la cosmovisión?',
      ok: 'Cómo cada pueblo ve y explica el mundo', bad: ['Un tipo de casa', 'Una vasija de barro', 'Una ley provincial'],
      why: 'Cosmovisión: cómo cada pueblo ve y explica el mundo.' },
    { t: 'Escuelas interculturales', q: '¿Cuántas escuelas interculturales bilingües hay hoy en Santa Fe?',
      ok: '36', bad: ['12', '19', '1719'],
      why: 'Hoy hay 36 escuelas interculturales bilingües en Santa Fe.' },
    { t: 'Escuelas interculturales', q: '¿Qué se creó en 1993?',
      ok: 'La Ley Provincial Aborigen', bad: ['El decreto 1719', 'La ciudad de Santa Fe', 'La Ley Nacional de la modalidad'],
      why: '1993: se crea la Ley Provincial Aborigen.' },
    { t: 'Escuelas interculturales', q: '¿Qué decreto de 2005 les dio prioridad a estas escuelas?',
      ok: 'El decreto 1719', bad: ['El decreto 1573', 'El decreto 1993', 'El decreto 36'],
      why: '2005: con el decreto 1719 se les da prioridad a estas escuelas.' },
    { t: 'Escuelas interculturales', q: '¿En qué año se reconoció oficialmente como modalidad por la Ley Nacional?',
      ok: '2020', bad: ['1993', '2005', '1649'],
      why: '2020: recién se reconoce oficialmente como modalidad por la Ley Nacional.' },
    { t: 'Escuelas interculturales', q: '¿Dónde están la mayoría de las escuelas interculturales bilingües?',
      ok: 'En el norte y centro-norte', bad: ['En el sur', 'Solo en Rosario', 'En el delta'],
      why: 'La mayoría están en el norte y centro-norte, donde viven más Mocovíes y Qom.' },
    { t: 'Escuelas interculturales', q: '¿Para qué sirven las escuelas interculturales bilingües?',
      ok: 'Para preservar su lengua y cultura', bad: ['Para que olviden su lengua', 'Para enseñar solo en español', 'Para trasladarlos'],
      why: 'Sirven para preservar su lengua y cultura, vivir en un mundo con muchas culturas y mejorar su calidad de vida.' }
  ];

  /* =====================================================================
     SECCIÓN 4 · JUEGO 2: LÍNEA DE TIEMPO
     Cada ronda: eventos en orden correcto. El juego los mezcla y hay que
     tocarlos del más antiguo al más nuevo.
     ===================================================================== */
  const TIMELINE_ROUNDS = [
    { title: 'De los primeros habitantes a la ciudad de Santa Fe', events: [
      { y: 'Primero',  t: 'Los pueblos eran nómades: se movían de un lugar a otro' },
      { y: 'Después',  t: 'Algunos pueblos se volvieron sedentarios' },
      { y: '1516',     t: 'Juan Díaz de Solís llega al Río de la Plata' },
      { y: '1573',     t: 'Se funda la ciudad de Santa Fe (15 de noviembre)' },
      { y: '1649',     t: 'Santa Fe es trasladada a su actual ubicación' }
    ]},
    { title: 'Las escuelas interculturales bilingües', events: [
      { y: '1993', t: 'Se crea la Ley Provincial Aborigen' },
      { y: '2005', t: 'Con el decreto 1719 se les da prioridad a estas escuelas' },
      { y: '2020', t: 'La Ley Nacional las reconoce oficialmente como modalidad' },
      { y: 'Hoy',  t: 'Hay 36 escuelas interculturales bilingües en Santa Fe' }
    ]},
    { title: 'Todas las fechas juntas', events: [
      { y: '1516', t: 'Llega la primera expedición española (Solís)' },
      { y: '1573', t: 'Fundación de la ciudad de Santa Fe' },
      { y: '1649', t: 'Traslado de Santa Fe a su ubicación actual' },
      { y: '1993', t: 'Ley Provincial Aborigen' },
      { y: '2005', t: 'Decreto 1719' },
      { y: '2020', t: 'Reconocimiento por la Ley Nacional' }
    ]}
  ];

  /* =====================================================================
     SECCIÓN 5 · JUEGO 3: UNIR CON FLECHAS (drag & drop)
     Rondas de 3-6 pares concepto ↔ definición.
     ===================================================================== */
  const MATCH_ROUNDS = [
    { title: '¿Dónde vivía cada pueblo?', pairs: [
      { id: 'u1', a: 'Guaycurú', b: 'Chaco Santafesino, al norte de la provincia' },
      { id: 'u2', a: 'Chaná-Timbú', b: 'En toda la costa del Río Paraná' },
      { id: 'u3', a: 'Guaraníes', b: 'En el delta del Paraná' },
      { id: 'u4', a: 'Mocovíes y Qom (hoy)', b: 'En el norte y en el litoral del Río Paraná' }
    ]},
    { title: 'Palabras clave', pairs: [
      { id: 'k1', a: 'Nómades', b: 'Se movían de un lugar a otro' },
      { id: 'k2', a: 'Sedentarios', b: 'Se quedaron a vivir fijos en un lugar' },
      { id: 'k3', a: 'Alfarería', b: 'Construir vasijas de barro' },
      { id: 'k4', a: 'Bilingüe', b: 'Que hablan dos idiomas (el propio y el español)' },
      { id: 'k5', a: 'Cosmovisión', b: 'Cómo cada pueblo ve y explica el mundo' }
    ]},
    { title: 'Fechas importantes', pairs: [
      { id: 'f1', a: '1516', b: 'Solís llega al Río de la Plata' },
      { id: 'f2', a: '15/11/1573', b: 'Se funda la ciudad de Santa Fe' },
      { id: 'f3', a: '1649', b: 'Santa Fe se traslada a su ubicación actual' },
      { id: 'f4', a: '1993', b: 'Se crea la Ley Provincial Aborigen' },
      { id: 'f5', a: '2005', b: 'Decreto 1719: prioridad a estas escuelas' },
      { id: 'f6', a: '2020', b: 'La Ley Nacional reconoce la modalidad' }
    ]},
    { title: 'Pueblos de hoy y dónde viven', pairs: [
      { id: 'h1', a: 'Qom (Tobas)', b: 'Castellanos, General Obligado, Rosario y La Capital' },
      { id: 'h2', a: 'Kolla', b: 'Norte de General López y un poquito en Rosario' },
      { id: 'h3', a: 'Corondas', b: 'Departamento San Jerónimo' },
      { id: 'h4', a: 'Diaguitas', b: 'Un sector chiquito de la capital' },
      { id: 'h5', a: 'Mapuche', b: 'Norte de General López y sur de Rosario' }
    ]},
    { title: 'Casas y caciques', pairs: [
      { id: 'c1', a: 'Pueblos nómades', b: 'Casas fáciles de desarmar, de ramas, pajas y pieles' },
      { id: 'c2', a: 'Pueblos sedentarios', b: 'Casas permanentes de piedra y madera' },
      { id: 'c3', a: 'Chaná-Timbú', b: 'Casas grandes comunales de paja y junco' },
      { id: 'c4', a: 'Cacique Guaycurú', b: 'Podía ser hombre o mujer' },
      { id: 'c5', a: 'Cacique Guaraní', b: 'Era el guerrero más valiente' }
    ]},
    { title: 'Números para recordar', pairs: [
      { id: 'n1', a: '12', b: 'Pueblos originarios que viven hoy en la provincia' },
      { id: 'n2', a: '36', b: 'Escuelas interculturales bilingües en Santa Fe' },
      { id: 'n3', a: '3', b: 'Corrientes u oleadas colonizadoras' },
      { id: 'n4', a: '19 al 25 de abril', b: 'Semana de los pueblos originarios' },
      { id: 'n5', a: '1719', b: 'Número del decreto de 2005' }
    ]}
  ];

  /* =====================================================================
     SECCIÓN 6 · JUEGO 4: FLASHCARDS
     ===================================================================== */
  const FLASHCARDS = [
    { id: 'fc01', deck: 'Nómades y sedentarios', f: '¿Qué eran al principio los pueblos?', b: 'Nómades: se movían de un lugar a otro. Después algunos se volvieron sedentarios.' },
    { id: 'fc02', deck: 'Nómades y sedentarios', f: 'Pueblos nómades: ¿cómo conseguían alimento?', b: 'Se trasladaban a pie. Cazaban venados, ñandúes y roedores y recolectaban frutas, semillas y raíces.' },
    { id: 'fc03', deck: 'Nómades y sedentarios', f: 'Casas de los nómades', b: 'Fáciles de desarmar, con ramas, pajas y pieles, para poder irse a otros lugares.' },
    { id: 'fc04', deck: 'Nómades y sedentarios', f: 'Pueblos sedentarios: ¿qué aprendieron?', b: 'A cultivar plantas, domesticar animales y hacer vasijas de barro (alfarería).' },
    { id: 'fc05', deck: 'Nómades y sedentarios', f: 'Sedentarios: ¿qué cosechaban y qué criaban?', b: 'Cosechaban porotos, papas, mandioca, maíz. Criaban llamas, pavos y cobayos.' },
    { id: 'fc06', deck: 'Nómades y sedentarios', f: 'Casas de los sedentarios', b: 'Permanentes, de piedra y madera, en un lugar fijo.' },

    { id: 'fc07', deck: 'Los tres pueblos', f: 'Guaycurú: ¿quiénes y dónde?', b: 'Así le decían a los Mocovíes y Abipones. Vivían en el Chaco Santafesino, al norte de la provincia.' },
    { id: 'fc08', deck: 'Los tres pueblos', f: 'Guaycurú: ¿cómo vivían?', b: 'En tribus de pocas familias, con un cacique que podía ser hombre o mujer. Eran guerreros. Los hombres cazaban, las mujeres recolectaban frutos y leñas.' },
    { id: 'fc09', deck: 'Los tres pueblos', f: 'Chaná-Timbú: ¿dónde vivían?', b: 'En toda la costa del Río Paraná. Usaban canoas/embarcaciones para moverse.' },
    { id: 'fc10', deck: 'Los tres pueblos', f: 'Chaná-Timbú: tribus', b: 'Mepene, Mocoretá, Quiloazas, Corondas, Timbúes, Carcaraes y Chanás.' },
    { id: 'fc11', deck: 'Los tres pueblos', f: 'Chaná-Timbú: ¿cómo vivían?', b: 'En aldeas con casas grandes comunales de paja y junco, protegidas de las inundaciones por médanos. Un cacique organizaba el trabajo de todos.' },
    { id: 'fc12', deck: 'Los tres pueblos', f: 'Guaraníes: ¿dónde vivían?', b: 'En el delta del Paraná.' },
    { id: 'fc13', deck: 'Los tres pueblos', f: 'Guaraníes: ¿de qué vivían?', b: 'Eran pescadores, cazaban, recolectaban frutos y raíces. Cultivaban maíz, porotos, maní, algodón, tabaco y calabazas.' },
    { id: 'fc14', deck: 'Los tres pueblos', f: 'Guaraníes: ¿cómo vivían?', b: 'Sedentarios y guerreros muy valientes, buscaban tierras para conquistar. El cacique era el guerrero más valiente.' },

    { id: 'fc15', deck: 'La conquista', f: '¿Cuántas corrientes colonizadoras hubo?', b: 'Tres corrientes u oleadas: no llegaron todos de golpe.' },
    { id: 'fc16', deck: 'La conquista', f: '1516', b: 'Juan Díaz de Solís encabeza la primera expedición española que llega al Río de la Plata.' },
    { id: 'fc17', deck: 'La conquista', f: '15 de noviembre de 1573', b: 'Se funda la ciudad de Santa Fe.' },
    { id: 'fc18', deck: 'La conquista', f: '1649', b: 'Santa Fe es trasladada a su actual ubicación.' },

    { id: 'fc19', deck: 'Hoy', f: '¿Cuántos pueblos originarios viven hoy en la provincia?', b: '12. Los principales: Mocovíes y Abipones, y Qom (Tobas).' },
    { id: 'fc20', deck: 'Hoy', f: 'Mocovíes y Abipones hoy', b: 'Grupo Guaycurú, de la zona del Chaco. Son los que más territorios ocupan. Los Mocovíes están en gran parte del centro, norte y también en el sur.' },
    { id: 'fc21', deck: 'Hoy', f: 'Qom (Tobas): ¿dónde viven?', b: 'En los departamentos de Castellanos, General Obligado, Rosario y La Capital.' },
    { id: 'fc22', deck: 'Hoy', f: 'Pueblos que llegaron de otras provincias', b: 'Kolla (norte de General López y un poquito en Rosario), Corondas (San Jerónimo), Diaguitas (sector chiquito de la capital) y Mapuche (norte de General López y sur de Rosario).' },
    { id: 'fc23', deck: 'Hoy', f: 'Semana de los pueblos originarios', b: 'Del 19 al 25 de abril, para mostrar su cultura y artesanías.' },
    { id: 'fc24', deck: 'Hoy', f: '¿Qué hace el estado para que no pierdan su identidad?', b: 'Reconoce sus derechos. Hay escuelas y hospitales con educación y salud intercultural (respetando su cultura).' },

    { id: 'fc25', deck: 'Escuelas bilingües', f: '¿Qué es una Escuela Intercultural Bilingüe?', b: 'Una modalidad de escuela (jardín, primaria, secundaria) donde los pueblos indígenas estudian en su propia lengua, manteniendo su cultura, su cosmovisión y su identidad.' },
    { id: 'fc26', deck: 'Escuelas bilingües', f: 'Bilingüe', b: 'Que hablan dos idiomas (el propio y el español).' },
    { id: 'fc27', deck: 'Escuelas bilingües', f: 'Cosmovisión', b: 'Cómo cada pueblo ve y explica el mundo.' },
    { id: 'fc28', deck: 'Escuelas bilingües', f: '¿Para qué sirven?', b: 'Para preservar su lengua y cultura, para vivir en un mundo con muchas culturas diferentes y para mejorar su calidad de vida.' },
    { id: 'fc29', deck: 'Escuelas bilingües', f: '1993 · 2005 · 2020', b: '1993: Ley Provincial Aborigen. 2005: decreto 1719 les da prioridad. 2020: la Ley Nacional las reconoce como modalidad.' },
    { id: 'fc30', deck: 'Escuelas bilingües', f: '¿Cuántas hay en Santa Fe y dónde?', b: '36. La mayoría en el norte y centro-norte, donde viven más Mocovíes y Qom. En el sur hay algunas cerca de Rosario.' }
  ];

  /* =====================================================================
     SECCIÓN 7 · JUEGOS 5 Y 6 (arcade): CLASIFICAR EN BALDES
     Caen tarjetas y hay que soltarlas en el balde correcto.
     ===================================================================== */
  const CLASSIFY_GAMES = {
    pueblos: {
      title: 'Cazador de Pueblos',
      question: '¿De qué cultura es?',
      buckets: [
        { id: 'guaycuru', name: 'Guaycurú',    icon: 'fa-mountain-sun', cls: 'bucket-amber' },
        { id: 'chana',    name: 'Chaná-Timbú', icon: 'fa-water',        cls: 'bucket-sky' },
        { id: 'guarani',  name: 'Guaraníes',   icon: 'fa-fish',         cls: 'bucket-emerald' }
      ],
      items: [
        { t: 'Mocovíes',                                  p: 'guaycuru', s: 'Pueblo' },
        { t: 'Abipones',                                  p: 'guaycuru', s: 'Pueblo' },
        { t: 'Chaco Santafesino',                         p: 'guaycuru', s: 'Dónde' },
        { t: 'Al norte de la provincia',                  p: 'guaycuru', s: 'Dónde' },
        { t: 'Tribus de pocas familias',                  p: 'guaycuru', s: 'Cómo vivían' },
        { t: 'El cacique podía ser hombre o mujer',       p: 'guaycuru', s: 'Cacique' },
        { t: 'Las mujeres recolectaban frutos y leñas',   p: 'guaycuru', s: 'Cómo vivían' },
        { t: 'Sus descendientes son los Mocovíes y los Qom', p: 'guaycuru', s: 'Hoy' },

        { t: 'Mepene',                                    p: 'chana', s: 'Tribu' },
        { t: 'Mocoretá',                                  p: 'chana', s: 'Tribu' },
        { t: 'Quiloazas',                                 p: 'chana', s: 'Tribu' },
        { t: 'Timbúes',                                   p: 'chana', s: 'Tribu' },
        { t: 'Carcaraes',                                 p: 'chana', s: 'Tribu' },
        { t: 'Chanás',                                    p: 'chana', s: 'Tribu' },
        { t: 'En toda la costa del Río Paraná',           p: 'chana', s: 'Dónde' },
        { t: 'Usaban canoas para moverse',                p: 'chana', s: 'Cómo vivían' },
        { t: 'Casas grandes comunales de paja y junco',   p: 'chana', s: 'Casas' },
        { t: 'Aldeas protegidas por médanos',             p: 'chana', s: 'Casas' },
        { t: 'El cacique organizaba el trabajo de todos', p: 'chana', s: 'Cacique' },

        { t: 'En el delta del Paraná',                    p: 'guarani', s: 'Dónde' },
        { t: 'Eran pescadores',                           p: 'guarani', s: 'De qué vivían' },
        { t: 'Cultivaban maní, algodón, tabaco y calabazas', p: 'guarani', s: 'De qué vivían' },
        { t: 'Buscaban tierras para conquistar',          p: 'guarani', s: 'Cómo vivían' },
        { t: 'El cacique era el guerrero más valiente',   p: 'guarani', s: 'Cacique' }
      ]
    },
    nomades: {
      title: '¿Nómade o sedentario?',
      question: '¿Nómades o sedentarios?',
      buckets: [
        { id: 'nomade',     name: 'Nómades',     icon: 'fa-person-hiking', cls: 'bucket-amber' },
        { id: 'sedentario', name: 'Sedentarios', icon: 'fa-house-chimney', cls: 'bucket-indigo' }
      ],
      items: [
        { t: 'Se movían de un lugar a otro',               p: 'nomade', s: 'Forma de vida' },
        { t: 'No tenían casa fija',                        p: 'nomade', s: 'Casas' },
        { t: 'Se trasladaban a pie para conseguir alimentos', p: 'nomade', s: 'Forma de vida' },
        { t: 'Cazaban venados, ñandúes y roedores',        p: 'nomade', s: 'Alimento' },
        { t: 'Recolectaban frutas, semillas y raíces',     p: 'nomade', s: 'Alimento' },
        { t: 'Si escaseaban los recursos, se iban a otro territorio', p: 'nomade', s: 'Forma de vida' },
        { t: 'Casas de ramas, pajas y pieles',             p: 'nomade', s: 'Casas' },
        { t: 'Casas fáciles de desarmar',                  p: 'nomade', s: 'Casas' },
        { t: 'Fueron los primeros de todos',               p: 'nomade', s: 'Historia' },

        { t: 'Se quedaron a vivir fijos en un lugar',      p: 'sedentario', s: 'Forma de vida' },
        { t: 'Aprendieron a cultivar plantas',             p: 'sedentario', s: 'Alimento' },
        { t: 'Domesticaban animales',                      p: 'sedentario', s: 'Alimento' },
        { t: 'Hacían vasijas de barro (alfarería)',        p: 'sedentario', s: 'Oficio' },
        { t: 'Primeras sociedades agrícolas-ganaderas',    p: 'sedentario', s: 'Historia' },
        { t: 'Cosechaban porotos, papas, mandioca y maíz', p: 'sedentario', s: 'Alimento' },
        { t: 'Criaban llamas, pavos y cobayos',            p: 'sedentario', s: 'Alimento' },
        { t: 'Casas permanentes de piedra y madera',       p: 'sedentario', s: 'Casas' },
        { t: 'Los Guaraníes',                              p: 'sedentario', s: 'Pueblo' }
      ]
    }
  };

  /* =====================================================================
     SECCIÓN 8 · CATÁLOGO DE JUEGOS (para el menú principal)
     ===================================================================== */
  const GAMES = [
    { id: 'trivia',   name: 'Trivia contrarreloj', icon: 'fa-brain',
      desc: '10 preguntas con reloj, racha y puntos extra.', tint: 'from-indigo-500 to-violet-600' },
    { id: 'tiempo',   name: 'Línea de tiempo', icon: 'fa-timeline',
      desc: 'Ordená los hechos del más antiguo al más nuevo.', tint: 'from-sky-500 to-cyan-600' },
    { id: 'unir',     name: 'Unir con flechas', icon: 'fa-diagram-project',
      desc: 'Arrastrá cada concepto hasta su definición.', tint: 'from-emerald-500 to-teal-600' },
    { id: 'cartas',   name: 'Flashcards', icon: 'fa-clone',
      desc: 'Repaso rápido: tocá la tarjeta para darla vuelta.', tint: 'from-amber-500 to-orange-600' },
    { id: 'pueblos',  name: 'Cazador de Pueblos', icon: 'fa-bolt',
      desc: '¡Arcade! ¿Guaycurú, Chaná-Timbú o Guaraní? Clasificá antes de que se acabe el tiempo.', tint: 'from-fuchsia-500 to-pink-600' },
    { id: 'nomades',  name: '¿Nómade o sedentario?', icon: 'fa-person-hiking',
      desc: '¡Arcade! Tirá cada tarjeta al balde correcto.', tint: 'from-rose-500 to-orange-500' },
    { id: 'resumen',  name: 'Resumen para leer', icon: 'fa-book-open',
      desc: 'Todo el tema ordenado, para repasar antes de jugar.', tint: 'from-slate-500 to-slate-700' }
  ];

  /* =====================================================================
     EXPORTACIÓN
     ===================================================================== */
  return {
    // utilidades
    shuffle, pick, sfx, vibrate, confetti, store, starsFor, levelFor,
    PRAISE, ENCOURAGE, finalMessage,
    // datos
    FICHA, RESUMEN, PUEBLOS_TABLA, TRIVIA, TIMELINE_ROUNDS, MATCH_ROUNDS, FLASHCARDS, CLASSIFY_GAMES, GAMES
  };
})();
