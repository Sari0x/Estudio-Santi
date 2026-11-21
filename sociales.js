/* =======================================================================
   ESTUDIO SANTI · MATERIA "Ciencias Sociales"
   Contenido de los resúmenes de clase "Santa Fe, de la Colonia a la
   Independencia" (hojas 1 a 9) y la hoja de repaso "Santa Fe Colonial y
   Revolución" con las fechas para saber de memoria.

   Se carga después de app.js y agrega la materia a `APP.SUBJECTS`.
   Las infografías (pirámide, plano, mapa del circuito comercial…) están
   armadas con datos: la app las dibuja y marca sus partes.
   ======================================================================= */

(function (APP) {
  'use strict';

  /* ------------------------------ Niveles ------------------------------- */
  const LEVELS = [
    { min: 0,    name: 'Aprendiz',               icon: '🌱' },
    { min: 60,   name: 'Vecino del Cabildo',     icon: '🏛️' },
    { min: 150,  name: 'Arriero de mulas',       icon: '🐴' },
    { min: 300,  name: 'Navegante del Paraná',   icon: '⛵' },
    { min: 500,  name: 'Granadero a caballo',    icon: '🐎' },
    { min: 800,  name: 'Diputado del Congreso',  icon: '📜' },
    { min: 1200, name: 'Prócer de la historia',  icon: '👑' }
  ];

  /* =====================================================================
     RESUMEN PARA LEER
     ===================================================================== */
  const FICHA = [
    { k: 'Fundación de Santa Fe',   v: 'Juan de Garay, 15 de noviembre de 1573, en el río Quiloazas (hoy San Javier)' },
    { k: '¿Quién mandaba?',         v: 'Rey de España > Virrey > Cabildo (gobierno de la ciudad)' },
    { k: 'La sociedad',             v: 'Una PIRÁMIDE desigual: españoles, criollos, mestizos, indígenas y esclavos africanos' },
    { k: 'La ciudad',               v: 'En cuadrícula, como tablero de ajedrez, con la Plaza de Armas en el centro' },
    { k: 'Economía',                v: 'Comercio, cría de mulas, cueros y vaquerías' },
    { k: '1650',                    v: 'Los barcos del Paraná tienen que parar en Santa Fe y pagar impuestos' },
    { k: '1689',                    v: 'Nace el Pago de los Arroyos (Rosario)' },
    { k: '1776',                    v: 'Se crea el Virreinato del Río de la Plata, capital Buenos Aires' },
    { k: '1810',                    v: 'Revolución de Mayo y Primera Junta. Santa Fe manda a Tarragona' },
    { k: '1813',                    v: 'Asamblea del Año XIII y Combate de San Lorenzo' },
    { k: '1815',                    v: 'Autonomía de Santa Fe (Candioti) y Congreso de los Pueblos Libres' },
    { k: '1816',                    v: 'Congreso de Tucumán: 9 de julio, Independencia' }
  ];

  const RESUMEN = [
    { t: 'Hoja 1 · Santa Fe, de la Colonia a la Independencia', p: [
      'La fundación: Juan de Garay fundó la ciudad de Santa Fe el 15 de noviembre de 1573, en las barrancas del río Quiloazas, que hoy es el río San Javier. En ese momento el territorio ya estaba habitado por poblaciones originarias.',
      'Como se inundaba mucho, casi un siglo después la ciudad se trasladó a donde está ahora, en el centro-este de la provincia. Y se le agregó "de la Vera Cruz" al nombre de Santa Fe.',
      '¿Por qué era importante Santa Fe? Por su ubicación geográfica se convirtió en un centro de comunicación entre las distintas ciudades. La cría de ganado y el comercio enriquecieron a algunas familias.',
      '¿Qué pasó en 1810? Cuando se formó en Buenos Aires la Primera Junta de Gobierno, los santafesinos reconocieron al nuevo gobierno, PERO también pensaron que había llegado el momento de que la provincia pudiera elegir a sus propias autoridades y redactar sus propias leyes.'
    ]},
    { t: 'Hoja 2 · Santa Fe durante la etapa colonial', p: [
      '¿Quién mandaba? Los reyes de España organizaron sus colonias en dos virreinatos: el de Nueva España, con capital en Ciudad de México, y el del Perú, con capital en Lima.',
      'Los virreyes eran las máximas autoridades y representaban al rey en América. Cada virreinato se dividía en partes más chiquitas llamadas gobernaciones.',
      'Hasta 1776, Santa Fe formaba parte de la Gobernación del Río de la Plata, dentro del Virreinato del Perú. El Cabildo era el organismo que se encargaba de administrar la ciudad.',
      'La sociedad colonial era DESIGUAL: las personas se diferenciaban por dónde habían nacido, su color de piel y su posición económica y jerárquica. Había grupos privilegiados y grupos no privilegiados. La sociedad santafesina, con unos 5.000 habitantes, se puede representar como una pirámide.',
      'Arriba, españoles: podían ocupar puestos en el gobierno; muchos eran comerciantes, dueños de tierras y tenían grandes viviendas en la ciudad. 2.°, criollos: hijos de padres europeos nacidos en América; algunos eran comerciantes y acumulaban fortunas, otros trabajaban en la ciudad. 3.°, mestizos: hijos de indígenas con europeos; en la ciudad eran artesanos o vendedores ambulantes y en el campo, peones. 4.°, indígenas: los pueblos originarios de la costa santafesina (chanaes, quiloazas, calchines, mocoretás) trabajaban bajo el control de los españoles. Abajo, esclavos africanos: eran comercializados en Potosí o en Córdoba; los que quedaban en las ciudades hacían tareas domésticas u otros oficios, y también había esclavos en las estancias.',
      'Un dato triste: los niños esclavos eran separados de sus padres a una edad que rondaba los 10 años, cuando comenzaban a ser explotados o vendidos.',
      '🗣️ Con tus palabras: En la colonia mandaba el rey de España, después el virrey y en la ciudad el Cabildo. La sociedad era desigual, como una pirámide: arriba los españoles, después los criollos, los mestizos, los indígenas y abajo los esclavos africanos.'
    ]},
    { t: 'Hoja 3 · Santa Fe en el circuito comercial colonial', p: [
      'Santa Fe ocupó un lugar CLAVE dentro del circuito comercial colonial que conectaba la región del Alto Perú (actual Bolivia) con el Paraguay y Buenos Aires.',
      'Ventaja del puerto sobre el río Paraná: hacia 1650 se estableció que todos los barcos mercantes que navegaban el río Paraná estaban obligados a detenerse en Santa Fe y pagar impuestos. Eso le daba mucha plata a Santa Fe, pero generó conflictos con los comerciantes del puerto de Buenos Aires, que no querían parar acá.',
      'Productos que LLEGABAN a Santa Fe: yerba mate, tabaco, textiles, productos europeos, metales, azúcar y mulas. Productos que SALÍAN: cueros, metales y productos europeos.',
      '¿Qué se hacía en Santa Fe? Se criaban mulas y se producían cueros. Las vaquerías eran excursiones de caza de ganado salvaje.',
      'Las mulas nacían en Santa Fe, se criaban en Tucumán y trabajaban en Potosí. Eran como el camión de esa época: llevaban todo a las minas de Potosí.'
    ]},
    { t: 'Hoja 4 · Santa Fe en tiempos del Virreinato', p: [
      '¿Cómo era la ciudad? En el centro estaba la Plaza de Armas, a una cuadra del río, y a su alrededor los edificios de las autoridades, como el Cabildo. Cerca de la plaza había varias iglesias y las casas de las familias más importantes.',
      'A tres cuadras de la plaza había hornos que fabricaban tejas y ladrillos, y chacras de árboles frutales y otros cultivos. También estaban los corrales, donde se faenaba a los animales. Faenar = matar y preparar animales para consumir su carne y comerciar los cueros.',
      'El plano: las leyes españolas establecían que las ciudades debían organizarse en cuadrículas, como un tablero de ajedrez. Así era Santa Fe la Vieja, alrededor de 1650.',
      '¿Qué pasó en 1776? Al crearse el Virreinato del Río de la Plata, la capital fue Buenos Aires. Cuatro años más tarde (1780), Santa Fe perdió el privilegio de su puerto, y bajaron el comercio y la población.',
      'El agua en la colonia: no había acueducto. El agua se traía desde el río con recipientes; lo hacían esclavos, indígenas o españoles pobres. La falta de agua traía problemas de higiene.',
      '¡Nace Rosario! En 1689, Luis Romero de Pineda recibió del rey un terreno entre el río Carcarañá (al norte) y el arroyo del Medio (al sur), en la costa oeste del Paraná. Esas tierras dieron origen al Pago de los Arroyos. Hacia 1700, "el Rosario" era un conjunto de casas y ranchos que conectaba Santa Fe, Córdoba y Buenos Aires.',
      '🗣️ Con tus palabras: La ciudad era en cuadrícula, con la Plaza de Armas en el centro, el Cabildo y las iglesias alrededor. No había agua corriente, la traían del río. En 1776 Buenos Aires pasó a ser capital y Santa Fe perdió su privilegio del puerto. Y Rosario nació como Pago de los Arroyos.'
    ]},
    { t: 'Hoja 5 · Una población pluriétnica', p: [
      'Santa Fe estaba formada por españoles peninsulares y americanos, mestizos, indígenas locales, del Paraguay o del Tucumán, y esclavos de origen africano. Pluriétnica = de muchos orígenes distintos.',
      'El grupo fundacional incluía a algunos guaraníes del Paraguay. Los habitantes originarios de la costa fueron organizados por medio de encomiendas.',
      'Encomienda: los indígenas eran repartidos entre españoles (los encomenderos) para que trabajaran sus tierras e hicieran otros trabajos pesados. A cambio recibían alimento y ropa, y se les imponía la religión católica. Muchos murieron por las duras condiciones de vida y las enfermedades que trajeron los españoles: tifus, viruela y fiebre amarilla.',
      'Mocovíes y abipones, que vivían en el Chaco, atacaban los poblados criollos: había períodos de guerra y de paz. La situación se estabilizó cuando los jesuitas establecieron reducciones.',
      'Reducción: ciudadela a cargo de los jesuitas donde se buscaba cambiar el modo de vida de los pueblos originarios. Tenía una iglesia con cruz, casas alrededor y una plaza en el medio.',
      'Se parecen: en las dos, los españoles controlaban a los indígenas y les imponían el catolicismo. Diferencia: en la encomienda trabajaban para un español; en la reducción vivían en un pueblo organizado por jesuitas.',
      '🗣️ Con tus palabras: En Santa Fe vivía gente de muchos orígenes. A los indígenas los ponían en encomiendas para que trabajen para un español, o en reducciones de los jesuitas para cambiarles la vida. Muchos murieron por enfermedades que trajeron los españoles.'
    ]},
    { t: 'Hoja 6 · La lucha por la Independencia', p: [
      'En mayo de 1810 llegaron noticias de que los franceses habían ocupado casi toda España y que el rey Fernando VII estaba preso. En un Cabildo Abierto, los vecinos exigieron formar la Primera Junta de Gobierno Patrio: comenzó la Revolución de Mayo.',
      'El 4 de junio de 1810 llegó a Santa Fe la circular que pedía diputados para la Junta Grande. El Cabildo de Santa Fe eligió al comerciante Francisco Tarragona.',
      'La Junta organizó campañas militares: comenzó la guerra entre los revolucionarios y los ejércitos españoles, llamados realistas. Los santafesinos ayudaron a comprar armamento para los ejércitos patriotas.',
      'La creación de la Bandera: en 1811 aumentaron los ataques españoles en las costas del Paraná y Buenos Aires mandó a Manuel Belgrano a Rosario con un ejército. Instaló una batería de artillería en las barrancas, a la que llamó Libertad, y pidió permiso para distinguir a sus soldados con una escarapela.',
      'El combate de San Lorenzo: José de San Martín llegó a Buenos Aires el 9 de marzo de 1812 y creó el Regimiento de Granaderos a Caballo para proteger la costa entre Zárate y Santa Fe. El 3 de febrero de 1813 fue el Combate de San Lorenzo, cerca del convento de San Carlos: el bautismo de fuego de los Granaderos y el único combate de San Martín en el actual territorio argentino.',
      '🗣️ Con tus palabras: En 1810, como el rey estaba preso, en Buenos Aires se formó la Primera Junta. Santa Fe aceptó y mandó a Tarragona como diputado. Belgrano fue a Rosario y creó la Bandera, y San Martín peleó en San Lorenzo en 1813.'
    ]},
    { t: 'Hoja 7 · El surgimiento de la provincia', p: [
      'El conflicto con Buenos Aires: Santa Fe reconoció a la Primera Junta, pero Buenos Aires nombró como teniente gobernador al coronel español Manuel Ruiz, sin hacer caso al pedido de que fuera un santafesino. Además pedía contribuciones para las campañas militares, y la guerra afectaba la producción y el comercio.',
      'La autonomía (1815): en abril de 1815, con el apoyo de Artigas, un Cabildo Abierto declaró la autonomía de Santa Fe y eligió a Francisco Candioti, comerciante y hacendado, como gobernador. Murió a los pocos meses, pero cada 25 de abril se celebra el Día de la Autonomía Santafesina.',
      'La frontera norte (Chaco santafesino): había una frontera entre el "territorio criollo" y el "territorio indígena", con comercio, acuerdos, robos y enfrentamientos. Desde 1810 la guerra desorganizó la defensa y aumentaron los ataques. Los gobernadores autónomos hicieron alianzas con los caciques y sumaron lanceros indígenas a las fuerzas revolucionarias.',
      '🗣️ Con tus palabras: Buenos Aires nombraba gobernadores que no eran de Santa Fe y le pedía mucha plata. Por eso en abril de 1815 Santa Fe declaró su autonomía y eligió a Candioti como gobernador. Murió al poco tiempo, pero el 25 de abril es el Día de la Autonomía.'
    ]},
    { t: 'Hoja 8 · Santa Fe enfrentada a Buenos Aires', p: [
      'Tras la muerte de Candioti llegaron tropas del Directorio de Buenos Aires. Los soldados a veces robaban o hacían disturbios, y la frontera indígena estaba amenazada: los vecinos estaban enojados. Buenos Aires pedía dinero y bienes para pelear contra Artigas y Santa Fe quedaba desprotegida.',
      'Entre 1815 y 1816 la ciudad se dividió entre los que querían seguir con Buenos Aires y los que querían aliarse con Artigas.',
      'Artigas lideraba desde 1811 en la Banda Oriental con el apoyo de campesinos, mestizos e indígenas. Sus "instrucciones" para la Asamblea de 1813: 1) independencia de España, 2) república, 3) sistema confederal (provincias autónomas) y 4) capital fuera de Buenos Aires.',
      'Buenos Aires no dejó participar a los diputados artiguistas. Las victorias de Artigas formaron la Liga de los Pueblos Libres: Banda Oriental, Entre Ríos, Corrientes, Santa Fe, Córdoba y los pueblos de las Misiones.',
      'La Asamblea del Año XIII no declaró la independencia, pero estableció la libertad de los hijos de esclavos que nacieran desde ese momento, la igualdad ante la ley y eliminó el tributo indígena.',
      '🗣️ Con tus palabras: Después de Candioti, Santa Fe se peleó más con Buenos Aires porque le pedía plata para pelear contra Artigas y la dejaba sin defensa. Santa Fe se unió a Artigas en la Liga de los Pueblos Libres, que quería independencia, república y que las provincias sean autónomas.'
    ]},
    { t: 'Hoja 9 · Los dos congresos', p: [
      'Congreso de los Pueblos Libres (de Oriente): el 29 de junio de 1815, en Villa del Arroyo de la China (hoy Concepción del Uruguay). Trataron la organización de los Pueblos Libres, el comercio y los vínculos con las comunidades indígenas. Según cartas de Artigas, allí se habría declarado la independencia de los Pueblos Libres, y él quería la paz con Buenos Aires.',
      'Congreso de Tucumán: en 1814 cayó Napoleón y Fernando VII volvió a gobernar España. Por el peligro de un ataque realista se convocó un congreso en Tucumán. Las sesiones empezaron en marzo de 1816, con diputados de Buenos Aires, Catamarca, Córdoba, Jujuy, La Rioja, Mendoza, Salta, San Juan, San Luis, Santiago del Estero, Tucumán y del Alto Perú. Las provincias de la Liga NO fueron.',
      'Se discutió la forma de gobierno: monarquía (con un rey descendiente de los incas) o república, y centralistas contra autonomistas.',
      'El 9 de julio de 1816 el Congreso declaró la independencia de España y se adoptó el nombre de Provincias Unidas en Sud-América.',
      '🗣️ Con tus palabras: Artigas hizo su propio congreso en 1815 en Concepción del Uruguay. Buenos Aires hizo el suyo en Tucumán en 1816, donde se declaró la independencia el 9 de julio, pero sin las provincias de la Liga.'
    ]}
  ];

  const TABLA = {
    title: 'Fechas que tenés que saber de memoria',
    cols: ['Fecha', '¿Qué pasó?'],
    rows: [
      ['1573', 'Juan de Garay funda Santa Fe (15 de noviembre)'],
      ['1650', 'Los barcos del Paraná deben parar en Santa Fe y pagar impuestos'],
      ['1689', 'Nace el Pago de los Arroyos (Rosario)'],
      ['1776', 'Se crea el Virreinato del Río de la Plata (capital Buenos Aires)'],
      ['1780', 'Santa Fe pierde el privilegio de su puerto'],
      ['1810', 'Revolución de Mayo y Primera Junta'],
      ['1813', 'Asamblea del Año XIII y Combate de San Lorenzo'],
      ['1815', 'Autonomía de Santa Fe (Candioti) y Congreso de los Pueblos Libres'],
      ['1816', 'Congreso de Tucumán: 9 de julio, Independencia']
    ]
  };

  /* =====================================================================
     INFOGRAFÍAS: la app las dibuja y marca sus partes
     ===================================================================== */
  const PART_INFO = {
    // ¿Quién mandaba?
    rey:         { n: 'Rey de España',  c: '#b45309', d: 'Mandaba sobre todas las colonias. Las organizó en virreinatos.' },
    virrey:      { n: 'Virrey',         c: '#7c3aed', d: 'Máxima autoridad en América: representaba al rey.' },
    gobernacion: { n: 'Gobernación',    c: '#0891b2', d: 'Parte más chiquita de un virreinato. Santa Fe estaba en la del Río de la Plata.' },
    cabildo:     { n: 'Cabildo',        c: '#dc2626', d: 'El gobierno de la ciudad: la administraba. Estaba frente a la Plaza de Armas.' },
    // Pirámide social
    espanoles:   { n: 'Españoles',          c: '#b45309', d: 'Arriba de todo. Mandaban: puestos en el gobierno, comerciantes, dueños de tierras.' },
    criollos:    { n: 'Criollos',           c: '#7c3aed', d: 'Hijos de padres europeos nacidos en América.' },
    mestizos:    { n: 'Mestizos',           c: '#0891b2', d: 'Hijos de indígenas con europeos: artesanos, vendedores ambulantes y peones.' },
    indigenas:   { n: 'Indígenas',          c: '#059669', d: 'Pueblos originarios de la costa: trabajaban bajo el control de los españoles.' },
    esclavos:    { n: 'Esclavos africanos', c: '#475569', d: 'Abajo de todo: tareas domésticas, oficios y trabajo en las estancias.' },
    // Plano de la ciudad
    plaza:       { n: 'Plaza de Armas',     c: '#16a34a', d: 'En el centro de la ciudad, a una cuadra del río.' },
    iglesia:     { n: 'Iglesias',           c: '#7c3aed', d: 'Había varias cerca de la plaza.' },
    casas:       { n: 'Casas importantes',  c: '#d97706', d: 'Las familias más importantes vivían en las manzanas alrededor de la plaza.' },
    hornos:      { n: 'Hornos',             c: '#b91c1c', d: 'A tres cuadras de la plaza: fabricaban tejas y ladrillos.' },
    chacras:     { n: 'Chacras',            c: '#65a30d', d: 'Árboles frutales y otros cultivos, a tres cuadras de la plaza.' },
    corrales:    { n: 'Corrales',           c: '#92400e', d: 'Donde se faenaban los animales (carne y cueros).' },
    rio:         { n: 'Río',                c: '#0284c7', d: 'De ahí se traía el agua en recipientes: no había agua corriente.' },
    // Circuito comercial
    potosi:      { n: 'Potosí (Alto Perú)', c: '#b45309', d: 'Las minas del Alto Perú (actual Bolivia). Allá trabajaban las mulas.' },
    tucuman:     { n: 'Tucumán',            c: '#7c3aed', d: 'Donde se criaban las mulas que nacían en Santa Fe.' },
    cordoba:     { n: 'Córdoba',            c: '#64748b', d: 'Centro de distribución: ahí se vendían esclavos.' },
    santafe:     { n: 'Santa Fe',           c: '#dc2626', d: 'Lugar CLAVE del circuito, con puerto sobre el Paraná.' },
    paraguay:    { n: 'Paraguay',           c: '#16a34a', d: 'Una punta del circuito. De ahí llegaban la yerba mate y el tabaco.' },
    buenosaires: { n: 'Buenos Aires',       c: '#0369a1', d: 'Puerto. Sus comerciantes no querían parar en Santa Fe.' },
    parana:      { n: 'Río Paraná',         c: '#0284c7', d: 'Desde 1650 los barcos tenían que parar en Santa Fe y pagar impuestos.' },
    llegaban:    { n: 'Llegaban',           c: '#059669', d: 'Yerba mate, tabaco, textiles, productos europeos, metales, azúcar y mulas.' },
    salian:      { n: 'Salían',             c: '#d97706', d: 'Cueros, metales y productos europeos.' },
    // Reducción
    r_iglesia:   { n: 'Iglesia con cruz',   c: '#7c3aed', d: 'La reducción estaba a cargo de los jesuitas, que imponían la religión católica.' },
    r_casas:     { n: 'Casas alrededor',    c: '#d97706', d: 'Donde vivían los pueblos originarios.' },
    r_plaza:     { n: 'Plaza en el medio',  c: '#16a34a', d: 'En el centro de la ciudadela.' }
  };

  /** ¿Quién mandaba? De arriba hacia abajo. */
  const MANDO = { titulo: '¿Quién mandaba en la colonia?', niveles: [
    { t: 'rey',         e: '👑', d: 'Desde España. Organizó sus colonias en dos virreinatos: Nueva España (capital México) y Perú (capital Lima).' },
    { t: 'virrey',      e: '🎩', d: 'La máxima autoridad en América. Representaba al rey.' },
    { t: 'gobernacion', e: '🗺️', d: 'Cada virreinato se dividía en partes más chiquitas. Hasta 1776, Santa Fe estaba en la del Río de la Plata, dentro del Virreinato del Perú.' },
    { t: 'cabildo',     e: '🏛️', d: 'Se encargaba de administrar la ciudad.' }
  ]};

  /** Pirámide social, de arriba hacia abajo. */
  const PIRAMIDE = { titulo: 'La sociedad santafesina: una pirámide desigual', niveles: [
    { t: 'espanoles', e: '💰🏠', d: 'Gobierno, comercio y tierras' },
    { t: 'criollos',  e: '🏪',   d: 'Hijos de europeos nacidos en América' },
    { t: 'mestizos',  e: '🛠️🌾', d: 'Artesanos, vendedores y peones' },
    { t: 'indigenas', e: '🛶',   d: 'Trabajaban para los españoles' },
    { t: 'esclavos',  e: '⛓️',   d: 'Tareas domésticas y estancias' }
  ]};

  /** Plano de Santa Fe la Vieja (cuadrícula 5 × 5; el río a la derecha). */
  const PLANO = { titulo: 'Santa Fe la Vieja, alrededor de 1650', filas: [
    ['chacras', 'corrales', null,      null,      null],
    [null,      null,       'casas',   'cabildo', 'casas'],
    ['hornos',  null,       'iglesia', 'plaza',   'casas'],
    [null,      null,       'casas',   'iglesia', 'casas'],
    ['chacras', 'chacras',  null,      null,      null]
  ]};
  const PLANO_EMOJI = { chacras: '🍊', corrales: '🐄', casas: '🏠', cabildo: '🏛️', iglesia: '⛪', plaza: '🌳', hornos: '🧱' };

  /** Mapa del circuito comercial (posiciones en % del mapa). */
  const CIRCUITO = { titulo: 'Santa Fe en el circuito comercial colonial',
    nodos: [
      { t: 'potosi',      e: '⛏️', x: 17, y: 9 },
      { t: 'paraguay',    e: '🧉', x: 80, y: 11 },
      { t: 'tucuman',     e: '🐴', x: 14, y: 39 },
      { t: 'cordoba',     e: '🏙️', x: 26, y: 66 },
      { t: 'santafe',     e: '⭐', x: 58, y: 56 },
      { t: 'buenosaires', e: '⚓', x: 80, y: 89 }
    ],
    llegan: ['🧉 Yerba mate', '🍂 Tabaco', '🧵 Textiles', '📦 Productos europeos', '🪙 Metales', '🍬 Azúcar', '🐴 Mulas'],
    salen:  ['🐄 Cueros', '🪙 Metales', '📦 Productos europeos']
  };

  /** Reducción jesuítica. */
  const REDUCCION = { titulo: 'Una reducción de los jesuitas' };

  /* =====================================================================
     TRIVIA
     ===================================================================== */
  const TRIVIA = [
    // --- Fundación ---
    { t: 'La fundación', q: '¿Quién fundó la ciudad de Santa Fe?',
      ok: 'Juan de Garay', bad: ['Manuel Belgrano', 'Francisco Candioti', 'Luis Romero de Pineda'],
      why: 'Juan de Garay fundó Santa Fe el 15 de noviembre de 1573.' },
    { t: 'La fundación', q: '¿Cuándo se fundó Santa Fe?',
      ok: '15 de noviembre de 1573', bad: ['9 de julio de 1816', '25 de mayo de 1810', '25 de abril de 1815'],
      why: 'Juan de Garay fundó Santa Fe el 15 de noviembre de 1573.' },
    { t: 'La fundación', q: '¿Junto a qué río se fundó Santa Fe?',
      ok: 'El río Quiloazas (hoy San Javier)', bad: ['El río Carcarañá', 'El arroyo del Medio', 'El Río de la Plata'],
      why: 'Se fundó en las barrancas del río Quiloazas, que hoy es el río San Javier.' },
    { t: 'La fundación', q: '¿Por qué se trasladó la ciudad casi un siglo después?',
      ok: 'Porque se inundaba mucho', bad: ['Porque la atacaron los franceses', 'Porque Buenos Aires lo ordenó en 1776', 'Porque se quedó sin mulas'],
      why: 'Como se inundaba mucho, se trasladó a donde está ahora, en el centro-este de la provincia.' },
    { t: 'La fundación', q: 'Cuando se trasladó, ¿qué se le agregó al nombre de Santa Fe?',
      ok: '"de la Vera Cruz"', bad: ['"de los Arroyos"', '"del Río de la Plata"', '"de la Independencia"'],
      why: 'Se le agregó "de la Vera Cruz": Santa Fe de la Vera Cruz.' },
    { t: 'La fundación', q: '¿Por qué era importante Santa Fe?',
      ok: 'Por su ubicación: era un centro de comunicación entre ciudades', bad: ['Porque era la capital del virreinato', 'Porque tenía minas de plata', 'Porque ahí vivía el rey'],
      why: 'Por su ubicación geográfica se convirtió en un centro de comunicación entre las distintas ciudades.' },

    // --- Quién mandaba ---
    { t: '¿Quién mandaba?', q: '¿Cuál era el orden de quién mandaba en la colonia?',
      ok: 'Rey de España > Virrey > Cabildo', bad: ['Virrey > Rey de España > Cabildo', 'Cabildo > Virrey > Rey de España', 'Primera Junta > Rey > Virrey'],
      why: 'Rey de España > Virrey > Cabildo (gobierno de la ciudad).' },
    { t: '¿Quién mandaba?', q: '¿Quiénes eran las máximas autoridades en América y representaban al rey?',
      ok: 'Los virreyes', bad: ['Los cabildos', 'Los encomenderos', 'Los jesuitas'],
      why: 'Los virreyes eran las máximas autoridades y representaban al rey en América.' },
    { t: '¿Quién mandaba?', q: '¿Qué hacía el Cabildo?',
      ok: 'Administraba la ciudad', bad: ['Gobernaba todo el virreinato', 'Fabricaba tejas y ladrillos', 'Dirigía las reducciones'],
      why: 'El Cabildo era el organismo que se encargaba de administrar la ciudad.' },
    { t: '¿Quién mandaba?', q: 'Los dos virreinatos del principio eran…',
      ok: 'Nueva España (capital México) y Perú (capital Lima)', bad: ['Río de la Plata y Paraguay', 'Santa Fe y Buenos Aires', 'Perú y Río de la Plata'],
      why: 'El rey organizó sus colonias en dos virreinatos: Nueva España (Ciudad de México) y Perú (Lima).' },
    { t: '¿Quién mandaba?', q: 'Las partes más chiquitas de un virreinato se llamaban…',
      ok: 'Gobernaciones', bad: ['Cabildos', 'Reducciones', 'Encomiendas'],
      why: 'Cada virreinato se dividía en partes más chiquitas llamadas gobernaciones.' },
    { t: '¿Quién mandaba?', q: 'Hasta 1776, Santa Fe era parte del Virreinato…',
      ok: 'del Perú', bad: ['del Río de la Plata', 'de Nueva España', 'del Paraguay'],
      why: 'Hasta 1776, Santa Fe formaba parte de la Gobernación del Río de la Plata, dentro del Virreinato del Perú.' },

    // --- Sociedad ---
    { t: 'La sociedad', q: '¿Cómo era la sociedad colonial?',
      ok: 'Desigual, como una pirámide', bad: ['Todos eran iguales', 'Mandaban los esclavos', 'No había grupos distintos'],
      why: 'Era DESIGUAL: había grupos privilegiados y no privilegiados, como una pirámide.' },
    { t: 'La sociedad', q: '¿En qué se diferenciaban las personas en la sociedad colonial?',
      ok: 'Dónde nacieron, color de piel y posición económica', bad: ['Solo en la ropa que usaban', 'En el equipo de fútbol', 'En nada, eran iguales'],
      why: 'Se diferenciaban por dónde habían nacido, su color de piel y su posición económica y jerárquica.' },
    { t: 'La sociedad', q: '¿Quiénes estaban ARRIBA de la pirámide?',
      ok: 'Los españoles', bad: ['Los criollos', 'Los mestizos', 'Los esclavos africanos'],
      why: 'Arriba, los españoles: podían ocupar puestos en el gobierno, eran comerciantes y dueños de tierras.' },
    { t: 'La sociedad', q: '¿Quiénes estaban ABAJO de la pirámide?',
      ok: 'Los esclavos africanos', bad: ['Los indígenas', 'Los mestizos', 'Los criollos'],
      why: 'Abajo de todo estaban los esclavos africanos.' },
    { t: 'La sociedad', q: '¿Quiénes eran los criollos?',
      ok: 'Hijos de padres europeos nacidos en América', bad: ['Hijos de indígenas con europeos', 'Los que venían de España', 'Los pueblos originarios'],
      why: 'Criollos: hijos de padres europeos nacidos en América.' },
    { t: 'La sociedad', q: '¿Quiénes eran los mestizos?',
      ok: 'Hijos de indígenas con europeos', bad: ['Hijos de europeos nacidos en América', 'Los esclavos africanos', 'Los jesuitas'],
      why: 'Mestizos: hijos de indígenas con europeos. Artesanos, vendedores ambulantes o peones.' },
    { t: 'La sociedad', q: '¿Cuántos habitantes tenía la sociedad santafesina?',
      ok: 'Unos 5.000', bad: ['Unos 500', 'Unos 50.000', 'Un millón'],
      why: 'La sociedad santafesina tenía unos 5.000 habitantes.' },
    { t: 'La sociedad', q: '¿Dónde se comercializaban los esclavos?',
      ok: 'En Potosí o en Córdoba', bad: ['En Santa Fe y Rosario', 'En Lima y México', 'En Paraguay'],
      why: 'Eran comercializados en Potosí o en Córdoba, que era el centro de distribución.' },
    { t: 'La sociedad', q: '¿Qué quiere decir "pluriétnica"?',
      ok: 'De muchos orígenes distintos', bad: ['De un solo origen', 'Que vive en el río', 'Que habla dos idiomas'],
      why: 'Pluriétnica = de muchos orígenes distintos.' },

    // --- Economía ---
    { t: 'Economía', q: '¿Qué conectaba el circuito comercial colonial?',
      ok: 'El Alto Perú, el Paraguay y Buenos Aires', bad: ['España y Francia', 'Lima y México', 'Rosario y Córdoba solamente'],
      why: 'Conectaba el Alto Perú (actual Bolivia) con el Paraguay y Buenos Aires. Santa Fe estaba en el medio.' },
    { t: 'Economía', q: '¿Qué país es hoy el Alto Perú?',
      ok: 'Bolivia', bad: ['Paraguay', 'Uruguay', 'Chile'],
      why: 'El Alto Perú es la actual Bolivia.' },
    { t: 'Economía', q: '¿Qué pasó desde 1650 con los barcos del Paraná?',
      ok: 'Tenían que parar en Santa Fe y pagar impuestos', bad: ['No podían navegar más', 'Tenían que ir a Lima', 'Llevaban mulas a España'],
      why: 'Hacia 1650, todos los barcos del Paraná estaban obligados a detenerse en Santa Fe y pagar impuestos.' },
    { t: 'Economía', q: '¿Por qué los comerciantes de Buenos Aires estaban enojados con Santa Fe?',
      ok: 'Porque no querían parar en Santa Fe a pagar impuestos', bad: ['Porque Santa Fe no tenía mulas', 'Porque Santa Fe era la capital', 'Porque no había río'],
      why: 'La obligación de parar generó conflictos con los comerciantes de Buenos Aires, que no querían parar acá.' },
    { t: 'Economía', q: '¿Qué se hacía en Santa Fe?',
      ok: 'Se criaban mulas y se producían cueros', bad: ['Se sacaba plata de las minas', 'Se fabricaban barcos', 'Se cultivaba yerba mate'],
      why: 'En Santa Fe se criaban mulas y se producían cueros.' },
    { t: 'Economía', q: '¿Qué eran las vaquerías?',
      ok: 'Excursiones de caza de ganado salvaje', bad: ['Fábricas de queso', 'Barcos con vacas', 'Casas de los españoles'],
      why: 'Las vaquerías eran excursiones de caza de ganado salvaje.' },
    { t: 'Economía', q: 'Las mulas nacían en Santa Fe, se criaban en… y trabajaban en…',
      ok: 'Tucumán / Potosí', bad: ['Córdoba / Paraguay', 'Potosí / Tucumán', 'Buenos Aires / Lima'],
      why: 'Nacían en Santa Fe, se criaban en Tucumán y trabajaban en Potosí, llevando todo a las minas.' },
    { t: 'Economía', q: 'Las mulas eran como… de esa época.',
      ok: 'el camión', bad: ['el avión', 'el celular', 'la bicicleta'],
      why: 'Eran como el camión de esa época: llevaban todo a las minas de Potosí.' },
    { t: 'Economía', q: '¿Cuál de estos productos SALÍA de Santa Fe?',
      ok: 'Cueros', bad: ['Yerba mate', 'Tabaco', 'Azúcar'],
      why: 'Salían cueros, metales y productos europeos.' },
    { t: 'Economía', q: '¿Cuál de estos productos LLEGABA a Santa Fe?',
      ok: 'Yerba mate', bad: ['Cueros', 'Ladrillos', 'Barcos'],
      why: 'Llegaban yerba mate, tabaco, textiles, productos europeos, metales, azúcar y mulas.' },

    // --- La ciudad ---
    { t: 'La ciudad', q: '¿Cómo estaba organizada la ciudad?',
      ok: 'En cuadrícula, como un tablero de ajedrez', bad: ['En círculos', 'Sin ningún orden', 'En una sola calle larga'],
      why: 'Las leyes españolas decían que las ciudades debían organizarse en cuadrículas, como un tablero de ajedrez.' },
    { t: 'La ciudad', q: '¿Qué había en el centro de la ciudad?',
      ok: 'La Plaza de Armas', bad: ['Los hornos', 'Los corrales', 'Las chacras'],
      why: 'En el centro estaba la Plaza de Armas, a una cuadra del río, con el Cabildo alrededor.' },
    { t: 'La ciudad', q: '¿Qué había a tres cuadras de la plaza?',
      ok: 'Hornos de tejas y ladrillos y chacras', bad: ['El Cabildo', 'Las casas más importantes', 'El puerto de Buenos Aires'],
      why: 'A tres cuadras había hornos que fabricaban tejas y ladrillos, y chacras de árboles frutales.' },
    { t: 'La ciudad', q: '¿Qué significa "faenar"?',
      ok: 'Matar y preparar animales para su carne y los cueros', bad: ['Cazar ganado salvaje', 'Fabricar ladrillos', 'Navegar el río'],
      why: 'Faenar = matar y preparar animales para consumir su carne y comerciar los cueros.' },
    { t: 'La ciudad', q: '¿Cómo llegaba el agua a las casas?',
      ok: 'La traían del río en recipientes', bad: ['Por un acueducto', 'Por caños de agua corriente', 'En camiones'],
      why: 'No había acueducto: el agua se traía del río con recipientes. Lo hacían esclavos, indígenas o españoles pobres.' },
    { t: 'La ciudad', q: '¿Qué pasó en 1776?',
      ok: 'Se creó el Virreinato del Río de la Plata, capital Buenos Aires', bad: ['Se fundó Santa Fe', 'Se declaró la independencia', 'Nació Rosario'],
      why: 'En 1776 se creó el Virreinato del Río de la Plata con capital en Buenos Aires.' },
    { t: 'La ciudad', q: '¿Qué perdió Santa Fe en 1780?',
      ok: 'El privilegio de su puerto', bad: ['Su Cabildo', 'Su nombre', 'Sus iglesias'],
      why: 'Cuatro años después de 1776, Santa Fe perdió el privilegio de su puerto, y bajaron el comercio y la población.' },

    // --- Rosario ---
    { t: 'Nace Rosario', q: '¿Quién recibió en 1689 las tierras que dieron origen a Rosario?',
      ok: 'Luis Romero de Pineda', bad: ['Juan de Garay', 'Francisco Tarragona', 'José de San Martín'],
      why: 'En 1689, Luis Romero de Pineda recibió del rey un terreno en la costa oeste del Paraná.' },
    { t: 'Nace Rosario', q: '¿Entre qué límites estaban esas tierras?',
      ok: 'El río Carcarañá y el arroyo del Medio', bad: ['El río San Javier y el Quiloazas', 'Potosí y Tucumán', 'Santa Fe y Paraguay'],
      why: 'Tenía como límites el río Carcarañá al norte y el arroyo del Medio al sur.' },
    { t: 'Nace Rosario', q: '¿Cómo se llamó al principio la zona que dio origen a Rosario?',
      ok: 'Pago de los Arroyos', bad: ['Santa Fe la Vieja', 'Villa del Arroyo de la China', 'Banda Oriental'],
      why: 'Esas tierras dieron origen al Pago de los Arroyos, que con el tiempo sería Rosario.' },
    { t: 'Nace Rosario', q: 'Hacia 1700, "el Rosario" era…',
      ok: 'Un conjunto de casas y ranchos que conectaba Santa Fe, Córdoba y Buenos Aires', bad: ['La capital del virreinato', 'Una gran ciudad con puerto', 'Una reducción de jesuitas'],
      why: 'Hacia 1700, "el Rosario" era un conjunto de casas y ranchos que conectaba Santa Fe, Córdoba y Buenos Aires.' },

    // --- Pueblos originarios ---
    { t: 'Pueblos originarios', q: '¿Qué era la encomienda?',
      ok: 'Indígenas repartidos para trabajar para un español', bad: ['Una ciudadela de los jesuitas', 'Un barco de mercancías', 'Un tipo de impuesto del puerto'],
      why: 'Los indígenas eran repartidos entre españoles (encomenderos) para trabajar sus tierras. A cambio recibían alimento y ropa.' },
    { t: 'Pueblos originarios', q: '¿Qué recibían los indígenas a cambio en la encomienda?',
      ok: 'Alimento y ropa', bad: ['Tierras propias', 'Mucha plata', 'Nada de nada'],
      why: 'A cambio recibían alimento y ropa, y se les imponía la religión católica.' },
    { t: 'Pueblos originarios', q: '¿Qué enfermedades trajeron los españoles?',
      ok: 'Tifus, viruela y fiebre amarilla', bad: ['Gripe y resfrío', 'Sarampión y varicela', 'Ninguna'],
      why: 'Muchos indígenas murieron por tifus, viruela y fiebre amarilla.' },
    { t: 'Pueblos originarios', q: '¿Qué era una reducción?',
      ok: 'Una ciudadela de los jesuitas para cambiar el modo de vida de los indígenas', bad: ['Un reparto de indígenas entre españoles', 'Un tipo de barco', 'El gobierno de la ciudad'],
      why: 'En las reducciones, a cargo de los jesuitas, se buscaba modificar el modo de vida de los pueblos originarios.' },
    { t: 'Pueblos originarios', q: '¿Cómo era una reducción?',
      ok: 'Una iglesia con cruz, casas alrededor y una plaza en el medio', bad: ['Un fuerte con cañones', 'Un puerto con barcos', 'Un campo sin casas'],
      why: 'Una iglesia con cruz, casas alrededor y una plaza en el medio.' },
    { t: 'Pueblos originarios', q: '¿En qué se parecían la encomienda y la reducción?',
      ok: 'En las dos los españoles controlaban a los indígenas y les imponían el catolicismo', bad: ['En las dos los indígenas eran libres', 'En las dos mandaban los jesuitas', 'En las dos trabajaban para un encomendero'],
      why: 'Similitud: en las dos los españoles controlaban a los indígenas y les imponían el catolicismo.' },
    { t: 'Pueblos originarios', q: '¿Qué pueblos del Chaco atacaban los poblados criollos?',
      ok: 'Mocovíes y abipones', bad: ['Chanaes y quiloazas', 'Calchines y mocoretás', 'Guaraníes del Paraguay'],
      why: 'Los mocovíes y abipones del Chaco atacaban periódicamente los poblados criollos.' },

    // --- Revolución ---
    { t: 'Revolución', q: '¿Por qué se formó la Primera Junta en mayo de 1810?',
      ok: 'Porque el rey Fernando VII estaba preso por los franceses', bad: ['Porque Santa Fe declaró su autonomía', 'Porque se creó el virreinato', 'Porque ganó San Martín en San Lorenzo'],
      why: 'Llegaron noticias de que los franceses ocupaban España y el rey Fernando VII estaba preso.' },
    { t: 'Revolución', q: '¿A quién mandó Santa Fe como diputado a la Junta Grande?',
      ok: 'Al comerciante Francisco Tarragona', bad: ['A Francisco Candioti', 'A Manuel Ruiz', 'A Juan de Garay'],
      why: 'El Cabildo de Santa Fe eligió como diputado al comerciante Francisco Tarragona.' },
    { t: 'Revolución', q: '¿Cuándo llegó a Santa Fe la circular que pedía diputados?',
      ok: 'El 4 de junio de 1810', bad: ['El 9 de julio de 1816', 'El 3 de febrero de 1813', 'El 25 de abril de 1815'],
      why: 'El 4 de junio de 1810 llegó a Santa Fe la circular.' },
    { t: 'Revolución', q: '¿Cómo se llamaba a los ejércitos españoles?',
      ok: 'Realistas', bad: ['Patriotas', 'Granaderos', 'Artiguistas'],
      why: 'La guerra fue entre los revolucionarios y los ejércitos españoles, llamados realistas.' },
    { t: 'Revolución', q: '¿Cómo llamó Belgrano a la batería de artillería en las barrancas del Paraná?',
      ok: 'Libertad', bad: ['Independencia', 'San Lorenzo', 'Patria'],
      why: 'Belgrano instaló una batería en las barrancas del Paraná, a la que llamó Libertad.' },
    { t: 'Revolución', q: '¿Qué creó Belgrano en Rosario?',
      ok: 'La Bandera', bad: ['El Cabildo', 'Los Granaderos a Caballo', 'La Liga de los Pueblos Libres'],
      why: 'Belgrano fue a Rosario y creó la Bandera (antes pidió una escarapela para sus soldados).' },
    { t: 'Revolución', q: '¿Qué regimiento creó San Martín?',
      ok: 'Granaderos a Caballo', bad: ['Patricios', 'Realistas', 'Lanceros indígenas'],
      why: 'Le encargaron crear el Regimiento de Granaderos a Caballo para proteger la costa entre Zárate y Santa Fe.' },
    { t: 'Revolución', q: '¿Cuándo fue el Combate de San Lorenzo?',
      ok: '3 de febrero de 1813', bad: ['9 de julio de 1816', '25 de mayo de 1810', '9 de marzo de 1812'],
      why: 'El Combate de San Lorenzo fue el 3 de febrero de 1813.' },
    { t: 'Revolución', q: '¿Qué tiene de especial el Combate de San Lorenzo?',
      ok: 'Fue el único combate de San Martín en el actual territorio argentino', bad: ['Ahí se declaró la independencia', 'Ahí se creó la Bandera', 'Lo ganó Artigas'],
      why: 'Fue el bautismo de fuego de los Granaderos y el único combate de San Martín en el actual territorio argentino.' },

    // --- Autonomía y Liga ---
    { t: 'Autonomía', q: '¿Por qué se peleó Santa Fe con Buenos Aires?',
      ok: 'Le nombraba gobernadores de afuera y le pedía mucha plata', bad: ['Porque Buenos Aires no tenía puerto', 'Porque Santa Fe quería volver con el rey', 'Porque le robaba las mulas'],
      why: 'Buenos Aires nombraba gobernadores que no eran santafesinos (ej: Manuel Ruiz), pedía plata, bienes y ganado y la dejaba sin defensa.' },
    { t: 'Autonomía', q: '¿A quién nombró Buenos Aires como teniente gobernador de Santa Fe?',
      ok: 'Al coronel español Manuel Ruiz', bad: ['A Francisco Candioti', 'A José Gervasio de Artigas', 'A Francisco Tarragona'],
      why: 'Buenos Aires designó al coronel español Manuel Ruiz, sin hacer caso al pedido de que fuera un santafesino.' },
    { t: 'Autonomía', q: '¿Cuándo declaró Santa Fe su autonomía?',
      ok: 'En abril de 1815', bad: ['En mayo de 1810', 'En julio de 1816', 'En 1776'],
      why: 'En abril de 1815, un Cabildo Abierto declaró la autonomía de Santa Fe.' },
    { t: 'Autonomía', q: '¿Quién fue el primer gobernador autónomo de Santa Fe?',
      ok: 'Francisco Candioti', bad: ['Manuel Ruiz', 'Manuel Belgrano', 'Luis Romero de Pineda'],
      why: 'Eligieron a Francisco Candioti, comerciante y hacendado, como gobernador.' },
    { t: 'Autonomía', q: '¿Qué se celebra el 25 de abril?',
      ok: 'El Día de la Autonomía Santafesina', bad: ['La fundación de Santa Fe', 'La Independencia', 'El Combate de San Lorenzo'],
      why: 'Cada 25 de abril se celebra el Día de la Autonomía Santafesina, en recuerdo de la asunción de Candioti.' },
    { t: 'Autonomía', q: '¿Quién apoyó a Santa Fe para declarar su autonomía?',
      ok: 'Artigas, el líder oriental', bad: ['El virrey', 'El rey Fernando VII', 'Napoleón'],
      why: 'La autonomía se declaró con el apoyo de José Gervasio de Artigas, el líder oriental.' },
    { t: 'Liga de los Pueblos Libres', q: '¿Dónde lideraba Artigas desde 1811?',
      ok: 'En la Banda Oriental', bad: ['En Tucumán', 'En el Alto Perú', 'En Santa Fe'],
      why: 'Artigas lideraba desde 1811 en la Banda Oriental, con campesinos, mestizos e indígenas.' },
    { t: 'Liga de los Pueblos Libres', q: '¿Cuál de estas era una "instrucción" de Artigas?',
      ok: 'Que la capital estuviera fuera de Buenos Aires', bad: ['Volver a obedecer al rey', 'Que mande un virrey', 'Que Buenos Aires elija a los gobernadores'],
      why: 'Instrucciones: independencia de España, república, sistema confederal y capital fuera de Buenos Aires.' },
    { t: 'Liga de los Pueblos Libres', q: '¿Qué es un sistema confederal?',
      ok: 'Que las provincias sean autónomas', bad: ['Que mande un rey', 'Que todo lo decida Buenos Aires', 'Que no haya provincias'],
      why: 'Un sistema confederal quiere decir que las provincias debían ser autónomas.' },
    { t: 'Liga de los Pueblos Libres', q: '¿Qué provincias formaban la Liga de los Pueblos Libres?',
      ok: 'Banda Oriental, Entre Ríos, Corrientes, Santa Fe, Córdoba y Misiones', bad: ['Buenos Aires, Salta y Jujuy', 'Tucumán, Catamarca y La Rioja', 'Mendoza, San Juan y San Luis'],
      why: 'La Liga: Banda Oriental, Entre Ríos, Corrientes, Santa Fe, Córdoba y los pueblos de las Misiones.' },
    { t: 'Asamblea del Año XIII', q: '¿Declaró la independencia la Asamblea de 1813?',
      ok: 'No, pero tomó medidas importantes', bad: ['Sí, el 9 de julio', 'Sí, en Concepción del Uruguay', 'No, y no hizo nada'],
      why: 'No declaró la independencia, pero tomó medidas importantes.' },
    { t: 'Asamblea del Año XIII', q: '¿Cuál fue una medida de la Asamblea del Año XIII?',
      ok: 'Libertad de los hijos de esclavos que nacieran desde ese momento', bad: ['Declarar la independencia', 'Crear el Virreinato', 'Elegir a Candioti'],
      why: 'Libertad de vientres (hijos de esclavos), igualdad ante la ley y eliminó el tributo indígena.' },
    { t: 'Asamblea del Año XIII', q: '¿Qué pasó con los diputados de Artigas en la Asamblea de 1813?',
      ok: 'Buenos Aires no los dejó participar', bad: ['La presidieron', 'Declararon la independencia', 'No quisieron ir'],
      why: 'Se prohibió participar a los diputados artiguistas y se rompió la relación entre Artigas y Buenos Aires.' },

    // --- Los dos congresos ---
    { t: 'Los dos congresos', q: '¿Dónde se reunió el Congreso de los Pueblos Libres?',
      ok: 'En Concepción del Uruguay (Arroyo de la China)', bad: ['En Tucumán', 'En Santa Fe', 'En Buenos Aires'],
      why: 'Se reunió en Villa del Arroyo de la China, hoy Concepción del Uruguay.' },
    { t: 'Los dos congresos', q: '¿Cuándo fue el Congreso de los Pueblos Libres?',
      ok: '29 de junio de 1815', bad: ['9 de julio de 1816', '25 de mayo de 1810', '3 de febrero de 1813'],
      why: 'El Congreso de los Pueblos Libres fue el 29 de junio de 1815.' },
    { t: 'Los dos congresos', q: '¿Por qué se convocó el Congreso de Tucumán?',
      ok: 'Porque Fernando VII volvió a gobernar y había peligro de un ataque realista', bad: ['Porque Santa Fe lo pidió', 'Porque Artigas lo organizó', 'Para fundar una ciudad'],
      why: 'En 1814 cayó Napoleón y Fernando VII volvió a gobernar España: había peligro de una ofensiva realista.' },
    { t: 'Los dos congresos', q: '¿Fueron las provincias de la Liga al Congreso de Tucumán?',
      ok: 'No, no respondieron a la convocatoria', bad: ['Sí, todas', 'Sí, solo Santa Fe', 'Lo presidieron'],
      why: 'Las provincias que formaban la Liga de los Pueblos Libres no respondieron a la convocatoria.' },
    { t: 'Los dos congresos', q: '¿Qué se declaró el 9 de julio de 1816?',
      ok: 'La independencia de España', bad: ['La autonomía de Santa Fe', 'La Revolución de Mayo', 'La creación del Virreinato'],
      why: 'El 9 de julio de 1816 el Congreso declaró la independencia de España.' },
    { t: 'Los dos congresos', q: '¿Qué nombre se adoptó en 1816?',
      ok: 'Provincias Unidas en Sud-América', bad: ['Liga de los Pueblos Libres', 'Virreinato del Río de la Plata', 'Banda Oriental'],
      why: 'Se adoptó el nombre de Provincias Unidas en Sud-América.' },
    { t: 'Los dos congresos', q: '¿Qué se discutió en el Congreso de Tucumán sobre la forma de gobierno?',
      ok: 'Monarquía (con un rey inca) o república', bad: ['Si volver con España', 'Si mudar la capital a Santa Fe', 'Si crear un virreinato'],
      why: 'Unos proponían una monarquía con un rey descendiente de los incas y otros, la república. También había centralistas y autonomistas.' }
  ];

  /* =====================================================================
     LÍNEA DE TIEMPO
     ===================================================================== */
  const TIMELINE_ROUNDS = [
    { title: 'Fechas que tenés que saber de memoria', events: [
      { y: '1573', t: 'Juan de Garay funda Santa Fe' },
      { y: '1650', t: 'Los barcos del Paraná deben parar en Santa Fe' },
      { y: '1689', t: 'Nace el Pago de los Arroyos (Rosario)' },
      { y: '1776', t: 'Se crea el Virreinato del Río de la Plata' },
      { y: '1810', t: 'Revolución de Mayo y Primera Junta' },
      { y: '1813', t: 'Asamblea del Año XIII y Combate de San Lorenzo' },
      { y: '1815', t: 'Autonomía de Santa Fe y Congreso de los Pueblos Libres' },
      { y: '1816', t: 'Congreso de Tucumán: Independencia' }
    ]},
    { title: 'Santa Fe colonial', events: [
      { y: '1573',  t: 'Garay funda Santa Fe junto al río Quiloazas' },
      { y: 'Casi un siglo después', t: 'La ciudad se traslada porque se inundaba mucho' },
      { y: '1650',  t: 'Los barcos del Paraná deben parar en Santa Fe y pagar impuestos' },
      { y: '1689',  t: 'Luis Romero de Pineda recibe las tierras del Pago de los Arroyos' },
      { y: '1700',  t: '"El Rosario" es un conjunto de casas y ranchos' },
      { y: '1776',  t: 'Buenos Aires pasa a ser capital del nuevo virreinato' },
      { y: '1780',  t: 'Santa Fe pierde el privilegio de su puerto' }
    ]},
    { title: 'La revolución', events: [
      { y: 'Mayo 1810',      t: 'El rey está preso: en Buenos Aires se forma la Primera Junta' },
      { y: '4 de junio 1810', t: 'Llega la circular y Santa Fe manda a Tarragona como diputado' },
      { y: '1811',           t: 'Belgrano va a Rosario: batería Libertad, escarapela y Bandera' },
      { y: '9 de marzo 1812', t: 'San Martín llega a Buenos Aires y crea los Granaderos' },
      { y: '3 de febrero 1813', t: 'Combate de San Lorenzo' }
    ]},
    { title: 'Autonomía e independencia', events: [
      { y: '1811',           t: 'Artigas empieza a liderar la revolución en la Banda Oriental' },
      { y: '1813',           t: 'Asamblea del Año XIII: no deja participar a los artiguistas' },
      { y: 'Abril 1815',     t: 'Santa Fe declara su autonomía y elige a Candioti' },
      { y: '29 de junio 1815', t: 'Congreso de los Pueblos Libres en Concepción del Uruguay' },
      { y: 'Marzo 1816',     t: 'Empiezan las sesiones del Congreso de Tucumán' },
      { y: '9 de julio 1816', t: 'Se declara la Independencia de España' }
    ]}
  ];

  /* =====================================================================
     UNIR CON FLECHAS
     ===================================================================== */
  const MATCH_ROUNDS = [
    { title: '¿Quién mandaba?', pairs: [
      { id: 'q1', a: 'Rey de España', b: 'Organizó sus colonias en virreinatos' },
      { id: 'q2', a: 'Virrey', b: 'Máxima autoridad en América, representaba al rey' },
      { id: 'q3', a: 'Gobernación', b: 'Parte más chiquita de un virreinato' },
      { id: 'q4', a: 'Cabildo', b: 'Administraba la ciudad' }
    ]},
    { title: 'La pirámide social', pairs: [
      { id: 's1', a: 'Españoles', b: 'Arriba: gobierno, comercio y tierras' },
      { id: 's2', a: 'Criollos', b: 'Hijos de europeos nacidos en América' },
      { id: 's3', a: 'Mestizos', b: 'Hijos de indígenas con europeos' },
      { id: 's4', a: 'Indígenas', b: 'Trabajaban bajo el control de los españoles' },
      { id: 's5', a: 'Esclavos africanos', b: 'Abajo: tareas domésticas y estancias' }
    ]},
    { title: 'El circuito comercial', pairs: [
      { id: 'c1', a: 'Alto Perú', b: 'La actual Bolivia, con las minas de Potosí' },
      { id: 'c2', a: 'Mulas', b: 'Nacían en Santa Fe, se criaban en Tucumán, trabajaban en Potosí' },
      { id: 'c3', a: 'Vaquerías', b: 'Excursiones de caza de ganado salvaje' },
      { id: 'c4', a: '1650', b: 'Los barcos del Paraná debían parar en Santa Fe' },
      { id: 'c5', a: 'Cueros', b: 'Producto que salía de Santa Fe' }
    ]},
    { title: 'Palabras clave', pairs: [
      { id: 'k1', a: 'Pluriétnica', b: 'De muchos orígenes distintos' },
      { id: 'k2', a: 'Faenar', b: 'Matar y preparar animales para carne y cueros' },
      { id: 'k3', a: 'Encomienda', b: 'Indígenas trabajaban para un español' },
      { id: 'k4', a: 'Reducción', b: 'Ciudadela de los jesuitas' },
      { id: 'k5', a: 'Confederal', b: 'Provincias autónomas' }
    ]},
    { title: 'Personajes (1)', pairs: [
      { id: 'p1', a: 'Juan de Garay', b: 'Fundó Santa Fe en 1573' },
      { id: 'p2', a: 'Luis Romero de Pineda', b: 'Recibió las tierras del Pago de los Arroyos' },
      { id: 'p3', a: 'Francisco Tarragona', b: 'Diputado de Santa Fe en 1810' },
      { id: 'p4', a: 'Manuel Ruiz', b: 'Coronel español nombrado por Buenos Aires' }
    ]},
    { title: 'Personajes (2)', pairs: [
      { id: 'r1', a: 'Manuel Belgrano', b: 'Batería Libertad y la Bandera en Rosario' },
      { id: 'r2', a: 'José de San Martín', b: 'Granaderos a Caballo y San Lorenzo' },
      { id: 'r3', a: 'Francisco Candioti', b: 'Primer gobernador autónomo de Santa Fe' },
      { id: 'r4', a: 'José Gervasio de Artigas', b: 'Líder oriental de la Liga de los Pueblos Libres' },
      { id: 'r5', a: 'Fernando VII', b: 'Rey de España preso por los franceses' }
    ]},
    { title: 'Fechas de memoria', pairs: [
      { id: 'f1', a: '1650', b: 'Barcos obligados a parar en Santa Fe' },
      { id: 'f2', a: '1689', b: 'Nace el Pago de los Arroyos' },
      { id: 'f3', a: '1776', b: 'Virreinato del Río de la Plata' },
      { id: 'f4', a: '1810', b: 'Revolución de Mayo y Primera Junta' },
      { id: 'f5', a: '1816', b: 'Congreso de Tucumán e Independencia' }
    ]},
    { title: 'Más fechas', pairs: [
      { id: 'g1', a: '15 de noviembre de 1573', b: 'Fundación de Santa Fe' },
      { id: 'g2', a: '3 de febrero de 1813', b: 'Combate de San Lorenzo' },
      { id: 'g3', a: '25 de abril', b: 'Día de la Autonomía Santafesina' },
      { id: 'g4', a: '29 de junio de 1815', b: 'Congreso de los Pueblos Libres' },
      { id: 'g5', a: '9 de julio de 1816', b: 'Declaración de la Independencia' }
    ]},
    { title: 'Instrucciones de Artigas (1813)', pairs: [
      { id: 'i1', a: '1) Independencia', b: 'Separarse de España' },
      { id: 'i2', a: '2) República', b: 'Forma de gobierno sin rey' },
      { id: 'i3', a: '3) Sistema confederal', b: 'Provincias autónomas' },
      { id: 'i4', a: '4) Capital', b: 'Fuera de Buenos Aires' }
    ]},
    { title: 'Asamblea del Año XIII', pairs: [
      { id: 'a1', a: 'Hijos de esclavos', b: 'Libres si nacían desde ese momento' },
      { id: 'a2', a: 'Las personas', b: 'Iguales ante la ley' },
      { id: 'a3', a: 'Tributo indígena', b: 'Eliminado' },
      { id: 'a4', a: 'La independencia', b: 'NO la declaró' }
    ]}
  ];

  /* =====================================================================
     FLASHCARDS
     ===================================================================== */
  const FLASHCARDS = [
    { id: 'sf01', deck: 'Santa Fe colonial', f: 'Fundación de Santa Fe', b: 'Juan de Garay, 15 de noviembre de 1573, en las barrancas del río Quiloazas (hoy San Javier).' },
    { id: 'sf02', deck: 'Santa Fe colonial', f: '¿Por qué se trasladó la ciudad?', b: 'Porque se inundaba mucho. Casi un siglo después se mudó al centro-este de la provincia y se le agregó "de la Vera Cruz".' },
    { id: 'sf03', deck: 'Santa Fe colonial', f: '¿Quién mandaba?', b: 'Rey de España > Virrey > Cabildo (gobierno de la ciudad).' },
    { id: 'sf04', deck: 'Santa Fe colonial', f: 'Virreinatos', b: 'Nueva España (capital México) y Perú (capital Lima). Se dividían en gobernaciones. Hasta 1776 Santa Fe era del Virreinato del Perú.' },
    { id: 'sf05', deck: 'Santa Fe colonial', f: 'La pirámide social', b: 'Arriba españoles, después criollos, mestizos, indígenas y abajo esclavos africanos. Era DESIGUAL.' },
    { id: 'sf06', deck: 'Santa Fe colonial', f: 'Criollos y mestizos', b: 'Criollos: hijos de europeos nacidos en América. Mestizos: hijos de indígenas con europeos (artesanos, vendedores, peones).' },
    { id: 'sf07', deck: 'Santa Fe colonial', f: 'La ciudad', b: 'En cuadrícula, como tablero de ajedrez. Plaza de Armas en el centro, a una cuadra del río; alrededor el Cabildo, iglesias y casas importantes.' },
    { id: 'sf08', deck: 'Santa Fe colonial', f: 'A tres cuadras de la plaza…', b: 'Hornos de tejas y ladrillos, chacras de árboles frutales. Y los corrales, donde se faenaba.' },
    { id: 'sf09', deck: 'Santa Fe colonial', f: 'El agua en la colonia', b: 'No había agua corriente: la traían del río en recipientes los esclavos, indígenas o españoles pobres.' },

    { id: 'sf10', deck: 'Economía', f: 'El circuito comercial', b: 'Conectaba el Alto Perú (Bolivia, Potosí), el Paraguay y Buenos Aires. Santa Fe estaba en el medio: lugar CLAVE.' },
    { id: 'sf11', deck: 'Economía', f: '1650', b: 'Todos los barcos del Paraná tenían que parar en Santa Fe y pagar impuestos. A Buenos Aires no le gustaba.' },
    { id: 'sf12', deck: 'Economía', f: 'Llegaban / Salían', b: 'Llegaban: yerba mate, tabaco, textiles, productos europeos, metales, azúcar, mulas. Salían: cueros, metales, productos europeos.' },
    { id: 'sf13', deck: 'Economía', f: 'Las mulas', b: 'Nacían en Santa Fe, se criaban en Tucumán y trabajaban en Potosí. Eran el "camión" de esa época.' },
    { id: 'sf14', deck: 'Economía', f: 'Vaquerías', b: 'Excursiones de caza de ganado salvaje.' },
    { id: 'sf15', deck: 'Economía', f: '1776 y 1780', b: '1776: Virreinato del Río de la Plata, capital Buenos Aires. 1780: Santa Fe pierde el privilegio de su puerto.' },
    { id: 'sf16', deck: 'Economía', f: '¡Nace Rosario!', b: '1689: Luis Romero de Pineda recibe tierras entre el río Carcarañá y el arroyo del Medio: Pago de los Arroyos. Hacia 1700, casas y ranchos.' },

    { id: 'sf17', deck: 'Pueblos originarios', f: 'Pluriétnica', b: 'De muchos orígenes distintos: españoles, criollos, mestizos, indígenas y esclavos africanos.' },
    { id: 'sf18', deck: 'Pueblos originarios', f: 'Encomienda', b: 'Los indígenas trabajaban para un encomendero español a cambio de comida y ropa, y les imponían la religión católica.' },
    { id: 'sf19', deck: 'Pueblos originarios', f: 'Reducción', b: 'Ciudadela de los jesuitas donde les cambiaban la forma de vida: iglesia con cruz, casas alrededor y plaza en el medio.' },
    { id: 'sf20', deck: 'Pueblos originarios', f: 'Encomienda vs. reducción', b: 'Igual: los españoles controlaban a los indígenas y les imponían el catolicismo. Diferente: en la encomienda trabajaban para un español; en la reducción vivían en un pueblo de jesuitas.' },
    { id: 'sf21', deck: 'Pueblos originarios', f: 'Enfermedades', b: 'Tifus, viruela y fiebre amarilla, traídas por los españoles. Muchos indígenas murieron.' },

    { id: 'sf22', deck: 'Revolución', f: 'Mayo de 1810', b: 'El rey Fernando VII estaba preso por los franceses. En un Cabildo Abierto se formó la Primera Junta: Revolución de Mayo.' },
    { id: 'sf23', deck: 'Revolución', f: '4 de junio de 1810', b: 'Llega la circular a Santa Fe. El Cabildo elige como diputado al comerciante Francisco Tarragona.' },
    { id: 'sf24', deck: 'Revolución', f: 'Belgrano en Rosario', b: '1811: batería Libertad en las barrancas del Paraná, escarapela para sus soldados y la Bandera.' },
    { id: 'sf25', deck: 'Revolución', f: 'Combate de San Lorenzo', b: '3 de febrero de 1813. San Martín y los Granaderos a Caballo. Único combate de San Martín en el actual territorio argentino.' },

    { id: 'sf26', deck: 'Autonomía y Liga', f: '¿Por qué se peleó Santa Fe con Buenos Aires?', b: 'Nombraba gobernadores no santafesinos (Manuel Ruiz), pedía plata, bienes y ganado, y dejaba la frontera sin defensa.' },
    { id: 'sf27', deck: 'Autonomía y Liga', f: 'Abril de 1815', b: 'Santa Fe declara su AUTONOMÍA y elige a Francisco Candioti. Murió a los pocos meses. 25 de abril: Día de la Autonomía Santafesina.' },
    { id: 'sf28', deck: 'Autonomía y Liga', f: 'Instrucciones de Artigas (1813)', b: '1) Independencia de España 2) República 3) Sistema confederal (provincias autónomas) 4) Capital fuera de Buenos Aires.' },
    { id: 'sf29', deck: 'Autonomía y Liga', f: 'Liga de los Pueblos Libres', b: 'Santa Fe, Entre Ríos, Corrientes, Córdoba, Banda Oriental y Misiones, con Artigas.' },
    { id: 'sf30', deck: 'Autonomía y Liga', f: 'Asamblea del Año XIII', b: 'No declaró la independencia, pero: libertad de hijos de esclavos que nazcan desde ese momento, igualdad ante la ley y eliminó el tributo indígena.' },

    { id: 'sf31', deck: 'Los dos congresos', f: 'Congreso de los Pueblos Libres', b: '29 de junio de 1815, en Concepción del Uruguay (Arroyo de la China). Artigas declara la independencia de los Pueblos Libres y quiere paz con Buenos Aires.' },
    { id: 'sf32', deck: 'Los dos congresos', f: 'Congreso de Tucumán', b: 'Sesiones desde marzo de 1816. Las provincias de la Liga NO van. Discusión: monarquía (rey inca) o república; centralistas o autonomistas.' },
    { id: 'sf33', deck: 'Los dos congresos', f: '9 de julio de 1816', b: 'Se declara la Independencia de España y se adopta el nombre Provincias Unidas en Sud-América.' }
  ];

  /* =====================================================================
     ARCADES
     ===================================================================== */
  const CLASSIFY_GAMES = {
    sfba: {
      title: '¿Santa Fe o Buenos Aires?',
      question: '¿Quién hizo o quería esto?',
      buckets: [
        { id: 'sf', name: 'Santa Fe',     icon: 'fa-star',   cls: 'bucket-rose' },
        { id: 'ba', name: 'Buenos Aires', icon: 'fa-anchor', cls: 'bucket-sky' }
      ],
      items: [
        { t: 'Quería elegir a sus propias autoridades',              p: 'sf', s: 'Conflicto', why: 'Santa Fe pedía elegir sus autoridades y redactar sus leyes.' },
        { t: 'Mandó a Tarragona como diputado',                       p: 'sf', s: '1810', why: 'El Cabildo de Santa Fe eligió a Francisco Tarragona.' },
        { t: 'Declaró su autonomía en abril de 1815',                 p: 'sf', s: '1815', why: 'Un Cabildo Abierto declaró la autonomía de Santa Fe.' },
        { t: 'Eligió a Candioti como gobernador',                     p: 'sf', s: '1815', why: 'Candioti fue el primer gobernador autónomo de Santa Fe.' },
        { t: 'Se unió a Artigas en la Liga de los Pueblos Libres',    p: 'sf', s: 'Liga', why: 'Santa Fe formó parte de la Liga de los Pueblos Libres.' },
        { t: 'No fue al Congreso de Tucumán',                         p: 'sf', s: '1816', why: 'Las provincias de la Liga, como Santa Fe, no respondieron a la convocatoria.' },
        { t: 'Cobraba impuestos a los barcos del Paraná desde 1650',  p: 'sf', s: 'Puerto', why: 'Los barcos estaban obligados a detenerse en Santa Fe y pagar impuestos.' },
        { t: 'Perdió el privilegio de su puerto en 1780',             p: 'sf', s: 'Puerto', why: 'Santa Fe perdió el privilegio cuatro años después de 1776.' },
        { t: 'Quedaba desprotegida en la frontera',                   p: 'sf', s: 'Conflicto', why: 'Buenos Aires usaba los recursos para pelear contra Artigas y Santa Fe quedaba sin defensa.' },
        { t: 'Nombró a Manuel Ruiz como teniente gobernador',         p: 'ba', s: 'Conflicto', why: 'Buenos Aires nombró al coronel español Manuel Ruiz.' },
        { t: 'Pedía plata, bienes y ganado para la guerra',           p: 'ba', s: 'Conflicto', why: 'Buenos Aires exigía contribuciones para las campañas militares.' },
        { t: 'Ahí se formó la Primera Junta en 1810',                 p: 'ba', s: '1810', why: 'La Primera Junta se formó en Buenos Aires.' },
        { t: 'Fue capital del virreinato desde 1776',                 p: 'ba', s: '1776', why: 'Al crearse el Virreinato del Río de la Plata, la capital fue Buenos Aires.' },
        { t: 'Sus comerciantes no querían parar a pagar impuestos',   p: 'ba', s: 'Puerto', why: 'Los comerciantes del puerto de Buenos Aires no querían parar en Santa Fe.' },
        { t: 'No dejó participar a los diputados de Artigas en 1813', p: 'ba', s: 'Liga', why: 'Buenos Aires prohibió participar a los diputados artiguistas.' },
        { t: 'Mandó tropas del Directorio a Santa Fe',                p: 'ba', s: 'Conflicto', why: 'Llegaron tropas del Directorio de Buenos Aires.' },
        { t: 'Convocó al Congreso de Tucumán',                        p: 'ba', s: '1816', why: 'El Gobierno de Buenos Aires decidió convocar el congreso en Tucumán.' }
      ]
    },
    congresos: {
      title: '¿Qué congreso fue?',
      question: '¿Pueblos Libres (1815) o Tucumán (1816)?',
      buckets: [
        { id: 'pl',  name: 'Pueblos Libres 1815', icon: 'fa-people-group', cls: 'bucket-emerald' },
        { id: 'tuc', name: 'Tucumán 1816',        icon: 'fa-flag',          cls: 'bucket-indigo' }
      ],
      items: [
        { t: '29 de junio de 1815',                    p: 'pl', s: 'Fecha' },
        { t: 'Concepción del Uruguay',                 p: 'pl', s: 'Lugar' },
        { t: 'Villa del Arroyo de la China',           p: 'pl', s: 'Lugar' },
        { t: 'Lo organizó Artigas',                    p: 'pl', s: 'Quién' },
        { t: 'Fueron Santa Fe, Entre Ríos y Corrientes', p: 'pl', s: 'Quiénes' },
        { t: 'Independencia de los Pueblos Libres',    p: 'pl', s: 'Qué pasó' },
        { t: 'Comercio y vínculos con los indígenas',  p: 'pl', s: 'Temas' },
        { t: 'Artigas quería la paz con Buenos Aires', p: 'pl', s: 'Qué pasó' },
        { t: '9 de julio de 1816',                     p: 'tuc', s: 'Fecha' },
        { t: 'Sesiones desde marzo de 1816',           p: 'tuc', s: 'Fecha' },
        { t: 'Provincias Unidas en Sud-América',       p: 'tuc', s: 'Nombre' },
        { t: '¿Monarquía con rey inca o república?',   p: 'tuc', s: 'Debate' },
        { t: 'Centralistas contra autonomistas',       p: 'tuc', s: 'Debate' },
        { t: 'Hubo diputados del Alto Perú',           p: 'tuc', s: 'Quiénes' },
        { t: 'Las provincias de la Liga NO fueron',    p: 'tuc', s: 'Quiénes' },
        { t: 'Independencia de España',                p: 'tuc', s: 'Qué pasó' }
      ]
    },
    piramide: {
      title: '¿Quién es quién en la pirámide?',
      question: '¿De qué grupo habla?',
      buckets: [
        { id: 'esp', name: 'Españoles',  icon: 'fa-crown',       cls: 'bucket-amber' },
        { id: 'cri', name: 'Criollos',   icon: 'fa-store',       cls: 'bucket-indigo' },
        { id: 'mes', name: 'Mestizos',   icon: 'fa-hammer',      cls: 'bucket-sky' },
        { id: 'ind', name: 'Indígenas',  icon: 'fa-leaf',        cls: 'bucket-emerald' },
        { id: 'esc', name: 'Esclavos',   icon: 'fa-link',        cls: 'bucket-rose' }
      ],
      items: [
        { t: 'Arriba de todo en la pirámide',                p: 'esp', s: 'Pirámide' },
        { t: 'Podían tener puestos en el gobierno',          p: 'esp', s: 'Trabajo' },
        { t: 'Dueños de tierras con grandes casas',          p: 'esp', s: 'Riqueza' },
        { t: 'Hijos de padres europeos nacidos en América',  p: 'cri', s: 'Origen' },
        { t: 'Segundo lugar en la pirámide',                 p: 'cri', s: 'Pirámide' },
        { t: 'Algunos acumulaban fortunas con el comercio',  p: 'cri', s: 'Trabajo' },
        { t: 'Hijos de indígenas con europeos',              p: 'mes', s: 'Origen' },
        { t: 'Artesanos o vendedores ambulantes',            p: 'mes', s: 'Trabajo' },
        { t: 'Peones en el campo',                           p: 'mes', s: 'Trabajo' },
        { t: 'Chanaes, quiloazas, calchines y mocoretás',    p: 'ind', s: 'Pueblos' },
        { t: 'Trabajaban bajo el control de los españoles',  p: 'ind', s: 'Trabajo' },
        { t: 'Los repartían en encomiendas',                 p: 'ind', s: 'Trabajo' },
        { t: 'Abajo de todo en la pirámide',                 p: 'esc', s: 'Pirámide' },
        { t: 'Los vendían en Potosí o en Córdoba',           p: 'esc', s: 'Comercio' },
        { t: 'Hacían tareas domésticas y trabajaban en estancias', p: 'esc', s: 'Trabajo' }
      ]
    },
    encomienda: {
      title: '¿Encomienda o reducción?',
      question: '¿Encomienda, reducción o las dos?',
      buckets: [
        { id: 'enc', name: 'Encomienda', icon: 'fa-wheat-awn', cls: 'bucket-amber' },
        { id: 'red', name: 'Reducción',  icon: 'fa-church',    cls: 'bucket-indigo' },
        { id: 'dos', name: 'Las dos',    icon: 'fa-equals',    cls: 'bucket-emerald' }
      ],
      items: [
        { t: 'Trabajaban para un encomendero español',          p: 'enc', s: 'Cómo era' },
        { t: 'Repartían a los indígenas entre españoles',       p: 'enc', s: 'Cómo era' },
        { t: 'A cambio recibían alimento y ropa',               p: 'enc', s: 'Cómo era' },
        { t: 'Trabajaban la tierra y hacían trabajos pesados',  p: 'enc', s: 'Cómo era' },
        { t: 'Ciudadela a cargo de los jesuitas',               p: 'red', s: 'Cómo era' },
        { t: 'Iglesia con cruz, casas alrededor y plaza',       p: 'red', s: 'Cómo era' },
        { t: 'Buscaban cambiar su modo de vida',                p: 'red', s: 'Para qué' },
        { t: 'Calmó la guerra con mocovíes y abipones',         p: 'red', s: 'Para qué' },
        { t: 'Vivían en un pueblo organizado por jesuitas',     p: 'red', s: 'Cómo era' },
        { t: 'Los españoles controlaban a los indígenas',       p: 'dos', s: 'Similitud' },
        { t: 'Les imponían la religión católica',               p: 'dos', s: 'Similitud' }
      ]
    }
  };

  /* =====================================================================
     DECILO CON TUS PALABRAS
     (los textos "Para que Santino lo diga con sus palabras")
     [[palabras clave]] quedan resaltadas en la respuesta.
     ===================================================================== */
  const EXPLICAR = [
    { tag: 'Hoja 1', q: '¿Cómo nació Santa Fe y por qué era importante?',
      a: '[[Juan de Garay]] fundó Santa Fe el [[15 de noviembre de 1573]] junto al río Quiloazas. Como se [[inundaba]], casi un siglo después se trasladó. Era importante por su [[ubicación]]: comunicaba a las distintas ciudades.' },
    { tag: 'Hoja 2', q: '¿Quién mandaba en la colonia y cómo era la sociedad?',
      a: 'En la colonia mandaba el [[rey de España]], después el [[virrey]] y en la ciudad el [[Cabildo]]. La sociedad era [[desigual]], como una [[pirámide]]: arriba los españoles, después los criollos, los mestizos, los indígenas y abajo los esclavos africanos.' },
    { tag: 'Hoja 3', q: '¿Qué lugar tenía Santa Fe en el circuito comercial?',
      a: 'Santa Fe era un lugar [[clave]]: estaba en el medio entre [[Potosí (Alto Perú)]], [[Paraguay]] y [[Buenos Aires]]. Desde [[1650]] los barcos del Paraná tenían que parar y [[pagar impuestos]]. En Santa Fe se criaban [[mulas]] y se producían [[cueros]].' },
    { tag: 'Hoja 4', q: '¿Cómo era la ciudad y qué pasó en 1776?',
      a: 'La ciudad era en [[cuadrícula]], con la [[Plaza de Armas]] en el centro, el Cabildo y las iglesias alrededor. No había agua corriente, la traían del [[río]]. En [[1776]] Buenos Aires pasó a ser capital y Santa Fe perdió su [[privilegio del puerto]]. Y Rosario nació como [[Pago de los Arroyos]].' },
    { tag: 'Hoja 5', q: '¿Qué les pasó a los pueblos originarios?',
      a: 'En Santa Fe vivía gente de [[muchos orígenes]]. A los indígenas los ponían en [[encomiendas]] para que trabajen para un español, o en [[reducciones]] de los [[jesuitas]] para cambiarles la vida. Muchos murieron por [[enfermedades]] que trajeron los españoles.' },
    { tag: 'Hoja 6', q: '¿Qué pasó en 1810 y qué hicieron Belgrano y San Martín?',
      a: 'En [[1810]], como el [[rey estaba preso]], en Buenos Aires se formó la [[Primera Junta]]. Santa Fe aceptó y mandó a [[Tarragona]] como diputado. [[Belgrano]] fue a Rosario y creó la [[Bandera]], y [[San Martín]] peleó en [[San Lorenzo]] en 1813.' },
    { tag: 'Hoja 7', q: '¿Por qué Santa Fe declaró su autonomía?',
      a: 'Buenos Aires nombraba [[gobernadores que no eran de Santa Fe]] y le pedía [[mucha plata]]. Por eso en [[abril de 1815]] Santa Fe declaró su [[autonomía]] y eligió a [[Candioti]] como gobernador. Murió al poco tiempo, pero el [[25 de abril]] es el Día de la Autonomía.' },
    { tag: 'Hoja 8', q: '¿Qué era la Liga de los Pueblos Libres?',
      a: 'Después de Candioti, Santa Fe se peleó más con Buenos Aires porque le pedía plata para pelear contra [[Artigas]] y la dejaba [[sin defensa]]. Santa Fe se unió a Artigas en la [[Liga de los Pueblos Libres]], que quería [[independencia]], [[república]] y que las provincias sean [[autónomas]].' },
    { tag: 'Hoja 9', q: '¿Cuáles fueron los dos congresos?',
      a: 'Artigas hizo su propio congreso en [[1815]] en [[Concepción del Uruguay]]. Buenos Aires hizo el suyo en [[Tucumán]] en [[1816]], donde se declaró la independencia el [[9 de julio]], pero [[sin las provincias de la Liga]].' }
  ];

  /* =====================================================================
     PONÉ LOS NOMBRES y ENCONTRÁ EN EL DIBUJO (sobre las infografías)
     ===================================================================== */
  const NOMBRAR = {
    build() {
      return [
        { kind: 'mando', ex: MANDO, types: ['rey', 'virrey', 'gobernacion', 'cabildo'],
          extra: APP.pick(['criollos', 'paraguay', 'plaza'], 2) },
        { kind: 'piramide', ex: PIRAMIDE, types: ['espanoles', 'criollos', 'mestizos', 'indigenas', 'esclavos'],
          extra: APP.pick(['virrey', 'cabildo', 'rey'], 1) },
        { kind: 'plano', ex: PLANO, types: ['plaza', 'cabildo', 'iglesia', 'casas', 'hornos', 'chacras', 'corrales', 'rio'],
          extra: APP.pick(['parana', 'r_iglesia', 'potosi'], 1) },
        { kind: 'circuito', ex: CIRCUITO, types: ['potosi', 'tucuman', 'cordoba', 'santafe', 'paraguay', 'buenosaires', 'parana', 'llegaban', 'salian'],
          extra: APP.pick(['rio', 'cabildo', 'plaza'], 1) }
      ];
    }
  };

  const PARTES = {
    build() {
      const tap = (t, q) => ({ tap: t, q: q, why: PART_INFO[t].n + ': ' + PART_INFO[t].d });
      return [
        { kind: 'mando', ex: MANDO, steps: APP.shuffle([
          tap('rey', 'Tocá al que mandaba sobre TODAS las colonias.'),
          tap('virrey', 'Tocá al que representaba al rey en América.'),
          tap('cabildo', 'Tocá al que administraba la ciudad.')
        ]).concat([
          { q: 'Hasta 1776, ¿de qué virreinato era parte Santa Fe?', ok: 'Del Perú', opts: ['Del Perú', 'Del Río de la Plata', 'De Nueva España'], mix: true,
            why: 'Santa Fe estaba en la Gobernación del Río de la Plata, dentro del Virreinato del Perú. En 1776 se creó el del Río de la Plata.' }
        ])},
        { kind: 'piramide', ex: PIRAMIDE, steps: APP.shuffle([
          tap('espanoles', 'Tocá al grupo que estaba ARRIBA de todo.'),
          tap('criollos', 'Tocá a los hijos de europeos nacidos en América.'),
          tap('mestizos', 'Tocá a los hijos de indígenas con europeos.'),
          tap('esclavos', 'Tocá al grupo que estaba ABAJO de todo.')
        ]).concat([
          { q: '¿Cómo era esta sociedad?', ok: 'Desigual', opts: ['Desigual', 'Todos iguales', 'Sin grupos'], mix: true,
            why: 'Era DESIGUAL: se diferenciaban por dónde nacieron, su color de piel y su posición económica.' }
        ])},
        { kind: 'plano', ex: PLANO, steps: APP.shuffle([
          tap('plaza', 'Tocá la Plaza de Armas.'),
          tap('cabildo', 'Tocá el Cabildo.'),
          tap('hornos', 'Tocá dónde se fabricaban tejas y ladrillos.'),
          tap('rio', 'Tocá de dónde traían el agua.'),
          tap('corrales', 'Tocá dónde se faenaban los animales.')
        ]).concat([
          { q: '¿Cómo está organizada la ciudad?', ok: 'En cuadrícula, como un tablero de ajedrez',
            opts: ['En cuadrícula, como un tablero de ajedrez', 'En círculos', 'Sin orden'], mix: true,
            why: 'Las leyes españolas decían que las ciudades se organizaban en cuadrículas.' }
        ])},
        { kind: 'circuito', ex: CIRCUITO, steps: APP.shuffle([
          tap('potosi', 'Tocá las minas de Potosí, en el Alto Perú.'),
          tap('santafe', 'Tocá Santa Fe.'),
          tap('paraguay', 'Tocá el Paraguay.'),
          tap('parana', 'Tocá el río donde los barcos tenían que parar en Santa Fe.'),
          tap('tucuman', 'Tocá dónde se criaban las mulas.'),
          tap('salian', 'Tocá los productos que SALÍAN de Santa Fe.')
        ])},
        { kind: 'reduccion', ex: REDUCCION, steps: APP.shuffle([
          tap('r_iglesia', 'Tocá la iglesia con cruz.'),
          tap('r_plaza', 'Tocá la plaza en el medio.'),
          tap('r_casas', 'Tocá las casas de alrededor.')
        ]).concat([
          { q: '¿Quiénes estaban a cargo de la reducción?', ok: 'Los jesuitas', opts: ['Los jesuitas', 'Los encomenderos', 'El virrey'], mix: true,
            why: 'Las reducciones eran ciudadelas a cargo de los jesuitas.' },
          { q: '¿Cuál es la diferencia con la encomienda?', ok: 'En la encomienda trabajaban para un español',
            opts: ['En la encomienda trabajaban para un español', 'En la encomienda mandaban los jesuitas', 'No hay ninguna diferencia'], mix: true,
            why: 'En la encomienda trabajaban para un español; en la reducción vivían en un pueblo organizado por jesuitas.' }
        ])}
      ];
    }
  };

  /** Infografías para mirar (con los nombres de cada parte). */
  const INFOGRAFIAS = [
    { id: 'mando',     n: '¿Quién mandaba?',   icon: 'fa-crown',          kind: 'mando',     ex: MANDO,
      legend: ['rey', 'virrey', 'gobernacion', 'cabildo'],
      note: 'Rey de España > Virrey > Cabildo. En 1776 se creó el Virreinato del Río de la Plata, con capital en Buenos Aires.' },
    { id: 'piramide',  n: 'La sociedad',       icon: 'fa-layer-group',    kind: 'piramide',  ex: PIRAMIDE,
      legend: ['espanoles', 'criollos', 'mestizos', 'indigenas', 'esclavos'],
      note: 'La sociedad era DESIGUAL: las personas se diferenciaban por dónde habían nacido, su color de piel y su posición económica. Tenía unos 5.000 habitantes.' },
    { id: 'plano',     n: 'La ciudad',         icon: 'fa-chess-board',    kind: 'plano',     ex: PLANO,
      legend: ['plaza', 'cabildo', 'iglesia', 'casas', 'hornos', 'chacras', 'corrales', 'rio'],
      note: 'En cuadrícula, como un tablero de ajedrez. No había agua corriente: la traían del río en recipientes.' },
    { id: 'circuito',  n: 'El circuito comercial', icon: 'fa-route',      kind: 'circuito',  ex: CIRCUITO,
      legend: ['potosi', 'tucuman', 'cordoba', 'santafe', 'paraguay', 'buenosaires', 'parana', 'llegaban', 'salian'],
      note: 'Desde 1650 los barcos del Paraná tenían que parar en Santa Fe y pagar impuestos. Las mulas nacían en Santa Fe, se criaban en Tucumán y trabajaban en Potosí.' },
    { id: 'reduccion', n: 'Una reducción',     icon: 'fa-church',         kind: 'reduccion', ex: REDUCCION,
      legend: ['r_iglesia', 'r_casas', 'r_plaza'],
      note: 'Ciudadela a cargo de los jesuitas. Igual que en la encomienda, los españoles controlaban a los indígenas y les imponían el catolicismo; pero en la encomienda trabajaban para un español.' }
  ];

  /* =====================================================================
     CATÁLOGO DE JUEGOS
     ===================================================================== */
  const GAMES = [
    { id: 'infografias', type: 'infografias', name: 'Infografías con sus partes', icon: 'fa-map',
      desc: 'Quién mandaba, la pirámide social, el plano de la ciudad, el circuito comercial y una reducción, dibujados.', tint: 'from-pink-500 to-rose-600' },
    { id: 'nombrar',   type: 'nombrar', name: 'Poné los nombres', icon: 'fa-tags',
      desc: 'Elegí cada nombre y ponelo en su lugar: en la pirámide, el plano y el mapa.', tint: 'from-lime-500 to-emerald-600' },
    { id: 'partes',    type: 'partes', name: 'Encontrá en el dibujo', icon: 'fa-hand-pointer',
      desc: 'Tocá el Cabildo, la Plaza de Armas, Potosí, a los criollos…', tint: 'from-orange-500 to-amber-500' },
    { id: 'trivia',    type: 'trivia', name: 'Trivia contrarreloj', icon: 'fa-brain',
      desc: '10 preguntas con reloj, racha y puntos extra.', tint: 'from-indigo-500 to-violet-600' },
    { id: 'tiempo',    type: 'timeline', name: 'Línea de tiempo', icon: 'fa-timeline',
      desc: 'Ordená los hechos del más antiguo al más nuevo. ¡Las fechas de memoria!', tint: 'from-sky-500 to-cyan-600' },
    { id: 'explicar',  type: 'explicar', name: 'Decilo con tus palabras', icon: 'fa-comment-dots',
      desc: 'Como en la prueba oral: contestá en voz alta y compará con lo que tenés que decir.', tint: 'from-teal-500 to-sky-600' },
    { id: 'unir',      type: 'match', name: 'Unir con flechas', icon: 'fa-diagram-project',
      desc: 'Personajes, fechas, palabras clave y más.', tint: 'from-emerald-500 to-teal-600' },
    { id: 'cartas',    type: 'cards', name: 'Flashcards', icon: 'fa-clone',
      desc: 'Repaso rápido: tocá la tarjeta para darla vuelta.', tint: 'from-amber-500 to-orange-600' },
    { id: 'sfba',      type: 'classify', name: '¿Santa Fe o Buenos Aires?', icon: 'fa-scale-balanced',
      desc: '¡Arcade! ¿Quién hizo o quería cada cosa?', tint: 'from-fuchsia-500 to-pink-600' },
    { id: 'congresos', type: 'classify', name: '¿Qué congreso fue?', icon: 'fa-landmark',
      desc: '¡Arcade! ¿Pueblos Libres 1815 o Tucumán 1816?', tint: 'from-violet-500 to-purple-700' },
    { id: 'piramide',  type: 'classify', name: '¿Quién es quién en la pirámide?', icon: 'fa-layer-group',
      desc: '¡Arcade! Españoles, criollos, mestizos, indígenas o esclavos.', tint: 'from-rose-500 to-orange-500' },
    { id: 'encomienda', type: 'classify', name: '¿Encomienda o reducción?', icon: 'fa-church',
      desc: '¡Arcade! ¿Encomienda, reducción o las dos?', tint: 'from-sky-500 to-indigo-600' },
    { id: 'resumen',   type: 'resumen', name: 'Resumen para leer', icon: 'fa-book-open',
      desc: 'Las 9 hojas ordenadas y las fechas de memoria.', tint: 'from-slate-500 to-slate-700' }
  ];

  /* =====================================================================
     MATERIA
     ===================================================================== */
  APP.SUBJECTS.sociales = {
    id: 'sociales',
    name: 'Ciencias Sociales',
    short: 'Sociales',
    icon: 'fa-earth-americas',
    tint: 'from-indigo-500 to-violet-600',
    heroText: 'from-indigo-600 via-violet-600 to-sky-500',
    topic: 'Santa Fe: de la Colonia a la Independencia',
    intro: 'Quién mandaba, la sociedad, el comercio, la ciudad, los pueblos originarios, la revolución, la autonomía y los dos congresos. ¡Elegí un juego y a jugar!',
    expert: 'Ciencias Sociales',
    tip: 'arrancá por las <b>Infografías</b> y el <b>Resumen</b>, practicá <b>Decilo con tus palabras</b> en voz alta y después probá la <b>Trivia</b>, la <b>Línea de tiempo</b> y los arcades. Cada partida te da XP para subir de nivel.',
    source: 'Ciencias Sociales — resúmenes "Santa Fe, de la Colonia a la Independencia" (hojas 1 a 9)',
    storeKey: 'estudioSanti.sociales.v2',   // temas nuevos: arranca de cero
    LEVELS,
    FICHA, RESUMEN, TABLA,
    TRIVIA,
    TIMELINE: {
      rounds: TIMELINE_ROUNDS,
      hint: 'Tocá los hechos <b>en orden</b>: primero el más antiguo, al final el más nuevo.',
      art: 'los', noun: 'hechos'
    },
    MATCH_ROUNDS, FLASHCARDS, CLASSIFY_GAMES, EXPLICAR,
    PART_INFO, NOMBRAR, PARTES, INFOGRAFIAS,
    EJEMPLOS: { PLANO_EMOJI },
    GAMES
  };
})(window.APP);
