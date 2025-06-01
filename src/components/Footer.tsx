import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const services = [
    { name: 'Website-uri Corporative', href: '#services' },
    { name: 'E-commerce', href: '#services' },
    { name: 'Aplicații Web', href: '#services' },
    { name: 'Marketing Digital', href: '#services' },
    { name: 'Branding', href: '#services' },
    { name: 'SEO', href: '#services' }
  ];
  
  const technologies = [
    { name: 'React', href: '#technologies' },
    { name: 'Laravel', href: '#technologies' },
    { name: 'WordPress', href: '#technologies' },
    { name: 'Drupal', href: '#technologies' },
    { name: 'Shopify', href: '#technologies' },
    { name: 'Magento', href: '#technologies' }
  ];
  
  const company = [
    { name: 'Despre Noi', href: '#' },
    { name: 'Cariere', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Termeni și Condiții', href: '#' },
    { name: 'Politica de Confidențialitate', href: '#' }
  ];
  
  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Logo className="h-8 w-auto text-teal-400" />
              <span className="ml-2 font-bold text-xl text-white">Webarca</span>
            </div>
            <p className="text-gray-400 mb-6">
              Oferim soluții web profesionale pentru afacerea ta. Fără bătăi de cap.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="bg-gray-800 hover:bg-teal-500 text-white p-2 rounded-full transition-all duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Servicii
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-teal-500"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Technologies */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Tehnologii
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-teal-500"></span>
            </h3>
            <ul className="space-y-3">
              {technologies.map((tech, index) => (
                <li key={index}>
                  <a 
                    href={tech.href} 
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Companie
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-teal-500"></span>
            </h3>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Webarca. Toate drepturile rezervate.
          </p>
          <button
            onClick={scrollToTop}
            className="bg-gray-800 hover:bg-teal-500 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;