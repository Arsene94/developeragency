import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from "../components/Navbar.tsx";

interface ServiceDetail {
    slug: string;
    title: string;
    description: string;
    image: string;
    features: string[];
    benefits: string[];
    process: {
        title: string;
        description: string;
    }[];
}

const services: Record<string, ServiceDetail> = {
    'website-corporativ': {
        slug: 'website-corporativ',
        title: 'Website-uri Corporative',
        description: 'Creăm website-uri profesionale care reflectă identitatea brandului tău și atrag clienți potențiali.',
        image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        features: [
            'Design personalizat și responsive',
            'Optimizare SEO completă',
            'Integrare cu rețele sociale',
            'Formular de contact avansat',
            'Panou de administrare intuitiv',
            'Analiză și raportare trafic'
        ],
        benefits: [
            'Creșterea vizibilității online',
            'Generare de lead-uri calificate',
            'Îmbunătățirea imaginii brandului',
            'Reducerea costurilor de marketing',
            'Acces la piețe globale'
        ],
        process: [
            {
                title: 'Analiză și Strategie',
                description: 'Înțelegem obiectivele tale de business și definim strategia potrivită.'
            },
            {
                title: 'Design și Prototipare',
                description: 'Creăm design-ul perfect care reflectă identitatea brandului tău.'
            },
            {
                title: 'Dezvoltare',
                description: 'Implementăm toate funcționalitățile necesare folosind tehnologii moderne.'
            },
            {
                title: 'Testare și Lansare',
                description: 'Testăm riguros și lansăm website-ul tău în mediul online.'
            }
        ]
    },
    // Add more services here...
};

const ServicePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const service = services[slug || ''];
    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Serviciu negăsit</h1>
                    <p className="mt-2 text-gray-600">Ne pare rău, serviciul căutat nu există.</p>
                    <a href="/" className="mt-4 inline-block text-teal-500 hover:text-teal-600">
                        Înapoi la pagina principală
                    </a>
                </div>
            </div>
        );
    }

    return (
        <main>
            <Navbar />
            <div>
                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[400px] bg-slate-900">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/50" />
                    <div className="relative container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{service.title}</h1>
                            <p className="text-xl text-gray-200 mb-8">{service.description}</p>
                            <a
                                href="#contact"
                                className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
                            >
                                Solicită o Ofertă
                                <ArrowRight size={20} className="ml-2" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Ce Oferim</h2>
                            <p className="text-gray-600">
                                Descoperă toate funcționalitățile și beneficiile incluse în pachetul nostru de servicii.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-bold mb-6">Funcționalități Incluse</h3>
                                <ul className="space-y-4">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check className="w-5 h-5 text-teal-500 mt-1 mr-3" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-xl font-bold mb-6">Beneficii</h3>
                                <ul className="space-y-4">
                                    {service.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check className="w-5 h-5 text-teal-500 mt-1 mr-3" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Procesul Nostru</h2>
                            <p className="text-gray-600">
                                Pașii prin care transformăm ideile tale într-un proiect de succes.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {service.process.map((step, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
                                        <span className="font-bold">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ServicePage;
