import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Frontend',
    color: '#2467ec',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'React', level: 85 },
    ],
  },
  {
    name: 'Development',
    color: '#10b981',
    skills: [
      { name: 'Android Development', level: 82 },
      { name: 'APIs', level: 88 },
      { name: 'Git', level: 85 },
    ],
  },
  {
    name: 'Automation',
    color: '#f59e0b',
    skills: [
      { name: 'n8n', level: 90 },
      { name: 'Workflow Automation', level: 87 },
      { name: 'AI Automation Tools', level: 80 },
    ],
  },
];

function LinearProgress({ level, color, name }: { level: number; color: string; name: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (barRef.current && !animated) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
          },
        }
      );
      setAnimated(true);
    }
  }, [level, animated]);

  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="text-sm font-medium" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-300 group-hover:brightness-110"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            width: '0%',
            boxShadow: `0 0 10px ${color}50`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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

      // Categories stagger
      const categories = categoriesRef.current?.querySelectorAll('.skill-category');
      if (categories) {
        gsap.fromTo(
          categories,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2467ec]/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[#2467ec] font-medium mb-2 tracking-wide">My Expertise</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and skills I've mastered to deliver 
            exceptional digital solutions.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2467ec] to-[#4a90e2] mx-auto rounded-full mt-4" />
        </div>

        {/* Skills Categories */}
        <div
          ref={categoriesRef}
          className="grid lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, cIndex) => (
            <div
              key={cIndex}
              className="skill-category glass rounded-3xl p-8 hover:bg-white/10 transition-all duration-500"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${category.color}20` }}
                >
                  <span
                    className="text-xl font-bold"
                    style={{ color: category.color }}
                  >
                    {category.name[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, sIndex) => (
                  <LinearProgress
                    key={sIndex}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                  />
                ))}
              </div>

              {/* Decorative element */}
              <div
                className="absolute bottom-0 right-0 w-32 h-32 opacity-10 rounded-br-3xl"
                style={{
                  background: `radial-gradient(circle at bottom right, ${category.color}, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-20">
          <h3 className="text-center text-xl font-semibold mb-8 text-white/80">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'Kotlin', 'Python', 'n8n', 'Git', 'Figma'].map(
              (tech, index) => (
                <div
                  key={index}
                  className="glass px-6 py-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
