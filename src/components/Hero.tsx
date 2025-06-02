import React, { useEffect, useRef, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dropsRef = useRef<number[]>([]);
  const fontSize = 16;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Fix the canvas size once based on the container dimensions
    const setCanvasSize = () => {
      const { offsetWidth, offsetHeight } = canvas;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;

      const columns = Math.floor(canvas.width / fontSize);
      dropsRef.current = Array(columns).fill(1);
    };

    setCanvasSize(); // Only once on mount

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}();=+-*&^%$#@!~`|\\:;"\',.?';

    const draw = () => {
      if (!canvas || !context) return;

      context.fillStyle = 'rgba(30, 41, 59, 0.04)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#6BB6FF';
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < dropsRef.current.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, dropsRef.current[i] * fontSize);

        if (dropsRef.current[i] * fontSize > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }
        dropsRef.current[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current!);
    };
  }, []);

  return (
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-slate-800">
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
              opacity: 0.4,
            }}
        />

        <div className="relative z-10 p-4 max-w-7xl mx-auto">
          <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
            Webarca
          </motion.h1>
          <motion.p
              className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
          >
            Soluții web profesionale. Fără bătăi de cap.
          </motion.p>
          <motion.p
              className="text-lg md:text-xl mb-12 text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
          >
            Creăm experiențe digitale excepționale prin dezvoltare web modernă, design inovator și strategii de marketing eficiente.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.a
                href="#services"
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
            >
              Serviciile noastre
              <ArrowRight size={18} className="ml-2" />
            </motion.a>
            <motion.a
                href="#contact"
                className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md flex items-center justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
            >
              Contact
              <ArrowRight size={18} className="ml-2" />
            </motion.a>
          </div>
        </div>
      </section>
  );
});

export default Hero;
