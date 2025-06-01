import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Elena Popescu',
      position: 'CEO',
      company: 'Trend Fashion',
      content: 'Webarca a creat pentru noi un magazin online extraordinar, care ne-a ajutat să ne creștem vânzările cu peste 70% în primul an. Echipa lor este profesionistă și foarte receptivă la toate cerințele noastre.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Mihai Ionescu',
      position: 'Director',
      company: 'Tech Solutions',
      content: 'Am lucrat cu mai multe agenții de web design înainte, dar Webarca este cu adevărat excepțională. Au livrat un portal de servicii complex exact cum ne-am dorit, respectând deadline-ul și bugetul stabilit.',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Ana Dumitrescu',
      position: 'Fondator',
      company: 'Travel Stories',
      content: 'Blogul nostru de călătorii arată fantastic și funcționează perfect pe toate dispozitivele. Echipa Webarca a înțeles perfect nevoile noastre și a creat o experiență captivantă pentru cititorii noștri.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-500 font-medium">TESTIMONIALE</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Ce Spun Clienții Noștri</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Succesul nostru se măsoară prin satisfacția clienților noștri. Iată câteva dintre poveștile lor.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Testimonial Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-teal-100">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                <div>
                  <p className="font-bold text-gray-800">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-600">{testimonials[currentIndex].position}, {testimonials[currentIndex].company}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-teal-500 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;