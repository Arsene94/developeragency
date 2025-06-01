import React from 'react';
import { MessageSquare, Layout, Code, CheckCircle, ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-10 h-10 text-teal-500" />,
      title: 'Consultare',
      description: 'Începem cu o discuție detaliată despre obiectivele tale, publicul țintă și cerințele specifice ale proiectului.'
    },
    {
      icon: <Layout className="w-10 h-10 text-teal-500" />,
      title: 'Design',
      description: 'Creăm wireframe-uri și design-uri vizuale, colaborând îndeaproape cu tine pentru a defini aspectul perfect.'
    },
    {
      icon: <Code className="w-10 h-10 text-teal-500" />,
      title: 'Dezvoltare',
      description: 'Transformăm design-ul în cod, implementând toate funcționalitățile necesare și asigurând optimizarea pentru toate dispozitivele.'
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-teal-500" />,
      title: 'Lansare & Suport',
      description: 'După testare riguroasă, lansăm proiectul și oferim suport continuu pentru a asigura funcționarea optimă.'
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-500 font-medium">PROCESUL NOSTRU</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Cum Lucrăm</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Urmăm un proces bine definit pentru a asigura succesul fiecărui proiect și satisfacția clientului.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <div className={`lg:max-w-md ${index % 2 === 0 ? 'lg:ml-auto lg:mr-16' : 'lg:mr-auto lg:ml-16'} p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg`}>
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                          {step.icon}
                        </div>
                        <h3 className="ml-4 text-xl font-bold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Center dot - visible only on lg screens */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Empty div for layout on desktop */}
                  <div className="lg:w-1/2"></div>
                </div>
                
                {/* Arrow for the flow - not on the last item */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <ArrowRight className="text-teal-500 w-6 h-6 transform rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;