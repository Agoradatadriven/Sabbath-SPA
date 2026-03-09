import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-colors duration-500',
          isScrolled ? 'bg-accent/90 backdrop-blur-md text-text' : 'bg-transparent text-text'
        )}
      >
        <div className="flex items-center flex-1">
          <motion.button 
            onClick={() => setIsMenuOpen(true)}
            initial="initial"
            whileHover="hover"
            className="flex items-center gap-2 text-xs uppercase text-primary"
          >
            <motion.div
              variants={{
                initial: { rotate: 0 },
                hover: { rotate: 180 }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Menu size={18} strokeWidth={1.5} />
            </motion.div>
            <motion.span 
              variants={{
                initial: { letterSpacing: "0.1em" },
                hover: { letterSpacing: "0.25em" }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:inline"
            >
              Menu
            </motion.span>
          </motion.button>
        </div>

        <a href="#" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-primary transition-opacity hover:opacity-80">
          <span className="font-serif text-3xl md:text-4xl tracking-[0.2em] pl-[0.2em] uppercase leading-none">Sabbath</span>
          <div className="flex items-center w-full gap-2 mt-1.5 opacity-90">
            <div className="h-[1px] flex-1 bg-primary"></div>
            <span className="text-[0.45rem] md:text-[0.55rem] tracking-[0.2em] pl-[0.2em] uppercase font-medium whitespace-nowrap leading-none">Spa & Wellness Hub</span>
            <div className="h-[1px] flex-1 bg-primary"></div>
          </div>
        </a>

        <div className="flex items-center justify-end flex-1">
          <motion.button 
            onClick={() => setIsContactOpen(true)}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="hidden md:flex items-center justify-center relative overflow-hidden text-xs tracking-[0.2em] uppercase font-medium bg-primary text-white px-8 py-3 rounded-full"
            variants={{
              initial: { scale: 1, boxShadow: '0px 4px 15px rgba(195,131,58,0.4)' },
              animate: { 
                boxShadow: ['0px 4px 15px rgba(195,131,58,0.4)', '0px 4px 25px rgba(195,131,58,0.7)', '0px 4px 15px rgba(195,131,58,0.4)'],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              },
              hover: { scale: 1.05, boxShadow: '0px 4px 30px rgba(195,131,58,0.8)' },
              tap: { scale: 0.95 }
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
              variants={{
                initial: { x: '-150%' },
                hover: { x: '150%', transition: { duration: 0.6, ease: "easeInOut" } }
              }}
            />
            <span className="relative z-10 pl-[0.2em]">Book Now</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Side Panel Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[80vw] z-[70] bg-accent text-text flex flex-col shadow-2xl border-r border-white/10"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
                <div className="flex flex-col items-center justify-center text-primary">
                  <span className="font-serif text-2xl tracking-[0.2em] pl-[0.2em] uppercase leading-none">Sabbath</span>
                  <div className="flex items-center w-full gap-1.5 mt-1.5 opacity-90">
                    <div className="h-[1px] flex-1 bg-primary"></div>
                    <span className="text-[0.4rem] tracking-[0.2em] pl-[0.2em] uppercase font-medium whitespace-nowrap leading-none">Spa & Wellness Hub</span>
                    <div className="h-[1px] flex-1 bg-primary"></div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:opacity-70 transition-opacity text-primary"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col px-6 py-12 gap-6 text-2xl font-serif overflow-y-auto">
                {['Home', 'About Us', 'Treatments', 'Gallery', 'Contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={item === 'Contact' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={(e) => {
                      if (item === 'Contact') {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        setIsContactOpen(true);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                    className="hover:text-primary transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Contact Side Panel */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[450px] max-w-[100vw] z-[70] bg-accent text-text flex flex-col shadow-2xl border-l border-white/10"
            >
              <div className="flex items-center justify-between px-8 py-8 border-b border-white/10">
                <span className="font-serif text-2xl tracking-widest uppercase text-primary">Inquire</span>
                <button 
                  onClick={() => setIsContactOpen(false)}
                  className="hover:opacity-70 transition-opacity text-primary"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-8 py-10">
                <p className="text-sm text-white/60 mb-10 font-light leading-relaxed">
                  Reach out to schedule your sanctuary experience or inquire about our bespoke wellness treatments.
                </p>
                
                <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest uppercase text-white/50">Name</label>
                    <input type="text" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-primary transition-colors text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest uppercase text-white/50">Email</label>
                    <input type="email" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-primary transition-colors text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest uppercase text-white/50">Phone</label>
                    <input type="tel" className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-primary transition-colors text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest uppercase text-white/50">Message</label>
                    <textarea rows={4} className="bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-primary transition-colors text-white resize-none"></textarea>
                  </div>
                  
                  <button className="mt-4 w-full py-4 border border-primary text-primary tracking-widest uppercase text-xs hover:bg-primary hover:text-accent transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
