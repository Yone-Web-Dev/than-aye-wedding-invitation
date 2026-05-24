import React, { useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Utensils, Calendar, Camera, Heart, Mail, Share2, Map as MapIcon, Flower2, Leaf, X } from 'lucide-react';
import { cn } from '../lib/utils';
import WishSection from './WishSection';
import CountdownTimer from './CountdownTimer';
import QuickNav from './QuickNav';
import VenueMap from './VenueMap';
import { supabase } from '../lib/supabase';
import {
  GROOM_FIRST, BRIDE_FIRST,
  DATE_DISPLAY, DATE_FULL, ARRIVAL_TIME, RSVP_DEADLINE,
  VENUE_NAME, VENUE_PLUS_CODE, VENUE_LOCATION, VENUE_ADDRESS, VENUE_DESCRIPTION,
  VENUE_MAPS_URL,
  GROOM_FATHER, GROOM_MOTHER, BRIDE_FATHER, BRIDE_MOTHER,
  HERO_PHOTOS, GALLERY_PHOTOS,
} from '../config';

const RECEPTION_MENU = [
  {
    name: "Biryani",
    desc: "Fragrant celebration rice, slow-cooked with aromatic spices and tender meats — a cherished wedding feast.",
  },
  {
    name: "Ice Cream",
    desc: "Cool, creamy sweetness to close the meal — a delightful treat for every guest.",
  },
];

interface MainInviteProps {
  guestName: string;
}

export default function MainInvite({ guestName }: MainInviteProps) {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'submitting' | 'success'>('pending');
  const [attending, setAttending] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) return;

    setRsvpStatus('submitting');

    if (supabase) {
      try {
        const { error } = await supabase.from('rsvps').insert([
          { name: guestName, attending, timestamp: new Date().toISOString() }
        ]);
        if (error) throw error;
        setRsvpStatus('success');
        setTimeout(() => setIsRSVPOpen(false), 2000);
      } catch (err) {
        console.error('RSVP Error:', err);
        setRsvpStatus('success');
        setTimeout(() => setIsRSVPOpen(false), 2000);
      }
    } else {
      setRsvpStatus('success');
      setTimeout(() => setIsRSVPOpen(false), 2000);
    }
  };

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const openRsvp = () => {
    setIsRSVPOpen(true);
    requestAnimationFrame(() => {
      document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="relative bg-emerald-deep text-stone-300 font-sans overflow-x-hidden">
      <QuickNav onRsvp={openRsvp} />
      <div className="fixed inset-2 sm:inset-4 border border-gold/10 pointer-events-none z-[70] hidden sm:block"></div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-emerald-950 snap-start">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0 h-full w-full"
        >
           <motion.div
              animate={{ x: ["0%", "-33.33%", "-66.66%", "0%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex h-full w-[300%]"
           >
              {HERO_PHOTOS.map((photoUrl, i) => (
                <div key={i} className="w-1/3 h-full relative flex-shrink-0">
                  <img
                    src={photoUrl}
                    className="w-full h-full object-cover brightness-[0.4]"
                    alt={`Couple photography ${i + 1}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent"></div>
                </div>
              ))}
           </motion.div>
        </motion.div>

        <div className="absolute top-6 left-4 sm:top-10 sm:left-10 text-gold/20 animate-pulse hidden sm:block">
          <Flower2 size={100} strokeWidth={0.5} />
        </div>
        <div className="absolute top-6 right-4 sm:top-10 sm:right-10 text-gold/20 animate-pulse delay-700 hidden sm:block">
          <Flower2 size={100} strokeWidth={0.5} className="rotate-90" />
        </div>

        <div className="relative z-10 text-center space-y-4 sm:space-y-6 px-4 pt-16 pb-24 sm:pt-0 sm:pb-0 w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-2">
              <div className="w-6 sm:w-8 h-px bg-gold/30"></div>
              <p className="font-display text-gold text-xs sm:text-sm tracking-[0.35em] sm:tracking-[0.5em] opacity-80 uppercase leading-none">The Union of</p>
              <div className="w-6 sm:w-8 h-px bg-gold/30"></div>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white magic-text-gradient py-3 sm:py-4 leading-snug px-2">
              {GROOM_FIRST}<br />
              <span className="text-gold/50 text-lg sm:text-2xl md:text-3xl">&amp;</span><br />
              {BRIDE_FIRST}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center space-y-3 sm:space-y-4"
          >
            <div className="h-12 sm:h-16 w-[1px] bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>
            <div className="border border-gold/30 bg-emerald-950/20 backdrop-blur-md px-6 py-4 sm:px-10 sm:py-5 rounded-full ring-1 ring-gold/10">
              <p className="font-display text-gold-light tracking-[0.15em] sm:tracking-[0.2em] text-lg sm:text-xl md:text-2xl">{DATE_DISPLAY}</p>
            </div>
            <p className="text-gold/40 font-serif italic text-xs sm:text-sm tracking-widest uppercase mt-2 sm:mt-4">Save the Date</p>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-gold/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest uppercase font-display">Scroll</span>
          <div className="w-[1px] h-8 sm:h-10 bg-gold/20"></div>
        </motion.div>
      </section>

      {/* Parents Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 bg-emerald-deep relative overflow-hidden border-t border-gold/10">
         <div className="absolute inset-0 opacity-[0.2] pointer-events-none marble-bg"></div>
         <div className="absolute left-4 sm:left-10 top-20 text-gold/5 -rotate-12 animate-float hidden sm:block">
            <Leaf size={150} strokeWidth={0.2} />
         </div>

         <div className="max-w-4xl mx-auto text-center space-y-10 sm:space-y-16 relative z-10">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className="h-px flex-1 bg-gold/10"></div>
                <Flower2 className="text-gold/30" size={28} strokeWidth={1} />
                <div className="h-px flex-1 bg-gold/10"></div>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-yellow-100 italic px-2">With blessings from our families</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 md:gap-16 max-w-3xl sm:max-w-none mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="gold-frame w-full max-w-md mx-auto sm:max-w-none"
              >
                <div className="gold-frame-inner bg-emerald-box p-6 sm:p-8 text-center space-y-4">
                  <p className="font-display text-[10px] text-gold tracking-[0.35em] uppercase">Parents of the Groom</p>
                  <div className="space-y-2">
                    <p className="font-serif text-xl sm:text-2xl font-light text-stone-200">{GROOM_FATHER}</p>
                    <p className="font-serif text-xl sm:text-2xl font-light text-stone-200">{GROOM_MOTHER}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="gold-frame w-full max-w-md mx-auto sm:max-w-none"
              >
                <div className="gold-frame-inner bg-emerald-box p-6 sm:p-8 text-center space-y-4">
                  <p className="font-display text-[10px] text-gold tracking-[0.35em] uppercase">Parents of the Bride</p>
                  <div className="space-y-2">
                    <p className="font-serif text-xl sm:text-2xl font-light text-stone-200">{BRIDE_FATHER}</p>
                    <p className="font-serif text-xl sm:text-2xl font-light text-stone-200">{BRIDE_MOTHER}</p>
                  </div>
                </div>
              </motion.div>
            </div>
         </div>
      </section>

      {/* Couple Invitation Photo Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 bg-emerald-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none marble-bg"></div>
        <div className="absolute right-4 sm:right-10 bottom-20 text-gold/5 rotate-12 animate-float hidden sm:block">
          <Leaf size={120} strokeWidth={0.2} />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="h-px flex-1 bg-gold/10"></div>
              <Heart className="text-gold/30" size={22} strokeWidth={1} />
              <div className="h-px flex-1 bg-gold/10"></div>
            </div>
            <p className="font-display text-[10px] text-gold/60 tracking-[0.4em] uppercase">Together in Love</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="couple-photo-frame max-w-lg sm:max-w-xl md:max-w-2xl">
              <div className="couple-photo-inner">
                <img
                  src="/photos/couple-invitation.jpg"
                  alt={`${GROOM_FIRST} & ${BRIDE_FIRST} — Wedding Invitation`}
                  className="w-full h-auto"
                />
                <div className="couple-photo-shimmer"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-2"
          >
            <p className="font-serif italic text-lg sm:text-xl text-stone-400/80 leading-relaxed max-w-md mx-auto px-2">
              "Two souls, one journey — united by love, blessed by grace."
            </p>
          </motion.div>
        </div>
      </section>

      <CountdownTimer />

      {/* Venue & Location Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-8 bg-black/20 text-white relative border-y border-gold/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gold">
                <MapIcon size={20} />
                <p className="font-sans tracking-[0.3em] sm:tracking-[0.4em] text-[10px] uppercase">The Sanctuary</p>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-yellow-100 leading-relaxed">{VENUE_NAME}</h2>
              <p className="text-stone-400 font-serif text-base sm:text-lg max-w-md italic leading-relaxed">
                {VENUE_DESCRIPTION}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="group space-y-4">
                <div className="bg-emerald-box border border-gold/20 w-12 h-12 flex items-center justify-center rounded-sm group-hover:border-gold/50 transition-colors">
                  <Calendar className="text-gold" size={20} />
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl text-yellow-100">{DATE_FULL}</p>
                  <p className="text-stone-500 text-sm tracking-widest mt-1">{ARRIVAL_TIME}</p>
                </div>
              </div>

              <div className="group space-y-4">
                <div className="bg-emerald-box border border-gold/20 w-12 h-12 flex items-center justify-center rounded-sm group-hover:border-gold/50 transition-colors">
                  <MapPin className="text-gold" size={20} />
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl text-yellow-100">{VENUE_PLUS_CODE}</p>
                  <p className="text-stone-500 text-sm tracking-widest mt-1">{VENUE_LOCATION}, {VENUE_ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 w-full">
            <VenueMap apiKey={GOOGLE_MAPS_API_KEY} />
          </div>
        </div>
      </section>

      {/* Reception Menu */}
      <section className="py-16 sm:py-24 md:py-32 px-4 bg-emerald-deep relative">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-16">
          <div className="text-center space-y-4">
            <Utensils className="mx-auto text-gold/30 mb-2" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-yellow-100 italic px-2">Reception</h2>
            <p className="font-display text-[10px] text-gold/50 tracking-[0.5em] uppercase">Served with love</p>
            <div className="w-12 h-[1px] bg-gold-dim mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            {RECEPTION_MENU.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="gold-frame gallery-float"
              >
                <div className="gold-frame-inner bg-emerald-box p-8 sm:p-10 text-center space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl text-gold magic-text-gradient tracking-wide">
                    {item.name}
                  </h3>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto" />
                  <p className="font-serif text-base sm:text-lg text-stone-400 italic leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 sm:py-24 bg-emerald-box/60 relative border-t border-gold/10">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16 space-y-4">
             <Camera className="mx-auto text-gold" />
             <h2 className="font-serif text-3xl sm:text-4xl text-yellow-100 italic">Chapters of Our Love</h2>
             <p className="font-serif italic text-gold/50 tracking-wider uppercase text-xs">A Collection of Moments</p>
          </div>

          <div className="columns-2 sm:columns-2 md:columns-3 xl:columns-4 gap-4 sm:gap-5">
            {GALLERY_PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.url}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 4) * 0.05, duration: 0.5 }}
                className="gold-frame gallery-float break-inside-avoid mb-4 sm:mb-5 group"
              >
                <div className="gold-frame-inner">
                  <img
                    src={photo.url}
                    className="w-full h-auto object-cover block transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    alt={photo.alt}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WishSection guestName={guestName} />

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 sm:py-32 md:py-40 px-4 bg-emerald-deep text-white text-center relative overflow-hidden border-t border-gold/10 scroll-mt-4">
        <div className="absolute inset-0 opacity-[0.3] pointer-events-none marble-bg rotate-180"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-10 sm:space-y-16">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-yellow-100 italic break-words px-2">Thank You, {guestName}</h2>
            <p className="font-serif italic text-lg sm:text-2xl text-stone-400 leading-relaxed max-w-lg mx-auto px-2">
              We can't wait to share this enchanted evening with you.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <button
              onClick={openRsvp}
              className="bg-gold/10 border border-gold text-gold font-sans font-bold px-8 sm:px-16 py-5 sm:py-6 rounded-sm shadow-2xl shadow-gold/10 transform hover:bg-gold/20 transition-all text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.4em] group overflow-hidden relative w-full max-w-xs sm:max-w-none sm:w-auto"
            >
               <span className="relative z-10">RSVP Now</span>
               <div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            <p className="text-stone-600 text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase px-2">Response requested by {RSVP_DEADLINE}</p>
          </div>

          <div className="h-px w-24 bg-gold-dim mx-auto"></div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 pt-4">
             <a
               href={VENUE_MAPS_URL}
               target="_blank"
               rel="noopener noreferrer"
               className="text-gold/40 hover:text-gold transition-colors flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em]"
             >
               <Mail size={14} /> <span>Directions</span>
             </a>
             <button className="text-gold/40 hover:text-gold transition-colors flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em]">
               <Share2 size={14} /> <span>Registry</span>
             </button>
          </div>
        </div>

        <AnimatePresence>
          {isRSVPOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-emerald-deep/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-emerald-box border border-gold/30 p-6 sm:p-12 rounded-t-2xl sm:rounded-sm shadow-2xl max-w-md w-full relative overflow-hidden max-h-[90dvh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsRSVPOpen(false)}
                  className="absolute top-4 right-4 text-gold/40 hover:text-gold transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center space-y-6">
                  <Heart className="mx-auto text-gold/30" />
                  <h3 className="font-serif text-2xl sm:text-3xl text-yellow-100 italic">Will you join us?</h3>

                  {rsvpStatus === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-10 text-gold font-display text-sm tracking-widest"
                    >
                      Thank you for your response!
                    </motion.div>
                  ) : (
                    <form onSubmit={handleRSVPSubmit} className="space-y-6 sm:space-y-8">
                      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:space-x-4 sm:gap-0">
                        <button
                          type="button"
                          onClick={() => setAttending(true)}
                          className={cn(
                            "flex-1 py-4 border transition-all font-sans text-xs uppercase tracking-widest",
                            attending === true ? "bg-gold text-emerald-950 border-gold" : "border-gold/20 text-gold/60"
                          )}
                        >
                          Joyfully Attend
                        </button>
                        <button
                          type="button"
                          onClick={() => setAttending(false)}
                          className={cn(
                            "flex-1 py-4 border transition-all font-sans text-xs uppercase tracking-widest",
                            attending === false ? "bg-gold/20 text-gold border-gold/50" : "border-gold/20 text-gold/60"
                          )}
                        >
                          Regretfully Decline
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={attending === null || rsvpStatus === 'submitting'}
                        className="w-full bg-gold text-emerald-950 font-bold py-5 rounded-sm uppercase tracking-[0.3em] text-xs shadow-xl shadow-gold/20 disabled:opacity-50"
                      >
                        {rsvpStatus === 'submitting' ? 'Submitting...' : 'Confirm RSVP'}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="py-10 sm:py-16 text-center text-gold-dim bg-emerald-box border-t border-gold/10 px-4">
         <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:space-x-4 mb-4">
            <div className="hidden sm:block w-12 h-px bg-gold-dim/20"></div>
            <p className="font-display text-base sm:text-lg italic text-gold-light opacity-50">{GROOM_FIRST} & {BRIDE_FIRST}</p>
            <div className="hidden sm:block w-12 h-px bg-gold-dim/20"></div>
         </div>
         <p className="font-sans text-[9px] tracking-[0.4em] sm:tracking-[0.6em] uppercase opacity-30 mt-4">Estate Celebration 2026</p>
      </footer>
    </div>
  );
}
