import React from 'react';
import {
  Globe,
  ShoppingCart,
  LayoutGrid,
  PenTool,
  BarChart,
  Search,
  FileCode,
  PenSquare,
  Settings,
  PanelLeft
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-b-4 border-teal-500">
      <div className="text-teal-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Globe size={36} />,
      title: 'Website-uri Corporative',
      description: 'Site-uri profesionale pentru afacerea ta, cu design personalizat și funcționalități avansate.'
    },
    {
      icon: <ShoppingCart size={36} />,
      title: 'E-commerce',
      description: 'Magazine online complete folosind Magento, Shopify, WooCommerce sau soluții personalizate.'
    },
    {
      icon: <PanelLeft size={36} />,
      title: 'Aplicatii Web Complexe',
      description: 'Aplicatii web de complexe, in functie de nevoile tale.'
    },
    {
      icon: <LayoutGrid size={36} />,
      title: 'Portofolii și Prezentări',
      description: 'Platforme atractive pentru a-ți prezenta proiectele și a impresiona clienții.'
    },
    {
      icon: <FileCode size={36} />,
      title: 'Aplicații Web Personalizate',
      description: 'Dezvoltăm soluții web complexe, adaptate nevoilor specifice ale afacerii tale.'
    },
    {
      icon: <PenTool size={36} />,
      title: 'Branding și Design',
      description: 'Logo-uri, identitate vizuală și materiale de branding care te diferențiază pe piață.'
    },
    {
      icon: <BarChart size={36} />,
      title: 'Marketing Digital',
      description: 'Strategii de marketing online, campanii și consultanță pentru creșterea afacerii tale.'
    },
    {
      icon: <Search size={36} />,
      title: 'SEO și Optimizare',
      description: 'Optimizare pentru motoarele de căutare pentru a crește vizibilitatea online.'
    },
    {
      icon: <PenSquare size={36} />,
      title: 'Content Creation',
      description: 'Conținut de calitate pentru website-ul tău, blog și platforme sociale.'
    },
    {
      icon: <Settings size={36} />,
      title: 'Automatizari',
      description: 'Iti putem automatiza flow-urile pentru a iti economisi timp si bani'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-500 font-medium">SERVICII</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Ce Putem Face Pentru Tine</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Oferim o gamă completă de servicii digitale pentru a transforma viziunea ta într-o prezență online de succes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
