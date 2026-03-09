import { useRef } from 'react';
import { motion } from 'motion/react';

const images = [
  "https://picsum.photos/seed/spa1/800/800",
  "https://picsum.photos/seed/spa2/800/800",
  "https://picsum.photos/seed/spa3/800/800",
  "https://picsum.photos/seed/spa4/800/800",
  "https://picsum.photos/seed/spa5/800/800",
  "https://picsum.photos/seed/spa6/800/800",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100svh] w-full overflow-hidden bg-accent text-text flex items-center justify-center"
    >
      {/* Tilted Grid Background - Continuous Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[250vw] md:w-[150vw] h-[250vh] flex gap-2 md:gap-4 -rotate-12 origin-center"
        >
          {/* Column 1 - Moving Up */}
          <motion.div 
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
            className="flex flex-col gap-2 md:gap-4 flex-1"
          >
            {[...images, ...images].map((src, i) => (
              <div key={i} className="relative w-full aspect-square overflow-hidden opacity-40">
                <img src={src} alt="Spa" className="object-cover w-full h-full" referrerPolicy="no-referrer" loading={i > 4 ? "lazy" : "eager"} />
              </div>
            ))}
          </motion.div>
          {/* Column 2 - Moving Down */}
          <motion.div 
            animate={{ y: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
            className="flex flex-col gap-2 md:gap-4 flex-1 -mt-[20vh]"
          >
            {[...images, ...images].map((src, i) => (
              <div key={i} className="relative w-full aspect-square overflow-hidden opacity-40">
                <img src={src} alt="Spa" className="object-cover w-full h-full" referrerPolicy="no-referrer" loading={i > 4 ? "lazy" : "eager"} />
              </div>
            ))}
          </motion.div>
          {/* Column 3 - Moving Up */}
          <motion.div 
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 55 }}
            className="flex flex-col gap-2 md:gap-4 flex-1 mt-[10vh]"
          >
            {[...images, ...images].map((src, i) => (
              <div key={i} className="relative w-full aspect-square overflow-hidden opacity-40">
                <img src={src} alt="Spa" className="object-cover w-full h-full" referrerPolicy="no-referrer" loading={i > 4 ? "lazy" : "eager"} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-accent/30 via-accent/60 to-accent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end items-end p-8 md:p-16 pb-16 md:pb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-none font-serif text-right tracking-tight"
        >
          Embrace the <br />
          <span className="italic font-light pr-2 md:pr-4 text-primary">Gift of Rest</span>
        </motion.h1>
      </div>
    </section>
  );
}
