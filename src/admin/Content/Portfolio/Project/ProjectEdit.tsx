import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Upload } from 'lucide-react';
import AsyncSelect from "react-select/async";

interface Tag {
  id: number;
  name: string;
}

interface TagOption {
  value: number;
  label: string;
}

interface Project {
  title: string;
  category: string;
  image: string;
  imageFile: File | null;
  slug: string;
  description: string;
  technologies: number[];
}

const ProjectEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFile, setIsUsingFile] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

  const [formData, setFormData] = useState<Project>({
    title: '',
    category: '',
    image: '',
    imageFile: null,
    slug: '',
    description: '',
    technologies: []
  });

  const categories = [
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'blog', label: 'Blog' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'portal', label: 'Portal' },
    { value: 'app', label: 'Application' }
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
        const response = await fetch(`http://localhost:5002/api/portfolio/project/get/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        setFormData({
          ...data,
          imageFile: null
        });

        // Fetch tags for the project
        const tagsResponse = await fetch(`http://localhost:5002/api/portfolio/tag/all`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          const projectTags = tagsData.tags
            .filter((tag: Tag) => data.technologies.includes(tag.id))
            .map((tag: Tag) => ({
              value: tag.id,
              label: tag.name
            }));
          setSelectedTags(projectTags);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const loadTags = async (inputValue: string): Promise<TagOption[]> => {
    try {
      const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
      const response = await fetch(`http://localhost:5002/api/portfolio/tag/all?search=${encodeURIComponent(inputValue)}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.tags.map((tag: Tag) => ({
        value: tag.id,
        label: tag.name
      }));
    } catch (error) {
      console.error('Error loading tags:', error);
      return [];
    }
  };

  const handleTagChange = (selectedOptions: TagOption[] | null) => {
    setSelectedTags(selectedOptions || []);
    setFormData(prev => ({
      ...prev,
      technologies: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        image: ''
      });
      setIsUsingFile(true);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      image: e.target.value,
      imageFile: null
    });
    setIsUsingFile(false);
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
      const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));

      if (formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      } else {
        formDataToSend.append('imageUrl', formData.image);
      }

      const response = await fetch(`http://localhost:5002/api/portfolio/project/put/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/zjadminwebarcats/content/portfolio/projects', {
          state: { successMessage: `Proiectul ${formData.title} a fost actualizat cu succes!` },
        });
      } else {
        alert(data.error || 'Eroare la actualizarea proiectului.');
      }
    } catch (err) {
      console.error('Eroare la actualizarea proiectului:', err);
      alert('A apărut o eroare la actualizarea proiectului.');
    }
  };

  if (loading) return <div className="p-6">Se încarcă...</div>;
  if (error) return <div className="p-6 text-red-600">Eroare: {error}</div>;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editare Proiect</h2>
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
                Imagine
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsUsingFile(!isUsingFile)}
                    className={`px-4 py-2 rounded-md ${
                      !isUsingFile 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUsingFile(!isUsingFile);
                      if (!isUsingFile && fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                    className={`px-4 py-2 rounded-md ${
                      isUsingFile 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Fișier
                  </button>
                </div>

                {isUsingFile ? (
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        {formData.imageFile ? 'Schimbă fișierul' : 'Încarcă fișier'}
                      </button>
                      {formData.imageFile && (
                        <span className="text-sm text-gray-600">
                          {formData.imageFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <input
                    type="url"
                    value={formData.image}
                    onChange={handleImageUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                )}

                {formData.image && !isUsingFile && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-xs rounded-md"
                    />
                  </div>
                )}
              </div>
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
                Tehnologii
              </label>
              <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                value={selectedTags}
                loadOptions={loadTags}
                onChange={(newValue) => handleTagChange(newValue as TagOption[])}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Selectează tehnologii..."
              />
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

export default ProjectEdit;