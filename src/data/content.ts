export interface TeamMember {
  name: string;
}

export interface PitchProject {
  id: number;
  name: string;
  tag: string;
  members: TeamMember[];
  audioEntrada: string;
  productImage: string;
  pdfPath?: string;
}

export interface Juror {
  name: string;
  focus: string;
  experience: string;
  image: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export interface HubMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

export const HUB_MEMBERS: HubMember[] = [
  {
    name: 'América Castiblanco',
    role: 'Gerente del Área de Emprendimiento de la Universidad El Bosque',
    description: 'Ingeniera industrial, magister en innovacion y MBA con 18 años de trayectoria profesional. Fue Vicepresidente de Emprendimiento de iNNpulsa Colombia y COO de SEED MG en Brasil. Socia fundadora de Inventta Colombia, profesora cátedra de 9 universidades.',
    image: '/assets/img/hub_1.png',
  },
  {
    name: 'Paola Machuca',
    role: 'Profesional del Área de Emprendimiento',
    description: 'Administradora de empresas con énfasis en mercadeo; con más de 6 años de experiencia en gestión administrativa y gerencial. Liderazgo, gestión de procesos y comunicación asertiva enfocada en resultados.',
    image: '/assets/img/hub_2.jpg',
  },
  {
    name: 'Juan Esteban Reina',
    role: 'Practicante del Área de Emprendimiento',
    description: 'Estudiante de marketing y transformación digital, productor musical e ingeniero de sonido con más de 6 años de experiencia en medios audiovisuales.',
    image: '/assets/img/hub_3.png',
  },
];

export const JURORS: Juror[] = [
  {
    name: 'Margarita Estrada',
    focus: 'Docente Asistente en Pregrado y Posgrado de la Facultad de Educación – Universidad El Bosque',
    experience: 'Magíster en Creación y Dirección de Empresas por la Universidad EAN y Especialista en Gerencia de Proyectos de la Universidad El Bosque. Cuenta con 10 años de experiencia en docencia universitaria, con especialización en emprendimiento, innovación y desarrollo de habilidades blandas. Formada como consejera en creación de empresas en Quebec.',
    image: '/assets/img/jurado_1.png',
  },
  {
    name: 'Abelardo Arciniegas',
    focus: 'Director del Programa de Administración de Empresas Virtual – Universidad El Bosque',
    experience: 'Magíster en Docencia de la Universidad El Bosque, Especialista en Docencia Universitaria y Psicólogo. Cuenta con más de 35 años de experiencia docente como Formador Pedagógico del SENA, Evaluador de Competencias, Gestor de Emprendimiento e Innovación y Tutor PAE.',
    image: '/assets/img/jurado_2.png',
    objectFit: 'contain',
  },
  {
    name: 'América Castiblanco',
    focus: 'Gerente del Área de Emprendimiento de la Universidad El Bosque',
    experience: 'Ingeniera industrial, magister en innovacion y MBA con 18 años de trayectoria profesional. Fue Vicepresidente de Emprendimiento de iNNpulsa Colombia y COO de SEED MG en Brasil. Socia fundadora de Inventta Colombia, profesora cátedra de 9 universidades.',
    image: '/assets/img/jurado_3.png',
  },
];

export const PROJECTS: PitchProject[] = [
  {
    id: 1,
    name: 'FOCUSYNC',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Carol Valeria Riaño Bello' },
      { name: 'Andrés Felipe Perez Perez' },
      { name: 'Laura Daniela Díaz Perez' },
      { name: 'Sarit Valentina Valencia Parra' },
      { name: 'Cristian Alexander Cuchubo Martínez' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_1.jpg',
    pdfPath: '/assets/pdf/proyecto_1.pdf',
  },
  {
    id: 2,
    name: 'MEDI-BUS',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Juan Felipe Villamil Rodriguez' },
      { name: 'Ana Valentina Olivella Rizo' },
      { name: 'Danna Valentina Barriga Peñaloza' },
      { name: 'Luisa Fernanda Álvarez Sierra' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_2.jpg',
    pdfPath: '/assets/pdf/proyecto_2.pdf',
  },
  {
    id: 3,
    name: 'SAFESIDE',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Stephanie Sofía Gómez Guerra' },
      { name: 'Claudia Marcela Rodriguez Rojas' },
      { name: 'Luisa Dayana Martínez Sánchez' },
      { name: 'Sara Amaya Montoya' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_3.jpg',
    pdfPath: '/assets/pdf/proyecto_3.pdf',
  },
  {
    id: 4,
    name: 'RITMO',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Samara Baquero Rojas' },
      { name: 'Juan Camilo Cortes Murillo' },
      { name: 'Isabela Martínez Montoya' },
      { name: 'Zhara Gabriela Ortegón Rivera' },
      { name: 'María Gabriela Zambrano Riobueno' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_4.jpg',
    pdfPath: '/assets/pdf/proyecto_4.pdf',
  },
  {
    id: 5,
    name: 'OUTFITMIND',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Sofía Escorcia Martínez' },
      { name: 'Ana Sofía Sánchez Patiño' },
      { name: 'Valeria Triana Castañeda' },
      { name: 'Niver Darío Quitora Madrigal' },
      { name: 'Julian Felipe Gómez Bravo' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_5.jpg',
    pdfPath: '/assets/pdf/proyecto_5.pdf',
  },
  {
    id: 6,
    name: 'ECONOTES',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'María Paula Leguizamón Amaya' },
      { name: 'Sol Irene Duarte Meneses' },
      { name: 'Jhon Eduardo Gaviria Galvis' },
      { name: 'Diego Alejandro Arandia Melo' },
      { name: 'María Alejandra Aguilar Rodriguez' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_6.jpg',
    pdfPath: '/assets/pdf/proyecto_6.pdf',
  },
  {
    id: 7,
    name: 'SEGURIDAD QUE FLORECE',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Valery Sofia Neuta Parra' },
      { name: 'Silvia Sofia Orduz Blanco' },
      { name: 'Andrés Hernández' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_7.jpg',
    pdfPath: '/assets/pdf/proyecto_7.pdf',
  },
  {
    id: 8,
    name: 'LAZOS',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Nicolas Niño' },
      { name: 'María Alejandra Cubides Urriago' },
      { name: 'Juliana Andrea Ruano Franco' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_8.jpg',
    pdfPath: '/assets/pdf/proyecto_8.pdf',
  },
  {
    id: 9,
    name: 'EmoBox Regalos que conectan corazón',
    tag: 'Integrantes del Equipo',
    members: [
      { name: 'Ana María Ruiz Estrella' },
      { name: 'Sofía Macías Zea' },
      { name: 'Diana Sofia Romero Diaz' },
      { name: 'Sergio Ducuara' },
    ],
    audioEntrada: '/assets/audio/entrada_grupo_1.mp3',
    productImage: '/assets/img/producto_grupo_9.jpg',
    pdfPath: '/assets/pdf/proyecto_9.pdf',
  },
];

export const AGENDA_ITEMS = [
  'Bienvenida del Área de Emprendimiento del HUB',
  'Equipo de jurados',
  'Reglas y condiciones',
  'Criterios de evaluación',
  'Ronda de pitch',
  'Equipo ganador',
  'Cierre',
];

export const RULES = [
  { icon: 'Shuffle', label: 'Orden', detail: 'Sorteo aleatorio para el orden de participación.' },
  { icon: 'Clock', label: 'Pitch', detail: '5 minutos.' },
  { icon: 'MessageSquare', label: 'Feedback', detail: '5 minutos.' },
  { icon: 'CheckCircle', label: 'Calificación', detail: 'Inmediata tras el pitch según criterios establecidos.' },
  { icon: 'Trophy', label: 'Veredicto', detail: 'Se anunciará al equipo ganador al cierre del Demo Day.' },
];

export const CRITERIA = [
  { label: 'Impacto del proyecto', value: 100 },
  { label: 'Equipo de trabajo', value: 100 },
  { label: 'Claridad y comunicación', value: 100 },
  { label: 'Creatividad en la presentación', value: 100 },
  { label: 'Gestión del tiempo', value: 100 },
];

export const AUDIO_PATHS = {
  pitchLoop: '/assets/audio/pitch_loop.mp3',
  deliberationLoop: '/assets/audio/deliberation_loop.mp3',
  sfxTimesUp: '/assets/audio/sfx_times_up.mp3',
  ambientLoop: '/assets/audio/ambient_loop.mp3',
  winnerReveal: '/assets/audio/winner_reveal.mp3',
};

// ============================================================
// 🎚️ VOLÚMENES — Ajusta cada pista de 0.0 (silencio) a 1.0 (máximo)
//    fadeInMs  → duración del fade-in  en milisegundos
//    fadeOutMs → duración del fade-out en milisegundos
//
//  CONTEXTO DE CADA MOMENTO:
//  ─────────────────────────────────────────────────────────
//  • ambientLoop     → Nadie habla, solo navegación entre pantallas.
//                       Suave para crear atmósfera sin cansar.
//  • walkup          → Grupo caminando al escenario, nadie habla,
//                       momento de hype. Puede sonar con presencia.
//  • pitchLoop       → ⚠️ GENTE HABLANDO (presentación del pitch).
//                       Casi imperceptible, solo para llenar silencios.
//  • sfxTimesUp      → Alerta corta de "se acabó el tiempo".
//                       Notoria pero sin asustar, dura pocos segundos.
//  • deliberationLoop → ⚠️ JURADOS HABLANDO (retroalimentación).
//                       Muy bajita, no debe competir con las voces.
//  • winnerReveal    → Momento épico, nadie habla al inicio.
//                       Alta energía y celebración.
// ============================================================
export const AUDIO_VOLUMES = {
  // 🔈 Navegación entre pantallas — nadie habla, ambiente suave
  ambientLoop: 0.18,

  // 🎶 Entrada al escenario — nadie habla, momento de energía
  walkup: 0.75,

  // 🎤 PITCH EN CURSO — gente hablando, casi imperceptible
  pitchLoop: 0.08,

  // ⏰ Alerta de tiempo — corta y clara, sin ser agresiva
  sfxTimesUp: 0.65,

  // 💬 JURADOS DANDO FEEDBACK — gente hablando, muy bajita
  deliberationLoop: 0.10,

  // 🏆 Revelación del ganador — momento épico, alta energía
  winnerReveal: 0.85,

  // ⏱️ Duración de las transiciones (en milisegundos)
  fadeInMs: 2000,    // 2 segundos — entrada gradual y suave
  fadeOutMs: 1500,   // 1.5 segundos — salida gentil sin cortes
};
