import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress bar
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
      });

      // Animate text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
      );

      // Fade out at end
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1.8,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      {/* Logo/Name */}
      <div ref={textRef} className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-2">
          Wajeeh Ul Hassan
        </h1>
        <p className="text-white/50 text-sm md:text-base font-light tracking-wider">
          Loading Portfolio...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#2467ec] to-[#4a90e2] rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#2467ec]"
            style={{
              animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
