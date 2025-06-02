import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('ro');
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (!isAnimating) {
      if (!isOpen) {
        setIsOpen(true);
      } else {
        closeMenu();
      }
    }
  };

  const closeMenu = () => {
    if (menuRef.current) {
      setIsAnimating(true);
      menuRef.current.classList.remove('mobile-menu-enter');
      menuRef.current.classList.add('mobile-menu-exit');
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  const toggleLanguage = () => setLanguage(language === 'ro' ? 'en' : 'ro');

  const navLinks = [
    { name: language === 'ro' ? 'Acasă' : 'Home', href: '#' },
    { name: language === 'ro' ? 'Servicii' : 'Services', href: '#services' },
    { name: language === 'ro' ? 'Tehnologii' : 'Technologies', href: '#technologies' },
    { name: language === 'ro' ? 'Portofoliu' : 'Portfolio', href: '#portfolio' },
    { name: language === 'ro' ? 'Proces' : 'Process', href: '#process' },
    { name: language === 'ro' ? 'Prețuri' : 'Pricing', href: '#pricing' },
    { name: language === 'ro' ? 'Contact' : 'Contact', href: '#contact' }
  ];

  return (
      <nav
          className={`fixed w-full z-50 transition-all duration-300 ${
              scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
          }`}
      >
        <div className="container mx-auto flex justify-between items-center" style={{padding: "0 1.7rem 0 1rem"}}>
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
              className="md:hidden z-50 nav-menu-button"
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
            <div
                ref={menuRef}
                className="fixed top-0 left-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl md:hidden mobile-menu-enter"
            >
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-gray-100">
                  <Link to="/" className="flex items-center" onClick={closeMenu}>
                    <Logo className="h-8 w-auto text-teal-600" />
                    <span className="ml-2 font-bold text-xl text-gray-800">Webarca</span>
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <div className="flex flex-col space-y-6">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-800 hover:text-teal-500 transition-colors duration-200 text-lg"
                            onClick={closeMenu}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {link.name}
                        </a>
                    ))}
                    <button
                        onClick={() => {
                          toggleLanguage();
                          closeMenu();
                        }}
                        className="flex items-center text-gray-800 hover:text-teal-500 transition-colors duration-200 text-lg"
                    >
                      <Globe size={20} className="mr-2" />
                      <span className="uppercase">{language}</span>
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100">
                  <a
                      href="#contact"
                      onClick={closeMenu}
                      className="block w-full bg-teal-500 text-white text-center py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                  >
                    Contactează-ne
                  </a>
                </div>
              </div>
            </div>
        )}

        {/* Overlay */}
        {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300"
                onClick={closeMenu}
            />
        )}
      </nav>
  );
};

export default Navbar;
