import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEDDING_DATE } from '../config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000)  / 60_000),
        seconds: Math.floor((diff % 60_000)      / 1_000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const isPast = WEDDING_DATE.getTime() <= Date.now();

  const units = [
    { label: 'Days',    value: timeLeft.days    },
    { label: 'Hours',   value: timeLeft.hours   },
    { label: 'Minutes', value: timeLeft.minutes  },
    { label: 'Seconds', value: timeLeft.seconds  },
  ];

  return (
    <section className="py-12 sm:py-20 px-3 sm:px-4 bg-emerald-deep border-t border-gold/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none marble-bg" />

      <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-3 px-2"
        >
          <p className="font-display text-[9px] sm:text-[10px] text-gold tracking-[0.4em] sm:tracking-[0.6em] uppercase">
            {isPast ? 'The celebration is here' : 'Until the celebration begins'}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[60px] bg-gold/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            <div className="h-px flex-1 max-w-[60px] bg-gold/20" />
          </div>
        </motion.div>

        {!isPast ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-5">
            {units.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative group"
              >
                <div className="bg-emerald-box border border-gold/20 rounded-sm p-2 sm:p-3 md:p-6 shadow-2xl shadow-black/40 overflow-hidden">
                  <div className="absolute top-0 left-0 w-4 h-px bg-gold/50" />
                  <div className="absolute top-0 left-0 h-4 w-px bg-gold/50" />
                  <div className="absolute bottom-0 right-0 w-4 h-px bg-gold/50" />
                  <div className="absolute bottom-0 right-0 h-4 w-px bg-gold/50" />
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={value}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="block font-serif text-2xl sm:text-3xl md:text-5xl magic-text-gradient leading-none tabular-nums"
                    >
                      {pad(value)}
                    </motion.span>
                  </AnimatePresence>

                  <span className="block font-display text-[7px] sm:text-[8px] md:text-[9px] text-gold/40 tracking-[0.25em] sm:tracking-[0.35em] uppercase mt-1 sm:mt-2 md:mt-3">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-xl sm:text-2xl text-gold/60 px-4"
          >
            Wishing the couple a lifetime of joy ♡
          </motion.p>
        )}
      </div>
    </section>
  );
}
