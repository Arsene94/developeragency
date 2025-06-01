import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('ro');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguage = () => setLanguage(language === 'ro' ? 'en' : 'ro');

  const navLinks = [
    { name: language === 'ro' ? 'Acasă' : 'Home', href: '#' },
    { name: language === 'ro' ? 'Servicii' : 'Services', href: '#services' },
    { name: language === 'ro' ? 'Tehnologii' : 'Technologies', href: '#technologies' },
    { name: language === 'ro' ? 'Portofoliu' : 'Portfolio', href: '#portfolio' },
    { name: language === 'ro' ? 'Proces' : 'Process', href: '#process' },
    { name: language === 'ro' ? 'Contact' : 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className={`h-10 w-auto ${scrolled ? 'text-teal-600' : 'text-white'}`} />
          <span className={`ml-2 font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            Webarca
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`hover:text-teal-500 transition-colors duration-200 ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className={`flex items-center ${
              scrolled ? 'text-gray-700' : 'text-white'
            } hover:text-teal-500 transition-colors duration-200`}
          >
            <Globe size={18} className="mr-1" />
            <span className="uppercase">{language}</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 px-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-teal-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center text-gray-800 hover:text-teal-500 transition-colors duration-200"
            >
              <Globe size={18} className="mr-1" />
              <span className="uppercase">{language}</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;