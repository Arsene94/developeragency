import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import type {Role, User} from "../../types/auth.ts";

const AdminUserEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roleList, setRoleList] = useState<Role[]>([]);
    const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 0,
        status: 'active'
    });

    useEffect(() => {
        async function fetchUser() {
            setLoadingUser(true);
            setError(null);
            try {
                const response = await fetch(`https://webarcabe.dacars.ro/api/user/get/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? {Authorization: `Bearer ${token}`} : {}),
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                const data: User = result;

                setFormData(prev => ({
                    ...prev,
                    name: data.name,
                    email: data.email,
                    role: data.role.id,
                    status: data.status
                }));

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to load user');
                }
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser()
    }, [id]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('https://webarcabe.dacars.ro/api/role/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Failed to fetch roles');
                }
                setRoleList(data.roles || []);
            } catch (err) {
                console.error('Error submitting form:', err);
            }
        };

        fetchRoles();
    }, [formData.name, navigate, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
            const response = await fetch(`https://webarcabe.dacars.ro/api/user/put/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/zjadminwebarcats/users', {
                    state: { successMessage: `Utilizatorul ${formData.name} a fost creat cu succes!` },
                });
            } else {
                alert(data.error || 'Eroare la crearea utilizatorului.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loadingUser) {
        return <div>Loading user...</div>;
    }
    if (error) {
        return <div className="text-red-600">Error loading user: {error}</div>;
    }

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Editare Utilizator</h2>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nume Complet
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rol
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option>--- Selecteaza un rol ---</option>
                                {roleList.map((role) => (
                                    <option value={role.id} key={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="active">Activ</option>
                                <option value="inactive">Inactiv</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/zjadminwebarcats/users')}
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

export default AdminUserEdit;
