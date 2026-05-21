import React from 'react';
import { Flower2, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloralFrame() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {/* Decorative Corner: Top Left */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.2, x: -100, y: -100 }}
        animate={{ opacity: 0.3, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute top-0 left-0 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px]"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
          {/* Organic Vines */}
          <path d="M0 0C60 0 100 40 120 100C140 160 100 200 100 200" stroke="currentColor" strokeWidth="0.3" opacity="0.6" />
          <path d="M0 50C40 50 80 80 80 120C80 160 50 180 50 180" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          
          {/* Stylized Flowers */}
          <circle cx="120" cy="100" r="1.5" fill="currentColor" />
          <circle cx="80" cy="120" r="1" fill="currentColor" />
          
          {/* Detailed Petal Elements */}
          <path d="M115 95C125 85 135 95 125 105C115 115 105 105 115 95Z" fill="currentColor" opacity="0.1" />
          <path d="M75 115C85 105 95 115 85 125C75 135 65 125 75 115Z" fill="currentColor" opacity="0.1" />

          <motion.path 
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            d="M10 10Q100 40 160 160" 
            stroke="currentColor" 
            strokeWidth="0.1" 
            strokeDasharray="2 4" 
          />
        </svg>
      </motion.div>

      {/* Decorative Corner: Bottom Right */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.2, x: 100, y: 100 }}
        animate={{ opacity: 0.3, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-0 right-0 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rotate-180"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold">
          {/* Organic Vines */}
          <path d="M0 0C60 0 100 40 120 100C140 160 100 200 100 200" stroke="currentColor" strokeWidth="0.3" opacity="0.6" />
          <path d="M0 60C50 60 90 90 90 130" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
          
          <circle cx="120" cy="100" r="1.5" fill="currentColor" />
          <path d="M115 95C125 85 135 95 125 105C115 115 105 105 115 95Z" fill="currentColor" opacity="0.1" />

          <motion.path 
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            d="M20 20Q110 50 170 170" 
            stroke="currentColor" 
            strokeWidth="0.1" 
            strokeDasharray="2 4" 
          />
        </svg>
      </motion.div>

      {/* Elegant Vines on Sides */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 hidden sm:flex flex-col justify-around py-40 opacity-10">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ x: [0, 5, 0], rotate: [i * 10, i * 10 + 5, i * 10] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold"
          >
            <Leaf size={40 + i * 10} strokeWidth={0.5} />
          </motion.div>
        ))}
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 hidden sm:flex flex-col justify-around py-40 opacity-10 scale-x-[-1]">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ x: [0, 5, 0], rotate: [i * 10, i * 10 + 5, i * 10] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold"
          >
            <Leaf size={40 + i * 10} strokeWidth={0.5} />
          </motion.div>
        ))}
      </div>

      {/* Floating Petals/Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: -20, 
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: "110vh",
              opacity: [0, 0.4, 0],
              x: (Math.random() * 100 - 50) + "vw"
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute"
          >
            <div className="w-1 h-1 bg-gold rounded-full blur-[1px]"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
