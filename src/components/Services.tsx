import React, { useState, useEffect } from 'react';
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
  PanelLeft,
  Wrench,
  Loader2
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  short_description: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive';
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Globe: <Globe size={36} />,
  ShoppingCart: <ShoppingCart size={36} />,
  LayoutGrid: <LayoutGrid size={36} />,
  PenTool: <PenTool size={36} />,
  BarChart: <BarChart size={36} />,
  Search: <Search size={36} />,
  FileCode: <FileCode size={36} />,
  PenSquare: <PenSquare size={36} />,
  Settings: <Settings size={36} />,
  PanelLeft: <PanelLeft size={36} />,
  Wrench: <Wrench size={36} />
};

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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/service/all');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        const activeServices = data.services.filter((service: Service) => service.status === 'active');
        setServices(activeServices);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        // Load fallback services if API fails
        setServices([
          {
            id: 1,
            title: 'Website-uri Corporative',
            short_description: 'Site-uri profesionale pentru afacerea ta, cu design personalizat și funcționalități avansate.',
            description: 'Creăm website-uri corporative profesionale care reflectă identitatea brandului tău și oferă o experiență excelentă utilizatorilor.',
            icon: 'Globe',
            status: 'active'
          },
          {
            id: 2,
            title: 'E-commerce',
            short_description: 'Magazine online complete folosind Magento, Shopify, WooCommerce sau soluții personalizate.',
            description: 'Dezvoltăm soluții e-commerce complete care te ajută să vinzi online eficient și să-ți scalezi afacerea.',
            icon: 'ShoppingCart',
            status: 'active'
          },
          {
            id: 3,
            title: 'Aplicații Web Complexe',
            short_description: 'Aplicații web complexe, în funcție de nevoile tale specifice.',
            description: 'Dezvoltăm aplicații web personalizate care automatizează procesele și cresc eficiența afacerii tale.',
            icon: 'PanelLeft',
            status: 'active'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (error) {
    console.error('Error loading services:', error);
  }

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={iconMap[service.icon] || <Settings size={36} />}
              title={service.title}
              description={service.short_description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;