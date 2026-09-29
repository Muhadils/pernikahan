'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { WeddingData } from '@/data/wedding-data';

interface MusicPlayerProps {
    shouldPlay: boolean;
    weddingData: WeddingData;
}

export default function MusicPlayer({ shouldPlay, weddingData }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        console.log('MusicPlayer: shouldPlay changed to', shouldPlay);
        const attemptAutoPlay = async () => {
            if (shouldPlay && audioRef.current) {
                console.log('MusicPlayer: Attempting autoplay...');
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                    setShowControls(true);
                    console.log('MusicPlayer: Autoplay successful.');
                } catch (error) {
                    setIsPlaying(false);
                    setShowControls(false);
                    console.error('MusicPlayer: Autoplay failed:', error);
                }
            } else {
                console.log('MusicPlayer: Autoplay not attempted. shouldPlay:', shouldPlay, 'audioRef.current:', audioRef.current);
            }
        };
        attemptAutoPlay();
    }, [shouldPlay, weddingData.music?.url || '']);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && showControls) {
            timer = setTimeout(() => {
                setShowControls(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, showControls]);


    const togglePlay = async () => {
        if (!audioRef.current) {
            console.log('MusicPlayer: audioRef.current is null on togglePlay.');
            return;
        }

        if (isPlaying) {
            console.log('MusicPlayer: Pausing audio.');
            audioRef.current.pause();
            setIsPlaying(false);
            setShowControls(false);
        } else {
            console.log('MusicPlayer: Attempting to play audio.');
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                setShowControls(true);
                console.log('MusicPlayer: Play successful.');
            } catch (error) {
                setIsPlaying(false);
                setShowControls(false);
                console.error('MusicPlayer: Play failed:', error);
            }
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            setShowControls(true);
            console.log('MusicPlayer: Mute toggled to', !isMuted);
        } else {
            console.log('MusicPlayer: audioRef.current is null on toggleMute.');
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                loop
                src={weddingData.music.url}
                onError={(e) => {
                    console.error('MusicPlayer: Audio loading error:', e);
                    setIsPlaying(false);
                    setShowControls(false);
                }}
            />

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-4 right-4 z-50"
            >
                <div className="bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-100">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white shadow-sm"
                    >
                        {isPlaying ? (
                            <motion.div
                                key="pause"
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaPause className="text-[10px]" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ rotate: 180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaPlay className="text-[10px] ml-0.5" />
                            </motion.div>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showControls && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="absolute bottom-full right-0 mb-2 bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-lg border border-gray-100 min-w-[120px]"
                            >
                                <div className="mb-1 text-center">
                                    <p className="text-[9px] uppercase tracking-wider font-bold text-gray-900 truncate px-1">
                                        {weddingData.music.title}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={toggleMute}
                                        className="text-gray-800 hover:text-black transition-colors"
                                    >
                                        {isMuted ? <FaVolumeMute className="text-xs" /> : <FaVolumeUp className="text-xs" />}
                                    </button>
                                </div>

                                {isPlaying && (
                                    <div className="flex justify-center gap-0.5 mt-1.5">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ scaleY: [1, 1.8, 1] }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    delay: i * 0.2,
                                                }}
                                                className="w-0.5 h-1.5 bg-black rounded-full"
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}
