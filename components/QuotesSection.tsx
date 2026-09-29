'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '@/data/wedding-data';

interface QuotesSectionProps {
  type: 'opening' | 'closing';
}

const QuotesSection: React.FC<QuotesSectionProps> = ({ type }) => {
  const quote = weddingData.quotes?.[type];

  if (!quote) return null;

  return (
    <section className="py-24 px-4 relative overflow-hidden flex items-center bg-gradient-to-br from-[#faf8f5] via-[#fffdf9] to-[#f4f1ea]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-600/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Corner Ornaments */}
      <div className="absolute top-4 left-4 text-yellow-800/10 pointer-events-none w-24 h-24 md:w-40 md:h-40">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-50">
          <path d="M0,0 Q50,0 50,50 Q50,0 100,0 Q50,0 50,-50 Q50,0 0,0" transform="translate(0, 50)" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 text-yellow-800/10 rotate-180 pointer-events-none w-24 h-24 md:w-40 md:h-40">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-50">
          <path d="M0,0 Q50,0 50,50 Q50,0 100,0 Q50,0 50,-50 Q50,0 0,0" transform="translate(0, 50)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative py-16 px-8 md:px-16 flex items-center justify-center bg-white/60 backdrop-blur-sm border border-yellow-800/10 shadow-2xl shadow-yellow-900/5 rounded-[2.5rem]"
        >
          {/* Inner Border */}
          <div className="absolute inset-4 border border-yellow-800/10 rounded-[2rem] pointer-events-none" />

          {/* Content Wrapper */}
          <div className="relative z-10 space-y-8 w-full">
            {type === 'opening' ? (
              <>
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-50 to-white rounded-full flex items-center justify-center border border-yellow-200/50 shadow-sm mb-4"
                  >
                    <span className="text-yellow-700/80 text-4xl font-serif pt-4 leading-none">&quot;</span>
                  </motion.div>
                  <p className="text-2xl md:text-4xl font-serif text-gray-800 italic tracking-wide leading-relaxed">
                    {quote.salam}
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-4 my-10">
                  <div className="h-[1px] w-20 md:w-32 bg-gradient-to-r from-transparent via-yellow-700/30 to-transparent" />
                  <div className="w-2 h-2 rotate-45 bg-yellow-700/20" />
                  <div className="h-[1px] w-20 md:w-32 bg-gradient-to-r from-transparent via-yellow-700/30 to-transparent" />
                </div>
                
                <p className="text-base md:text-xl leading-loose text-gray-600 font-medium whitespace-pre-line italic font-serif">
                  {quote.content}
                </p>

                <div className="pt-8">
                   <div className="mx-auto w-6 h-6 opacity-30">
                     <svg viewBox="0 0 24 24" fill="none" className="text-yellow-800">
                        <path d="M12 21C12 21 6 16.5 3 12C0 7.5 4.5 3 9 6C9 6 12 9 12 9C12 9 15 6 15 6C19.5 3 24 7.5 21 12C18 16.5 12 21 12 21Z" fill="currentColor"/>
                     </svg>
                   </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative inline-block mb-12">
                  <h3 className="text-5xl md:text-7xl font-serif text-gray-800 z-10 relative tracking-tight">
                    {(quote as any).title}
                  </h3>
                  <div className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-200/50 -z-0 blur-sm rounded-full" />
                </div>
                
                <p className="text-sm md:text-lg lg:text-xl leading-loose text-gray-600 font-medium whitespace-pre-line max-w-sm md:max-w-xl lg:max-w-3xl mx-auto px-4 md:px-0 italic font-serif">
                  {quote.content}
                </p>

                <div className="space-y-8 pt-16">
                  <p className="text-2xl md:text-4xl font-serif text-gray-800 italic">
                    {quote.salam}
                  </p>
                  
                  <div className="mt-16 flex flex-col items-center">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gray-400 mb-8 font-semibold">
                      {(quote as any).footer}
                    </p>
                    <div className="flex items-center justify-center gap-3 md:gap-6">
                      <p className="text-4xl md:text-6xl font-serif font-bold text-yellow-900 tracking-tighter">
                        {weddingData.couple.bride.shortName} 
                      </p>
                      <span className="text-yellow-600/40 font-serif text-3xl md:text-5xl italic">&amp;</span>
                      <p className="text-4xl md:text-6xl font-serif font-bold text-yellow-900 tracking-tighter">
                        {weddingData.couple.groom.shortName}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuotesSection;
