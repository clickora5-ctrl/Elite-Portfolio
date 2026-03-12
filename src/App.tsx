import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import Terminal from './components/Terminal';
import GitHubActivity from './components/GitHubActivity';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Initialize scroll animations
      const ctx = gsap.context(() => {
        // Reveal animations for sections
        gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }, mainRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  // Keyboard shortcut for terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Neural Network Background */}
      <div className="fixed inset-0 neural-bg pointer-events-none z-0" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Stats />
        <GitHubActivity />
        <Testimonials />
        <Contact />
      </main>
      
      {/* Floating Chatbot */}
      <Chatbot />
      
      {/* Terminal Mode */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      
      {/* Terminal Hint */}
      <div className="fixed bottom-4 left-4 z-40 text-xs text-white/30 font-mono hidden md:block">
        Press <kbd className="px-2 py-1 bg-white/10 rounded">`</kbd> for terminal
      </div>
    </div>
  );
}

export default App;
