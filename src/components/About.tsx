import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  const text = "We craft spaces of profound tranquility, where time slows down and the art of living is rediscovered through elemental luxury and holistic well-being.";
  const words = text.split(" ");

  return (
    <section id="about" ref={containerRef} className="relative py-32 md:py-64 px-6 md:px-12 bg-accent text-text overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-snug md:leading-snug flex flex-wrap gap-x-3 md:gap-x-6 gap-y-2 md:gap-y-4">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            const isAccent = word.includes('tranquility') || word.includes('luxury') || word.includes('well-being');
            
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
        
        <div className="mt-32 md:mt-48 relative h-[60vh] md:h-[80vh] w-full overflow-hidden rounded-3xl">
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
              Immerse yourself in our curated wellness journeys, designed to rejuvenate your senses and restore your natural balance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
