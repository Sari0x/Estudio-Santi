/* =======================================================================
   ESTUDIO SANTI · "Santa Fe y la Argentina"
   Ciencias Sociales 4.° — Material de estudio (páginas 9 a 14)

   app.js  ->  1) DATOS extraídos del PDF (banco de contenido educativo)
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
  const STORE_KEY = 'estudioSanti.santaFe.v1';
  const DEFAULT_STATE = {
    xp: 0,
    muted: false,
    bestStars: {},   // { trivia: 3, mapa: 2, ... }
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
    { min: 0.9, t: '¡Sos un experto en Santa Fe! 🏆', d: 'Dominás el tema de punta a punta.' },
    { min: 0.7, t: '¡Muy buen trabajo! 🌟', d: 'Casi todo perfecto. Repasá los datos que fallaste y sos imparable.' },
    { min: 0.5, t: '¡Vas por buen camino! 💪', d: 'Ya sabés más de la mitad. Una vuelta más y lo tenés.' },
    { min: 0,   t: '¡Buen comienzo! 🚀', d: 'Pasá por las Flashcards y volvé a jugar: vas a ver la diferencia.' }
  ];
  function finalMessage(pct) {
    return FINAL_MSG.find((m) => pct >= m.min);
  }

  /* =====================================================================
     SECCIÓN 2 · DATOS DEL PDF (resumen estructurado)
     ===================================================================== */

  /** Ficha de datos duros, usada en el modo Resumen y como fuente de verdad. */
  const FICHA = [
    { k: 'Provincias del país',        v: '24 territorios: 23 provincias + 1 ciudad autónoma (CABA)' },
    { k: 'Ubicación de Santa Fe',      v: 'Centro-este de la Argentina. Predominan las llanuras' },
    { k: 'Puesto por población',       v: '3.ª (después de Buenos Aires y Córdoba)' },
    { k: 'Habitantes (Censo 2022)',    v: '3.544.908' },
    { k: 'Superficie',                 v: '133.249,1 km² — 11.ª provincia más extensa' },
    { k: 'Provincias con las que limita', v: '6: Chaco (N), Entre Ríos y Corrientes (E), Buenos Aires (S), Santiago del Estero y Córdoba (O)' },
    { k: 'Regiones a las que pertenece', v: 'Región del Litoral y Región Centro' },
    { k: 'Capital provincial',         v: 'Santa Fe de la Vera Cruz, sobre el margen derecho del río Paraná' },
    { k: 'Ciudad más poblada',         v: 'Rosario (más de 1.000.000 de habitantes)' },
    { k: 'Departamentos',              v: '19, formados por municipios y comunas' },
    { k: 'Los tres poderes',           v: 'Ejecutivo, Legislativo y Judicial' },
    { k: 'Constitución de Santa Fe',   v: 'Sancionada el 14 de abril de 1962' },
    { k: 'Forma de gobierno nacional', v: 'Representativa, republicana y federal' }
  ];

  /* =====================================================================
     SECCIÓN 3 · JUEGO 1: TRIVIA
     Cada pregunta: enunciado, opciones (la correcta es índice 0 y luego se
     mezclan), explicación y tema.
     ===================================================================== */
  const TRIVIA = [
    { t: 'Ubicación', q: '¿En cuántos territorios se divide la Argentina?',
      ok: '24: 23 provincias y 1 ciudad autónoma',
      bad: ['24 provincias exactas', '19 provincias y 5 territorios', '23 provincias y 2 ciudades autónomas'],
      why: 'La Argentina se divide en 24 territorios: 23 provincias y la Ciudad Autónoma de Buenos Aires.' },

    { t: 'Ubicación', q: '¿En qué parte del país está la provincia de Santa Fe?',
      ok: 'En el centro-este', bad: ['En el noroeste', 'En el sur (Patagonia)', 'En el extremo noreste'],
      why: 'Santa Fe está en el centro-este del país y en su territorio predominan las llanuras.' },

    { t: 'Ubicación', q: '¿Qué tipo de relieve predomina en el territorio santafesino?',
      ok: 'Las llanuras (tierras planas)', bad: ['Las montañas', 'Las mesetas altas', 'Los volcanes'],
      why: 'Predominan las llanuras, es decir, tierras planas.' },

    { t: 'Regiones', q: '¿De qué dos regiones forma parte Santa Fe?',
      ok: 'Región del Litoral y Región Centro',
      bad: ['Región Pampeana y Patagonia', 'Región del Litoral y Región de Cuyo', 'Región Centro y Región del Noroeste'],
      why: 'Santa Fe integra la Región del Litoral y también la Región Centro.' },

    { t: 'Gobierno provincial', q: '¿En cuántos departamentos está dividida Santa Fe?',
      ok: '19', bad: ['24', '12', '35'],
      why: 'Son 19 departamentos, formados por municipios y comunas.' },

    { t: 'Datos', q: 'Según el Censo de 2022, ¿cuántos habitantes tiene Santa Fe?',
      ok: '3.544.908', bad: ['1.544.908', '5.344.908', '944.908'],
      why: 'El Censo 2022 registró 3.544.908 habitantes en la provincia.' },

    { t: 'Datos', q: '¿Qué puesto ocupa Santa Fe entre las provincias más pobladas?',
      ok: 'El tercero', bad: ['El primero', 'El segundo', 'El décimo primero'],
      why: 'Es la tercera provincia más poblada, después de Buenos Aires y Córdoba.' },

    { t: 'Datos', q: '¿Cuál es la superficie de la provincia de Santa Fe?',
      ok: '133.249,1 km²', bad: ['13.249,1 km²', '333.249,1 km²', '99.249,1 km²'],
      why: 'Tiene 133.249,1 km² y es la 11.ª provincia más extensa del país.' },

    { t: 'Datos', q: '¿Qué lugar ocupa Santa Fe por su extensión (tamaño)?',
      ok: 'El 11.º', bad: ['El 3.º', 'El 1.º', 'El 19.º'],
      why: 'Por superficie es la 11.ª provincia más extensa de la Argentina.' },

    { t: 'Límites', q: '¿Con cuántas provincias limita Santa Fe?',
      ok: 'Con 6', bad: ['Con 4', 'Con 8', 'Con 3'],
      why: 'Limita con 6: Chaco, Entre Ríos, Corrientes, Buenos Aires, Santiago del Estero y Córdoba.' },

    { t: 'Límites', q: '¿Qué provincia limita con Santa Fe al NORTE?',
      ok: 'Chaco', bad: ['Buenos Aires', 'Córdoba', 'Entre Ríos'],
      why: 'Al norte, Santa Fe limita con la provincia del Chaco.' },

    { t: 'Límites', q: '¿Qué provincia limita con Santa Fe al SUR?',
      ok: 'Buenos Aires', bad: ['Chaco', 'Corrientes', 'Santiago del Estero'],
      why: 'Al sur limita con la provincia de Buenos Aires.' },

    { t: 'Límites', q: '¿Qué provincias limitan con Santa Fe al ESTE?',
      ok: 'Entre Ríos y Corrientes', bad: ['Córdoba y Santiago del Estero', 'Chaco y Formosa', 'Buenos Aires y Entre Ríos'],
      why: 'Al este están Entre Ríos y Corrientes.' },

    { t: 'Límites', q: '¿Qué provincias limitan con Santa Fe al OESTE?',
      ok: 'Santiago del Estero y Córdoba', bad: ['Entre Ríos y Corrientes', 'Chaco y Córdoba', 'Buenos Aires y Córdoba'],
      why: 'Al oeste limita con Santiago del Estero y con Córdoba.' },

    { t: 'Capital', q: '¿Cómo se llama la capital de la provincia?',
      ok: 'Santa Fe de la Vera Cruz', bad: ['Rosario', 'Vera Cruz del Paraná', 'Santa Fe del Litoral'],
      why: 'La capital es Santa Fe de la Vera Cruz, en el centro de la provincia.' },

    { t: 'Capital', q: '¿Sobre qué río está la ciudad capital de Santa Fe?',
      ok: 'Sobre el margen derecho del río Paraná', bad: ['Sobre el río Uruguay', 'Sobre el río Salado del Sur', 'Sobre el río de la Plata'],
      why: 'Está sobre el margen derecho del río Paraná, en el centro de la provincia.' },

    { t: 'Capital', q: '¿Qué ciudad santafesina supera el millón de habitantes?',
      ok: 'Rosario', bad: ['Santa Fe (la capital)', 'Rafaela', 'Venado Tuerto'],
      why: 'Rosario supera el millón de habitantes: más del doble que la ciudad de Santa Fe.' },

    { t: 'Regiones', q: '¿Qué es una región?',
      ok: 'Un grupo de tres o más provincias que comparten cosas en común',
      bad: ['Una provincia muy grande', 'Un departamento con muchos municipios', 'Un grupo de dos países vecinos'],
      why: 'Una región es un grupo de tres o más provincias que comparten relieve, producciones económicas y cultura.' },

    { t: 'Regiones', q: '¿Qué provincias forman la Región del Litoral?',
      ok: 'Santa Fe, Formosa, Chaco, Misiones, Corrientes y Entre Ríos',
      bad: ['Santa Fe, Entre Ríos y Córdoba', 'Santa Fe, Buenos Aires y La Pampa', 'Santa Fe, Chaco, Salta y Jujuy'],
      why: 'Son 6 provincias del noreste del país, agrupadas por sus características físicas y naturales.' },

    { t: 'Regiones', q: '¿Qué provincias forman la Región Centro?',
      ok: 'Santa Fe, Entre Ríos y Córdoba',
      bad: ['Santa Fe, Córdoba y San Luis', 'Santa Fe, Chaco y Corrientes', 'Santa Fe, Buenos Aires y Córdoba'],
      why: 'La Región Centro la forman Santa Fe, Entre Ríos y Córdoba.' },

    { t: 'Regiones', q: '¿Por qué se agrupan las provincias de la Región del Litoral?',
      ok: 'Por sus características físicas y naturales',
      bad: ['Por un acuerdo político y social', 'Porque tienen la misma Constitución', 'Porque todas limitan con Chile'],
      why: 'El Litoral se agrupa por características físicas y naturales; la Región Centro, en cambio, es una regionalización política y social.' },

    { t: 'Regiones', q: '¿Qué busca desarrollar la Región Centro?',
      ok: 'La economía, la educación, la salud, la ciencia y la cultura',
      bad: ['Solamente el turismo', 'Solamente la industria del acero', 'Un ejército común'],
      why: 'Es una regionalización política y social que busca desarrollar economía, educación, salud, ciencia y cultura.' },

    { t: 'Regiones', q: '¿Cuál es la ruta más importante de la Región Centro?',
      ok: 'La Autopista Rosario–Córdoba', bad: ['La Ruta 40', 'El Camino del Inca', 'La Autopista Buenos Aires–La Plata'],
      why: 'Une las dos ciudades más grandes del país después de Buenos Aires: Rosario y Córdoba.' },

    { t: 'Gobierno nacional', q: '¿Cuál es la ley fundamental del país?',
      ok: 'La Constitución nacional', bad: ['La Constitución de Santa Fe', 'El Código de los Municipios', 'La Ley de Departamentos'],
      why: 'La Constitución nacional establece los derechos y deberes de los habitantes.' },

    { t: 'Gobierno nacional', q: '¿Cómo es la forma de gobierno de la Argentina?',
      ok: 'Representativa, republicana y federal',
      bad: ['Monárquica y federal', 'Representativa y provincial', 'Republicana y unitaria'],
      why: 'Así lo establece la Constitución nacional: representativa, republicana y federal.' },

    { t: 'Gobierno nacional', q: '¿Qué significa que el gobierno sea REPRESENTATIVO?',
      ok: 'El pueblo elige representantes para que gobiernen en su nombre',
      bad: ['Existe división de poderes', 'Conviven el gobierno nacional y el provincial', 'El presidente gobierna solo'],
      why: 'Representativa: el pueblo elige representantes para que gobiernen en su nombre.' },

    { t: 'Gobierno nacional', q: '¿Qué significa que el gobierno sea REPUBLICANO?',
      ok: 'Existe división de poderes: Ejecutivo, Legislativo y Judicial',
      bad: ['El pueblo elige representantes', 'Hay dos niveles de gobierno', 'Hay una sola cámara de leyes'],
      why: 'Republicana: existe división de poderes (Ejecutivo, Legislativo y Judicial).' },

    { t: 'Gobierno nacional', q: '¿Qué significa que el gobierno sea FEDERAL?',
      ok: 'Conviven dos niveles de gobierno: el provincial y el nacional',
      bad: ['El pueblo vota cada 4 años', 'Los jueces dictan las leyes', 'Hay una sola Constitución para todo'],
      why: 'Federal: conviven el gobierno de cada provincia y el nacional, con sede en la Ciudad de Buenos Aires.' },

    { t: 'Gobierno nacional', q: '¿Quién ejerce el Poder LEGISLATIVO nacional?',
      ok: 'El Congreso de la Nación (Diputados y Senadores)',
      bad: ['El presidente y sus ministros', 'La Corte Suprema de Justicia', 'Los intendentes y presidentes comunales'],
      why: 'El Congreso de la Nación, formado por la Cámara de Diputados y la Cámara de Senadores, elabora las leyes.' },

    { t: 'Gobierno nacional', q: '¿Quién ejerce el Poder EJECUTIVO nacional?',
      ok: 'El presidente de la nación y su gabinete de ministros',
      bad: ['El Congreso de la Nación', 'Los jueces de la Corte Suprema', 'El gobernador de cada provincia'],
      why: 'El presidente y su gabinete administran el país, promulgan y ejecutan las leyes. Sede: Casa Rosada.' },

    { t: 'Gobierno nacional', q: '¿Quiénes ejercen el Poder JUDICIAL nacional?',
      ok: 'Los jueces de la Corte Suprema y los tribunales inferiores',
      bad: ['Los senadores y diputados', 'El presidente y los ministros', 'Los intendentes'],
      why: 'Interpretan las leyes y las hacen cumplir con sus sentencias. Sede: Corte Suprema.' },

    { t: 'Gobierno nacional', q: '¿Cuál es la SEDE del Poder Ejecutivo nacional?',
      ok: 'La Casa Rosada', bad: ['La Casa Gris', 'El Congreso Nacional', 'La Corte Suprema'],
      why: 'La sede del Ejecutivo nacional es la Casa Rosada.' },

    { t: 'Gobierno nacional', q: '¿Dónde tiene su sede el gobierno nacional?',
      ok: 'En la Ciudad de Buenos Aires', bad: ['En la ciudad de Santa Fe', 'En Rosario', 'En Córdoba'],
      why: 'El gobierno nacional tiene su sede en la Ciudad de Buenos Aires.' },

    { t: 'Gobierno provincial', q: '¿Qué significa que Santa Fe sea AUTÓNOMA?',
      ok: 'Puede dictar sus propias leyes, si no contradicen las nacionales',
      bad: ['Que no depende de ninguna Constitución', 'Que puede tener su propia moneda', 'Que elige al presidente de la nación'],
      why: 'Como todas las provincias, Santa Fe puede dictar sus propias leyes siempre que no contradigan las leyes nacionales.' },

    { t: 'Gobierno provincial', q: '¿Cuál es la SEDE del Poder Ejecutivo de Santa Fe?',
      ok: 'La Casa Gris', bad: ['La Casa Rosada', 'La Legislatura provincial', 'El Congreso Nacional'],
      why: 'El gobernador dirige y administra la provincia desde la Casa Gris.' },

    { t: 'Gobierno provincial', q: '¿Quién dirige y administra la provincia de Santa Fe?',
      ok: 'El gobernador', bad: ['El presidente de la nación', 'El intendente de Rosario', 'La Corte Suprema provincial'],
      why: 'El gobernador es el jefe de la administración pública y representa a Santa Fe ante la nación y las demás provincias.' },

    { t: 'Gobierno provincial', q: '¿Quién administra un MUNICIPIO?',
      ok: 'Un intendente', bad: ['Un presidente comunal', 'Un gobernador', 'Un senador'],
      why: 'Los municipios son administrados por intendentes; las comunas, por presidentes comunales.' },

    { t: 'Gobierno provincial', q: '¿Quién administra una COMUNA?',
      ok: 'Un presidente comunal', bad: ['Un intendente', 'Un juez de Primera Instancia', 'Un diputado provincial'],
      why: 'Las comunas están administradas por presidentes comunales.' },

    { t: 'Gobierno provincial', q: '¿Cuándo fue sancionada la Constitución de Santa Fe?',
      ok: 'El 14 de abril de 1962', bad: ['El 14 de abril de 1926', 'El 4 de abril de 1962', 'El 25 de mayo de 1853'],
      why: 'Fue sancionada el 14 de abril de 1962 y se basa en la Constitución nacional.' },

    { t: 'Gobierno provincial', q: '¿Cómo se titula la Sección Primera de la Constitución de Santa Fe?',
      ok: '“Principios, Derechos, Garantías y Deberes”',
      bad: ['“Del Poder Ejecutivo provincial”', '“De los Departamentos y Comunas”', '“Régimen Económico y Social”'],
      why: 'Su Sección Primera se titula “Principios, Derechos, Garantías y Deberes”.' },

    { t: 'Gobierno provincial', q: '¿Dónde tienen su sede los tres poderes provinciales?',
      ok: 'En la ciudad de Santa Fe (la capital)', bad: ['En Rosario', 'En la Ciudad de Buenos Aires', 'Cada uno en un departamento distinto'],
      why: 'Los tres poderes provinciales tienen su sede en la ciudad de Santa Fe.' },

    { t: 'Gobierno provincial', q: '¿Qué órganos forman el Poder Judicial de Santa Fe?',
      ok: 'La Corte Suprema de Justicia, las Cámaras de Apelación y los jueces de Primera Instancia',
      bad: ['La Cámara de Diputados y la de Senadores', 'El gobernador y sus ministros', 'Los intendentes y presidentes comunales'],
      why: 'Ese poder hace cumplir las leyes dentro del territorio provincial.' },

    { t: 'Gobierno provincial', q: '¿Qué hace el Poder Legislativo de la provincia?',
      ok: 'Elabora las leyes provinciales y controla la administración pública',
      bad: ['Dicta sentencias judiciales', 'Administra el país', 'Nombra al presidente de la nación'],
      why: 'Lo forman la Cámara de Senadores y la de Diputados; su sede es la Legislatura provincial.' },

    { t: 'Palabras nuevas', q: '¿Qué significa SANCIONAR una ley?',
      ok: 'Autorizarla o aprobarla', bad: ['Castigar a quien no la cumple', 'Pedir que se revise', 'Anularla para siempre'],
      why: 'Sancionar: autorizar o aprobar una ley o disposición.' },

    { t: 'Palabras nuevas', q: '¿Qué significa APELAR?',
      ok: 'Pedir que se revise una resolución judicial',
      bad: ['Aprobar una nueva ley', 'Elegir un representante', 'Dividir la provincia en departamentos'],
      why: 'Apelar: recurso al que puede recurrir un ciudadano para que se revise una resolución judicial.' },

    { t: 'Gobierno provincial', q: '¿Qué dice la Constitución de la provincia sobre sus habitantes?',
      ok: 'Los derechos y obligaciones que tienen',
      bad: ['Cuántos habitantes puede haber', 'Qué producciones deben hacer', 'En qué región deben vivir'],
      why: 'Santa Fe tiene su propia Constitución, que dice los derechos y obligaciones de sus habitantes.' }
  ];

  /* =====================================================================
     SECCIÓN 4 · JUEGO 2: MAPA INTERACTIVO
     Mapa ESQUEMÁTICO (no a escala) del centro-noreste argentino, dibujado
     con polígonos SVG para que cada provincia sea clickeable.
     ===================================================================== */

  const MAP = {
    /* Geometría real de las provincias (Natural Earth 10m, dominio público),
       proyectada en Mercator y simplificada. Recorte: norte y centro del país,
       para que Santa Fe y sus vecinas tengan buen tamaño en celular. */
    viewBox: "-40 -40 824 1080",

    /* Rumbos dibujados en el margen: ayudan con las preguntas de límites. */
    rumbos: [
      { t: "N", x: 372, y: -22 },
      { t: "S", x: 372, y: 1024 },
      { t: "O", x: -22, y: 500 },
      { t: "E", x: 766, y: 500 }
    ],

    /* Cada provincia es clickeable. `short` puede tener \n para dos renglones. */
    provinces: [
      { id: "buenosaires", name: "Buenos Aires", short: "Buenos\nAires", lx: 440.4, ly: 756.1, fs: 22,
        d: "M611.9,756.6L611.1,767.1L602.2,780.0L594.8,793.8L575.9,817.1L574.1,821.7L573.9,830.5L572.8,833.2L559.4,842.9L539.6,853.7L506.6,865.3L481.6,870.4L474.4,873.5L427.4,881.3L420.8,880.8L415.2,882.7L402.7,881.6L398.7,883.3L391.8,882.3L389.7,880.8L384.6,881.5L374.8,878.3L370.7,871.9L360.9,871.2L361.1,877.0L362.8,876.8L363.5,880.4L365.5,880.1L361.8,888.4L362.7,893.6L366.3,897.1L363.3,897.1L370.2,898.7L376.5,903.3L375.1,906.0L369.3,900.2L365.1,900.2L370.8,906.9L375.1,908.3L372.5,929.4L370.4,931.5L367.0,930.9L364.2,928.8L365.1,931.1L363.7,932.1L361.5,942.7L362.7,946.1L361.8,950.6L357.7,953.9L356.0,957.3L359.3,966.2L363.1,968.2L365.1,972.1L366.0,971.4L365.8,976.1L362.4,974.1L363.1,978.2L369.6,975.7L367.5,977.6L362.7,990.0L344.5,1000.0L342.3,999.8L339.7,993.8L328.4,982.6L316.6,980.5L316.8,639.9L317.2,631.1L318.7,629.3L390.3,629.1L423.1,592.0L425.5,586.0L428.5,585.3L436.0,586.7L440.6,590.1L444.6,589.1L447.4,580.5L450.2,577.9L450.5,574.6L453.3,572.5L452.5,569.9L460.3,577.1L471.6,583.9L475.5,588.5L481.3,591.7L486.5,590.9L492.2,595.3L497.6,594.3L499.2,598.4L502.3,600.0L508.0,600.1L525.3,611.7L533.7,609.5L536.0,610.7L536.7,619.1L533.1,623.6L529.5,623.3L528.3,624.4L533.4,628.5L530.9,632.3L532.5,636.8L529.7,639.2L528.7,643.9L529.6,646.9L533.8,650.4L535.5,647.2L539.5,644.1L546.6,649.0L553.3,651.0L554.9,653.0L559.0,653.3L564.0,657.6L574.4,663.1L586.4,675.8L591.7,686.2L581.8,701.6L580.0,709.0L581.2,715.7L586.4,725.7L592.5,731.8L600.0,735.5L600.0,737.4L603.6,735.1L607.5,735.1L607.1,733.1L608.7,733.6L610.6,738.0L611.9,756.6Z" },
      { id: "caba", name: "Ciudad de Buenos Aires", short: "CABA", lx: 595.5, ly: 627.3, fs: 17, px: 533.5, py: 643.3, leader: true,
        d: "M532.5,636.8L536.7,639.5L539.5,644.1L535.5,647.2L533.8,650.4L529.6,646.9L528.7,643.9L529.7,639.2L532.5,636.8Z" },
      { id: "catamarca", name: "Catamarca", short: "Cata-\nmarca", lx: 159.1, ly: 268.2, fs: 16,
        d: "M99.0,253.9L100.5,246.7L88.8,229.6L87.7,225.0L88.6,217.4L95.4,211.3L95.9,209.6L92.0,190.6L89.3,186.1L89.5,181.7L87.1,176.9L92.1,161.6L122.4,167.6L177.4,167.3L178.9,173.6L181.2,177.2L180.0,183.5L176.7,186.3L169.5,186.7L166.7,188.8L166.5,195.7L174.6,207.3L178.3,215.3L183.7,221.3L185.9,220.8L188.5,214.6L191.9,210.9L194.9,210.9L199.4,215.0L197.4,218.3L195.1,228.9L201.1,232.0L208.3,238.4L206.9,248.7L193.2,267.5L202.6,271.1L204.9,284.0L207.1,286.2L208.3,290.3L209.6,291.6L212.4,290.7L214.8,292.2L216.5,298.5L220.6,303.7L223.9,299.3L230.4,294.4L235.7,297.4L238.3,296.7L242.2,314.9L242.6,322.4L242.3,325.2L237.8,331.4L237.8,333.4L241.7,337.3L244.2,366.0L250.9,379.3L247.9,380.4L247.4,382.0L248.7,394.7L239.7,404.9L228.1,408.8L213.7,376.5L212.5,367.1L210.9,363.8L196.4,349.8L185.9,343.9L185.1,342.4L186.9,338.0L181.4,332.7L180.0,326.1L176.1,321.4L158.9,314.6L156.0,315.4L153.5,318.2L149.6,319.0L126.9,318.1L121.6,320.3L117.6,313.6L116.9,307.4L109.8,308.9L107.2,306.5L101.7,305.5L98.6,302.2L94.4,301.2L94.4,288.5L91.5,288.2L88.5,289.9L85.0,288.9L76.5,291.0L64.0,289.9L64.7,287.4L66.6,286.1L65.9,283.3L68.7,278.9L69.2,274.4L72.9,271.2L75.6,261.5L78.1,257.6L82.3,256.9L88.1,259.7L91.1,255.5L99.0,253.9Z" },
      { id: "chaco", name: "Chaco", short: "Chaco", lx: 432.3, ly: 222.5, fs: 22,
        d: "M537.9,246.0L532.5,248.6L532.8,250.5L530.9,254.6L529.4,253.7L528.5,257.4L524.6,259.4L524.7,261.5L526.9,263.8L526.8,267.3L514.4,275.4L514.5,278.9L517.5,287.2L515.4,301.2L390.3,301.2L390.3,209.7L389.8,190.1L388.4,186.0L316.1,185.9L362.9,125.0L362.7,111.4L376.4,116.0L381.9,120.9L387.4,122.0L390.5,124.6L392.7,128.9L396.3,129.0L402.0,135.7L412.4,137.7L415.1,140.6L418.2,148.8L420.0,148.9L437.1,161.9L443.5,164.1L446.8,169.4L449.6,171.5L450.3,174.5L452.8,177.4L455.0,177.9L457.6,186.2L463.8,187.8L464.8,189.6L471.3,193.7L471.9,196.0L479.8,203.2L480.3,209.0L491.0,211.6L494.2,219.2L497.8,219.5L502.7,217.1L505.2,219.7L511.5,222.4L515.4,227.3L528.3,236.6L533.0,243.3L536.6,244.1L537.9,246.0Z" },
      { id: "cordoba", name: "Córdoba", short: "Córdoba", lx: 299.8, ly: 510.9, fs: 22,
        d: "M373.7,409.7L371.8,424.2L383.8,439.0L372.2,484.0L367.2,489.8L368.1,499.5L369.5,502.3L368.0,511.5L374.1,516.9L376.9,524.3L381.2,528.1L383.5,534.8L382.2,538.5L384.9,539.5L388.9,545.8L387.2,558.0L381.1,562.4L340.0,629.4L318.7,629.3L317.2,631.1L316.7,662.5L241.9,662.5L241.9,607.1L239.9,567.2L241.7,563.6L244.3,562.2L245.1,553.7L250.9,536.5L249.3,520.3L247.9,519.4L237.4,521.3L235.0,510.8L232.1,507.4L217.6,498.7L212.3,498.3L212.0,457.7L222.6,422.9L228.1,408.8L239.7,404.9L248.2,395.6L247.9,380.4L278.5,372.6L287.5,375.1L288.5,378.7L298.1,384.0L313.3,384.3L313.5,387.3L316.2,388.0L316.7,390.1L364.9,390.4L366.9,391.9L373.7,409.7Z" },
      { id: "corrientes", name: "Corrientes", short: "Corrientes", lx: 562, ly: 339.9, fs: 22,
        d: "M542.9,264.4L555.8,265.2L566.6,268.2L574.7,272.1L582.6,271.9L589.4,275.8L594.0,275.6L601.5,272.4L607.4,276.7L614.3,273.7L617.2,274.2L623.7,280.7L625.1,280.4L628.2,275.4L629.0,270.9L634.7,267.1L636.9,266.5L642.7,268.1L641.2,269.5L640.5,274.0L646.8,287.1L648.3,296.6L652.8,304.5L657.8,308.4L651.2,312.8L656.0,317.5L654.7,321.2L652.9,319.5L648.2,318.5L645.4,320.1L645.6,324.4L640.7,326.0L639.5,331.6L633.1,338.4L628.7,340.2L628.0,345.3L624.0,348.8L622.4,354.7L614.1,359.3L611.0,367.8L607.4,370.3L605.3,375.2L598.8,381.5L596.4,385.7L592.3,389.9L587.7,390.5L584.5,392.4L583.0,400.8L575.1,409.1L569.1,411.5L569.9,414.8L568.6,418.5L560.0,426.4L558.2,429.8L561.8,439.8L553.9,432.4L550.4,423.1L541.9,413.4L525.7,409.5L514.9,413.3L509.2,412.1L498.8,419.2L492.3,417.3L480.3,418.9L480.0,416.7L483.2,404.2L479.8,394.0L483.4,382.2L483.8,370.3L486.9,361.7L493.6,358.4L500.7,352.3L500.9,347.3L505.6,332.5L506.5,321.2L505.6,310.0L506.8,307.7L511.6,306.8L514.0,304.8L516.4,297.1L517.5,287.2L514.5,278.9L514.4,275.4L524.5,268.0L530.9,265.4L542.9,264.4Z" },
      { id: "entrerios", name: "Entre Ríos", short: "Entre\nRíos", lx: 500.2, ly: 507.1, fs: 22,
        d: "M544.6,527.5L543.6,532.0L545.5,547.4L547.3,551.2L546.9,559.0L544.4,561.2L536.5,560.3L534.5,561.8L535.2,572.0L531.1,577.7L529.2,592.3L529.6,595.6L533.1,601.6L534.0,608.0L533.7,609.5L527.4,611.7L523.5,610.7L519.0,606.6L516.0,605.8L508.0,600.1L502.3,600.0L499.2,598.4L497.6,594.3L492.2,595.3L486.5,590.9L482.9,592.0L475.5,588.5L472.3,584.5L460.3,577.1L441.2,559.6L435.8,548.4L434.4,539.6L431.8,534.3L433.4,527.9L434.4,512.4L436.4,507.9L433.8,500.3L435.8,496.7L437.0,489.6L444.6,488.6L448.7,486.1L454.3,478.7L458.3,475.5L462.7,466.6L477.8,444.1L480.4,439.2L482.1,431.0L482.4,425.3L480.3,418.9L492.3,417.3L498.8,419.2L509.2,412.1L514.9,413.3L527.6,409.5L543.3,414.6L545.8,419.0L550.4,423.1L553.9,432.4L561.8,439.8L561.8,448.0L558.4,448.6L557.2,450.0L559.7,455.8L557.2,461.5L557.5,465.1L554.8,468.9L553.8,473.3L550.1,477.2L553.9,481.2L553.9,485.8L550.8,494.5L546.6,495.8L544.5,498.7L546.4,501.4L547.0,505.2L545.2,512.2L549.1,518.9L544.6,527.5Z" },
      { id: "formosa", name: "Formosa", short: "Formosa", lx: 468.7, ly: 149.3, fs: 22,
        d: "M362.6,32.5L364.9,33.1L367.0,35.7L366.5,38.8L369.1,39.9L369.3,43.8L376.0,52.2L379.5,59.3L387.7,65.6L389.3,69.3L398.8,74.2L399.5,77.2L408.5,80.7L409.5,82.7L416.7,86.7L416.3,89.6L421.2,96.2L424.3,96.6L428.7,99.4L437.7,100.4L440.1,102.9L450.6,106.4L464.0,105.9L479.8,116.4L482.6,119.5L488.9,122.6L494.4,129.1L509.4,136.7L517.8,143.1L532.6,146.7L538.6,153.5L543.5,151.0L547.9,154.5L553.3,156.0L554.1,157.5L559.0,158.0L564.2,162.7L569.1,172.0L572.8,175.4L572.0,181.3L563.3,188.0L564.8,189.0L561.2,191.7L562.1,194.3L558.8,196.5L559.9,198.1L557.5,201.0L559.5,201.6L559.0,203.1L549.6,208.8L547.9,212.5L546.7,211.5L548.7,214.3L545.9,215.8L546.0,219.0L544.0,223.1L545.2,224.7L543.8,228.4L546.1,231.6L544.9,232.6L545.5,234.5L543.0,234.4L542.5,239.8L540.7,240.3L540.7,242.4L538.4,242.2L538.9,246.0L537.0,245.6L536.6,244.1L533.2,243.5L528.3,236.6L515.4,227.3L511.5,222.4L505.2,219.7L502.7,217.1L497.8,219.5L494.2,219.2L491.0,211.6L480.3,209.0L479.8,203.2L471.9,196.0L471.3,193.7L464.8,189.6L463.8,187.8L457.6,186.2L455.0,177.9L452.8,177.4L450.3,174.5L449.6,171.5L446.8,169.4L443.5,164.1L437.1,161.9L420.0,148.9L418.2,148.8L415.1,140.6L412.4,137.7L402.0,135.7L396.3,129.0L392.7,128.9L390.5,124.6L387.4,122.0L381.9,120.9L376.4,116.0L362.7,111.4L362.6,32.5Z" },
      { id: "jujuy", name: "Jujuy", short: "Jujuy", lx: 211.7, ly: 73.2, fs: 22,
        d: "M146.8,92.8L157.2,57.7L149.3,49.2L156.7,40.5L156.4,35.0L158.8,34.9L160.7,32.9L167.3,30.4L169.4,20.8L185.2,16.1L188.3,13.7L192.0,0.0L197.6,2.2L199.7,6.2L204.7,7.5L211.7,15.1L237.4,14.8L235.2,25.3L231.0,33.9L230.5,38.0L234.1,40.4L233.1,44.4L235.6,55.0L237.7,56.9L243.2,57.3L245.0,58.9L243.9,69.9L247.8,72.4L251.2,81.3L254.7,81.7L256.8,80.0L260.7,79.4L265.2,81.8L270.4,87.3L273.5,82.0L281.4,82.2L282.7,114.4L276.6,124.9L271.4,126.3L267.6,128.8L262.9,135.0L253.3,127.5L250.0,134.2L248.5,134.4L242.9,131.9L238.5,127.5L233.6,129.8L219.9,125.0L212.7,114.0L212.4,109.3L206.1,104.6L203.6,105.3L201.8,102.8L200.6,98.3L202.4,92.1L202.4,83.7L194.3,77.8L186.7,75.3L185.2,76.3L183.9,82.5L186.9,92.3L186.3,107.6L184.7,112.4L179.6,117.0L175.2,116.8L172.1,115.2L168.0,110.3L163.4,108.0L154.3,97.6L151.5,96.7L146.8,92.8Z" },
      { id: "lapampa", name: "La Pampa", short: "La Pampa", lx: 226.1, ly: 779.3, fs: 22,
        d: "M241.5,716.5L241.9,662.5L316.7,662.5L316.5,901.1L310.9,900.0L302.4,894.0L299.2,889.9L293.7,887.8L289.2,882.6L269.0,874.4L247.0,871.5L229.6,873.5L221.0,870.0L215.4,872.3L203.5,868.1L192.3,866.6L184.6,867.6L177.1,865.8L175.7,860.5L173.3,857.7L154.8,849.3L151.9,845.4L150.1,838.9L144.4,839.1L141.3,840.7L131.8,840.3L126.8,832.1L123.9,830.0L120.7,829.6L119.5,826.9L120.6,821.3L126.0,816.3L126.6,811.7L124.9,808.1L120.5,804.2L102.9,801.8L102.6,731.5L101.0,723.4L102.2,716.8L241.5,716.5Z" },
      { id: "larioja", name: "La Rioja", short: "La Rioja", lx: 149.3, ly: 385.7, fs: 22,
        d: "M51.5,311.8L56.6,301.2L61.6,298.8L64.0,289.9L76.5,291.0L85.0,288.9L88.9,289.9L91.9,288.1L95.0,289.3L94.4,301.2L98.6,302.2L101.7,305.5L107.2,306.5L109.8,308.9L116.9,307.4L117.6,313.6L121.6,320.3L126.9,318.1L149.6,319.0L153.5,318.2L156.0,315.4L158.9,314.6L176.1,321.4L179.0,324.5L181.4,332.7L187.0,338.2L185.2,342.0L185.9,343.9L196.4,349.8L210.9,363.8L212.5,367.1L213.7,376.5L228.1,408.8L222.6,422.9L212.0,457.7L212.3,498.3L205.9,499.1L199.4,497.6L192.2,500.4L185.3,500.8L178.0,499.2L175.7,499.9L169.7,497.9L167.4,492.6L165.0,491.2L164.2,485.4L160.3,484.4L155.7,479.6L153.3,470.9L155.2,456.9L152.8,454.7L154.2,447.2L149.4,438.1L146.6,436.5L142.8,430.6L132.9,421.0L129.9,414.3L117.7,404.3L110.5,395.8L107.0,394.1L106.0,391.9L99.1,385.9L92.1,383.7L87.3,383.8L83.1,381.6L77.7,383.1L69.4,382.6L69.1,377.5L70.8,374.0L71.0,368.5L72.5,366.9L69.9,363.0L69.8,358.8L71.1,355.2L73.5,353.7L73.7,351.3L71.1,348.5L69.0,343.6L65.4,340.1L61.6,330.9L55.2,325.4L51.4,325.0L49.1,322.5L46.1,323.0L41.2,321.2L47.5,314.6L48.4,311.1L51.5,311.8Z" },
      { id: "mendoza", name: "Mendoza", short: "Mendoza", lx: 87, ly: 643.2, fs: 22,
        d: "M25.5,572.1L21.2,565.3L21.9,561.2L21.1,558.4L24.1,556.0L26.0,549.9L22.2,547.1L19.1,542.7L18.0,535.9L18.5,534.1L19.9,533.9L18.4,528.4L15.2,525.3L14.7,520.6L22.0,519.3L26.8,520.1L40.8,517.7L42.2,516.4L43.2,510.5L50.3,507.0L57.1,507.1L62.2,502.0L64.5,503.1L68.2,507.9L73.4,508.2L74.9,521.8L83.6,521.7L96.6,512.1L102.8,511.5L111.4,507.8L114.5,508.9L116.5,512.5L121.3,516.7L125.4,517.4L136.2,515.4L140.6,517.9L146.5,538.3L149.4,543.9L147.9,552.0L149.1,555.7L151.2,578.9L157.0,588.8L160.9,600.5L164.7,603.6L168.9,612.5L168.4,618.9L166.6,619.3L165.7,621.3L166.1,629.5L167.5,631.8L169.3,641.8L171.4,644.1L177.8,658.4L177.5,662.3L179.6,669.1L178.9,689.0L175.1,707.2L174.7,716.4L103.1,716.4L101.5,717.5L101.0,723.4L102.6,731.5L102.9,801.8L95.1,800.8L91.6,795.8L84.1,794.6L80.6,791.6L70.6,791.1L69.1,790.1L67.3,784.1L63.1,781.1L56.6,779.3L46.6,780.6L39.0,777.2L34.1,770.9L35.3,768.9L35.2,763.6L30.1,759.8L27.9,754.9L23.0,749.8L18.8,748.1L14.6,736.7L13.0,735.9L11.0,736.9L9.4,734.1L10.2,727.2L7.1,723.4L9.3,718.9L7.9,714.7L9.1,711.7L7.5,711.2L7.5,709.3L10.3,706.4L7.5,698.0L8.0,689.7L5.3,682.8L7.2,681.6L5.1,679.3L1.4,678.5L0.5,676.4L2.1,673.7L9.0,671.4L10.4,659.9L13.8,651.6L12.1,648.8L14.9,646.1L16.0,640.2L23.0,631.1L23.5,624.6L26.5,623.4L29.9,624.2L33.5,621.5L31.6,616.5L32.3,608.3L31.9,606.8L30.0,606.7L29.8,597.0L32.1,594.6L30.6,591.2L31.3,585.7L33.0,584.4L35.3,576.3L34.2,571.6L31.7,569.5L28.6,569.1L25.5,572.1Z" },
      { id: "misiones", name: "Misiones", short: "Misiones", lx: 700.2, ly: 245.6, fs: 15,
        d: "M702.8,185.7L702.8,181.8L704.5,181.6L705.8,183.6L708.4,184.3L709.5,187.4L711.8,182.1L716.0,180.7L717.9,183.0L718.4,182.0L720.8,182.1L719.7,179.7L721.9,179.8L724.0,177.9L723.7,181.7L724.8,182.9L725.5,180.6L729.3,181.8L730.6,185.6L733.6,185.0L734.3,189.7L736.2,192.4L736.5,200.7L739.5,203.9L743.8,213.3L743.5,216.9L741.3,221.0L740.6,235.7L739.1,237.6L741.3,242.5L741.2,248.7L737.9,253.6L736.6,259.4L734.3,257.6L733.1,260.0L730.7,259.3L730.8,261.1L728.9,261.0L725.1,265.8L722.2,265.5L721.4,263.7L719.0,270.5L716.5,272.8L713.9,271.2L712.8,274.1L712.1,272.0L709.6,271.9L708.7,272.6L709.4,274.4L705.3,275.8L703.2,274.0L701.6,277.2L700.5,277.7L699.9,276.6L698.8,278.9L695.1,279.6L693.8,277.7L692.0,281.9L689.7,282.5L689.0,288.1L685.8,290.5L681.6,290.2L683.9,293.8L680.8,293.5L680.0,295.3L677.4,293.9L673.8,297.2L671.4,297.0L665.8,305.2L663.0,305.2L660.9,308.5L658.6,307.0L657.8,308.4L652.8,304.5L648.6,297.2L647.5,289.0L640.5,274.0L640.6,271.1L642.7,268.1L645.1,267.9L647.7,271.5L652.0,273.6L659.2,267.9L660.2,263.8L658.9,259.9L660.8,259.3L661.7,256.6L664.9,256.5L667.0,250.7L672.9,248.4L679.1,249.4L679.7,245.0L682.5,242.1L686.3,241.2L688.7,235.6L694.3,234.2L694.4,228.5L698.5,223.5L701.1,212.2L700.0,209.9L700.9,205.6L700.0,201.6L702.5,200.0L703.3,193.3L700.9,186.0L702.8,185.7Z" },
      { id: "salta", name: "Salta", short: "Salta", lx: 253.5, ly: 120.2, fs: 22,
        d: "M145.3,97.6L146.8,92.8L151.5,96.7L154.3,97.6L163.4,108.0L168.0,110.3L172.1,115.2L175.2,116.8L179.6,117.0L184.7,112.4L186.3,107.6L186.9,92.3L183.9,82.5L185.2,76.3L186.3,75.2L190.5,76.4L202.1,83.2L202.4,92.1L200.6,98.3L201.8,102.8L203.6,105.3L206.1,104.6L212.4,109.3L212.7,114.0L220.2,125.2L222.5,126.5L224.7,125.9L226.9,127.8L233.6,129.8L238.5,127.5L242.9,131.9L249.1,134.5L253.3,127.5L262.5,135.2L267.6,128.8L271.4,126.3L276.6,124.9L281.9,117.2L282.7,114.4L281.6,82.8L273.5,82.0L270.4,87.3L265.2,81.8L260.7,79.4L256.8,80.0L254.7,81.7L251.0,81.1L247.8,72.4L243.8,69.7L245.2,59.3L243.2,57.3L237.7,56.9L235.7,55.3L233.2,44.9L234.1,40.4L230.5,38.0L231.0,33.9L235.2,25.3L237.4,14.8L244.8,14.7L263.9,20.2L265.8,23.2L264.5,26.4L270.9,35.8L269.7,40.6L274.0,45.8L275.4,51.5L278.6,35.8L282.6,30.9L289.5,14.8L292.6,10.2L297.9,10.2L301.1,12.5L305.5,10.0L342.2,10.3L343.1,16.3L350.1,21.8L350.1,24.6L362.6,32.5L362.9,125.0L316.1,185.9L293.0,185.6L281.2,182.1L271.0,203.9L268.3,213.3L255.9,212.9L248.1,216.0L234.6,211.0L231.9,206.3L226.3,208.4L216.5,206.2L214.1,217.2L199.4,215.0L194.9,210.9L192.6,210.7L188.5,214.6L185.9,220.8L184.2,221.5L178.3,215.3L165.9,193.4L166.2,189.4L169.0,186.8L176.7,186.3L180.0,183.5L181.2,177.2L177.2,167.1L122.4,167.6L92.1,161.6L97.8,159.9L94.4,154.9L93.1,149.4L89.7,147.5L88.5,144.6L92.1,134.6L94.0,135.9L96.4,129.7L99.5,129.6L103.1,124.2L141.9,107.0L145.3,97.6Z" },
      { id: "sanjuan", name: "San Juan", short: "San Juan", lx: 75.3, ly: 444.6, fs: 22,
        d: "M27.8,406.4L26.9,405.4L29.2,400.5L29.7,391.9L29.1,387.5L27.2,384.8L27.4,380.6L24.2,366.2L29.9,358.4L34.6,356.2L34.7,348.2L37.7,340.9L36.8,334.8L40.1,329.9L41.2,321.2L46.1,323.0L49.1,322.5L51.4,325.0L55.2,325.4L62.8,332.2L65.4,340.1L69.0,343.6L74.0,351.9L70.0,357.2L69.9,363.0L72.5,366.9L70.9,369.2L69.2,382.4L77.7,383.1L83.1,381.6L87.3,383.8L92.1,383.7L99.1,385.9L106.0,391.9L107.0,394.1L110.5,395.8L117.7,404.3L129.9,414.3L132.9,421.0L142.8,430.6L146.6,436.5L149.4,438.1L154.2,447.2L152.8,454.7L155.2,456.9L153.3,470.9L155.7,479.6L160.3,484.4L164.2,485.4L165.0,491.2L167.4,492.6L169.7,497.9L158.5,498.5L153.1,496.6L141.7,496.9L140.8,498.7L140.6,517.9L136.2,515.4L125.4,517.4L121.3,516.7L116.5,512.5L114.5,508.9L111.4,507.8L102.8,511.5L96.6,512.1L83.6,521.7L74.9,521.8L73.4,508.2L68.2,507.9L64.5,503.1L62.2,502.0L57.1,507.1L50.3,507.0L43.2,510.5L42.2,516.4L40.8,517.7L26.8,520.1L22.0,519.3L14.7,520.6L12.4,519.2L11.3,511.5L9.0,506.4L13.5,506.7L15.2,501.3L12.2,498.2L7.2,497.6L5.1,495.0L4.6,490.4L0.1,481.9L1.6,471.4L1.0,468.4L2.4,461.6L4.9,457.7L6.3,457.7L8.0,460.4L11.1,454.9L14.3,454.6L11.1,449.6L11.9,442.5L16.4,427.9L19.7,424.1L18.4,420.3L19.5,419.7L24.7,421.9L27.5,420.8L29.9,418.5L30.8,413.4L33.2,409.9L31.2,406.8L27.8,406.4Z" },
      { id: "sanluis", name: "San Luis", short: "San\nLuis", lx: 200.6, ly: 597.5, fs: 15,
        d: "M241.9,662.5L241.9,716.3L174.4,716.3L175.1,707.2L178.9,689.0L179.6,669.1L176.6,654.5L169.3,641.8L167.5,631.8L166.1,629.5L165.7,621.3L166.6,619.3L168.4,618.9L168.9,612.5L164.7,603.6L160.9,600.5L157.0,588.8L151.2,578.9L149.1,555.7L147.9,552.0L149.4,543.9L146.5,538.3L143.7,526.7L141.9,524.9L140.7,520.1L140.7,499.0L141.7,496.9L153.1,496.6L158.5,498.5L169.7,497.9L175.7,499.9L178.0,499.2L185.3,500.8L192.2,500.4L199.4,497.6L205.9,499.1L216.2,498.4L232.1,507.4L235.0,510.8L237.4,521.3L249.1,519.8L250.9,536.5L245.1,553.7L244.3,562.2L241.7,563.6L239.9,567.2L241.9,607.1L241.9,662.5Z" },
      { id: "santafe", name: "Santa Fe", short: "SANTA\nFE", lx: 423.4, ly: 440, fs: 22,
        d: "M483.2,301.2L515.4,301.2L512.9,305.9L506.8,307.7L505.6,310.0L506.5,321.2L505.6,332.5L500.9,347.3L500.7,352.3L493.6,358.4L486.9,361.7L483.8,370.3L483.4,382.2L479.8,394.0L483.2,404.2L480.0,416.7L482.4,425.3L480.4,439.2L462.7,466.6L458.3,475.5L447.3,487.4L437.0,489.6L435.8,496.7L433.8,500.3L436.4,507.9L434.4,512.4L433.4,527.9L431.8,534.3L434.4,539.6L435.8,548.4L441.2,559.6L452.5,569.9L453.3,572.5L450.5,574.6L450.2,577.9L447.4,580.5L446.5,585.2L443.5,589.7L439.8,589.8L435.7,586.7L428.5,585.3L425.5,586.0L423.1,592.0L390.3,629.1L340.0,629.4L381.1,562.4L385.6,559.6L388.0,556.4L389.2,546.6L384.9,539.5L382.2,538.5L383.5,534.8L381.3,528.3L376.9,524.3L374.1,516.9L368.0,511.5L369.5,502.3L368.1,499.5L367.1,490.4L372.2,484.0L383.8,439.0L372.1,425.0L371.7,422.9L390.3,301.2L483.2,301.2Z" },
      { id: "santiago", name: "Santiago del Estero", short: "Santiago\ndel Estero", lx: 320.7, ly: 288.5, fs: 16,
        d: "M316.1,185.9L388.4,186.0L389.8,190.1L390.3,301.2L373.7,409.7L366.9,391.9L364.9,390.4L316.7,390.1L316.2,388.0L313.5,387.3L313.3,384.3L298.1,384.0L288.5,378.7L287.5,375.1L278.5,372.6L250.9,379.3L244.2,366.0L241.7,337.3L237.8,333.4L237.8,331.4L242.3,325.2L242.6,322.4L242.2,314.9L238.3,296.7L242.5,295.7L244.4,290.8L245.8,290.2L242.7,281.4L247.1,277.1L242.9,275.0L251.0,267.0L255.6,253.9L257.7,251.1L260.0,242.1L262.3,241.4L264.1,235.7L267.7,235.8L266.7,224.0L271.0,203.9L281.2,182.1L293.0,185.6L316.1,185.9Z" },
      { id: "tucuman", name: "Tucumán", short: "Tucumán", lx: 229.6, ly: 249.4, fs: 15,
        d: "M216.8,206.2L226.3,208.4L231.9,206.3L234.6,211.0L248.1,216.0L255.9,212.9L268.3,213.3L266.6,224.4L267.7,235.8L264.1,235.7L262.3,241.4L260.0,242.1L257.7,251.1L255.6,253.9L251.0,267.0L242.9,275.0L247.1,277.1L242.7,281.4L245.8,290.2L244.4,290.8L241.7,296.2L235.7,297.4L230.4,294.4L223.9,299.3L221.2,303.9L216.5,298.5L214.8,292.2L212.4,290.7L209.6,291.6L208.3,290.3L207.1,286.2L204.9,284.0L202.6,271.1L193.2,267.5L206.9,248.7L208.3,239.5L207.4,236.9L195.1,228.9L197.4,218.3L199.4,215.0L214.4,217.0L216.8,206.2Z" }
    ],

    /* Río Paraná (cauce real, recortado al mapa). */
    rivers: [
      "M552.9,-59.4L554.5,-51.1L556.9,-52.7L559.6,-49.4L555.9,-46.9L559.5,-45.1L557.1,-41.6L561.4,-38.3L559.8,-35.4L560.6,-29.0L557.5,-24.2L559.7,-21.6L555.6,-13.2L557.9,-4.7L553.9,13.1L554.9,22.3L557.9,23.3L560.8,28.0L560.8,36.7L563.2,41.2L557.9,41.7L556.0,44.1L562.5,50.8L561.2,53.2L563.3,55.8L562.6,58.7L569.2,62.4L569.8,65.6L576.2,71.0L575.2,74.1L577.4,77.2L577.5,85.1L585.2,92.7L584.5,98.9L582.2,101.9L587.1,107.2L587.0,110.1L590.1,111.2L588.5,114.1L592.1,118.2L594.3,130.5L591.6,136.4L593.3,138.3L591.9,141.9L589.4,142.4L586.4,148.6L588.5,153.1L584.8,153.0L578.7,159.3L574.3,159.2L572.3,164.7L567.8,168.0L572.7,175.4L572.0,181.3L563.2,188.0L564.7,189.0L561.2,191.7L562.0,194.3L558.8,196.5L559.9,198.1L557.5,201.0L559.5,201.6L558.9,203.1L549.5,208.8L547.9,212.4L546.7,211.4L548.7,214.3L545.9,215.8L544.0,223.1L545.5,234.5L543.0,234.4L542.4,239.8L540.6,242.4L538.4,242.2L539.4,245.5L532.4,248.6L530.8,254.6L529.4,253.7L528.5,257.4L524.6,259.4L526.8,267.3",
      "M526.8,267.2L514.4,275.4L517.5,287.2L516.4,297.1L514.0,304.8L506.8,307.7L505.6,310.0L505.6,332.5L500.7,352.3L485.3,364.3L483.4,382.2L479.8,394.0L483.2,404.2L480.0,416.7L482.4,425.3L480.4,439.2L458.3,475.5L447.3,487.4L437.0,489.6L433.8,500.3L436.4,507.9L431.7,534.4L441.2,559.6L447.2,565.1",
      "M447.2,565.1L455.7,569.1L462.9,568.9L465.0,570.9L465.9,569.4L467.7,570.7L468.7,568.6L469.9,571.0L476.0,569.1L476.7,571.6L478.7,570.9L481.9,573.7L481.7,576.0L484.5,576.5L485.5,579.4L492.9,584.6L501.2,598.9",
      "M447.2,565.1L475.5,588.5L481.3,591.7L486.5,590.9L492.1,595.3L497.6,594.3L498.5,597.8L501.2,598.9",
      "M501.2,598.9L508.0,600.1L525.3,611.7L533.7,609.5",
      "M803.5,5.4L795.6,18.4L780.1,26.1L774.8,31.7",
      "M700.9,173.6L702.4,174.3",
      "M702.3,174.9L710.4,161.1L708.8,155.7L715.0,135.9L714.4,129.5L717.6,122.8L714.4,112.7L717.4,108.8",
      "M774.8,31.7L765.7,43.4L747.4,53.0L741.2,71.8L730.5,78.9L725.7,103.1L718.3,108.0",
      "M738.1,74.6L734.5,79.0L728.0,104.0L723.4,107.7L718.3,108.0",
      "M718.3,108.0L717.4,108.8",
      "M702.3,174.9L703.5,185.2L700.8,187.3L703.3,193.3L702.5,200.0L700.0,201.6L701.1,212.2L698.5,223.5L694.4,228.5L694.3,234.2L688.7,235.6L686.3,241.2L679.6,244.9L679.1,249.4L672.8,248.4L667.0,250.7L664.9,256.5L661.7,256.6L658.9,259.9L659.2,267.9L652.0,273.6L647.6,271.5L645.9,268.2L635.7,266.4L628.9,270.9L628.2,275.4L623.7,280.7L617.2,274.2L607.3,276.7L601.5,272.4L589.4,275.8L582.5,271.9L574.7,272.1L552.4,264.5L530.9,265.4L526.8,267.2"
    ],

    /* Ciudades con sus coordenadas reales. El nombre aparece recién al
       corregir, así ubicarlas forma parte del desafío. */
    cities: [
      { id: "ciudad-santafe", name: "Ciudad de Santa Fe (capital)", label: "Capital",
        cx: 434.7, cy: 485.3, lx: 417.7, ly: 492.3, anchor: "end" },
      { id: "ciudad-rosario", name: "Rosario", label: "Rosario",
        cx: 437.4, cy: 553.6, lx: 452.4, ly: 578.6, anchor: "start" }
    ],

    /* Desafíos: `targets` son ids válidos; `mode` single o multi. */
    challenges: [
      { q: "Para empezar: hacé clic en la provincia de SANTA FE.",
        targets: ["santafe"], mode: "single",
        why: "Santa Fe está en el centro-este del país, alargada de norte a sur." },
      { q: "¿Qué provincia limita con Santa Fe al NORTE?",
        targets: ["chaco"], mode: "single",
        why: "Al norte, Santa Fe limita con Chaco." },
      { q: "¿Qué provincia limita con Santa Fe al SUR?",
        targets: ["buenosaires"], mode: "single",
        why: "Al sur limita con Buenos Aires, la provincia más poblada del país." },
      { q: "Marcá las DOS provincias que limitan con Santa Fe al ESTE.",
        targets: ["entrerios", "corrientes"], mode: "multi",
        why: "Al este: Entre Ríos y Corrientes." },
      { q: "Marcá las DOS provincias que limitan con Santa Fe al OESTE.",
        targets: ["santiago", "cordoba"], mode: "multi",
        why: "Al oeste: Santiago del Estero y Córdoba." },
      { q: "Marcá las 6 provincias con las que limita Santa Fe.",
        targets: ["chaco", "entrerios", "corrientes", "buenosaires", "santiago", "cordoba"], mode: "multi",
        why: "Chaco, Entre Ríos, Corrientes, Buenos Aires, Santiago del Estero y Córdoba." },
      { q: "Marcá las 6 provincias de la REGIÓN DEL LITORAL (Santa Fe incluida).",
        targets: ["santafe", "formosa", "chaco", "misiones", "corrientes", "entrerios"], mode: "multi",
        why: "El Litoral está en el noreste: Santa Fe, Formosa, Chaco, Misiones, Corrientes y Entre Ríos." },
      { q: "Marcá las 3 provincias de la REGIÓN CENTRO.",
        targets: ["santafe", "entrerios", "cordoba"], mode: "multi",
        why: "La Región Centro la forman Santa Fe, Entre Ríos y Córdoba." },
      { q: "Marcá las provincias del LITORAL que NO limitan con Santa Fe.",
        targets: ["formosa", "misiones"], mode: "multi",
        why: "Formosa y Misiones son del Litoral, pero no tocan a Santa Fe." },
      { q: "Hacé clic en la provincia MÁS POBLADA del país (Santa Fe es la 3.ª).",
        targets: ["buenosaires"], mode: "single",
        why: "Primero Buenos Aires, después Córdoba y tercera Santa Fe." },
      { q: "Hacé clic en la provincia que está 2.ª en población, justo antes de Santa Fe.",
        targets: ["cordoba"], mode: "single",
        why: "Córdoba es la segunda provincia más poblada." },
      { q: "Hacé clic en la única CIUDAD AUTÓNOMA del país (no es una provincia).",
        targets: ["caba"], mode: "single",
        why: "La Argentina tiene 23 provincias + 1 ciudad autónoma: la Ciudad de Buenos Aires, donde está la sede del gobierno nacional." },
      { q: "Hacé clic en el punto de la CAPITAL provincial (Santa Fe de la Vera Cruz).",
        targets: ["ciudad-santafe"], mode: "single",
        why: "Está en el centro de la provincia, sobre el margen derecho del río Paraná." },
      { q: "Hacé clic en la ciudad santafesina que supera el MILLÓN de habitantes.",
        targets: ["ciudad-rosario"], mode: "single",
        why: "Rosario tiene más del doble de habitantes que la ciudad de Santa Fe." }
    ]
  };

  /* =====================================================================
     SECCIÓN 5 · JUEGO 3: UNIR CON FLECHAS (drag & drop)
     Rondas de 4-5 pares concepto ↔ definición.
     ===================================================================== */
  const MATCH_ROUNDS = [
    { title: 'Los poderes del Estado nacional', pairs: [
      { id: 'n1', a: 'Congreso de la Nación', b: 'Elabora las leyes y normas que hay que cumplir' },
      { id: 'n2', a: 'Presidente y gabinete de ministros', b: 'Administra el país: promulga y ejecuta las leyes' },
      { id: 'n3', a: 'Corte Suprema de Justicia', b: 'Interpreta las leyes y las hace cumplir con sentencias' },
      { id: 'n4', a: 'Casa Rosada', b: 'Sede del Poder Ejecutivo nacional' }
    ]},
    { title: 'El gobierno de Santa Fe', pairs: [
      { id: 'p1', a: 'Gobernador', b: 'Dirige y administra la provincia' },
      { id: 'p2', a: 'Casa Gris', b: 'Sede del Poder Ejecutivo provincial' },
      { id: 'p3', a: 'Intendente', b: 'Administra un municipio' },
      { id: 'p4', a: 'Presidente comunal', b: 'Administra una comuna' },
      { id: 'p5', a: 'Legislatura provincial', b: 'Sede del Poder Legislativo de la provincia' }
    ]},
    { title: 'Palabras nuevas y conceptos', pairs: [
      { id: 'c1', a: 'Sancionar', b: 'Autorizar o aprobar una ley o disposición' },
      { id: 'c2', a: 'Apelar', b: 'Pedir que se revise una resolución judicial' },
      { id: 'c3', a: 'Región', b: 'Grupo de tres o más provincias con cosas en común' },
      { id: 'c4', a: 'Autonomía', b: 'Poder dictar leyes propias sin contradecir las nacionales' }
    ]},
    { title: '¿Cómo es nuestra forma de gobierno?', pairs: [
      { id: 'f1', a: 'Representativa', b: 'El pueblo elige representantes que gobiernen en su nombre' },
      { id: 'f2', a: 'Republicana', b: 'Existe división de poderes' },
      { id: 'f3', a: 'Federal', b: 'Conviven el gobierno provincial y el nacional' },
      { id: 'f4', a: 'Constitución nacional', b: 'La ley fundamental del país' }
    ]},
    { title: 'Los números de Santa Fe', pairs: [
      { id: 'd1', a: '19', b: 'Departamentos de la provincia' },
      { id: 'd2', a: '24', b: 'Territorios en que se divide la Argentina' },
      { id: 'd3', a: '6', b: 'Provincias con las que limita Santa Fe' },
      { id: 'd4', a: '3.544.908', b: 'Habitantes según el Censo 2022' },
      { id: 'd5', a: '14 de abril de 1962', b: 'Se sancionó la Constitución de Santa Fe' }
    ]},
    { title: 'Geografía y regiones', pairs: [
      { id: 'g1', a: 'Región del Litoral', b: 'Santa Fe, Formosa, Chaco, Misiones, Corrientes y Entre Ríos' },
      { id: 'g2', a: 'Región Centro', b: 'Santa Fe, Entre Ríos y Córdoba' },
      { id: 'g3', a: 'Río Paraná', b: 'Corre junto a la ciudad capital' },
      { id: 'g4', a: 'Llanuras', b: 'Relieve que predomina en Santa Fe' },
      { id: 'g5', a: 'Autopista Rosario–Córdoba', b: 'La ruta más importante de la Región Centro' }
    ]}
  ];

  /* =====================================================================
     SECCIÓN 6 · JUEGO 4: FLASHCARDS
     ===================================================================== */
  const FLASHCARDS = [
    { id: 'fc01', deck: 'Ubicación y datos', f: '¿Dónde está Santa Fe?', b: 'En el centro-este de la Argentina. Predominan las llanuras.' },
    { id: 'fc02', deck: 'Ubicación y datos', f: '¿En cuántos territorios se divide la Argentina?', b: '24: 23 provincias + la Ciudad Autónoma de Buenos Aires.' },
    { id: 'fc03', deck: 'Ubicación y datos', f: 'Habitantes de Santa Fe (Censo 2022)', b: '3.544.908 — es la 3.ª provincia más poblada.' },
    { id: 'fc04', deck: 'Ubicación y datos', f: 'Superficie de Santa Fe', b: '133.249,1 km² — la 11.ª provincia más extensa.' },
    { id: 'fc05', deck: 'Ubicación y datos', f: '¿Con cuántas provincias limita y cuáles?', b: 'Con 6: Chaco (N); Entre Ríos y Corrientes (E); Buenos Aires (S); Santiago del Estero y Córdoba (O).' },
    { id: 'fc06', deck: 'Ubicación y datos', f: 'Capital de la provincia', b: 'Santa Fe de la Vera Cruz, en el centro, sobre el margen derecho del río Paraná.' },
    { id: 'fc07', deck: 'Ubicación y datos', f: '¿Qué ciudad supera el millón de habitantes?', b: 'Rosario: más del doble que la ciudad de Santa Fe.' },
    { id: 'fc08', deck: 'Ubicación y datos', f: '¿En cuántos departamentos se divide Santa Fe?', b: '19 departamentos, formados por municipios y comunas.' },

    { id: 'fc09', deck: 'Regiones', f: '¿Qué es una región?', b: 'Un grupo de 3 o más provincias que comparten relieve, producciones económicas y cultura.' },
    { id: 'fc10', deck: 'Regiones', f: 'Región del Litoral', b: 'Noreste del país: Santa Fe, Formosa, Chaco, Misiones, Corrientes y Entre Ríos. Se agrupan por sus características físicas y naturales.' },
    { id: 'fc11', deck: 'Regiones', f: 'Región Centro', b: 'Santa Fe, Entre Ríos y Córdoba. Regionalización política y social: busca desarrollar economía, educación, salud, ciencia y cultura.' },
    { id: 'fc12', deck: 'Regiones', f: 'La ruta más importante de la Región Centro', b: 'La Autopista Rosario–Córdoba: une las dos ciudades más grandes del país después de Buenos Aires.' },

    { id: 'fc13', deck: 'Gobierno nacional', f: '¿Cuál es la ley fundamental del país?', b: 'La Constitución nacional: establece derechos y deberes de los habitantes.' },
    { id: 'fc14', deck: 'Gobierno nacional', f: 'Forma de gobierno de la Argentina', b: 'Representativa, republicana y federal.' },
    { id: 'fc15', deck: 'Gobierno nacional', f: 'Representativa / Republicana / Federal', b: 'Representativa: el pueblo elige representantes. Republicana: división de poderes. Federal: conviven el gobierno provincial y el nacional.' },
    { id: 'fc16', deck: 'Gobierno nacional', f: 'Poder Legislativo nacional', b: 'El Congreso de la Nación (Diputados + Senadores). Elabora las leyes. Sede: Congreso Nacional.' },
    { id: 'fc17', deck: 'Gobierno nacional', f: 'Poder Ejecutivo nacional', b: 'El presidente y su gabinete de ministros. Administra el país; promulga y ejecuta las leyes. Sede: Casa Rosada.' },
    { id: 'fc18', deck: 'Gobierno nacional', f: 'Poder Judicial nacional', b: 'Jueces de la Corte Suprema y tribunales inferiores. Interpretan las leyes y las hacen cumplir con sus sentencias.' },

    { id: 'fc19', deck: 'Gobierno provincial', f: '¿Qué significa que Santa Fe es autónoma?', b: 'Puede dictar sus propias leyes, siempre que no contradigan las leyes nacionales.' },
    { id: 'fc20', deck: 'Gobierno provincial', f: 'Poder Ejecutivo provincial', b: 'El gobernador: jefe de la administración pública y representante de Santa Fe ante la nación y las demás provincias. Sede: Casa Gris.' },
    { id: 'fc21', deck: 'Gobierno provincial', f: 'Poder Legislativo provincial', b: 'Cámara de Senadores + Cámara de Diputados. Elabora leyes provinciales y controla la administración pública. Sede: Legislatura provincial.' },
    { id: 'fc22', deck: 'Gobierno provincial', f: 'Poder Judicial provincial', b: 'Corte Suprema de Justicia, Cámaras de Apelación y jueces de Primera Instancia. Hace cumplir las leyes en el territorio provincial.' },
    { id: 'fc23', deck: 'Gobierno provincial', f: 'Municipios y comunas', b: 'Los municipios los administran intendentes; las comunas, presidentes comunales.' },
    { id: 'fc24', deck: 'Gobierno provincial', f: 'Constitución de Santa Fe', b: 'Sancionada el 14 de abril de 1962, basada en la Constitución nacional. Su Sección Primera: “Principios, Derechos, Garantías y Deberes”.' },

    { id: 'fc25', deck: 'Palabras nuevas', f: 'Sancionar', b: 'Autorizar o aprobar una ley o disposición.' },
    { id: 'fc26', deck: 'Palabras nuevas', f: 'Apelar', b: 'Recurso al que puede recurrir un ciudadano para que se revise una resolución judicial.' }
  ];

  /* =====================================================================
     SECCIÓN 7 · JUEGO 5 (extra creativo): CAZADOR DE PODERES
     Caen tarjetas y hay que soltarlas en el balde correcto.
     ===================================================================== */
  const POWERS = [
    { id: 'ejecutivo',   name: 'Ejecutivo',   icon: 'fa-landmark-flag', color: 'amber' },
    { id: 'legislativo', name: 'Legislativo', icon: 'fa-scroll',        color: 'indigo' },
    { id: 'judicial',    name: 'Judicial',    icon: 'fa-scale-balanced', color: 'emerald' }
  ];

  const CLASSIFY_ITEMS = [
    // Nacional
    { t: 'Congreso de la Nación',            p: 'legislativo', s: 'Nacional' },
    { t: 'Cámara de Diputados',              p: 'legislativo', s: 'Nacional' },
    { t: 'Cámara de Senadores',              p: 'legislativo', s: 'Nacional' },
    { t: 'Elabora las leyes y normas',       p: 'legislativo', s: 'Nacional' },
    { t: 'Sede: Congreso Nacional',          p: 'legislativo', s: 'Nacional' },
    { t: 'Presidente de la nación',          p: 'ejecutivo',   s: 'Nacional' },
    { t: 'Gabinete de ministros',            p: 'ejecutivo',   s: 'Nacional' },
    { t: 'Administra el país',               p: 'ejecutivo',   s: 'Nacional' },
    { t: 'Promulga y ejecuta las leyes',     p: 'ejecutivo',   s: 'Nacional' },
    { t: 'Sede: Casa Rosada',                p: 'ejecutivo',   s: 'Nacional' },
    { t: 'Corte Suprema de Justicia',        p: 'judicial',    s: 'Nacional' },
    { t: 'Tribunales inferiores',            p: 'judicial',    s: 'Nacional' },
    { t: 'Interpreta las leyes',             p: 'judicial',    s: 'Nacional' },
    { t: 'Las hace cumplir con sentencias',  p: 'judicial',    s: 'Nacional' },
    // Provincial
    { t: 'Gobernador de la provincia',       p: 'ejecutivo',   s: 'Santa Fe' },
    { t: 'Sede: Casa Gris',                  p: 'ejecutivo',   s: 'Santa Fe' },
    { t: 'Jefe de la administración pública', p: 'ejecutivo',  s: 'Santa Fe' },
    { t: 'Representa a Santa Fe ante la nación', p: 'ejecutivo', s: 'Santa Fe' },
    { t: 'Dirige y administra la provincia', p: 'ejecutivo',   s: 'Santa Fe' },
    { t: 'Sede: Legislatura provincial',     p: 'legislativo', s: 'Santa Fe' },
    { t: 'Elabora las leyes provinciales',   p: 'legislativo', s: 'Santa Fe' },
    { t: 'Controla la administración pública', p: 'legislativo', s: 'Santa Fe' },
    { t: 'Cámaras de Apelación',             p: 'judicial',    s: 'Santa Fe' },
    { t: 'Jueces de Primera Instancia',      p: 'judicial',    s: 'Santa Fe' },
    { t: 'Hace cumplir las leyes en la provincia', p: 'judicial', s: 'Santa Fe' }
  ];

  /* =====================================================================
     SECCIÓN 8 · CATÁLOGO DE JUEGOS (para el menú principal)
     ===================================================================== */
  const GAMES = [
    { id: 'trivia',   name: 'Trivia contrarreloj', icon: 'fa-brain',
      desc: '10 preguntas con reloj, racha y puntos extra.', tint: 'from-indigo-500 to-violet-600' },
    { id: 'mapa',     name: 'Mapa de Santa Fe', icon: 'fa-map-location-dot',
      desc: 'Tocá provincias y ciudades: límites, regiones y capital.', tint: 'from-sky-500 to-cyan-600' },
    { id: 'unir',     name: 'Unir con flechas', icon: 'fa-diagram-project',
      desc: 'Arrastrá cada concepto hasta su definición.', tint: 'from-emerald-500 to-teal-600' },
    { id: 'cartas',   name: 'Flashcards', icon: 'fa-clone',
      desc: 'Repaso rápido: tocá la tarjeta para darla vuelta.', tint: 'from-amber-500 to-orange-600' },
    { id: 'poderes',  name: 'Cazador de Poderes', icon: 'fa-bolt',
      desc: '¡Arcade! Clasificá cada tarjeta antes de que se acabe el tiempo.', tint: 'from-fuchsia-500 to-pink-600' },
    { id: 'resumen',  name: 'Resumen para leer', icon: 'fa-book-open',
      desc: 'La ficha con todos los datos, para repasar antes de jugar.', tint: 'from-slate-500 to-slate-700' }
  ];

  /* =====================================================================
     EXPORTACIÓN
     ===================================================================== */
  return {
    // utilidades
    shuffle, pick, sfx, vibrate, confetti, store, starsFor,
    PRAISE, ENCOURAGE, finalMessage,
    // datos
    FICHA, TRIVIA, MAP, MATCH_ROUNDS, FLASHCARDS, POWERS, CLASSIFY_ITEMS, GAMES
  };
})();
