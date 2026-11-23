export type ChannelId = 1 | 2 | 3 | 4;

export interface TvChannelMeta {
  id: ChannelId;
  code: string;
  title: string;
  color: string;
}

export const TV_CHANNELS: TvChannelMeta[] = [
  {
    id: 1,
    code: 'CH 01',
    title: 'PRÉSENTATION',
    color: '#50dcff',
  },
  {
    id: 2,
    code: 'CH 02',
    title: 'ENGINE',
    color: '#ffaf37',
  },
  {
    id: 3,
    code: 'CH 03',
    title: 'WORKSHOP',
    color: '#ffd73c',
  },
  {
    id: 4,
    code: 'CH 04',
    title: 'ULTIMATES',
    color: '#f54173',
  },
];

export type PowerUpCategory = 'ball' | 'paddle' | 'tactical';

export interface PowerUpSpec {
  id: string;
  name: string;
  category: PowerUpCategory;
  accent: string;
  sprite: string;
  previewSlug: string;
  effect: string;
  levelDetails: [string, string, string, string, string];
}

export const getPreviewVideoUrl = (slug: string, level: number): string => {
  const clamped = Math.max(1, Math.min(5, Math.round(level)));
  return `/assets/RebreakerReloaded/previews/${slug}_lvl${clamped}.mp4`;
};

export const POWER_UPS: PowerUpSpec[] = [
  {
    id: 'storm',
    name: 'Storm',
    category: 'tactical',
    accent: '#ffeb28',
    sprite: '/assets/RebreakerReloaded/workshop/badge_storm.png',
    previewSlug: 'storm',
    effect:
      'Déclenche des éclairs ciblant les briques dans un rayon de 55 px et se propage via les briques en métal conductrices.',
    levelDetails: [
      '1 éclair · 2 dégâts par impact (rayon 55 px)',
      '2 éclairs successifs · 2 dégâts par impact',
      '3 éclairs successifs · 2 dégâts par impact',
      '3 éclairs surchargés · 3 dégâts par impact',
      'Mode Tempête : 60 frappes continues sur 10s (cadence 0.16s)',
    ],
  },
  {
    id: 'fireball',
    name: 'FireBall',
    category: 'ball',
    accent: '#ff4614',
    sprite: '/assets/RebreakerReloaded/workshop/badge_fireball.png',
    previewSlug: 'fireball',
    effect: 'Embrase la balle et déclenche une explosion de zone à l’impact, capable de briser le métal.',
    levelDetails: [
      'Rayon d’explosion : 110 px · Taille de balle : 130 %',
      'Rayon d’explosion : 135 px · Taille de balle : 145 %',
      'Rayon d’explosion : 160 px · Taille de balle : 160 %',
      'Rayon d’explosion : 185 px · Taille de balle : 175 %',
      'Rayon d’explosion : 210 px · Taille de balle : 190 %',
    ],
  },
  {
    id: 'bigball',
    name: 'BigBall',
    category: 'ball',
    accent: '#ff7814',
    sprite: '/assets/RebreakerReloaded/workshop/badge_bigball.png',
    previewSlug: 'bigball',
    effect:
      'Agrandit la balle pour traverser et briser les briques classiques en un coup (rebondit sur le métal).',
    levelDetails: [
      'Taille : 140 % · Durée : 10s · Traverse les briques classiques en 1 coup',
      'Taille : 160 % · Durée : 11.5s · Traverse les briques classiques en 1 coup',
      'Taille : 180 % · Durée : 13s · Traverse les briques classiques en 1 coup',
      'Taille : 200 % · Durée : 14.5s · Traverse les briques classiques en 1 coup',
      'Taille : 220 % · Durée : 16s · Traverse les briques classiques en 1 coup',
    ],
  },
  {
    id: 'multiball',
    name: 'MultiBall',
    category: 'ball',
    accent: '#00dcff',
    sprite: '/assets/RebreakerReloaded/workshop/badge_multiball.png',
    previewSlug: 'multiball',
    effect: 'Divise chaque balle active selon un angle d’éjection de ±30° (cap 12 balles).',
    levelDetails: [
      '+2 balles par division (3 balles au départ)',
      '+3 balles par division (4 balles au départ)',
      '+4 balles par division (5 balles au départ)',
      '+5 balles par division (6 balles au départ)',
      '+6 balles par division (atteint rapidement la limite de 12 balles)',
    ],
  },
  {
    id: 'sticky',
    name: 'StickyPaddle',
    category: 'paddle',
    accent: '#f5af28',
    sprite: '/assets/RebreakerReloaded/workshop/badge_sticky.png',
    previewSlug: 'sticky',
    effect: 'Retient la balle sur la raquette (jusqu’à 3s) et applique un boost de vitesse au lancer.',
    levelDetails: [
      'Durée : 12s · Boost de relance rythmique : +25 %',
      'Durée : 14s · Boost de relance rythmique : +40 %',
      'Durée : 16s · Boost de relance rythmique : +55 %',
      'Durée : 18s · Boost de relance rythmique : +70 %',
      'Durée : 20s · Boost de relance rythmique : +85 %',
    ],
  },
  {
    id: 'barrier',
    name: 'BottomBarrier',
    category: 'paddle',
    accent: '#00f0ff',
    sprite: '/assets/RebreakerReloaded/workshop/badge_barrier.png',
    previewSlug: 'barrier',
    effect: 'Déploie un champ de force au bas de l’arène pour renvoyer les balles perdues.',
    levelDetails: [
      '1 sauvetage · Durée : 15s',
      '2 sauvetages · Durée : 17.5s',
      '3 sauvetages · Durée : 20s',
      '4 sauvetages · Durée : 22.5s',
      '5 sauvetages · Durée : 25s',
    ],
  },
  {
    id: 'magnet',
    name: 'MagnetPaddle',
    category: 'tactical',
    accent: '#dc3cff',
    sprite: '/assets/RebreakerReloaded/workshop/badge_magnet.png',
    previewSlug: 'magnet',
    effect: 'Attire les capsules bonus et courbe la trajectoire de la balle vers la raquette.',
    levelDetails: [
      'Durée : 10s · Attraction balle : 240 px/s² · Capsules : 380 px/s',
      'Durée : 12.5s · Attraction balle : 320 px/s² · Capsules : 450 px/s',
      'Durée : 15s · Attraction balle : 400 px/s² · Capsules : 520 px/s',
      'Durée : 17.5s · Attraction balle : 480 px/s² · Capsules : 590 px/s',
      'Durée : 20s · Attraction balle : 560 px/s² · Capsules : 660 px/s',
    ],
  },
  {
    id: 'ghostball',
    name: 'GhostBall',
    category: 'ball',
    accent: '#a0f0ff',
    sprite: '/assets/RebreakerReloaded/workshop/badge_ghost.png',
    previewSlug: 'ghostball',
    effect: 'Rend la balle immortelle et lui permet de traverser les briques en phase sélective.',
    levelDetails: [
      'Durée : 5s · 1 dégât par brique traversée',
      'Durée : 6s · 1 dégât par brique traversée',
      'Durée : 7s · 2 dégâts par brique traversée',
      'Durée : 8s · 2 dégâts par brique traversée',
      'Durée : 9s · 3 dégâts par brique traversée',
    ],
  },
  {
    id: 'tempo',
    name: 'TempoBall',
    category: 'ball',
    accent: '#b446ff',
    sprite: '/assets/RebreakerReloaded/workshop/badge_tempo.png',
    previewSlug: 'tempo',
    effect: 'Accélère fortement la balle en phase offensive et la ralentit à 280 px/s à l’approche de la raquette.',
    levelDetails: [
      'Balle : +60 % (960 px/s) · Raquette : +10 % · Durée : 10s',
      'Balle : +80 % (1080 px/s) · Raquette : +20 % · Durée : 11s',
      'Balle : +100 % (1200 px/s) · Raquette : +30 % · Durée : 12s',
      'Balle : +120 % (1320 px/s) · Raquette : +40 % · Durée : 13s',
      'Balle : +140 % (1440 px/s) · Raquette : +50 % · Durée : 14s',
    ],
  },
  {
    id: 'expand',
    name: 'ExpandPaddle',
    category: 'paddle',
    accent: '#32ff50',
    sprite: '/assets/RebreakerReloaded/workshop/badge_expand.png',
    previewSlug: 'expand',
    effect: 'Élargit la raquette et augmente la chance de faire tomber des capsules bonus.',
    levelDetails: [
      'Largeur ×1.20 (144 px) · Durée : 10s · 10 % drop (1 bonus)',
      'Largeur ×1.40 (168 px) · Durée : 12s · 20 % drop (1 bonus)',
      'Largeur ×1.60 (192 px) · Durée : 14s · 30 % drop (2 bonus simultanés)',
      'Largeur ×1.80 (216 px) · Durée : 16s · 40 % drop (2 bonus simultanés)',
      'Largeur ×2.00 (240 px) · Durée : 18s · 50 % drop (3 bonus simultanés)',
    ],
  },
  {
    id: 'shrink',
    name: 'ShrinkPaddle',
    category: 'paddle',
    accent: '#ff3c3c',
    sprite: '/assets/RebreakerReloaded/workshop/badge_shrink.png',
    previewSlug: 'shrink',
    effect: 'Mode Agilité : réduit la largeur à ×0.65 (78 px) en échange d’une vitesse de raquette décuplée.',
    levelDetails: [
      'Vitesse raquette +20 % (840 px/s) · Durée : 10s · 10 % drop (1 bonus)',
      'Vitesse raquette +40 % (980 px/s) · Durée : 12s · 20 % drop (1 bonus)',
      'Vitesse raquette +60 % (1120 px/s) · Durée : 14s · 30 % drop (2 bonus)',
      'Vitesse raquette +80 % (1260 px/s) · Durée : 16s · 40 % drop (2 bonus)',
      'Vitesse raquette +100 % (1400 px/s) · Durée : 18s · 50 % drop (3 bonus)',
    ],
  },
  {
    id: 'extralife',
    name: 'ExtraLife',
    category: 'tactical',
    accent: '#ff64b4',
    sprite: '/assets/RebreakerReloaded/workshop/badge_extralife.png',
    previewSlug: 'extralife',
    effect: 'Restaure des vies et repousse le plafond de cœurs (jaunes puis verts).',
    levelDetails: [
      '+1 vie · Plafond : 4 vies (débloque le 1er cœur jaune)',
      '+2 vies · Plafond : 5 vies (jusqu’à 2 cœurs jaunes)',
      '+3 vies · Plafond : 6 vies (3 cœurs jaunes)',
      '+4 vies · Plafond : 7 vies (débloque le 1er cœur vert)',
      '+6 vies · Plafond : 9 vies (3 cœurs verts maximum)',
    ],
  },
];

export interface BrickArchetype {
  id: 'light' | 'medium' | 'hard' | 'special' | 'metal' | 'bomb' | 'turret' | 'lantern';
  name: string;
  hp: string;
  score: string;
  color: string;
  border: string;
  tierColors?: string[];
  description: string;
}

export const BRICK_ARCHETYPES: BrickArchetype[] = [
  {
    id: 'light',
    name: 'Light',
    hp: '1 PV',
    score: '50 pts',
    color: '#3cdc5a',
    border: '#8bffa0',
    tierColors: ['#3cdc5a', '#32f0ff', '#ff78f0', '#ffc332'],
    description:
      'Brique standard détructible en 1 coup. Gagne +1 PV et de nouvelles teintes par palier d’armure en mode Endless.',
  },
  {
    id: 'medium',
    name: 'Medium',
    hp: '2 PV',
    score: '100 pts',
    color: '#ffdc28',
    border: '#fff08a',
    tierColors: ['#ffdc28', '#00d7af', '#c846ff', '#ff4b2d'],
    description:
      'Brique blindée qui se fissure progressivement à l’impact via le shader crack.frag avant de céder.',
  },
  {
    id: 'hard',
    name: 'Hard',
    hp: '3 PV',
    score: '200 pts',
    color: '#f0323c',
    border: '#ff858c',
    tierColors: ['#f0323c', '#1e8cff', '#961eeb', '#820f2d'],
    description:
      'Brique lourde à 3 PV de base (+2 PV par palier d’armure en mode Endless, jusqu’à 9 PV).',
  },
  {
    id: 'special',
    name: 'Bonus',
    hp: '1 PV',
    score: 'Régénère',
    color: '#ff28f0',
    border: '#ffa6fa',
    description:
      'Libère une capsule Power-Up garantie (shader lucky.frag) puis se régénère automatiquement après 30s.',
  },
  {
    id: 'metal',
    name: 'Métal',
    hp: '∞ PV',
    score: '500 pts',
    color: '#b4c3d2',
    border: '#e1ebfa',
    description:
      'Résiste aux balles classiques, à BigBall et aux bombes (brisable avec FireBall ou un Ultime). Conductrice : propage les éclairs de Storm aux briques métalliques adjacentes et électrocute leurs voisines.',
  },
  {
    id: 'bomb',
    name: 'Bombe',
    hp: '1 PV',
    score: '150 pts',
    color: '#ff5014',
    border: '#ffaa32',
    tierColors: ['#ff5014', '#ff2878'],
    description:
      'Explose au contact en détruisant les briques voisines et déclenche des réactions en chaîne entre bombes.',
  },
  {
    id: 'turret',
    name: 'Tourelle',
    hp: '3 PV',
    score: '200 pts',
    color: '#e1284b',
    border: '#ff7a93',
    description:
      'Brique offensive (Story & Level Maker) qui tire périodiquement des projectiles triangulaires vers la raquette.',
  },
  {
    id: 'lantern',
    name: 'Lanterne',
    hp: '1 PV',
    score: '120 pts',
    color: '#ffeb78',
    border: '#fff7c2',
    description:
      'Émetteur de lumière dynamique (rayon 230 px) qui éclaire les niveaux sombres tant qu’elle reste intacte.',
  },
];

export interface UltimateSpec {
  id: 'plasma' | 'disco' | 'rain';
  name: string;
  category: string;
  codeName: string;
  color: string;
  description: string;
  shader: string;
  previewSlug: string;
  levelDetails: [string, string, string, string, string];
}

export const ULTIMATES: UltimateSpec[] = [
  {
    id: 'plasma',
    name: 'Plasma Orb',
    category: 'DESTRUCTION / CHAIN REACTION',
    codeName: 'ExecutePlasmaOrb()',
    color: '#50dcff',
    description:
      'Lance des orbes de plasma haute énergie qui vaporisent les briques au contact et se scindent en grappes d’orbes explosives à la détonation.',
    shader: 'plasma_orb.frag',
    previewSlug: 'ultimate_plasma',
    levelDetails: [
      '1 orbe de plasma (2 dégâts), se divise en 2 petites orbes explosives',
      '2 orbes de plasma (2 dégâts), chacune se divise en 2 petites orbes explosives',
      '2 orbes agrandies (3 dégâts), se divisent en 4 puis 2 orbes',
      '3 orbes agrandies (3 dégâts), se divisent en 4 puis 2 orbes',
      '3 méga orbes de plasma (4 dégâts), se divisent en 8 puis 4 puis 2',
    ],
  },
  {
    id: 'disco',
    name: 'Disco Ball',
    category: 'ACOUSTIC SHOCKWAVE / LIGHT SHOW',
    codeName: 'ExecuteDiscoBall()',
    color: '#f54173',
    description:
      'Déclenche la fièvre disco : ondes de choc acoustiques depuis la raquette, projecteurs rotatifs, grosses balles arc-en-ciel dansantes et final boule à facettes.',
    shader: 'disco_ball.frag',
    previewSlug: 'ultimate_disco',
    levelDetails: [
      'Onde de choc 30 % hauteur (1 dégât), 2 grosses balles arc-en-ciel & rythme funk',
      'Onde de choc 40 % hauteur (1 dégât), 3 grosses balles arc-en-ciel',
      'Onde de choc 50 % hauteur (2 dégâts), 4 grosses balles arc-en-ciel',
      'Onde de choc 60 % hauteur (2 dégâts), 5 grosses balles arc-en-ciel',
      '2 ondes de choc jusqu’à 70 % hauteur (2 dégâts), 6 grosses balles & Boule à Facettes (5s)',
    ],
  },
  {
    id: 'rain',
    name: 'Power-Up Rain',
    category: 'SUPPORT / ORBITAL DROP',
    codeName: 'ExecutePowerUpRain()',
    color: '#ffd73c',
    description:
      'Invoque une pluie orbitale de capsules de power-ups améliorés sur toute la largeur de l’arène.',
    shader: 'lucky.frag',
    previewSlug: 'ultimate_rain',
    levelDetails: [
      'Cascade de 5 à 12 power-ups (niveaux 1 à 3)',
      'Cascade de 10 à 24 power-ups (niveaux 1 à 3)',
      'Cascade de 15 à 36 power-ups (niveaux 1 à 4)',
      'Cascade de 20 à 48 power-ups (niveaux 2 à 5)',
      'Cascade de 25 à 60 power-ups (niveaux 2 à 5)',
    ],
  },
];

export interface EngineModuleSpec {
  id: string;
  name: string;
  cmakeTarget: string;
  targetType: 'Executable' | 'STATIC';
  directory: string;
  color: string;
  deps: string[];
  links: string[];
  summary: string;
  highlights: string[];
  keyClasses: string[];
}

export const ENGINE_MODULES: EngineModuleSpec[] = [
  {
    id: 'game',
    name: 'Game',
    cmakeTarget: 'RebreakerReload',
    targetType: 'Executable',
    directory: 'Game/',
    color: '#50dcff',
    deps: ['Engine', 'Render', 'Audio', 'Core'],
    links: ['Engine', 'Render', 'Audio', 'Core'],
    summary:
      'Point d’entrée exécutable rassemblant toutes les scènes jouables, la génération de niveaux, la boucle de jeu et les contrôleurs d’interface.',
    highlights: [
      'Scènes dédiées : MenuScene (TV CRT interactive), GameScene, EndlessScene, CustomGameScene, LevelSelectScene, EditorScene, StoryScene et PreviewScene.',
      'Générateurs de niveaux découplés via ILevelGenerator : FileLevelGenerator (.txt) pour la campagne et ProceduralEndlessGenerator + RogueliteDraft pour le mode infini.',
      'Contrôleurs UI factorisés : UIFactory, GameUIController (HUD/Pause) et SettingsUIController unifié (5 onglets) partagé entre le menu et la pause.',
      'Gestion du contenu et méta-progression : BrickFactory, ScoreManager, LeaderboardManager, PlaylistManager, CheatManager et miniatures générées (LevelThumbnail).',
    ],
    keyClasses: [
      'Application',
      'MenuScene',
      'GameScene',
      'EndlessScene',
      'EditorScene',
      'PreviewScene',
      'SettingsUIController',
      'ProceduralEndlessGenerator',
      'BrickFactory',
    ],
  },
  {
    id: 'engine',
    name: 'Engine',
    cmakeTarget: 'Engine',
    targetType: 'STATIC',
    directory: 'Engine/',
    color: '#ffaf37',
    deps: ['Core', 'Render', 'Audio'],
    links: ['Core', 'Render', 'Audio'],
    summary:
      'Cœur du moteur maison en C++20 : ECS Sparse-Set orienté données, systèmes temps réel, bus événementiel RAII, machine à états, inputs remappables et persistance JSON.',
    highlights: [
      'ECS maison (Registry, SparseSet, CommandBuffer différé, SystemManager) : 28 composants (physique, colliders, particules, trails, lumières, boss, UI) et 12 systèmes dédiés.',
      'Systèmes gameplay & rendu : PhysicsSystem, BallSystem, PaddleSystem, PowerUpSystem, DynamicEventSystem, GameFeelSystem, ParticleSystem, AnimatorSystem, TweenSystem et UISystem.',
      'Communication & cycle de vie : EventDispatcher typé avec ScopedSubscription RAII, SceneManager à transitions (StaticSnow / FadeBlack), StateMachine et GameContext.',
      'Inputs & données : InputManager + InputRemapManager (clavier/manette), PlayerPrefs, ProfileManager, LoreManager, PowerUpConfig et GameRules persistés en JSON.',
    ],
    keyClasses: [
      'Registry',
      'SparseSet',
      'CommandBuffer',
      'EventDispatcher',
      'ScopedSubscription',
      'SceneManager',
      'StateMachine',
      'GameContext',
      'InputRemapManager',
      'ProfileManager',
    ],
  },
  {
    id: 'render',
    name: 'Render',
    cmakeTarget: 'Render',
    targetType: 'STATIC',
    directory: 'Render/',
    color: '#f54173',
    deps: ['Core'],
    links: ['Core', 'SFML::Graphics', 'SFML::Window', 'SFML::System'],
    summary:
      'Couche d’abstraction graphique et fenêtrage au-dessus de SFML 3.0.2, isolant le reste du moteur des appels natifs et gérant le pipeline post-processing CRT.',
    highlights: [
      'Encapsulation complète du fenêtrage (Window, WindowConfig) et de la traduction d’événements natifs SFML (InputTranslator) pour garder Engine indépendant.',
      'Renderer avec viewport virtuel 1920×1080 indépendant de la résolution et surface offscreen CRT sf::RenderTexture 1390×910 MSAA 4×.',
      'Pipeline PostProcessParams pilotant les 9 shaders GLSL (crt_preview, fx, menu_fx, plasma_orb, plasma, disco_ball, lucky, crack, scanner).',
      'Types de rendu découplés : Vertex, BlendMode, PrimitiveType, Color et SceneTransitionType.',
    ],
    keyClasses: [
      'Renderer',
      'Window',
      'WindowConfig',
      'InputTranslator',
      'PostProcessParams',
      'SceneTransitionType',
      'BlendMode',
    ],
  },
  {
    id: 'audio',
    name: 'Audio',
    cmakeTarget: 'Audio',
    targetType: 'STATIC',
    directory: 'Audio/',
    color: '#32e18c',
    deps: ['Core'],
    links: ['Core', 'SFML::Audio', 'SFML::System'],
    summary:
      'Sous-système audio multi-bus thread-safe basé sur SFML Audio, conçu pour encaisser les rafales d’impacts arcade sans saturation ni coupure.',
    highlights: [
      'AudioMixer multi-bus séparant Master, SFX et Music avec fondu musical progressif et modulation dynamique de pitch selon les combos.',
      'Voice pooling pour les effets sonores simultanés afin d’éviter la saturation lors des MultiBall, Storm ou explosions en chaîne.',
      'Streaming BGM protégé contre les accès concurrents (Vorbis) et synchronisation avec les barres de volume 10 LED.',
      'Changement à chaud du périphérique audio de sortie directement depuis les paramètres sans redémarrer le jeu.',
    ],
    keyClasses: ['AudioMixer'],
  },
  {
    id: 'core',
    name: 'Core',
    cmakeTarget: 'Core',
    targetType: 'STATIC',
    directory: 'Core/',
    color: '#a569ff',
    deps: [],
    links: ['SFML::Graphics', 'SFML::Audio', 'SFML::System'],
    summary:
      'Socle bas niveau sans dépendance interne, partagé par l’ensemble des autres modules pour le chargement des ressources et l’exécution asynchrone.',
    highlights: [
      'ResourceManager<T> générique (header + .inl) centralisant le chargement, le cache mémoire et la durée de vie des textures, polices, shaders et buffers audio.',
      'ThreadPool dédié aux tâches de fond et au préchargement asynchrone pour éviter les freezes lors des transitions de scènes.',
      'Base commune linkée en PUBLIC par Audio, Render, Engine et Game, garantissant un graphe de dépendances acyclique.',
    ],
    keyClasses: ['ResourceManager<T>', 'ThreadPool'],
  },
];

export const EVOLUTION_COMPARISON = [
  {
    metric: 'Contexte',
    original: 'Projet d’école Bachelor · Équipe de 3',
    reloaded: 'Projet personnel solo (PASCAL Noa)',
  },
  {
    metric: 'Durée',
    original: '2 semaines',
    reloaded: '~7 mois · 240+ commits',
  },
  {
    metric: 'Stack & Rendu',
    original: 'C++ / SFML 2 · Rendu 2D classique',
    reloaded: 'C++20 / SFML 3.0.2 · 9 Shaders GLSL + TV CRT MSAA 4×',
  },
  {
    metric: 'Architecture',
    original: 'Premières bases ECS',
    reloaded: '5 modules découplés, Sparse-Set ECS, RAII Events',
  },
  {
    metric: 'Contenu',
    original: 'Campagne basique',
    reloaded: 'Campagne, Endless, Level Maker, Workshop, 12 Power-Ups, 3 Ultimates',
  },
  {
    metric: 'Tests',
    original: 'Tests manuels',
    reloaded: '155 tests doctest (2 122 assertions) + --smoke-test E2E',
  },
];
