import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Code, Lightbulb, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: '2021',
    title: 'Started Programming Journey',
    description: 'Began learning web development fundamentals - HTML, CSS, and JavaScript.',
    icon: Code,
  },
  {
    year: '2022',
    title: 'Android Development',
    description: 'Expanded skills to mobile app development, building native Android applications.',
    icon: Rocket,
  },
  {
    year: '2023',
    title: 'Automation & n8n',
    description: 'Discovered the power of automation and started building intelligent workflows.',
    icon: Lightbulb,
  },
  {
    year: '2024',
    title: 'Currently Pursuing Graduation',
    description: 'Continuing education while working on real-world projects and expanding expertise.',
    icon: GraduationCap,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Image 3D rotation entrance
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, rotateY: 180 },
        {
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      // Timeline items stagger
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.fromTo(
          timelineItems,
          { opacity: 0, y: 50, rotateX: 45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Timeline line draw
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
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
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[#2467ec] font-medium mb-2 tracking-wide">Get To Know Me</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2467ec] to-[#4a90e2] mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Image */}
          <div
            ref={imageRef}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2467ec]/20 to-[#4a90e2]/10 rounded-3xl blur-2xl scale-105" />
              
              <img
                src="/profile-about.png"
                alt="About Wajeeh"
                className="relative w-full aspect-[3/4] object-cover rounded-3xl"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            </div>

            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl">
              <div className="text-3xl font-bold text-[#2467ec]">3+</div>
              <div className="text-sm text-white/60">Years Experience</div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Passionate developer crafting{' '}
              <span className="text-gradient">digital experiences</span>
            </h3>
            
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              I am a passionate developer currently pursuing my graduation. I specialize in 
              web development, Android applications, and automation systems. I enjoy building 
              scalable and efficient digital solutions that make a difference.
            </p>
            
            <p className="text-white/60 leading-relaxed mb-8">
              My journey in tech started with a curiosity about how things work, which evolved 
              into a deep passion for creating innovative solutions. Whether it's building 
              responsive web applications, developing native Android apps, or creating intelligent 
              automation workflows, I bring dedication and creativity to every project.
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass p-4 rounded-xl">
                <div className="text-[#2467ec] font-semibold">Name</div>
                <div className="text-white/70">Wajeeh Ul Hassan</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-[#2467ec] font-semibold">Email</div>
                <div className="text-white/70">clickora5@gmail.com</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-[#2467ec] font-semibold">Location</div>
                <div className="text-white/70">Available Worldwide</div>
              </div>
              <div className="glass p-4 rounded-xl">
                <div className="text-[#2467ec] font-semibold">Availability</div>
                <div className="text-white/70">Open to Work</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="mt-20 relative">
          <h3 className="text-2xl font-bold text-center mb-12">My Journey</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2467ec] to-[#4a90e2] hidden md:block origin-top" />
            
            <div className="space-y-8 md:space-y-0">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={index}
                    className={`timeline-item relative md:grid md:grid-cols-2 md:gap-8 ${
                      index > 0 ? 'md:mt-8' : ''
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`${
                        isLeft ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'
                      }`}
                    >
                      <div className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                        <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <div className="w-10 h-10 rounded-full bg-[#2467ec]/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#2467ec]" />
                          </div>
                          <span className="text-[#2467ec] font-bold">{item.year}</span>
                        </div>
                        <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                        <p className="text-white/60 text-sm">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Center Dot */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#2467ec] border-4 border-[#0a0a0a] z-10" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
