import React, { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
  technologies: string[];
}

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Fashion',
      category: 'e-commerce',
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Magazin online de modă cu peste 1000 de produse, integrare cu platforme de plată și livrare.',
      link: '#',
      technologies: ['Magento', 'PHP', 'MySQL', 'JavaScript']
    },
    {
      id: 2,
      title: 'Portal Guvernamental',
      category: 'portal',
      image: 'https://images.pexels.com/photos/4549416/pexels-photo-4549416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Portal pentru servicii publice cu autentificare securizată și formulare online.',
      link: '#',
      technologies: ['Drupal', 'PHP', 'PostgreSQL', 'React']
    },
    {
      id: 3,
      title: 'Blog de Călătorii',
      category: 'blog',
      image: 'https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Blog de călătorii cu funcționalități avansate de căutare și filtrare a conținutului.',
      link: '#',
      technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript']
    },
    {
      id: 4,
      title: 'Aplicație de Managementul Proiectelor',
      category: 'app',
      image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Aplicație web pentru managementul proiectelor, task-urilor și echipelor.',
      link: '#',
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Redis']
    },
    {
      id: 5,
      title: 'Portofoliu Arhitect',
      category: 'portfolio',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Portofoliu de prezentare pentru un arhitect, cu galerie de proiecte și studii de caz.',
      link: '#',
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS']
    },
    {
      id: 6,
      title: 'Magazin de Electronice',
      category: 'e-commerce',
      image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Magazin online de electronice cu funcționalități de comparare produse și recenzii.',
      link: '#',
      technologies: ['Shopify', 'Liquid', 'JavaScript', 'Firebase']
    },
    {
      id: 7,
      title: 'Platformă Educațională',
      category: 'app',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Platformă de e-learning cu cursuri video, teste și certificate.',
      link: '#',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      id: 8,
      title: 'Restaurant Online',
      category: 'e-commerce',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Sistem de comenzi online pentru restaurant cu rezervări și livrare.',
      link: '#',
      technologies: ['React', 'Firebase', 'Stripe', 'Google Maps']
    },
    {
      id: 9,
      title: 'Portal de Știri',
      category: 'portal',
      image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Portal de știri cu categorii multiple și sistem de comentarii.',
      link: '#',
      technologies: ['WordPress', 'PHP', 'MySQL', 'Redis']
    }
  ];

  const filteredProjects = filter === 'all'
      ? projects
      : projects.filter(project => project.category === filter);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const categories = [
    { value: 'all', label: 'Toate' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'blog', label: 'Bloguri' },
    { value: 'portfolio', label: 'Portofolii' },
    { value: 'portal', label: 'Portale' },
    { value: 'app', label: 'Aplicații' }
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of portfolio section
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-teal-500 font-medium">PORTOFOLIU</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Proiecte Recente</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explorează o selecție din proiectele noastre recente, care demonstrează expertiza și calitatea serviciilor noastre.
            </p>
          </div>

          <div className="flex flex-wrap justify-center mb-10 gap-2">
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleFilterChange(category.value)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                        filter === category.value
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category.label}
                </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project) => (
                <div
                    key={project.id}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <a
                            href={project.link}
                            className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          Vezi proiectul
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                      ))}
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                        currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`w-10 h-10 rounded-md ${
                            currentPage === index + 1
                                ? 'bg-teal-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                        currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
          )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
