import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code2, Workflow, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Briefcase,
    value: 50,
    suffix: '+',
    label: 'Projects Completed',
    color: '#2467ec',
  },
  {
    icon: Code2,
    value: 25,
    suffix: '+',
    label: 'Technologies Learned',
    color: '#10b981',
  },
  {
    icon: Workflow,
    value: 30,
    suffix: '+',
    label: 'Automation Systems Built',
    color: '#f59e0b',
  },
  {
    icon: GitBranch,
    value: 40,
    suffix: '+',
    label: 'GitHub Repositories',
    color: '#8b5cf6',
  },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Slot machine effect
        const duration = 2;
        const steps = 30;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          setCount(Math.floor(easeProgress * value));

          if (currentStep >= steps) {
            clearInterval(interval);
            setCount(value);
          }
        }, stepDuration * 1000);
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <div ref={counterRef} className="relative">
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color }}>
        {count}
      </span>
      <span className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color }}>
        {suffix}
      </span>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2467ec]/5 rounded-full blur-[200px]" />
      </div>

      {/* Data Stream Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#2467ec]/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              animation: `dataStream ${3 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-[#2467ec] font-medium mb-2 tracking-wide">Numbers</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">By The Numbers</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2467ec] to-[#4a90e2] mx-auto rounded-full mt-4" />
        </div>

        {/* Stats Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card group relative glass rounded-3xl p-6 md:p-8 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105"
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                  style={{ background: stat.color }}
                />

                {/* Icon */}
                <div
                  className="relative w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: stat.color }} />
                </div>

                {/* Counter */}
                <div className="relative mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    color={stat.color}
                  />
                </div>

                {/* Label */}
                <p className="relative text-sm md:text-base text-white/60">
                  {stat.label}
                </p>

                {/* Corner Decoration */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-tr-3xl"
                  style={{
                    background: `radial-gradient(circle at top right, ${stat.color}, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes dataStream {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
