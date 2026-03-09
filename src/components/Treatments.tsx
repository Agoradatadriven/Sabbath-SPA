import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const treatments = [
  {
    id: 1,
    title: "Signature Massage",
    image: "https://picsum.photos/seed/massage/1200/800",
    description: "A blend of Swedish and deep tissue techniques to melt away tension.",
    price: "$150",
    duration: "60 min"
  },
  {
    id: 2,
    title: "Radiance Facial",
    image: "https://picsum.photos/seed/facial/1200/800",
    description: "Revitalize your skin with our organic, nutrient-rich botanical facial.",
    price: "$180",
    duration: "75 min"
  },
  {
    id: 3,
    title: "Hydrotherapy Soak",
    image: "https://picsum.photos/seed/hydro/1200/800",
    description: "Immerse yourself in mineral-rich waters to soothe muscles and joints.",
    price: "$90",
    duration: "45 min"
  },
  {
    id: 4,
    title: "Aromatherapy Wrap",
    image: "https://picsum.photos/seed/wrap/1200/800",
    description: "A full-body cocoon of essential oils to detoxify and hydrate.",
    price: "$120",
    duration: "60 min"
  }
];

export default function Treatments() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // We have 4 items. We want to scroll horizontally by -75% so the 4th item is visible at the end.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="treatments" ref={targetRef} className="relative h-[400vh] bg-accent text-text">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[400vw] h-full">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="w-[100vw] h-full flex items-center justify-center p-6 md:p-24 relative">
              
              {/* Background Image with Parallax */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.img 
                  style={{ x: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) }}
                  src={treatment.image} 
                  alt={treatment.title} 
                  className="w-[140%] max-w-none h-full object-cover opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent" />
              </div>

              {/* Content Card */}
              <div className="relative z-10 w-full max-w-5xl aspect-[4/5] md:aspect-[21/9] overflow-hidden group">
                <img 
                  src={treatment.image} 
                  alt={treatment.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent/40 transition-opacity duration-700 group-hover:bg-accent/60" />

                <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                  <div className="overflow-hidden">
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-secondary translate-y-0 transition-transform duration-700 group-hover:-translate-y-2">
                      {treatment.title}
                    </h3>
                  </div>
                  
                  <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0 translate-y-8 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-lg font-light text-text/90 max-w-md">
                      {treatment.description}
                    </p>
                    
                    <div className="flex flex-col gap-4 min-w-[200px]">
                      <div className="flex justify-between items-center border-t border-white/20 pt-4">
                        <span className="text-xs uppercase tracking-widest text-primary">{treatment.duration}</span>
                        <span className="font-serif text-2xl text-secondary">{treatment.price}</span>
                      </div>
                      <button className="w-full py-4 bg-primary text-text text-xs uppercase tracking-widest font-medium hover:bg-secondary hover:text-accent transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
