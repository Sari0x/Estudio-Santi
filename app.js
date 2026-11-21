/* =======================================================================
   ESTUDIO SANTI · juegos de estudio

   app.js      ->  UTILIDADES (sonido con Howler.js, confeti, vibración, storage)
   sociales.js ->  MATERIA "Ciencias Sociales" (Santa Fe, de la Colonia a la Independencia)
   lengua.js   ->  MATERIA "Lengua"
   ingles.js   ->  MATERIA "Inglés"

   Todo se expone en el objeto global `window.APP` para que index.html
   (donde viven los componentes de React) lo consuma. Cada materia vive en
   `APP.SUBJECTS[id]` con sus propios datos, juegos, niveles y progreso.
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

  /* ------------------------- Sonido (Howler.js) -------------------------
     Usamos la librería Howler.js para dos cosas:
       · los efectos: un solo archivo (audio/efectos.mp3) con todos los
         sonidos uno detrás del otro ("sprite"), así se cargan de una vez;
       · la música de fondo (audio/musica.mp3), en bucle y con html5: true
         para que empiece a sonar sin esperar a que baje el archivo entero.
     Música y efectos se silencian por separado. */
  const SFX_SPRITE = {
    click: [0, 80], back: [330, 200], pick: [780, 100], correct: [1130, 700],
    wrong: [2080, 500], win: [2830, 1800], lose: [4880, 1000], flip: [6130, 250],
    tick: [6630, 80], levelup: [6960, 1900], open: [9110, 160]
  };
  const MUSIC_VOL = 0.35;

  const sfx = (function () {
    const ok = typeof window.Howl === 'function';
    let sfxMuted = false, musicMuted = false;
    let effects = null, music = null, unlocked = false;

    function getEffects() {
      if (!ok) return null;
      if (!effects) effects = new Howl({ src: ['audio/efectos.mp3'], sprite: SFX_SPRITE, volume: 0.7 });
      return effects;
    }
    /* La música arranca directo con su volumen: el archivo ya trae un
       fundido de entrada. (Antes empezaba en 0 y subía con fade(), pero
       si el archivo todavía estaba cargando Howler perdía el fade y la
       música "sonaba" en silencio.) */
    function getMusic() {
      if (!ok) return null;
      if (!music) {
        music = new Howl({
          src: ['audio/musica.mp3'], html5: true, loop: true, volume: MUSIC_VOL,
          onload: () => startMusic(),                          // terminó de cargar: si corresponde, que suene
          onplayerror: () => music.once('unlock', () => startMusic())  // el navegador la bloqueó: reintenta al próximo toque
        });
      }
      return music;
    }
    /** Suena sólo si: no está silenciada, ya hubo un toque, la app está a la
        vista y el archivo cargó. Nunca arranca dos copias a la vez. */
    function startMusic() {
      const m = getMusic();
      if (!m || musicMuted || !unlocked || document.hidden) return;
      if (m.state() !== 'loaded') return;   // cuando termine de cargar, onload la arranca
      if (!m.playing()) m.play();
    }
    function stopMusic() {
      if (music && music.playing()) music.pause();
    }

    /* Empezamos a bajar la música apenas abre la app, así ya está lista
       cuando la persona toca la pantalla. */
    getMusic();

    /* El navegador no deja reproducir audio hasta que la persona toca la
       pantalla: arrancamos la música en el primer toque. */
    function unlock() {
      if (unlocked) return;
      unlocked = true;
      getEffects();
      startMusic();
    }
    window.addEventListener('pointerdown', unlock, { capture: true });
    window.addEventListener('keydown', unlock, { capture: true });

    /* Si la app pasa a segundo plano (otra app, pantalla bloqueada), pausamos. */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopMusic(); else startMusic();
    });

    /* Sonido en cada click: cualquier botón suena solo. Un botón puede
       elegir otro sonido con data-sfx="back" (u "open"…), o ninguno con
       data-sfx="none" (por ejemplo, si ya suena "correcto"/"incorrecto"). */
    document.addEventListener('click', (e) => {
      const el = e.target && e.target.closest ? e.target.closest('button, [data-sfx]') : null;
      if (!el || el.disabled) return;
      const name = el.getAttribute('data-sfx') || 'click';
      if (name !== 'none') api.play(name);
    }, true);

    const api = {
      play(name) {
        if (sfxMuted || !SFX_SPRITE[name]) return;
        const h = getEffects();
        if (h) { try { h.play(name); } catch (e) { /* audio no disponible */ } }
      },
      setSfxMuted(v) { sfxMuted = !!v; },
      /** Baja la música mientras habla la voz en inglés o suena un audio
          del Listening (on = true), y la vuelve a subir después. */
      duck(on) {
        if (music) { try { music.volume(on ? MUSIC_VOL * 0.15 : MUSIC_VOL); } catch (e) { /* sin audio */ } }
      },
      setMusicMuted(v) {
        musicMuted = !!v;
        if (musicMuted) stopMusic(); else startMusic();
      },
      isSfxMuted() { return sfxMuted; },
      isMusicMuted() { return musicMuted; }
    };
    return api;
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

  /* ------------------------- Progreso guardado --------------------------
     Cada materia guarda su progreso por separado (su propia clave en
     localStorage). El sonido y la última materia elegida van aparte, en
     las "preferencias", y valen para toda la app. */
  const DEFAULT_STATE = {
    xp: 0,
    bestStars: {},   // { trivia: 3, tiempo: 2, ... }
    bestScore: {},   // { trivia: 1250, ... }
    played: {},      // { trivia: 4, ... }  cantidad de partidas
    knownCards: []   // ids de flashcards marcadas como "ya la sé"
  };

  /** Lectura/escritura de un objeto JSON en localStorage, con valores por defecto. */
  function makeStore(key, defaults) {
    return {
      get() {
        try {
          const raw = localStorage.getItem(key);
          return Object.assign({}, defaults, raw ? JSON.parse(raw) : {});
        } catch (e) {
          return Object.assign({}, defaults);
        }
      },
      set(patch) {
        const next = Object.assign(this.get(), patch);
        try { localStorage.setItem(key, JSON.stringify(next)); } catch (e) { /* modo privado */ }
        return next;
      },
      reset() {
        try { localStorage.removeItem(key); } catch (e) { /* ignorar */ }
        return Object.assign({}, defaults);
      }
    };
  }

  /** Progreso de una materia (se crea una sola vez por materia). */
  const stores = {};
  function storeFor(subjectId) {
    if (!stores[subjectId]) stores[subjectId] = makeStore(SUBJECTS[subjectId].storeKey, DEFAULT_STATE);
    return stores[subjectId];
  }

  /* Preferencias generales. Antes el sonido se guardaba junto con el
     progreso de Sociales: si existe, lo tomamos de ahí la primera vez. */
  const prefs = makeStore('estudioSanti.prefs.v1', (function () {
    const d = { musicMuted: false, sfxMuted: false, subject: null };
    try {
      const old = JSON.parse(localStorage.getItem('estudioSanti.pueblos.v1') || '{}');
      if (typeof old.musicMuted === 'boolean') d.musicMuted = old.musicMuted;
      if (typeof old.sfxMuted === 'boolean') d.sfxMuted = old.sfxMuted;
    } catch (e) { /* ignorar */ }
    return d;
  })());

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
    { min: 0.9, t: (expert) => '¡Sos un experto en ' + expert + '! 🏆', d: 'Dominás el tema de punta a punta.' },
    { min: 0.7, t: '¡Muy buen trabajo! 🌟', d: 'Casi todo perfecto. Repasá los datos que fallaste y sos imparable.' },
    { min: 0.5, t: '¡Vas por buen camino! 💪', d: 'Ya sabés más de la mitad. Una vuelta más y lo tenés.' },
    { min: 0,   t: '¡Buen comienzo! 🚀', d: 'Pasá por las Flashcards y volvé a jugar: vas a ver la diferencia.' }
  ];
  /** Mensaje final según el porcentaje. `expert`: de qué tema (ej. "Lengua"). */
  function finalMessage(pct, expert) {
    const m = FINAL_MSG.find((x) => pct >= x.min);
    return { t: typeof m.t === 'function' ? m.t(expert) : m.t, d: m.d };
  }


  /* ------------------------------ Niveles -------------------------------
     El XP que se gana jugando hace subir de nivel. Cada materia trae su
     propia lista de niveles (LEVELS). */
  /** Nivel actual a partir del XP y la lista de niveles: { n, name, icon, min, next } */
  function levelFor(xp, levels) {
    let k = 0;
    while (k + 1 < levels.length && xp >= levels[k + 1].min) k++;
    const cur = levels[k], nxt = levels[k + 1];
    return { n: k + 1, name: cur.name, icon: cur.icon, min: cur.min, next: nxt ? nxt.min : null };
  }

  /* =====================================================================
     MATERIAS: cada archivo (sociales.js, lengua.js, ingles.js) agrega la
     suya a este objeto, con la misma forma.
     ===================================================================== */
  const SUBJECTS = {};

  /* =====================================================================
     EXPORTACIÓN
     ===================================================================== */
  return {
    // utilidades
    shuffle, pick, sfx, vibrate, confetti, storeFor, prefs, starsFor, levelFor,
    PRAISE, ENCOURAGE, finalMessage,
    // materias (las agrega cada archivo de materia)
    SUBJECTS
  };
})();
