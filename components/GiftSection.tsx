'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck, FaGift } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

interface GiftSectionProps {
    weddingData: WeddingData;
}

export default function GiftSection({ weddingData }: GiftSectionProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (!Array.isArray(weddingData.gifts) || weddingData.gifts.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
                            <FaGift size={24} />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-navy-800 mb-4">Kado Digital</h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat memberikannya melalui:
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.isArray(weddingData.gifts) && weddingData.gifts.map((gift, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-50 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50" />
                            
                            {gift.title && (
                                <div className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 text-sm font-bold rounded-full mb-4">
                                    {gift.title}
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-navy-800 mb-2 uppercase tracking-wider">{gift.bankName}</h3>
                            <div className="text-2xl font-mono text-gold-600 font-bold mb-1">
                                {gift.accountNumber}
                            </div>
                            <p className="text-gray-500 mb-6 font-medium">a.n {gift.accountHolder}</p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => copyToClipboard(gift.accountNumber, index)}
                                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                                        copiedIndex === index
                                            ? 'bg-green-500 text-white'
                                            : 'bg-navy-700 text-white hover:bg-navy-800 shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {copiedIndex === index ? (
                                        <>
                                            <FaCheck /> Tersalin
                                        </>
                                    ) : (
                                        <>
                                            <FaCopy /> Salin Nomor
                                        </>
                                    )}
                                </button>
                                
                                {gift.whatsapp && (
                                    <a
                                        href={`https://wa.me/${gift.whatsapp}?text=Halo%20${gift.accountHolder},%20saya%20sudah%20mengirimkan%20kado%20ya!`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Konfirmasi via WhatsApp
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
