import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';

const TagAdd: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      name,
      slug: generateSlug(name)
    });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      slug: generateSlug(e.target.value)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    navigate('/zjadminwebarcats/content/portfolio/tags');
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Adaugă Etichetă Nouă</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nume Etichetă
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-l-md border border-r-0">
                  webarca.ro/tag/
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
                URL-ul etichetei va fi: webarca.ro/tag/{formData.slug}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/zjadminwebarcats/content/portfolio/tags')}
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

export default TagAdd;