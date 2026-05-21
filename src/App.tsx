/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Entrance from './components/Entrance';
import MagicLetter from './components/MagicLetter';
import MainInvite from './components/MainInvite';
import BackgroundMusic from './components/BackgroundMusic';
import FloralFrame from './components/FloralFrame';

export type Step = 'entrance' | 'letter' | 'main';

export default function App() {
  const [step, setStep] = useState<Step>('entrance');
  const [guestName, setGuestName] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleEnter = (name: string) => {
    setGuestName(name);
    setStep('letter');
    setHasInteracted(true);
  };

  const handleLetterComplete = () => {
    window.scrollTo(0, 0);
    setStep('main');
  };

  useEffect(() => {
    if (step === 'main') {
      window.scrollTo(0, 0);
    }
  }, [step]);

  return (
    <main className="min-h-screen marble-bg overflow-x-hidden">
      <AnimatePresence mode="wait">
        {step === 'entrance' && (
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-[100dvh] flex items-center justify-center p-4"
          >
            <Entrance onEnter={handleEnter} />
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="min-h-[100dvh] flex items-center justify-center p-4 sm:p-8"
          >
            <MagicLetter guestName={guestName} onComplete={handleLetterComplete} />
          </motion.div>
        )}

        {step === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="min-h-screen w-full"
          >
            <MainInvite guestName={guestName} />
          </motion.div>
        )}
      </AnimatePresence>

      {hasInteracted && <BackgroundMusic />}
      <FloralFrame />
    </main>
  );
}
