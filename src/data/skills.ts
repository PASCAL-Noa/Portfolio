import { SkillCategory, TimelineItem } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    title: "Moteurs & Bas Niveau",
    skills: [
      { name: "C++" },
      { name: "DirectX12" },
      { name: "Vulkan" },
      { name: "GLM" },
      { name: "GLFW" },
      { name: "CMake" },
      { name: "XAudio2" },
      { name: "RtAudio" },
      { name: "SFML" },
      { name: "ImGui" }
    ]
  },
  {
    title: "Web & Frontend",
    skills: [
      { name: "ReactJS" },
      { name: "TypeScript" },
      { name: "TailwindCSS" },
      { name: "Vite" },
      { name: "NodeJS" },
      { name: "Prisma" },
      { name: "Django" },
      { name: "PHP" },
      { name: "SQL" }
    ]
  },
  {
    title: "Outils & Environnement",
    skills: [
      { name: "JetBrains" },
      { name: "Visual Studio 2022" },
      { name: "VS Code" },
      { name: "Git & GitHub" },
      { name: "Unity" },
      { name: "Photoshop" },
      { name: "ClickUp" },
      { name: "Miro" }
    ]
  },
  {
    title: "Méthodologie & Humain",
    skills: [
      { name: "Gestion de projet" },
      { name: "Travail d'équipe" },
      { name: "Rigueur algorithmique" },
      { name: "Communication" },
      { name: "Sens des responsabilités" }
    ]
  }
];

export const timelineItems: TimelineItem[] = [
  {
    id: "ecole-du-web",
    period: "2025 - Présent",
    title: "École du Web",
    subtitle: "Formation en ligne en développement web",
    description: "Perfectionnement HTML, CSS, JavaScript, React, ainsi que les bases back-end (SQL, PHP, Django).",
    image: "/assets/Timeline/ecoleduweb.png",
    type: "online",
    link: "https://www.ecole-du-web.net/",
    linkText: "Visiter l'École du Web"
  },
  {
    id: "intermarche",
    period: "2024 - Présent",
    title: "Employé Commercial",
    subtitle: "Intermarché",
    description: "Autonomie, rigueur et sens des responsabilités au quotidien en milieu professionnel.",
    image: "/assets/Timeline/intermarche.png",
    type: "pro"
  },
  {
    id: "gaming-campus",
    period: "2023 - 2026",
    title: "Bachelor Gaming Campus",
    subtitle: "Développeur informatique option JV",
    description: "Pédagogie par projet et travail en équipe pluridisciplinaire (développeurs, game designers, artistes).",
    image: "/assets/Timeline/gamingcampus.jpg",
    type: "edu"
  },
  {
    id: "piscine-42",
    period: "Août 2025",
    title: "Piscine 42 Lyon",
    subtitle: "Campus 42 Lyon",
    description: "Immersion intensive en langage C : logique algorithmique poussée et peer-learning continu.",
    image: "/assets/42/42.webp",
    type: "edu"
  },
  {
    id: "stage-2025",
    period: "Juin - Août 2025",
    title: "Stage Développeur Front-End",
    subtitle: "Studio d'enregistrement",
    description: "Réalisation d'une maquette Figma et développement d'un site vitrine interactif en distanciel.",
    image: "/assets/Stage-2025/stage.webp",
    type: "tech"
  },
  {
    id: "formation-python",
    period: "2024",
    title: "Formation Python",
    subtitle: "Udemy",
    description: "Apprentissage des bases de Python et réalisation de deux projets : Galaxy et Mr. Beat.",
    image: "/assets/Timeline/formation_python.jpg",
    type: "online"
  },
  {
    id: "formation-cpp",
    period: "2024",
    title: "Formation C++",
    subtitle: "Udemy",
    description: "Apprentissage des fondations C++ et réalisation de mon tout premier projet : Asteroids.",
    image: "/assets/Timeline/c++.webp",
    type: "online"
  },
  {
    id: "bootcamp-lua",
    period: "2023",
    title: "Bootcamp Jeux Vidéo",
    subtitle: "Avec David Mekersa",
    description: "Atelier intensif de 48h : conception et programmation d'un jeu complet en Lua.",
    image: "/assets/Timeline/gamingcampus2.jpg",
    type: "edu"
  },
  {
    id: "formation-cs",
    period: "2021",
    title: "Formation C#",
    subtitle: "Udemy",
    description: "Apprentissage des bases du C#. Première formation et point de départ de ma passion pour la programmation.",
    image: "/assets/Timeline/formation_cs.jpg",
    type: "online"
  }
];
