import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';

import { personalInfo } from './data/personalInfo';
import { timelineItems, skillCategories } from './data/skills';
import { projects } from './data/projects';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar name={personalInfo.name} />
      <main>
        <Hero info={personalInfo} />
        <About items={timelineItems} />
        <Projects projects={projects} />
        <Skills categories={skillCategories} />
        <Contact info={personalInfo} />
      </main>
    </div>
  );
};

export default App;
