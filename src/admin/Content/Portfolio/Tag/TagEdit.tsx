import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';

const TagEdit: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/portfolio/tag/get/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tag');
        }

        const data = await response.json();

        setFormData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchTag();

  }, [id, token]);

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const baseSlug = generateSlug(name);

    setFormData(prev => ({
      ...prev,
      name,
      slug: baseSlug
    }));

    const finalSlug = await checkSlugAvailability(baseSlug);
    setFormData(prev => ({
      ...prev,
      name,
      slug: finalSlug
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5002/api/portfolio/tag/put/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/zjadminwebarcats/content/portfolio/tags', {
          state: { successMessage: `Eticheta ${formData.name} a fost actualizat cu succes!` },
        });
      } else {
        alert(data.error || 'Eroare la actualizarea etichetei.');
      }
    } catch (err) {
      console.error('Eroare la actualizarea serviciului:', err);
      alert('A apărut o eroare la actualizarea serviciului.');
    }
  };

  if (loading) return <div className="p-6">Se încarcă...</div>;
  if (error) return <div className="p-6 text-red-600">Eroare: {error}</div>;

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editare Etichetă</h2>
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
                  {`${window.location.origin}/tag/`}
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
                    `URL-ul etichetei va fi: ${window.location.origin}/tag/${formData.slug}`
                )}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/zjadminwebarcats/portfolio/tags')}
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

export default TagEdit;
