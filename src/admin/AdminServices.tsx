import React, { useState } from 'react';
import { PenSquare, Trash2, Plus, Save } from 'lucide-react';

interface Service {
    id: number;
    icon: string;
    title: string;
    description: string;
    features: string[];
    process: {
        title: string;
        description: string;
    }[];
}

const AdminServices: React.FC = () => {
    const [services, setServices] = useState<Service[]>([
        {
            id: 1,
            icon: 'Globe',
            title: 'Website-uri Corporative',
            description: 'Site-uri profesionale pentru afacerea ta, cu design personalizat și funcționalități avansate.',
            features: [
                'Design responsive modern',
                'Optimizare SEO',
                'Integrare CMS',
                'Formulare de contact',
            ],
            process: [
                {
                    title: 'Analiză',
                    description: 'Înțelegerea nevoilor și obiectivelor afacerii tale',
                },
                {
                    title: 'Design',
                    description: 'Crearea unui design modern și atractiv',
                },
                {
                    title: 'Dezvoltare',
                    description: 'Implementarea funcționalităților și integrărilor necesare',
                },
            ],
        },
        // More initial services...
    ]);

    const [editingService, setEditingService] = useState<Service | null>(null);

    const handleEdit = (service: Service) => {
        setEditingService(service);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Ești sigur că vrei să ștergi acest serviciu?')) {
            setServices(services.filter(service => service.id !== id));
        }
    };

    const handleSave = () => {
        if (editingService) {
            setServices(services.map(service =>
                service.id === editingService.id ? editingService : service
            ));
            setEditingService(null);
        }
    };

    const handleAdd = () => {
        const newService: Service = {
            id: Math.max(...services.map(s => s.id)) + 1,
            icon: 'Layout',
            title: 'Nou Serviciu',
            description: 'Descriere serviciu nou',
            features: ['Caracteristică 1'],
            process: [
                {
                    title: 'Pas 1',
                    description: 'Descriere pas 1',
                },
            ],
        };
        setServices([...services, newService]);
        setEditingService(newService);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestionare Servicii</h2>
                <button
                    onClick={handleAdd}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Adaugă Serviciu
                </button>
            </div>

            <div className="grid gap-6">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
                        {editingService?.id === service.id ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Titlu
                                    </label>
                                    <input
                                        type="text"
                                        value={editingService.title}
                                        onChange={e => setEditingService({
                                            ...editingService,
                                            title: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descriere
                                    </label>
                                    <textarea
                                        value={editingService.description}
                                        onChange={e => setEditingService({
                                            ...editingService,
                                            description: e.target.value
                                        })}
                                        className="w-full px-3 py-2 border rounded-md"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Caracteristici
                                    </label>
                                    {editingService.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={e => {
                                                    const newFeatures = [...editingService.features];
                                                    newFeatures[index] = e.target.value;
                                                    setEditingService({
                                                        ...editingService,
                                                        features: newFeatures
                                                    });
                                                }}
                                                className="flex-1 px-3 py-2 border rounded-md"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newFeatures = editingService.features.filter((_, i) => i !== index);
                                                    setEditingService({
                                                        ...editingService,
                                                        features: newFeatures
                                                    });
                                                }}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => setEditingService({
                                            ...editingService,
                                            features: [...editingService.features, '']
                                        })}
                                        className="text-teal-500 hover:text-teal-600 text-sm"
                                    >
                                        + Adaugă caracteristică
                                    </button>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setEditingService(null)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Anulează
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center"
                                    >
                                        <Save className="w-5 h-5 mr-2" />
                                        Salvează
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">{service.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            <PenSquare className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Caracteristici:</h4>
                                    <ul className="list-disc list-inside text-gray-600">
                                        {service.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServices;
