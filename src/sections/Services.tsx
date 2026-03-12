import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Smartphone, Workflow, Settings, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Building modern, responsive, and high-performance web applications using cutting-edge technologies like React, Next.js, and Tailwind CSS.',
    features: ['React & Next.js', 'Responsive Design', 'Performance Optimization', 'SEO Friendly'],
    color: '#2467ec',
  },
  {
    icon: Smartphone,
    title: 'Android App Development',
    description: 'Creating native Android applications with intuitive user interfaces and robust functionality using Kotlin and modern Android architecture.',
    features: ['Kotlin & Java', 'Native Performance', 'Material Design', 'API Integration'],
    color: '#10b981',
  },
  {
    icon: Workflow,
    title: 'n8n Automation Agents',
    description: 'Designing intelligent automation workflows that streamline business processes and eliminate repetitive tasks using n8n.',
    features: ['Workflow Design', 'API Connections', 'Data Processing', 'Error Handling'],
    color: '#f59e0b',
  },
  {
    icon: Settings,
    title: 'Custom Automation Tools',
    description: 'Developing bespoke automation solutions tailored to your specific business needs, from data scraping to report generation.',
    features: ['Custom Scripts', 'Data Automation', 'Report Generation', 'Integration'],
    color: '#8b5cf6',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
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
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#2467ec]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#4a90e2]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[#2467ec] font-medium mb-2 tracking-wide">What I Do</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Services</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Comprehensive solutions for your digital needs. I offer end-to-end development 
            and automation services to help your business grow.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2467ec] to-[#4a90e2] mx-auto rounded-full mt-4" />
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative h-full glass rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:scale-[1.02] hover:-translate-y-2">
                  {/* Holographic Sheen Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
                  </div>

                  {/* Glow on hover */}
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                    style={{ background: service.color }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: `${service.color}20` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: service.color }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-gradient transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, fIndex) => (
                        <span
                          key={fIndex}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="flex items-center gap-2 text-sm font-medium group/btn" style={{ color: service.color }}>
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                  {/* Corner Decoration */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, ${service.color}, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
