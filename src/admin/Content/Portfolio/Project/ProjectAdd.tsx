import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  slug: string;
  description: string;
  link: string;
  technologies: string[];
}

const ProjectAdd: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
  const [newTechnology, setNewTechnology] = useState('');

  const [formData, setFormData] = useState<Project>({
    title: '',
    category: 'e-commerce',
    image: '',
    slug: '',
    description: '',
    link: '',
    technologies: []
  });

  const categories = [
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'blog', label: 'Blog' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'portal', label: 'Portal' },
    { value: 'app', label: 'Application' }
  ];

  const handleAddTechnology = () => {
    if (newTechnology && !formData.technologies.includes(newTechnology)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology]
      });
      setNewTechnology('');
    }
  };

  const [isCheckingSlug, setIsCheckingSlug] = useState(false);

  const generateSlug = (name: string) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
  };

  const checkSlugAvailability = async (baseSlug: string) => {
    setIsCheckingSlug(true);
    try {
      const response = await fetch(`http://localhost:5002/api/portfolio/tag/check-slug/${baseSlug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.status === true) {
        return data.nextAvailable || baseSlug;
      }

      return baseSlug;
    } catch (error) {
      console.error('Error checking slug availability:', error);
      return baseSlug;
    } finally {
      setIsCheckingSlug(false);
    }
  };

  const handleSlugChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputSlug = generateSlug(e.target.value);
    const finalSlug = await checkSlugAvailability(inputSlug);

    setFormData(prev => ({
      ...prev,
      slug: finalSlug
    }));
  };

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const baseSlug = generateSlug(name);

    setFormData(prev => ({
      ...prev,
      title: name,
      slug: baseSlug
    }));

    const finalSlug = await checkSlugAvailability(baseSlug);
    setFormData(prev => ({
      ...prev,
      title: name,
      slug: finalSlug
    }));
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/api/portfolio/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/zjadminwebarcats/content/portfolio/projects', {
          state: { successMessage: `Proiectul ${formData.title} a fost creat cu succes!` },
        });
      } else {
        alert(data.error || 'Eroare la crearea proiectului.');
      }
    } catch (err) {
      console.error('Eroare la trimiterea formularului:', err);
      alert('A apărut o eroare la trimiterea formularului.');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Adaugă Proiect Nou</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titlu Proiect
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleNameChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Imagine
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Permalink
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-l-md border border-r-0">
                  {`${window.location.origin}/project/`}
                </span>
                <input
                    type="text"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    required
                    className="flex-1 px-4 py-2 border rounded-r-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {isCheckingSlug ? (
                    'Verificare disponibilitate slug...'
                ) : (
                    `URL-ul etichetei va fi: ${window.location.origin}/project/${formData.slug}`
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descriere
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link Proiect
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tehnologii
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Adaugă tehnologie"
                />
                <button
                  type="button"
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
                      type="button"
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
              type="button"
              onClick={() => navigate('/zjadminwebarcats/content/portfolio/projects')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
            >
              <X size={20} />
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center gap-2"
            >
              <Save size={20} />
              Salvează
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAdd;
