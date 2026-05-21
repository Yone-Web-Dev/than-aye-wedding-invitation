import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { GROOM_FIRST, BRIDE_FIRST, DATE_SHORT } from '../config';

interface EntranceProps {
  onEnter: (name: string) => void;
}

export default function Entrance({ onEnter }: EntranceProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onEnter(name);
    }
  };

  return (
    <div className="relative group w-full max-w-sm">
      <div className="absolute -inset-8 sm:-inset-16 border border-gold/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
      <div className="absolute -inset-6 sm:-inset-12 border-2 border-gold/5 rounded-full animate-[spin_45s_linear_reverse_infinite] pointer-events-none"></div>

      <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-sm blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

      <div className="relative bg-emerald-box/90 backdrop-blur-xl border border-gold/30 p-8 sm:p-14 rounded-sm shadow-[0_0_50px_rgba(3,43,30,0.8)] w-full text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/30 p-1"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30 p-1"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/30 p-1"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/30 p-1"></div>

        <div className="text-gold/40 uppercase text-[9px] tracking-[0.4em] sm:tracking-[0.5em] mb-6 font-sans">
          The Ceremony Entrance
        </div>

        <div className="flex justify-center mb-8 sm:mb-10 relative">
          <div className="absolute -inset-4 border border-gold/20 rounded-full animate-pulse"></div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-gold relative z-10"
          >
            <Heart size={32} className="sm:hidden" fill="currentColor" strokeWidth={1} />
            <Heart size={36} className="hidden sm:block" fill="currentColor" strokeWidth={1} />
          </motion.div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-yellow-100 mb-2 tracking-widest italic">
          Welcome
        </h1>
        <div className="h-px w-12 bg-gold/30 mx-auto mb-4"></div>
        <p className="text-stone-400 text-[10px] mb-10 sm:mb-12 font-serif uppercase tracking-[0.25em] sm:tracking-[0.3em] opacity-50 px-2">
          {GROOM_FIRST} & {BRIDE_FIRST}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
          <div className="relative border-b border-gold/20 py-3 focus-within:border-gold transition-colors">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Revered Name"
              className="w-full bg-transparent text-yellow-100/90 placeholder-stone-700 focus:outline-none font-serif text-lg sm:text-xl text-center italic"
              required
            />
          </div>

          <button
            type="submit"
            className="group/btn relative w-full bg-transparent border border-gold/40 text-gold text-[10px] sm:text-[11px] font-bold py-4 sm:py-5 rounded-sm overflow-hidden transition-all uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:text-emerald-950"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10">Step Into Magic</span>
          </button>
        </form>

        <div className="mt-10 sm:mt-14 flex items-center justify-center space-x-6">
          <div className="w-10 h-[1px] bg-gold/10"></div>
          <p className="text-[10px] text-gold/30 uppercase tracking-[0.6em]">{DATE_SHORT}</p>
          <div className="w-10 h-[1px] bg-gold/10"></div>
        </div>
      </div>
    </div>
  );
}
