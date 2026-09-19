export interface ProjectDetailData {
  projectId: string;
  title: string;
  banner: string;
  description: string;
  duration: string;
  team: string;
  tags: { label: string; variant?: string }[];
  downloadUrl?: string;
  downloadLabel?: string;
  docUrl?: string;
  docLabel?: string;
  videoUrl?: string;
  media: { type: 'video' | 'image'; src: string; alt?: string }[];
  thumbnails: string[];
}

export const projectDetails: Record<string, ProjectDetailData> = {
  "rebreaker": {
    "projectId": "rebreaker",
    "title": "Rebreaker",
    "banner": "/assets/Rebreaker/projet-rebreaker.webp",
    "description": "<strong>Rebreaker</strong> est l'un de mes projets d'école les plus ambitieux.\r\n              Développé lors de ma deuxième année de Bachelor, ce projet s'est rapidement imposé comme une réussite technique majeure.<br><br>\r\n              Il m'a permis d'explorer des concepts avancés en programmation de jeux vidéo, notamment les fondations d'une architecture ECS (Entity Component System), l'intégration de shaders graphiques et la maîtrise de la bibliothèque multimédia SFML.<br><br>\r\n              Ce projet a également marqué une utilisation approfondie de la bibliothèque standard C++ (STL), consolidant mes compétences en gestion de la mémoire, structures de données algorithmiques et performances en temps réel.",
    "duration": "2 semaines",
    "team": "PASCAL Noa, GILOTIN Ethan, VILLARD-HERNANDEZ Mithaniel",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "C++",
        "variant": "default"
      },
      {
        "label": "Rider",
        "variant": "default"
      },
      {
        "label": "SFML",
        "variant": "default"
      },
      {
        "label": "Équipe de 3",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/Razar30/Rebreaker/releases",
    "downloadLabel": "Télécharger Rebreaker",
    "docUrl": "/assets/Rebreaker/cdc-rebreaker.pdf",
    "docLabel": "Télécharger le Cahier des Charges",
    "videoUrl": "https://www.youtube.com/embed/RJzi27_0S90",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/RJzi27_0S90"
      },
      {
        "type": "image",
        "src": "/assets/Rebreaker/rebreaker2.webp",
        "alt": "Capture d'écran du gameplay de Rebreaker niveau 1"
      },
      {
        "type": "image",
        "src": "/assets/Rebreaker/rebreaker3.webp",
        "alt": "Capture d'écran de l'affichage des bonus dans Rebreaker"
      },
      {
        "type": "image",
        "src": "/assets/Rebreaker/rebreaker4.webp",
        "alt": "Capture d'écran des effets de particules dans Rebreaker"
      },
      {
        "type": "image",
        "src": "/assets/Rebreaker/rebreaker5.webp",
        "alt": "Capture d'écran du boss de fin dans Rebreaker"
      }
    ],
    "thumbnails": [
      "/assets/Rebreaker/rebreaker-video.webp",
      "/assets/Rebreaker/rebreaker2.webp",
      "/assets/Rebreaker/rebreaker3.webp",
      "/assets/Rebreaker/rebreaker4.webp",
      "/assets/Rebreaker/rebreaker5.webp"
    ]
  },
  "ruins-of-hestia": {
    "projectId": "ruins-of-hestia",
    "title": "Ruins of Hestia",
    "banner": "/assets/Ruins%20of%20Hestia/projet-hestia.png",
    "description": "<strong>Ruins of Hestia</strong> est mon projet d'envergure final de bachelor au sein du Gaming Campus.<br><br>\r\n              Avec mon équipe, nous avons développé un moteur 3D personnalisé en C++ avec l'API graphique Vulkan, sur lequel nous avons bâti un jeu articulé autour de deux boucles de gameplay distinctes :<br><br>\r\n              Une première phase de gestion et d'expansion de village stratégique, suivie d'expéditions périlleuses pour affronter des vagues d'ennemis et collecter des ressources précieuses. Ce projet a constitué une opportunité unique d'appliquer des méthodes agiles au sein d'une équipe de grande taille.",
    "duration": "2 mois",
    "team": "",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "C++",
        "variant": "default"
      },
      {
        "label": "CLion",
        "variant": "default"
      },
      {
        "label": "CMake",
        "variant": "default"
      },
      {
        "label": "Vulkan",
        "variant": "default"
      },
      {
        "label": "GLM",
        "variant": "default"
      },
      {
        "label": "GLFW",
        "variant": "default"
      },
      {
        "label": "RtAudio",
        "variant": "default"
      },
      {
        "label": "Équipe de 21",
        "variant": "default"
      },
      {
        "label": "Gestion de projet",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/Ruins-of-Hestia/releases",
    "downloadLabel": "Télécharger Ruins of Hestia",
    "docUrl": "",
    "docLabel": "",
    "videoUrl": "https://www.youtube.com/embed/FZvLwOm1xVM?si=2IS9qcw50s1T1VL2",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/FZvLwOm1xVM?si=2IS9qcw50s1T1VL2"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH1.png",
        "alt": "Vue du village et des bâtiments dans Ruins of Hestia"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH2.png",
        "alt": "Phase d'exploration et de collecte dans Ruins of Hestia"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH3.png",
        "alt": "Interface d'artisanat et gestion des ressources"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH4.png",
        "alt": "Combat contre des monstres en expédition"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH5.png",
        "alt": "Ambiance nocturne et éclairage dynamique Vulkan"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH6.png",
        "alt": "Environnement des ruines anciennes"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH7.png",
        "alt": "Arbre de compétences du personnage"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH8.png",
        "alt": "Scène d'affrontement cinématique"
      },
      {
        "type": "image",
        "src": "/assets/Ruins%20of%20Hestia/RoH9.png",
        "alt": "Menu principal et interface utilisateur"
      }
    ],
    "thumbnails": [
      "/assets/Ruins%20of%20Hestia/projet-hestia.png",
      "/assets/Ruins%20of%20Hestia/RoH1.png",
      "/assets/Ruins%20of%20Hestia/RoH2.png",
      "/assets/Ruins%20of%20Hestia/RoH3.png",
      "/assets/Ruins%20of%20Hestia/RoH4.png",
      "/assets/Ruins%20of%20Hestia/RoH5.png",
      "/assets/Ruins%20of%20Hestia/RoH6.png",
      "/assets/Ruins%20of%20Hestia/RoH7.png",
      "/assets/Ruins%20of%20Hestia/RoH8.png",
      "/assets/Ruins%20of%20Hestia/RoH9.png"
    ]
  },
  "moteur-3d": {
    "projectId": "moteur-3d",
    "title": "Moteur 3D DX12",
    "banner": "/assets/Moteur/projet-moteur.webp",
    "description": "Le projet <strong>Moteur</strong>, en plus d'être l'un des défis les plus ambitieux de mon parcours scolaire, compte parmi mes réalisations techniques les plus significatives.<br><br>\r\n              Durant un mois intensif, nous avons développé de zéro un moteur de jeu 3D en utilisant l'API bas niveau DirectX12. Le processus a débuté par l'initialisation du pipeline graphique DX12 et l'affichage d'un premier polygone, avant d'intégrer un analyseur de fichiers .obj pour importer des modèles 3D complexes.<br><br>\r\n              Nous avons ensuite implémenté une architecture logicielle modulaire basée sur un système ECS et un système d'attachement de composants de script en C++ inspiré de la structure d'Unity.",
    "duration": "4 semaines",
    "team": "PASCAL Noa, COLUCCI Zian, FOURNIER Mathis, DUPERREY Lucas",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "C++",
        "variant": "default"
      },
      {
        "label": "Rider",
        "variant": "default"
      },
      {
        "label": "DirectX12",
        "variant": "default"
      },
      {
        "label": "Équipe de 4",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/Moteur/releases",
    "downloadLabel": "Télécharger le moteur",
    "docUrl": "/assets/Moteur/cdc-moteur.pdf",
    "docLabel": "Télécharger le Cahier des Charges",
    "videoUrl": "https://www.youtube.com/embed/L92Q-DnGABE",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/L92Q-DnGABE"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur2.webp",
        "alt": "Rendu de mesh complexe dans le moteur DirectX12"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur3.webp",
        "alt": "Gestion des caméras et de la perspective 3D"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur4.webp",
        "alt": "Éclairage directionnel et ombrage des surfaces"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur5.webp",
        "alt": "Visualisation du frustum culling et du pipeline"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur6.webp",
        "alt": "Affichage multifenêtre et débogage graphique"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur7.webp",
        "alt": "Simulation d'objets multiples dans la scène"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur8.webp",
        "alt": "Structure de scène et hiérarchie d'entités ECS"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur9.webp",
        "alt": "Gestion des textures et mapping UV"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur10.webp",
        "alt": "Visualisation filaire des polygones"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur11.webp",
        "alt": "Rendu de reflets et matériaux spéculaires"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur12.webp",
        "alt": "Test de charge avec des milliers de géométries"
      },
      {
        "type": "image",
        "src": "/assets/Moteur/moteur13.webp",
        "alt": "Scène finale complète avec scripts C++"
      }
    ],
    "thumbnails": [
      "/assets/Moteur/moteur-video.webp",
      "/assets/Moteur/moteur2.webp",
      "/assets/Moteur/moteur3.webp",
      "/assets/Moteur/moteur4.webp",
      "/assets/Moteur/moteur5.webp",
      "/assets/Moteur/moteur6.webp",
      "/assets/Moteur/moteur7.webp",
      "/assets/Moteur/moteur8.webp",
      "/assets/Moteur/moteur9.webp",
      "/assets/Moteur/moteur10.webp",
      "/assets/Moteur/moteur11.webp",
      "/assets/Moteur/moteur12.webp",
      "/assets/Moteur/moteur13.webp"
    ]
  },
  "physics-engine": {
    "projectId": "physics-engine",
    "title": "Physics Engine DX12",
    "banner": "/assets/PhysicsEngine/projet-physicsengine.jpg",
    "description": "<strong>Physics Engine</strong> est un moteur physique 3D temps réel conçu en langage C++ et interfacé avec DirectX12.<br><br>\r\n              Il a pour vocation de simuler des interactions physiques précises : détection et résolution de collisions entre solides, calcul des vecteurs d'impulsion, friction et simulation des forces gravitationnelles (dont la mécanique orbitale).<br><br>\r\n              Ce projet a permis d'approfondir la dynamique du corps rigide, les méthodes d'intégration numérique temporelle et l'optimisation des structures d'accélération spatiale.",
    "duration": "2 semaines",
    "team": "PASCAL Noa, VANNIER Hugo, CAPITAINE Hugo",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "C++",
        "variant": "default"
      },
      {
        "label": "CLion",
        "variant": "default"
      },
      {
        "label": "DirectX12",
        "variant": "default"
      },
      {
        "label": "Physics",
        "variant": "default"
      },
      {
        "label": "3D",
        "variant": "default"
      },
      {
        "label": "CMake",
        "variant": "default"
      },
      {
        "label": "Équipe de 3",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/Physics-Engine-DX12",
    "downloadLabel": "Télécharger Physics Engine",
    "docUrl": "",
    "docLabel": "",
    "videoUrl": "/assets/PhysicsEngine/Standard.mp4",
    "media": [
      {
        "type": "video",
        "src": "/assets/PhysicsEngine/Standard.mp4",
        "alt": "Simulation standard du Physics Engine"
      },
      {
        "type": "video",
        "src": "/assets/PhysicsEngine/Orbital.mp4",
        "alt": "Simulation orbitale du Physics Engine"
      }
    ],
    "thumbnails": [
      "/assets/PhysicsEngine/standard.png",
      "/assets/PhysicsEngine/orbital.png"
    ]
  },
  "audio-engine": {
    "projectId": "audio-engine",
    "title": "Éditeur Audio",
    "banner": "/assets/AudioEngine/projet-audioengine.png",
    "description": "<strong>Éditeur Audio</strong> est un moteur audio temps réel développé en C++, enrichi d'une interface graphique conçue avec Dear ImGui.<br><br>\r\n              Il propose des fonctionnalités de mixage multicanal, de traitement du signal numérique (DSP) et de spatialisation sonore tridimensionnelle pour les jeux vidéo sur plateforme Windows.<br><br>\r\n              Bâti nativement sur les API Microsoft XAudio2 et X3DAudio, le moteur est architecturé pour minimiser la latence d'entrée-sortie et offrir un positionnement acoustique précis dans l'espace.",
    "duration": "1 semaine",
    "team": "PASCAL Noa, GILOTIN Ethan, VILLARD-HERNANDEZ Mithaniel",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "C++",
        "variant": "default"
      },
      {
        "label": "CLion",
        "variant": "default"
      },
      {
        "label": "XAudio2",
        "variant": "default"
      },
      {
        "label": "X3DAudio",
        "variant": "default"
      },
      {
        "label": "ImGui",
        "variant": "default"
      },
      {
        "label": "CMake",
        "variant": "default"
      },
      {
        "label": "Équipe de 3",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/AudioEngine/releases/tag/v1.0",
    "downloadLabel": "Télécharger Audio Engine",
    "docUrl": "/assets/AudioEngine/CDC_EditeurAudio.pdf",
    "docLabel": "Télécharger le Cahier des Charges",
    "videoUrl": "https://www.youtube.com/embed/VfV3-HmY9aU?si=mZV4AtlpVdp0fUyA",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/VfV3-HmY9aU?si=mZV4AtlpVdp0fUyA"
      }
    ],
    "thumbnails": [
      "/assets/AudioEngine/projet-audioengine.png"
    ]
  },
  "mr-beat": {
    "projectId": "mr-beat",
    "title": "Mr. Beat",
    "banner": "/assets/MrBeat/projet-mrbeat.webp",
    "description": "<strong>Mr. Beat</strong> est un projet de beatbox et de boîte à rythmes interactif développé en langage Python.<br><br>\r\n              L'application permet d'ordonnancer des échantillons audio, de piloter avec précision le tempo et de gérer les flux sonores en temps réel.<br><br>\r\n              Face à l'obsolescence de la bibliothèque recommandée dans le support de cours initial, j'ai pris l'initiative de réécrire le moteur audio en m'appuyant sur des technologies modernes : <em>sounddevice</em> et <em>numpy</em> pour le traitement des buffers numériques, tout en refondant l'interface sous Kivy.",
    "duration": "1 semaine",
    "team": "PASCAL Noa",
    "tags": [
      {
        "label": "Formation Udemy",
        "variant": "purple"
      },
      {
        "label": "Python",
        "variant": "default"
      },
      {
        "label": "PyCharm",
        "variant": "default"
      },
      {
        "label": "Kivy",
        "variant": "default"
      },
      {
        "label": "Sounddevice",
        "variant": "default"
      },
      {
        "label": "NumPy",
        "variant": "default"
      },
      {
        "label": "Solo",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/MrBeat",
    "downloadLabel": "Télécharger Mr.Beat",
    "docUrl": "/assets/MrBeat/certificat.jpg",
    "docLabel": "Certificat de formation",
    "videoUrl": "https://www.youtube.com/embed/5GL5LfnhEVU?si=Qa2PmLxvp7eBiF_M",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/5GL5LfnhEVU?si=Qa2PmLxvp7eBiF_M"
      },
      {
        "type": "image",
        "src": "/assets/MrBeat/mrbeat2.webp",
        "alt": "Interface de contrôle des pistes et du tempo"
      },
      {
        "type": "image",
        "src": "/assets/MrBeat/mrbeat3.webp",
        "alt": "Grille de séquençage des rythmes"
      }
    ],
    "thumbnails": [
      "/assets/MrBeat/mrbeat-video.webp",
      "/assets/MrBeat/mrbeat2.webp",
      "/assets/MrBeat/mrbeat3.webp"
    ]
  },
  "asteroides": {
    "projectId": "asteroides",
    "title": "Astéroides",
    "banner": "/assets/Asteroides/projet-asteroides.webp",
    "description": "<strong>Astéroides</strong> constitue mon tout premier projet développé en C++ avec la bibliothèque SFML.<br><br>\r\n              Réalisé en autonomie pour consolider en amont mes compétences avant le démarrage du cursus scolaire, ce projet m'a permis d'appréhender la gestion des dépendances C++, la configuration d'un projet dans Visual Studio et la boucle de jeu temps réel.<br><br>\r\n              Le gameplay reprend le principe classique du jeu d'arcade : le joueur contrôle un vaisseau spatial en vue du dessus, pivote, accélère grâce à une impulsion inertielle et fait feu sur des fragments d'astéroïdes tout en évitant les collisions.",
    "duration": "1 semaine",
    "team": "PASCAL Noa",
    "tags": [
      {
        "label": "Formation Udemy",
        "variant": "purple"
      },
      {
        "label": "C++",
        "variant": "default"
      },
      {
        "label": "Visual Studio 2022",
        "variant": "default"
      },
      {
        "label": "SFML",
        "variant": "default"
      },
      {
        "label": "Solo",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/Asteroides/releases",
    "downloadLabel": "Télécharger Astéroides",
    "docUrl": "/assets/Asteroides/certificat.jpg",
    "docLabel": "Certificat de formation",
    "videoUrl": "https://www.youtube.com/embed/uzoz1nUycOs?si=kRX1r70IjMmOk-kP",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/uzoz1nUycOs?si=kRX1r70IjMmOk-kP"
      },
      {
        "type": "image",
        "src": "/assets/Asteroides/projet-asteroides.webp",
        "alt": "Menu principal et vaisseaux du jeu Asteroides"
      },
      {
        "type": "image",
        "src": "/assets/Asteroides/asteroides.webp",
        "alt": "Phase de tir et d'esquive des astéroïdes"
      }
    ],
    "thumbnails": [
      "/assets/Asteroides/asteroides-video.webp",
      "/assets/Asteroides/projet-asteroides.webp",
      "/assets/Asteroides/asteroides.webp"
    ]
  },
  "novastrike": {
    "projectId": "novastrike",
    "title": "Nova-Strike",
    "banner": "/assets/NovaStrike/projet-novastrike.webp",
    "description": "<strong>Nova-Strike</strong> est un space-shooter arcade dynamique conçu avec le moteur Unity, centré sur l'implémentation robuste d'un système de persistance de données en ligne via Google Firebase.<br><br>\r\n              L'enjeu consistait à maîtriser le cycle de vie des scripts en C#, à sauvegarder les paramètres utilisateurs localement avec les PlayerPrefs et à synchroniser les scores et la progression des joueurs sur une base de données cloud NoSQL temps réel.<br><br>\r\n              Ce projet a consolidé mes compétences en architecture logicielle sur Unity, gestion d'API distantes et prévention de la corruption de données.",
    "duration": "1 semaine",
    "team": "PASCAL Noa, VANNIER Hugo",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "Unity",
        "variant": "default"
      },
      {
        "label": "C#",
        "variant": "default"
      },
      {
        "label": "Firebase",
        "variant": "default"
      },
      {
        "label": "Duo",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/NovaStrike/releases/tag/v0.3",
    "downloadLabel": "Télécharger Nova-Strike",
    "docUrl": "/assets/NovaStrike/cdc_novastrike.pdf",
    "docLabel": "Télécharger le Cahier des Charges",
    "videoUrl": "https://www.youtube.com/embed/G64r6whfof8?si=mwzch8fMW1CsWJ4C",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/G64r6whfof8?si=mwzch8fMW1CsWJ4C"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova1.png",
        "alt": "Écran de sélection des vaisseaux"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova2.png",
        "alt": "Vagues d'ennemis et tirs laser"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova3.png",
        "alt": "Affrontement avec un boss intermédiaire"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova4.png",
        "alt": "Interface d'amélioration des armes"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova5.png",
        "alt": "Tableau des scores synchronisé en ligne"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova6.png",
        "alt": "Effets visuels lors de la destruction des ennemis"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova7.png",
        "alt": "Bouclier d'énergie activé sur le vaisseau joueur"
      },
      {
        "type": "image",
        "src": "/assets/NovaStrike/nova8.png",
        "alt": "Écran de victoire avec récapitulatif des données de session"
      }
    ],
    "thumbnails": [
      "/assets/NovaStrike/novastrike-video.png",
      "/assets/NovaStrike/nova1.png",
      "/assets/NovaStrike/nova2.png",
      "/assets/NovaStrike/nova3.png",
      "/assets/NovaStrike/nova4.png",
      "/assets/NovaStrike/nova5.png",
      "/assets/NovaStrike/nova6.png",
      "/assets/NovaStrike/nova7.png",
      "/assets/NovaStrike/nova8.png"
    ]
  },
  "ascii-art": {
    "projectId": "ascii-art",
    "title": "ASCII ART",
    "banner": "/assets/AsciiArt/projet-asciiart.png",
    "description": "<strong>ASCII-ART</strong> est un moteur de rendu géométrique en mode console qui projette des formes 3D (Tore, Cube) à l'aide de caractères typographiques.<br><br>\r\n              Le projet implémente les équations trigonométriques de rotation spatiale, une projection en perspective mathématique, un tampon de profondeur (Z-buffering) pour éliminer les surfaces cachées et un modèle d'ombrage calculant l'incidence de la lumière sur chaque normale.<br><br>\r\n              Inspiré par les travaux pionniers d'A1k0n, ce projet a constitué un exercice approfondi de mathématiques appliquées à l'infographie en C++.",
    "duration": "1 semaine",
    "team": "PASCAL Noa, GILOTIN Ethan, ROSLET Thomas",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "C++",
        "variant": "default"
      },
      {
        "label": "Rider",
        "variant": "default"
      },
      {
        "label": "Math",
        "variant": "default"
      },
      {
        "label": "Équipe de 3",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/ASCII-ART",
    "downloadLabel": "Télécharger ASCII-ART",
    "docUrl": "",
    "docLabel": "",
    "videoUrl": "/assets/AsciiArt/Torus.mp4",
    "media": [
      {
        "type": "video",
        "src": "/assets/AsciiArt/Torus.mp4",
        "alt": "Animation de rendu du tore en ASCII"
      },
      {
        "type": "video",
        "src": "/assets/AsciiArt/Cube.mp4",
        "alt": "Animation de rendu du cube en ASCII"
      }
    ],
    "thumbnails": [
      "/assets/AsciiArt/projet-asciiart.png",
      "/assets/AsciiArt/Cube.png"
    ]
  },
  "galaxy": {
    "projectId": "galaxy",
    "title": "Galaxy",
    "banner": "/assets/Galaxy/projet-galaxy.webp",
    "description": "<strong>Galaxy</strong> est un projet de jeu vidéo interactif développé avec le langage Python et le framework graphique multiplateforme Kivy.<br><br>\r\n              Dans ce jeu, le joueur pilote un astronef guidé à travers un tracé généré procéduralement dans le vide interstellaire. L'objectif consiste à aller le plus loin possible en esquivant les sorties de piste.<br><br>\r\n              Ce projet a permis de mettre en pratique la manipulation des canvas vectoriels de Kivy, la gestion des claviers et événements tactiles, ainsi que le calcul de perspective simulant un environnement 3D.",
    "duration": "8 heures",
    "team": "PASCAL Noa",
    "tags": [
      {
        "label": "Formation Udemy",
        "variant": "purple"
      },
      {
        "label": "Python",
        "variant": "default"
      },
      {
        "label": "PyCharm",
        "variant": "default"
      },
      {
        "label": "Kivy",
        "variant": "default"
      },
      {
        "label": "Solo",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/Galaxy",
    "downloadLabel": "Télécharger Galaxy",
    "docUrl": "/assets/Galaxy/certificat.jpg",
    "docLabel": "Certificat de formation",
    "videoUrl": "https://www.youtube.com/embed/3VK_R7oXihw?si=4mUyerccT5g_S7TH",
    "media": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/3VK_R7oXihw?si=4mUyerccT5g_S7TH"
      },
      {
        "type": "image",
        "src": "/assets/Galaxy/galaxy2.webp",
        "alt": "Début de trajectoire du vaisseau spatial dans Galaxy"
      },
      {
        "type": "image",
        "src": "/assets/Galaxy/galaxy3.webp",
        "alt": "Virage et inclinaison de la perspective de vol"
      },
      {
        "type": "image",
        "src": "/assets/Galaxy/galaxy4.webp",
        "alt": "Accélération de la vitesse et score croissant"
      }
    ],
    "thumbnails": [
      "/assets/Galaxy/galaxy-video.webp",
      "/assets/Galaxy/galaxy2.webp",
      "/assets/Galaxy/galaxy3.webp",
      "/assets/Galaxy/galaxy4.webp"
    ]
  },
  "piscine-42": {
    "projectId": "piscine-42",
    "title": "Piscine 42 Lyon",
    "banner": "/assets/42/42.webp",
    "description": "<strong>La Piscine 42</strong> est une immersion intensive de quatre semaines consécutives dans le monde de la programmation système et de l'algorithmique.<br><br>Conçue pour évaluer la persévérance et l'adaptabilité, cette expérience m'a confronté à des exercices de logique pure, à la gestion manuelle de la mémoire et à une collaboration continue au sein d'une communauté soudée.<br><br><strong>Pourquoi cette démarche ?</strong><br>Tout juste diplômé de ma deuxième année de bachelor, j'ai pris la décision délibérée de plonger dans la Piscine 42 afin de me challenger dans un environnement d'apprentissage disruptif sans enseignants ni cours magistraux. Cette épreuve a constitué un formidable moyen de sortir de ma zone de confort et de fortifier ma rigueur méthodologique.<br><br><strong>Le bilan :</strong><br>Au-delà de la validation technique, cette immersion m'a permis d'élargir mon réseau professionnel, d'adopter des méthodes de travail collaboratives rigoureuses (évaluation par les pairs, relecture de code croisée) et de vivre une aventure humaine marquante.",
    "duration": "4 semaines (Août 2025)",
    "team": "PASCAL Noa (Peer-learning)",
    "tags": [
      {
        "label": "École",
        "variant": "purple"
      },
      {
        "label": "C",
        "variant": "default"
      },
      {
        "label": "Shell",
        "variant": "default"
      },
      {
        "label": "Algorithmique",
        "variant": "default"
      },
      {
        "label": "Peer-learning",
        "variant": "default"
      },
      {
        "label": "Système",
        "variant": "default"
      }
    ],
    "downloadUrl": "https://github.com/PASCAL-Noa/Piscine-42",
    "downloadLabel": "Voir le dépôt GitHub",
    "docUrl": "",
    "docLabel": "",
    "videoUrl": "",
    "media": [
      {
        "type": "image",
        "src": "/assets/42/42.webp",
        "alt": "Piscine 42 Campus de Lyon"
      }
    ],
    "thumbnails": [
      "/assets/42/42.webp"
    ]
  }
};
