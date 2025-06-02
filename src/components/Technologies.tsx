import { useState } from "react";
import { useRef } from 'react';
import {
  SiLaravel, SiReact, SiDrupal, SiWordpress, SiShopify, SiPrestashop, SiHtml5, SiCss3,
  SiJavascript, SiBootstrap, SiTailwindcss, SiPhp, SiJoomla, SiMagento, SiNodedotjs,
  SiWoocommerce, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiElasticsearch, SiFirebase,
} from 'react-icons/si';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const categories = [
  {
    title: "Frontend",
    techs: [
      { icon: SiReact, name: "React", color: "text-blue-700" },
      { icon: SiHtml5, name: "HTML", color: "text-orange-600" },
      { icon: SiJavascript, name: "Javascript", color: "text-yellow-400" },
      { icon: SiBootstrap, name: "Bootstrap", color: "text-purple-600" },
      { icon: SiCss3, name: "CSS", color: "text-blue-700" },
      { icon: SiTailwindcss, name: "TailwindCSS", color: "text-blue-300" },
    ]
  },
  {
    title: "Backend",
    techs: [
      { icon: SiLaravel, name: "Laravel", color: "text-red-500" },
      { icon: SiDrupal, name: "Drupal", color: "text-blue-600" },
      { icon: SiWordpress, name: "WordPress", color: "text-blue-700" },
      { icon: SiShopify, name: "Shopify", color: "text-green-500" },
      { icon: SiMagento, name: "Magento", color: "text-orange-500" },
      { icon: SiPrestashop, name: "Prestashop", color: "text-blue-400" },
      { icon: SiNodedotjs, name: "Node.JS", color: "text-green-600" },
      { icon: SiJoomla, name: "Joomla", color: "text-blue-400" },
      { icon: SiPhp, name: "PHP", color: "text-purple-400" },
    ]
  },
  {
    title: "CMS",
    techs: [
      { icon: SiWordpress, name: "WordPress", color: "text-blue-900" },
      { icon: SiDrupal, name: "Drupal", color: "text-blue-600" },
      { icon: SiJoomla, name: "Joomla", color: "text-red-400" },
      { icon: SiMagento, name: "Magento", color: "text-orange-500" },
      { icon: SiShopify, name: "Shopify", color: "text-green-500" },
      { icon: SiPrestashop, name: "Prestashop", color: "text-blue-400" },
      { icon: SiWoocommerce, name: "WooCommerce", color: "text-blue-400" },
    ]
  },
  {
    title: "Database",
    techs: [
      { icon: SiMysql, name: "MySQL", color: "text-blue-900" },
      { icon: SiPostgresql, name: "PostgresSQL", color: "text-blue-600" },
      { icon: SiMongodb, name: "MongoDB", color: "text-green-400" },
      { icon: SiRedis, name: "Redis", color: "text-red-700" },
      { icon: SiElasticsearch, name: "Elasticsearch", color: "text-orange-600" },
      { icon: SiFirebase, name: "Firebase", color: "text-orange-800" },
    ]
  },
];


function TechCard({ tech }: { tech: { icon: any; name: string; color: string } }) {
  const controls = useAnimation();
  const cardRef = useRef(null);

  return (
      <div
          ref={cardRef}
          onMouseEnter={() => controls.start({ rotate: 360 })}
          onMouseLeave={() => controls.start({ rotate: 0 })}
          className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <motion.div animate={controls} transition={{ duration: 0.6 }}>
          <tech.icon className={`text-4xl ${tech.color} mb-3 mx-auto`} />
        </motion.div>
        <p className="font-semibold text-slate-700">{tech.name}</p>
      </div>
  );
}


export default function Technologies() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
      <section id="technologies" className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Tehnologii Moderne
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Folosim cele mai recente tehnologii și framework-uri pentru a crea soluții web performante și scalabile.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar with Categories */}
            <div className="flex flex-col gap-4 w-full md:w-1/4">
              {categories.map((cat, index) => (
                  <button
                      key={cat.title}
                      onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                      className={`text-left p-4 rounded-md font-semibold border 
                ${activeIndex === index ? 'bg-slate-800 text-white' : 'bg-white text-slate-800 hover:bg-slate-200'} transition`}
                  >
                    {cat.title}
                  </button>
              ))}
            </div>

            {/* Animated Tech Cards */}
            <div className="w-full md:w-3/4">
              <AnimatePresence mode="wait">
                {activeIndex !== null && (
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                      {categories[activeIndex].techs.map((tech, index) => (
                          <TechCard key={index} tech={tech} />
                      ))}
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
  );
}
