import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const code = '</>{}();=+-*&^%$#@!~`|\\:;"\',.?';

    const alphabet = latin + nums + code;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      context.fillStyle = 'rgba(30, 41, 59, 0.04)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#6BB6FF';
      context.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / fontSize);
      rainDrops.length = 0;
      for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      ></canvas>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          Webarca
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto animate-fade-in-delay">
          Soluții web profesionale. Fără bătăi de cap.
        </p>
        <motion.p
            className="text-lg md:text-xl mb-12 text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
          Creăm experiențe digitale excepționale prin dezvoltare web modernă, design inovator și strategii de marketing eficiente.
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-delay-2">
          <a
            href="#services"
            className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
          >
            Serviciile noastre
            <ArrowRight size={18} className="ml-2" />
          </a>
          <a
            href="#contact"
            className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-all duration-300"
          >
            Contactează-ne
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
