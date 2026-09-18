import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "rebreaker",
    title: "Rebreaker",
    category: "game",
    image: "/assets/Rebreaker/projet-rebreaker.webp",
    description: "Casse-brique moderne développé en équipe avec moteur physique et mécaniques revisitées.",
    technologies: ["C++", "SFML", "Game Dev"],
    githubUrl: "https://github.com/Razar30/Rebreaker",
    detailUrl: "/pages/rebreaker.html",
    featured: true
  },
  {
    id: "ruins-of-hestia",
    title: "Ruins of Hestia",
    category: "game",
    image: "/assets/Ruins of Hestia/projet-hestia.png",
    description: "Jeu d'aventure action complet conçu avec une équipe pluridisciplinaire au Gaming Campus.",
    technologies: ["C++", "Moteur Maison", "Architecture"],
    githubUrl: "https://github.com/PASCAL-Noa/Ruins-of-Hestia",
    detailUrl: "/pages/roh.html",
    featured: true
  },
  {
    id: "moteur-3d",
    title: "Moteur 3D",
    category: "engine",
    image: "/assets/Moteur/projet-moteur.webp",
    description: "Moteur de rendu 3D temps réel explorant le pipeline programmable et l'éclairage moderne.",
    technologies: ["C++", "DirectX12", "Shaders", "Physique"],
    githubUrl: "https://github.com/PASCAL-Noa/Moteur",
    detailUrl: "/pages/moteur.html",
    featured: true
  },
  {
    id: "physics-engine",
    title: "Physics Engine DX12",
    category: "engine",
    image: "/assets/PhysicsEngine/projet-physicsengine.jpg",
    description: "Moteur physique haute performance couplé à DirectX12 pour simulation et collision temps réel.",
    technologies: ["C++", "DirectX12", "Maths", "Physique 3D"],
    githubUrl: "https://github.com/PASCAL-Noa/Physics-Engine-DX12",
    detailUrl: "/pages/physicsengine.html",
    featured: true
  },
  {
    id: "audio-engine",
    title: "Éditeur Audio (AudioEngine)",
    category: "engine",
    image: "/assets/AudioEngine/projet-audioengine.png",
    description: "Système et éditeur audio temps réel exploitant les API audio bas-niveau pour les jeux.",
    technologies: ["C++", "XAudio2", "RtAudio", "ImGui"],
    githubUrl: "https://github.com/PASCAL-Noa/AudioEngine/releases/tag/v1.0",
    detailUrl: "/pages/audioEngine.html"
  },
  {
    id: "asteroides",
    title: "Asteroides",
    category: "game",
    image: "/assets/Asteroides/projet-asteroides.webp",
    description: "Remake moderne du classique Asteroids marquant mes débuts approfondis en C++.",
    technologies: ["C++", "SFML", "OOP"],
    githubUrl: "https://github.com/PASCAL-Noa/Asteroides/releases/",
    detailUrl: "/pages/asteroides.html"
  },
  {
    id: "novastrike",
    title: "Nova-Strike",
    category: "game",
    image: "/assets/NovaStrike/projet-novastrike.webp",
    description: "Shoot'em up spatial nerveux avec patterns de tirs procéduraux et gestion des collisions.",
    technologies: ["C++", "SFML", "Game Design"],
    githubUrl: "https://github.com/PASCAL-Noa/NovaStrike",
    detailUrl: "/pages/novastrike.html"
  },
  {
    id: "stage-2025",
    title: "Stage 2025 (Studio d'enregistrement)",
    category: "web",
    image: "/assets/Stage-2025/stage.webp",
    description: "Site vitrine complet et interactif conçu sur Figma puis développé pour un studio d'enregistrement.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Figma"],
    githubUrl: "https://github.com/PASCAL-Noa/Stage-2025",
    liveUrl: "https://pascal-noa.github.io/Stage-2025/"
  },
  {
    id: "guide-kyoto",
    title: "Guide Kyoto",
    category: "web",
    image: "/assets/Guide-Kyoto/hero-background-semi-dark.jpg",
    description: "Guide touristique immersif et interactif sur la ville de Kyoto avec design soigné.",
    technologies: ["Web", "Responsive", "UI/UX"],
    githubUrl: "https://github.com/PASCAL-Noa/Guide-Kyoto",
    liveUrl: "https://pascal-noa.github.io/Guide-Kyoto/"
  },
  {
    id: "ascii-art",
    title: "ASCII ART Generator",
    category: "other",
    image: "/assets/AsciiArt/projet-asciiart.png",
    description: "Outil de conversion d'images matricielles en art typographique ASCII en console.",
    technologies: ["C++", "Algorithmique", "Image Processing"],
    githubUrl: "https://github.com/PASCAL-Noa/ASCII-ART",
    detailUrl: "/pages/asciiart.html"
  },
  {
    id: "galaxy",
    title: "Galaxy",
    category: "game",
    image: "/assets/Galaxy/projet-galaxy.webp",
    description: "Projet de jeu arcade et simulation de trajectoire spatiale développé en Python.",
    technologies: ["Python", "Pygame"],
    githubUrl: "https://github.com/PASCAL-Noa/Galaxy",
    detailUrl: "/pages/galaxy.html"
  },
  {
    id: "mr-beat",
    title: "Mr Beat",
    category: "game",
    image: "/assets/MrBeat/projet-mrbeat.webp",
    description: "Jeu de rythme musical mettant en jeu le tempo et des graphismes réactifs.",
    technologies: ["Python", "Audio", "Pygame"],
    githubUrl: "https://github.com/PASCAL-Noa/MrBeat",
    detailUrl: "/pages/mrbeat.html"
  },
  {
    id: "piscine-42",
    title: "Piscine 42 Lyon",
    category: "other",
    image: "/assets/42/42.webp",
    description: "Immersion intensive de 4 semaines en langage C avec rigueur algorithmique extrême et peer-learning.",
    technologies: ["C", "Shell", "Algorithmique", "Peer-learning"],
    githubUrl: "https://github.com/PASCAL-Noa/Piscine-42",
    detailUrl: "/pages/piscine42.html"
  }
];
