import React, {useEffect, useState} from 'react';
import { MuiIcon } from "../icons/MuiIcons.tsx";

interface ServiceCardProps {
  icon: string;
  title: string;
  short_description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, short_description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-b-4 border-teal-500">
      <div className="text-teal-500 mb-4"><MuiIcon icon={icon} size={36} /></div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: short_description }} />
    </div>
  );
};

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceCardProps[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const response = await fetch('http://localhost:5002/api/service/fe/all');

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error || 'Eroare la preluarea serviciilor.');
        return;
      }
      setServices(data.services);
    }

    fetchServices();
  }, []);

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
          {services.map((service: ServiceCardProps, index: number) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              short_description={service.short_description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
