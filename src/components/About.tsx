import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center center"],
  });

  const text = "Welcome to your sanctuary of grace, where rest is not a luxury, but a divine design. Honor your body, quiet your mind, and restore your spirit. Leave your burdens at the door, and step into your renewal";
  const words = text.split(" ");

  return (
    <section id="about" ref={containerRef} className="relative py-24 md:py-48 px-6 md:px-12 bg-accent text-text overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-snug md:leading-snug flex flex-wrap gap-x-2 md:gap-x-4 gap-y-2 md:gap-y-4">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            const isAccent = word.toLowerCase().includes('sanctuary') || word.toLowerCase().includes('grace') || word.toLowerCase().includes('divine') || word.toLowerCase().includes('renewal');
            
            return (
              <span key={i} className="relative overflow-hidden inline-block pb-1 md:pb-2">
                <motion.span 
                  style={{ 
                    opacity,
                    y: useTransform(scrollYProgress, [start, end], ["100%", "0%"]),
                    rotate: useTransform(scrollYProgress, [start, end], [5, 0])
                  }} 
                  className={`inline-block origin-top-left ${isAccent ? 'text-primary italic font-light' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            )
          })}
        </h2>
        
        <div className="mt-24 md:mt-40 relative h-[60vh] md:h-[80vh] w-full overflow-hidden rounded-3xl">
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]) }}
            className="absolute inset-0 w-full h-[130%]"
          >
            <img 
              src="https://picsum.photos/seed/luxury-spa-springs/1920/1080" 
              alt="Luxury Spa" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
          <div className="absolute inset-0 bg-accent/20" />
          
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 1]), y: useTransform(scrollYProgress, [0.5, 0.8], [50, 0]) }}
            className="absolute bottom-8 left-8 md:bottom-16 md:left-16 max-w-sm"
          >
            <p className="text-text text-lg md:text-xl font-light leading-relaxed backdrop-blur-md bg-accent/30 p-6 rounded-2xl border border-white/10">
              Discover the healing power of purposeful rest. Our signature massages wash away physical burdens, restoring your natural balance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
