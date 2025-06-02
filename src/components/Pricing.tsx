import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
    const [activeTab, setActiveTab] = useState('presentation');

    const categories = [
        { id: 'presentation', name: 'Site de Prezentare' },
        { id: 'ecommerce', name: 'E-commerce' },
        { id: 'portal', name: 'Portal & Aplicații' },
        { id: 'marketing', name: 'Marketing & Branding' }
    ];

    const pricingData = {
        presentation: [
            {
                name: 'Start-up',
                description: 'Pentru afaceri la început de drum',
                price: 499,
                features: [
                    { included: true, text: 'Design responsive modern' },
                    { included: true, text: 'Până la 5 pagini' },
                    { included: true, text: 'Formular de contact' },
                    { included: true, text: 'Optimizare SEO de bază' },
                    { included: false, text: 'Blog integrat' },
                    { included: false, text: 'Multilingv' }
                ]
            },
            {
                name: 'Business',
                description: 'Pentru companii în creștere',
                price: 999,
                popular: true,
                features: [
                    { included: true, text: 'Design premium personalizat' },
                    { included: true, text: 'Până la 15 pagini' },
                    { included: true, text: 'Blog integrat' },
                    { included: true, text: 'SEO avansat' },
                    { included: true, text: 'Multilingv (2 limbi)' },
                    { included: true, text: 'Integrare CRM' }
                ]
            },
            {
                name: 'Corporate',
                description: 'Pentru corporații și instituții',
                price: 1999,
                features: [
                    { included: true, text: 'Design enterprise personalizat' },
                    { included: true, text: 'Pagini nelimitate' },
                    { included: true, text: 'CMS avansat' },
                    { included: true, text: 'SEO & Analytics complet' },
                    { included: true, text: 'Multilingv nelimitat' },
                    { included: true, text: 'Integrări complexe' }
                ]
            }
        ],
        ecommerce: [
            {
                name: 'Magazin Basic',
                description: 'Pentru magazine mici',
                price: 999,
                features: [
                    { included: true, text: 'Până la 100 produse' },
                    { included: true, text: 'Procesare plăți' },
                    { included: true, text: 'Gestiune stoc basic' },
                    { included: true, text: 'Rapoarte vânzări' },
                    { included: false, text: 'Multilingv' },
                    { included: false, text: 'Integrare marketplace' }
                ]
            },
            {
                name: 'Magazin Pro',
                description: 'Pentru magazine medii',
                price: 1999,
                popular: true,
                features: [
                    { included: true, text: 'Până la 1000 produse' },
                    { included: true, text: 'Multiple metode de plată' },
                    { included: true, text: 'Gestiune stoc avansată' },
                    { included: true, text: 'Analytics avansat' },
                    { included: true, text: 'Multilingv (2 limbi)' },
                    { included: true, text: 'Integrare marketplace' }
                ]
            },
            {
                name: 'Magazin Enterprise',
                description: 'Pentru magazine mari',
                price: 3999,
                features: [
                    { included: true, text: 'Produse nelimitate' },
                    { included: true, text: 'Sistem complet ERP' },
                    { included: true, text: 'Multi-warehouse' },
                    { included: true, text: 'B2B & B2C' },
                    { included: true, text: 'Multilingv nelimitat' },
                    { included: true, text: 'Integrări complete' }
                ]
            }
        ],
        portal: [
            {
                name: 'Portal Basic',
                description: 'Pentru proiecte mici',
                price: 1499,
                features: [
                    { included: true, text: 'Autentificare utilizatori' },
                    { included: true, text: 'Dashboard basic' },
                    { included: true, text: 'Rapoarte simple' },
                    { included: true, text: 'API REST' },
                    { included: false, text: 'Workflow personalizat' },
                    { included: false, text: 'Integrări third-party' }
                ]
            },
            {
                name: 'Portal Advanced',
                description: 'Pentru proiecte medii',
                price: 2999,
                popular: true,
                features: [
                    { included: true, text: 'Auth complex & Roluri' },
                    { included: true, text: 'Dashboard personalizat' },
                    { included: true, text: 'Workflow automation' },
                    { included: true, text: 'API complet' },
                    { included: true, text: 'Integrări multiple' },
                    { included: true, text: 'Suport real-time' }
                ]
            },
            {
                name: 'Portal Enterprise',
                description: 'Pentru proiecte complexe',
                price: 4999,
                features: [
                    { included: true, text: 'SSO & Auth avansat' },
                    { included: true, text: 'Module custom' },
                    { included: true, text: 'Workflow complex' },
                    { included: true, text: 'API & Microservices' },
                    { included: true, text: 'Integrări nelimitate' },
                    { included: true, text: 'SLA garantat' }
                ]
            }
        ],
        marketing: [
            {
                name: 'Marketing Basic',
                description: 'Pentru prezență online',
                price: 599,
                features: [
                    { included: true, text: 'Logo & Brand basic' },
                    { included: true, text: 'SEO on-page' },
                    { included: true, text: 'Social Media setup' },
                    { included: true, text: 'Google My Business' },
                    { included: false, text: 'Campanii PPC' },
                    { included: false, text: 'Content marketing' }
                ]
            },
            {
                name: 'Marketing Pro',
                description: 'Pentru creștere accelerată',
                price: 1499,
                popular: true,
                features: [
                    { included: true, text: 'Branding complet' },
                    { included: true, text: 'SEO complex' },
                    { included: true, text: 'Social Media management' },
                    { included: true, text: 'Campanii PPC' },
                    { included: true, text: 'Content marketing' },
                    { included: true, text: 'Email marketing' }
                ]
            },
            {
                name: 'Marketing Total',
                description: 'Marketing digital complet',
                price: 2999,
                features: [
                    { included: true, text: 'Strategie completă' },
                    { included: true, text: 'Branding premium' },
                    { included: true, text: 'SEO & SEM avansat' },
                    { included: true, text: 'Social Media full' },
                    { included: true, text: 'Content & Video' },
                    { included: true, text: 'Marketing automation' }
                ]
            }
        ]
    };

    return (
        <section id="pricing" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-teal-500 font-medium">PREȚURI</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Pachete de Servicii</h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Alegem împreună pachetul potrivit pentru nevoile tale. Toate prețurile includ consultanță, implementare și suport post-implementare.
                    </p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    activeTab === category.id
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingData[activeTab as keyof typeof pricingData].map((pkg, index) => (
                        <div
                            key={index}
                            className={`offert-card relative rounded-2xl border ${
                                pkg.popular ? 'border-teal-500 shadow-xl' : 'border-gray-200'
                            }  bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-4 py-1 text-sm font-medium text-white">
                                    Popular
                                </div>
                            )}

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                                <p className="mt-2 text-sm text-gray-500">{pkg.description}</p>
                                <div className="mt-6">
                                    <p className="text-5xl font-bold text-gray-900">
                                        {pkg.price}
                                        <span className="text-xl font-normal text-gray-500">€</span>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">

                                    </p>
                                </div>
                            </div>

                            <ul className="mt-8 space-y-4">
                                {pkg.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        {feature.included ? (
                                            <Check className="h-5 w-5 flex-shrink-0 text-teal-500" />
                                        ) : (
                                            <X className="h-5 w-5 flex-shrink-0 text-gray-300" />
                                        )}
                                        <span className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500'}`}>
                      {feature.text}
                    </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <a
                                    href="#contact"
                                    className={`button-start block w-full rounded-lg px-6 py-3 text-center text-sm font-medium transition-colors duration-200 ${
                                        pkg.popular
                                            ? 'bg-teal-500 text-white hover:bg-teal-600'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Începe Acum
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500">
                        Toate prețurile sunt în Euro și nu includ TVA. Pentru proiecte custom sau cerințe specifice,
                        <a href="#contact" className="text-teal-500 hover:text-teal-600 ml-1">contactează-ne</a>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
