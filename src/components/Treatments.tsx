import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const treatments = [
  {
    id: 1,
    title: "Sabbath Signature Massage",
    image: "https://picsum.photos/seed/sabbath-massage/1200/800",
    description: "Our bespoke massage blending Eastern and Western techniques for ultimate relaxation.",
    price: "Signature",
    duration: "90 min"
  },
  {
    id: 2,
    title: "Swedish Massage",
    image: "https://picsum.photos/seed/swedish-massage/1200/800",
    description: "A classic full-body massage using gentle, flowing strokes to improve circulation.",
    price: "Classic",
    duration: "60 min"
  },
  {
    id: 3,
    title: "Shiatsu Massage",
    image: "https://picsum.photos/seed/shiatsu-massage/1200/800",
    description: "Traditional Japanese acupressure to restore energy flow and relieve tension.",
    price: "Therapeutic",
    duration: "60 min"
  },
  {
    id: 4,
    title: "Sabbath Signature Foot Reflexology",
    image: "https://picsum.photos/seed/foot-reflexology/1200/800",
    description: "Targeted pressure point therapy to stimulate healing and deep relaxation.",
    price: "Targeted",
    duration: "45 min"
  },
  {
    id: 5,
    title: "Le Nail Salon",
    image: "https://picsum.photos/seed/nail-salon/1200/800",
    description: "Premium nail care, manicures, and pedicures in a luxurious setting.",
    price: "Premium",
    duration: "Varies"
  },
  {
    id: 6,
    title: "Sabasu",
    image: "https://picsum.photos/seed/sabasu-food/1200/800",
    description: "Delight in our Ramyeon Noodle Bar, hearty meals, and refreshing beverages.",
    price: "A la carte",
    duration: "Dine-in"
  }
];

export default function Treatments() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // We have 6 items. We want to scroll horizontally by -83.3333% so the 6th item is visible at the end.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.3333%"]);

  return (
    <section id="treatments" ref={targetRef} className="relative h-[600vh] bg-accent text-text">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[600vw] h-full">
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
