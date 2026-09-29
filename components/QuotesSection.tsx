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
    <section className="py-20 px-4 relative overflow-hidden flex items-center bg-gray-100">
      <div className="max-w-xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative py-20 px-8 md:px-16 min-h-[450px] md:min-h-0 flex items-center justify-center"
        >
          {/* Background Image dihapus */}

          {/* Content Wrapper */}
          <div className="relative z-10 space-y-8 w-full">
            {type === 'opening' ? (
              <>
                <div className="space-y-4">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="text-yellow-700 text-4xl mb-2 block font-serif"
                  >
                    "
                  </motion.span>
                  <p className="text-lg md:text-2xl font-serif text-gray-900 italic tracking-wide leading-relaxed">
                    {quote.salam}
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-4 my-6">
                  <div className="h-[1px] w-12 bg-yellow-800/30" />
                  <div className="w-2 h-2 rotate-45 border border-yellow-800/40" />
                  <div className="h-[1px] w-12 bg-yellow-800/30" />
                </div>
                
                <p className="text-base md:text-xl leading-loose text-gray-800 font-medium whitespace-pre-line italic font-serif">
                  {quote.content}
                </p>

                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className="text-yellow-700 text-4xl mt-2 block font-serif"
                >
                  "
                </motion.span>
              </>
            ) : (
              <>
                <div className="relative inline-block mb-6">
                  <h3 className="text-3xl md:text-5xl font-serif text-gray-900 z-10 relative tracking-tight">
                    {quote.title}
                  </h3>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200/40 -z-0 blur-sm" />
                </div>
                
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-800 font-medium whitespace-pre-line max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-0">
                  {quote.content}
                </p>

                <div className="space-y-8 pt-10">
                  <p className="text-xl font-serif text-gray-900 italic">
                    {quote.salam}
                  </p>
                  
                  <div className="mt-12 flex flex-col items-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-4 font-semibold">
                      {quote.footer}
                    </p>
                    <p className="text-3xl md:text-5xl font-serif font-bold text-yellow-900 tracking-tighter">
                      {weddingData.couple.bride.shortName} <span className="text-yellow-600 font-light mx-1 italic">&</span> {weddingData.couple.groom.shortName}
                    </p>
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
