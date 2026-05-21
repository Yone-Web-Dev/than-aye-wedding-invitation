import { Heart, PenLine } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuickNavProps {
  onRsvp: () => void;
  className?: string;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function QuickNav({ onRsvp, className }: QuickNavProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-20 left-3 sm:bottom-24 sm:left-5 z-[85] flex flex-col gap-2',
        className
      )}
      aria-label="Quick navigation"
    >
      <button
        type="button"
        onClick={() => scrollToSection('wishes')}
        className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-full bg-emerald-box/95 backdrop-blur-md border border-gold/40 text-gold text-[9px] sm:text-[10px] font-display font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/40 hover:bg-gold/10 hover:border-gold transition-all"
      >
        <PenLine size={14} aria-hidden />
        <span>Wishes</span>
      </button>
      <button
        type="button"
        onClick={onRsvp}
        className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gold/15 backdrop-blur-md border border-gold text-gold-light text-[9px] sm:text-[10px] font-display font-bold uppercase tracking-[0.2em] shadow-lg shadow-gold/10 hover:bg-gold/25 transition-all"
      >
        <Heart size={14} aria-hidden />
        <span>RSVP</span>
      </button>
    </nav>
  );
}
