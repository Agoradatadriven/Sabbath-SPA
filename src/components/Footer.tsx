import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-accent text-text py-16 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-serif text-3xl tracking-wide">Sabbath</span>
          <p className="text-xs font-light tracking-widest uppercase text-text/60">
            &copy; {new Date().getFullYear()} Sabbath Spa & Wellness Hub. All rights reserved.
          </p>
        </div>

        <div className="flex gap-8 text-xs tracking-widest uppercase font-medium">
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-primary transition-colors">Facebook</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
