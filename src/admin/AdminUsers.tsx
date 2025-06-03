import React, {useEffect, useState} from 'react';
import {Location, useLocation, useNavigate} from 'react-router-dom';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import type {Users} from "../types/auth.ts";
import {LocationState} from "../types/utils.tsx";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import {Alert} from "@mui/material";

const AdminUsers: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('userToken');
    const [openSuccesDelete, setOpenSuccesDelete] = React.useState(false);
    const location = useLocation() as Location & { state: LocationState };
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5002/api/user/all?page=${page}&limit=${limit}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.users || []);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(data.page || 1);
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [token, currentPage]);

    useEffect(() => {
        if (location.state?.successMessage) {
            setSnackbarMessage(location.state.successMessage);
            setSnackbarOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleCloseSuccessDelete = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccesDelete(false);
    };

    const handleDelete = (userId: number) => {
        if (window.confirm('Ești sigur că vrei să ștergi acest utilizator?')) {
           try {
               setOpenSuccesDelete(true);
               setUsers((prev) => prev.filter((role) => role.id !== userId));
           } catch (err) {
               console.error('Eroare la ștergere:', err);
               alert('A apărut o eroare la ștergerea rolului.');
           }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-6">Se încarcă rolurile...</div>;
    if (error) return <div className="p-6 text-red-600">Eroare: {error}</div>;

    return (
        <div className="p-6">
            <Snackbar
                open={openSuccesDelete}
                autoHideDuration={5000}
                onClose={handleCloseSuccessDelete}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSuccessDelete}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Utiliztorul a fost sters cu succes!
                </Alert>
            </Snackbar>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestionare Utilizatori</h2>
                <button
                    onClick={() => navigate('create')}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <Plus size={20} />
                    Adaugă Utilizator
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Caută utilizatori..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nume
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rol
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ultima Conectare
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Creat la
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actualizat la
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acțiuni
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => {
                            const formattedDateLastLogin = new Intl.DateTimeFormat('ro-RO', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(user.last_login));

                            const formattedDateCreated = new Intl.DateTimeFormat('ro-RO', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(user.created_at));

                            const formattedDateUpdated = new Intl.DateTimeFormat('ro-RO', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(user.updated_at));
                            return (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                                    >{user.role}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                      {user.status === 'active' ? 'Activ' : 'Inactiv'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formattedDateLastLogin}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formattedDateCreated}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formattedDateUpdated}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => navigate(`edit/${user.id}`)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil size={18}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4 gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-1 rounded ${
                                        pageNum === currentPage
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            Următor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;