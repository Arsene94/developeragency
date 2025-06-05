import React, { useState } from 'react';
import { Pencil, Trash2, Plus, ExternalLink } from 'lucide-react';
import {useNavigate} from "react-router-dom";

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
    technologies: string[];
}

const ProjectList: React.FC = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            title: 'E-commerce Fashion',
            category: 'e-commerce',
            image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            description: 'Magazin online de modă cu peste 1000 de produse, integrare cu platforme de plată și livrare.',
            link: '#',
            technologies: ['Magento', 'PHP', 'MySQL', 'JavaScript']
        },
        // ... other initial projects
    ]);


    const handleDelete = (id: number) => {
        if (window.confirm('Ești sigur că vrei să ștergi acest proiect?')) {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    return (
        <main>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gestionare Portofoliu</h2>
                    <button
                        onClick={() => navigate('create')}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Adaugă Proiect
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                                        >
                        {tech}
                      </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => navigate(`edit/${project}`)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ProjectList;
