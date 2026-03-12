import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image entrance with 3D flip
      tl.fromTo(
        imageRef.current,
        { opacity: 0, rotateY: 90, scale: 0.8 },
        { opacity: 1, rotateY: 0, scale: 1, duration: 1.2 },
        0.2
      );

      // Name character stagger animation
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)' },
          0.4
        );
      }

      // Title slide in
      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -50, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.8 },
        0.6
      );

      // Description fade in
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );

      // CTA buttons pop in
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
        1
      );

      // Social icons
      tl.fromTo(
        socialsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.2
      );

      // Continuous floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      gsap.to(imageRef.current, {
        rotateY: xPercent * 10,
        rotateX: -yPercent * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = 'Wajeeh Ul Hassan';

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2467ec]/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4a90e2]/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Greeting */}
            <p className="text-[#2467ec] font-medium mb-4 tracking-wide">
              Hello, I'm
            </p>

            {/* Name */}
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 perspective-1000"
              style={{ perspective: '1000px' }}
            >
              {name.split('').map((char, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Title */}
            <p
              ref={titleRef}
              className="text-lg sm:text-xl md:text-2xl text-white/80 font-light mb-6"
            >
              Web Developer | Android App Developer | Automation Specialist
            </p>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base md:text-lg text-white/60 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Building modern web applications, Android apps, and intelligent automation systems.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="bg-[#2467ec] hover:bg-[#1a5ad1] text-white gap-2 group"
                onClick={() => scrollToSection('#projects')}
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 gap-2"
                onClick={() => scrollToSection('#contact')}
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div ref={socialsRef} className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#2467ec] hover:border-[#2467ec]/50 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#2467ec] hover:border-[#2467ec]/50 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:wajeeh@example.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#2467ec] hover:border-[#2467ec]/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2467ec]/30 to-[#4a90e2]/20 rounded-3xl blur-3xl scale-110" />
              
              {/* Image Container */}
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="/profile-hero.png"
                  alt="Wajeeh Ul Hassan"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent" />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full animate-float">
                <span className="text-sm font-medium text-[#2467ec]">Web Developer</span>
              </div>
              <div
                className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full animate-float"
                style={{ animationDelay: '1s' }}
              >
                <span className="text-sm font-medium text-[#4a90e2]">Automation Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#2467ec] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
