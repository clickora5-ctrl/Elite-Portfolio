import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, shopping cart, payment integration, and admin dashboard. Built with modern technologies for optimal performance.',
    image: '/project-ecommerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'web',
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.',
    image: '/project-taskmanager.jpg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
    category: 'web',
    featured: false,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'AI Chat Assistant',
    description: 'An intelligent chatbot application powered by AI models, featuring natural language processing and context-aware responses.',
    image: '/project-aichat.jpg',
    technologies: ['React', 'OpenAI API', 'Express', 'Redis'],
    category: 'ai',
    featured: false,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and interactive elements.',
    image: '/project-portfolio.jpg',
    technologies: ['React', 'GSAP', 'Tailwind CSS', 'Three.js'],
    category: 'web',
    featured: false,
    liveUrl: '#',
    githubUrl: '#',
  },
];

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Web', value: 'web' },
  { name: 'Mobile', value: 'mobile' },
  { name: 'AI', value: 'ai' },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards animation
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate on filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [activeFilter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2467ec]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#4a90e2]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <p className="text-[#2467ec] font-medium mb-2 tracking-wide">My Work</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A showcase of my best work, demonstrating expertise in web development, 
            mobile apps, and automation systems.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2467ec] to-[#4a90e2] mx-auto rounded-full mt-4" />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-12">
          <Filter className="w-5 h-5 text-white/50 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.value
                  ? 'bg-[#2467ec] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card group relative ${
                project.featured ? 'md:col-span-2' : ''
              }`}
            >
              <div className="relative h-full glass rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                {/* Image */}
                <div className={`relative overflow-hidden ${project.featured ? 'h-64 md:h-80' : 'h-48 md:h-56'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#2467ec] rounded-full text-xs font-semibold">
                      Featured Project
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white gap-2"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 hover:bg-white/10 text-white gap-2"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-3 py-1 text-xs rounded-full bg-[#2467ec]/10 text-[#2467ec] border border-[#2467ec]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2467ec]/10 via-transparent to-[#4a90e2]/10" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 gap-2"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="w-5 h-5" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
