import { motion } from 'motion/react';
import { Flower2 } from 'lucide-react';
import { GROOM_FIRST, BRIDE_FIRST } from '../config';

interface MagicLetterProps {
  guestName: string;
  onComplete: () => void;
}

const letterLines = (name: string) => [
  "Dearest " + name + ",",
  "True love is a journey that begins with a single step.",
  "We found that path in each other, and today,",
  "our hearts beat in perfect unison.",
  `${GROOM_FIRST} and ${BRIDE_FIRST}`,
  "invite you to witness their union,",
  "a celebration of love, commitment, and new beginnings.",
  "Your presence is the most precious gift we could receive.",
  "Please join us on our journey..."
];

export default function MagicLetter({ guestName, onComplete }: MagicLetterProps) {
  const lines = letterLines(guestName);

  return (
    <div className="max-w-3xl w-full bg-white/5 backdrop-blur-md border border-gold/20 p-6 sm:p-12 md:p-20 shadow-2xl relative rounded-sm group overflow-hidden">
      <div className="absolute -right-20 -bottom-20 text-gold/5 pointer-events-none group-hover:text-gold/10 transition-colors duration-1000 hidden sm:block">
        <Flower2 size={400} strokeWidth={0.2} />
      </div>

      <div className="absolute top-0 right-0 p-4 opacity-30">
        <div className="w-12 sm:w-16 h-12 sm:h-16 border-t border-r border-gold"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-4 opacity-30">
        <div className="w-12 sm:w-16 h-12 sm:h-16 border-b border-l border-gold"></div>
      </div>

      <div className="space-y-5 sm:space-y-8 relative z-10">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: index * 0.8,
              duration: 1.2,
              ease: "easeOut"
            }}
            className={`font-serif text-center sm:text-left ${
              index === 0 ? "text-xl sm:text-2xl md:text-3xl text-yellow-200 italic border-b border-gold-dim pb-4 mb-6 sm:mb-8" :
              index === 4 ? "text-2xl sm:text-3xl font-display text-gold pt-4 magic-text-gradient" :
              "text-base sm:text-lg md:text-xl text-stone-300/80 leading-relaxed"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: lines.length * 0.8 + 1, duration: 1 }}
        className="mt-12 sm:mt-16 flex justify-center"
      >
        <button
          onClick={onComplete}
          className="group relative px-8 sm:px-10 py-3 bg-yellow-600/10 border border-yellow-600 text-yellow-400 rounded-sm font-sans tracking-[0.15em] sm:tracking-[0.2em] text-xs uppercase overflow-hidden transition-all hover:bg-yellow-600/20 shadow-lg shadow-gold/10"
        >
          <span className="relative z-10">Ascertain Invite</span>
          <motion.div
            className="absolute inset-0 bg-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
          />
        </button>
      </motion.div>
    </div>
  );
}
