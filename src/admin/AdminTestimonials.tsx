import React, { useState } from 'react';
import { Pencil, Trash2, Plus, Star} from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    position: string;
    company: string;
    content: string;
    rating: number;
    image: string;
}

const AdminTestimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            id: 1,
            name: 'Elena Popescu',
            position: 'CEO',
            company: 'Trend Fashion',
            content: 'Webarca a creat pentru noi un magazin online extraordinar, care ne-a ajutat să ne creștem vânzările cu peste 70% în primul an. Echipa lor este profesionistă și foarte receptivă la toate cerințele noastre.',
            rating: 5,
            image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        },
        // ... other initial testimonials
    ]);

    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setIsAddingNew(false);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Ești sigur că vrei să ștergi această recenzie?')) {
            setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
        }
    };

    const handleSave = (testimonial: Testimonial) => {
        if (isAddingNew) {
            setTestimonials([...testimonials, { ...testimonial, id: testimonials.length + 1 }]);
        } else {
            setTestimonials(testimonials.map(t => t.id === testimonial.id ? testimonial : t));
        }
        setEditingTestimonial(null);
        setIsAddingNew(false);
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
        setEditingTestimonial({
            id: testimonials.length + 1,
            name: '',
            position: '',
            company: '',
            content: '',
            rating: 5,
            image: ''
        });
    };

    const TestimonialForm = ({ testimonial, onSave, onCancel }: { testimonial: Testimonial, onSave: (testimonial: Testimonial) => void, onCancel: () => void }) => {
        const [formData, setFormData] = useState(testimonial);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleRatingChange = (rating: number) => {
            setFormData({ ...formData, rating });
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                    <h3 className="text-xl font-bold mb-4">
                        {isAddingNew ? 'Adaugă Recenzie Nouă' : 'Editează Recenzie'}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nume</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Poziție</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Companie</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
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
                            <label className="block text-sm font-medium text-gray-700">Conținut</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => handleRatingChange(rating)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-6 h-6 ${
                                                rating <= formData.rating
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    </button>
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
                    <h2 className="text-2xl font-bold">Gestionare Testimoniale</h2>
                    <button
                        onClick={handleAddNew}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Adaugă Recenzie
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {testimonial.position} la {testimonial.company}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`w-5 h-5 ${
                                                index < testimonial.rating
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 mb-4">{testimonial.content}</p>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEdit(testimonial)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(testimonial.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {(editingTestimonial || isAddingNew) && (
                    <TestimonialForm
                        testimonial={editingTestimonial!}
                        onSave={handleSave}
                        onCancel={() => {
                            setEditingTestimonial(null);
                            setIsAddingNew(false);
                        }}
                    />
                )}
            </div>
        </main>
    );
};

export default AdminTestimonials;
