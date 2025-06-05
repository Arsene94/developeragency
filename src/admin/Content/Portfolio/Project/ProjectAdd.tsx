import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Upload } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
}

interface Project {
  title: string;
  category: string;
  image: string;
  imageFile: File | null;
  slug: string;
  description: string;
  technologies: number[]; // Changed to store tag IDs
}

const ProjectAdd: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
  const [newTechnology, setNewTechnology] = useState('');
  const [isUsingFile, setIsUsingFile] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState<Project>({
    title: '',
    category: 'e-commerce',
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
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/portfolio/tag/all`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        setTags(data.tags || []);
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'An error occurred');
      }
    }

    fetchTags()
  }, [token]);

  const handleAddTechnology = (tagId: number) => {
    if (!formData.technologies.includes(tagId)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tagId]
      }));
    }
  };

  console.log(tags)
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

  const handleRemoveTechnology = (tagId: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(id => id !== tagId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
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

      const response = await fetch('http://localhost:5002/api/portfolio/project', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
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
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => 
                      formData.technologies.includes(tag.id) 
                        ? handleRemoveTechnology(tag.id)
                        : handleAddTechnology(tag.id)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      formData.technologies.includes(tag.id)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag.name}
                  </button>
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