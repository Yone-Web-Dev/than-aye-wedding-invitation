import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, X, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

interface WishSectionProps {
  guestName: string;
}

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const PREVIEW_COUNT = 4;

function prependWish(prev: Wish[], wish: Wish): Wish[] {
  if (prev.some((w) => w.id === wish.id)) return prev;
  return [wish, ...prev];
}

function WishCard({ wish, highlight }: { wish: Wish; highlight?: boolean }) {
  return (
    <div
      className={cn(
        'bg-white/5 p-4 sm:p-6 border-l-2 group transition-all',
        highlight ? 'border-gold bg-white/10' : 'border-gold-dim'
      )}
    >
      <p className="text-stone-300 text-sm italic leading-relaxed mb-4">
        &ldquo;{wish.message}&rdquo;
      </p>
      <div className="flex justify-end items-center space-x-3">
        <div className="w-8 h-[1px] bg-gold-dim/20" />
        <p className="font-serif text-stone-400 text-xs italic group-hover:text-gold transition-colors">
          {wish.name} — {new Date(wish.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default function WishSection({ guestName }: WishSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [showAllWishes, setShowAllWishes] = useState(false);

  const previewWishes = wishes.slice(0, PREVIEW_COUNT);
  const hasMore = wishes.length > PREVIEW_COUNT;

  useEffect(() => {
    if (!supabase) return;

    fetchWishes();

    const channel = supabase
      .channel('wedding-wishes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'wishes',
        },
        (payload) => {
          setWishes((prev) => prependWish(prev, payload.new as Wish));
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          console.warn('Wish realtime unavailable — new posts still save; refresh to see others.');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchWishes() {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (err) {
      console.error('Error fetching wishes:', err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newWish = {
      name: guestName || 'Anonymous Guest',
      message: currentMessage.trim(),
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('wishes')
          .insert([newWish])
          .select('id, name, message, created_at')
          .single();

        if (error) throw error;

        if (data) {
          setWishes((prev) => prependWish(prev, data as Wish));
        }

        setCurrentMessage('');
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
      } catch (err) {
        console.error('Error sending wish:', err);
        handleFallback(newWish);
      }
    } else {
      handleFallback(newWish);
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSent && currentMessage.trim()) {
        e.currentTarget.form?.requestSubmit();
      }
    }
  };

  const handleFallback = (newWish: { name: string; message: string }) => {
    const demoWish: Wish = {
      id: Date.now().toString(),
      name: newWish.name,
      message: newWish.message,
      created_at: new Date().toISOString()
    };
    setWishes(prev => [demoWish, ...prev]);
    setCurrentMessage('');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <section id="wishes" className="py-16 sm:py-24 md:py-32 px-4 bg-emerald-deep border-t border-gold/10 scroll-mt-4">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
        <div className="text-center space-y-4">
          <Heart className="mx-auto text-gold/30" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-yellow-100 italic px-2">Guest Wishes</h2>
          <div className="w-12 h-[1px] bg-gold-dim mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="bg-emerald-box p-6 sm:p-10 rounded-sm shadow-2xl border border-gold/20 space-y-8 sm:space-y-10 relative overflow-hidden order-2 lg:order-1">
            <h3 className="font-serif text-xl sm:text-2xl text-stone-200 italic relative z-10">Write a note to the couple</h3>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-sans text-gold/60 uppercase tracking-[0.4em]">Your Message</label>
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Share your thoughts..."
                  className="w-full h-32 sm:h-40 bg-black/20 border-b border-gold-dim p-4 text-stone-200 focus:outline-none focus:border-gold transition-all resize-none font-serif text-base sm:text-lg leading-relaxed placeholder:text-stone-700"
                  required
                />
                <p className="text-[9px] text-stone-600 font-sans tracking-wider">
                  Press <span className="text-gold/60">Enter</span> to send · <span className="text-gold/60">Shift+Enter</span> for a new line
                </p>
              </div>

              <button
                type="submit"
                disabled={isSent}
                className={cn(
                  "w-full flex items-center justify-center space-x-3 py-4 sm:py-5 rounded-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-all text-xs",
                  isSent
                    ? "bg-green-900/20 text-green-500 border border-green-900/50 pointer-events-none"
                    : "bg-gold/10 text-gold border border-gold/40 hover:bg-gold/20 shadow-lg shadow-gold/5"
                )}
              >
                {isSent ? (
                  <><span>Wish Sent</span> <Heart size={16} fill="currentColor" /></>
                ) : (
                  <><span>Send Presence</span> <Send size={16} /></>
                )}
              </button>
            </form>

            <p className="text-[10px] text-stone-600 font-sans tracking-widest uppercase italic lg:hidden">
              Your wish will appear in the guestbook below.
            </p>
            <p className="text-[10px] text-stone-600 font-sans tracking-widest uppercase italic hidden lg:block">
              A live preview of your wish will appear on the right.
            </p>
          </div>

          <div className="space-y-4 order-1 lg:order-2">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-sans text-[10px] text-gold/40 uppercase tracking-[0.5em] shrink-0">The Guestbook</h3>
              <div className="h-[1px] flex-1 bg-gold-dim/10" />
              {wishes.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAllWishes(true)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 border border-gold/30 text-gold text-[9px] font-display uppercase tracking-[0.2em] hover:bg-gold/10 hover:border-gold/50 transition-all"
                >
                  <BookOpen size={12} aria-hidden />
                  View All{wishes.length > 0 ? ` (${wishes.length})` : ''}
                </button>
              )}
            </div>

            <div className="space-y-4 max-h-[400px] sm:max-h-[480px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar mask-fade-bottom">
              {wishes.length === 0 ? (
                <p className="text-stone-600 font-serif italic text-sm text-center py-12">
                  Be the first to leave a wish for the couple.
                </p>
              ) : (
                <AnimatePresence initial={false}>
                  {previewWishes.map((wish, index) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-4 sm:mb-6 last:mb-0"
                    >
                      <WishCard wish={wish} highlight={index === 0} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {hasMore && (
                <button
                  type="button"
                  onClick={() => setShowAllWishes(true)}
                  className="w-full py-4 border border-gold/20 text-gold/70 font-display text-[10px] uppercase tracking-[0.3em] hover:bg-gold/5 hover:text-gold hover:border-gold/40 transition-all"
                >
                  + {wishes.length - PREVIEW_COUNT} more — View All Wishes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAllWishes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-emerald-deep/90 backdrop-blur-md"
            onClick={() => setShowAllWishes(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="gold-frame w-full sm:max-w-2xl max-h-[90dvh] sm:max-h-[85vh] flex flex-col"
            >
              <div className="gold-frame-inner bg-emerald-box flex flex-col max-h-[90dvh] sm:max-h-[85vh]">
                <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-gold/20 shrink-0">
                  <div className="flex items-center gap-3">
                    <Heart className="text-gold/40" size={20} />
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-yellow-100 italic">All Guest Wishes</h3>
                      <p className="font-display text-[9px] text-gold/50 uppercase tracking-[0.35em] mt-1">
                        {wishes.length} {wishes.length === 1 ? 'message' : 'messages'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllWishes(false)}
                    className="text-gold/40 hover:text-gold transition-colors p-1"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="overflow-y-auto p-5 sm:p-6 space-y-4 sm:space-y-5 custom-scrollbar flex-1">
                  {wishes.map((wish, index) => (
                    <div key={wish.id}>
                      <WishCard wish={wish} highlight={index === 0} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(202, 138, 4, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(202, 138, 4, 0.5); }
      `}</style>
    </section>
  );
}
