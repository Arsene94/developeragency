import React, { useState } from 'react';
import { Pencil, Trash2, Plus, ExternalLink, X } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
    technologies: string[];
}

const Projects: React.FC = () => {
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

    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    const categories = ['e-commerce', 'portal', 'blog', 'app', 'portfolio'];

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setIsAddingNew(false);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Ești sigur că vrei să ștergi acest proiect?')) {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    const handleSave = (project: Project) => {
        if (isAddingNew) {
            setProjects([...projects, { ...project, id: projects.length + 1 }]);
        } else {
            setProjects(projects.map(p => p.id === project.id ? project : p));
        }
        setEditingProject(null);
        setIsAddingNew(false);
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
        setEditingProject({
            id: projects.length + 1,
            title: '',
            category: 'e-commerce',
            image: '',
            description: '',
            link: '',
            technologies: []
        });
    };

    const ProjectForm = ({ project, onSave, onCancel }: { project: Project, onSave: (project: Project) => void, onCancel: () => void }) => {
        const [formData, setFormData] = useState(project);
        const [newTechnology, setNewTechnology] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleAddTechnology = () => {
            if (newTechnology && !formData.technologies.includes(newTechnology)) {
                setFormData({
                    ...formData,
                    technologies: [...formData.technologies, newTechnology]
                });
                setNewTechnology('');
            }
        };

        const handleRemoveTechnology = (tech: string) => {
            setFormData({
                ...formData,
                technologies: formData.technologies.filter(t => t !== tech)
            });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <h3 className="text-xl font-bold mb-4">
                        {isAddingNew ? 'Adaugă Proiect Nou' : 'Editează Proiect'}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Titlu</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Categorie</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Imagine URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descriere</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Link</label>
                            <input
                                type="text"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tehnologii</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newTechnology}
                                    onChange={(e) => setNewTechnology(e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                    placeholder="Adaugă tehnologie"
                                />
                                <button
                                    onClick={handleAddTechnology}
                                    className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                    {tech}
                                        <button
                                            onClick={() => handleRemoveTechnology(tech)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                      <X size={16} />
                    </button>
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={() => onCancel()}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Anulează
                        </button>
                        <button
                            onClick={() => onSave(formData)}
                            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                        >
                            Salvează
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gestionare Portofoliu</h2>
                    <button
                        onClick={handleAddNew}
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
                                            onClick={() => handleEdit(project)}
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

                {(editingProject || isAddingNew) && (
                    <ProjectForm
                        project={editingProject!}
                        onSave={handleSave}
                        onCancel={() => {
                            setEditingProject(null);
                            setIsAddingNew(false);
                        }}
                    />
                )}
            </div>
        </main>
    );
};

export default Projects;
