import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';

const TagAdd: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });
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
      const response = await fetch(`https://webarcabe.dacars.ro/api/portfolio/tag/check-slug/${baseSlug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // If slug exists, data.nextAvailable will contain the next available slug
        // (e.g., "react-2" if "react" is taken)
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

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const baseSlug = generateSlug(name);
    
    setFormData(prev => ({
      ...prev,
      name,
      slug: baseSlug // Set initial slug immediately for better UX
    }));

    // Check availability and update if needed
    const finalSlug = await checkSlugAvailability(baseSlug);
    setFormData(prev => ({
      ...prev,
      name,
      slug: finalSlug
    }));
  };

  const handleSlugChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputSlug = generateSlug(e.target.value);
    const finalSlug = await checkSlugAvailability(inputSlug);
    
    setFormData(prev => ({
      ...prev,
      slug: finalSlug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://webarcabe.dacars.ro/api/portfolio/tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/zjadminwebarcats/content/portfolio/tags', {
          state: { successMessage: `Eticheta ${formData.name} a fost creată cu succes!` },
        });
      } else {
        alert(data.error || 'Eroare la crearea etichetei.');
      }
    } catch (err) {
      console.error('Eroare la trimiterea formularului:', err);
      alert('A apărut o eroare la trimiterea formularului.');
    }
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
                {isCheckingSlug ? (
                  'Verificare disponibilitate slug...'
                ) : (
                  `URL-ul etichetei va fi: webarca.ro/tag/${formData.slug}`
                )}
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
              disabled={isCheckingSlug}
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