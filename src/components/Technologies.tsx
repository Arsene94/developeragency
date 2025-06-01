import React from 'react';

const Technologies: React.FC = () => {
  const technologies = [
    {
      category: 'Frontend',
      techs: ['React', 'HTML5/CSS3', 'JavaScript/TypeScript', 'Bootstrap', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      techs: ['Laravel', 'Drupal', 'Node.js', 'PHP']
    },
    {
      category: 'CMS',
      techs: ['WordPress', 'Drupal', 'Joomla', 'Magento', 'Shopify', 'PrestaShop', 'WooCommerce']
    },
    {
      category: 'Database',
      techs: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Firebase', 'SQL Server']
    }
  ];

  return (
    <section id="technologies" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-500 font-medium">TEHNOLOGII</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Tehnologiile Noastre</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Folosim cele mai moderne tehnologii pentru a crea soluții web robuste, scalabile și performante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">{tech.category}</h3>
              <ul className="space-y-2">
                {tech.techs.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Suntem mereu la curent cu cele mai noi tehnologii și tendințe din industrie, pentru a oferi clienților noștri soluții moderne și eficiente.
          </p>
          <a
            href="#contact"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
          >
            Discută cu un expert
          </a>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
