import React, {useEffect, useState} from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import {useLocation, useNavigate} from 'react-router-dom';
import {LocationState} from "../../../../types/utils.tsx";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";
import {Alert} from "@mui/material";

interface Tag {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

const TagList: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [totalTags, setTotalTags] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    const [openSuccessDelete, setOpenSuccessDelete] = React.useState(false);
    const location = useLocation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        const fetchTags = async (page = 1, search = '') => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:5002/api/portfolio/tag/all?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setTags(data.tags || []);
                setTotalTags(data.total);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.page || 1);
            } catch (err) {
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };
        const delayDebounce = setTimeout(() => {
            fetchTags(currentPage, searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, currentPage, token]);

    useEffect(() => {
        const state = location.state as LocationState | null;

        if (state?.successMessage) {
            setSnackbarMessage(state.successMessage);
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
        setOpenSuccessDelete(false);
    };

    const handleDelete = async (tagId: number) => {
        if (window.confirm('Ești sigur că vrei să ștergi acest serviciu?')) {
            try {
                const response = await fetch(`http://localhost:5002/api/tag/delete/${tagId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.error || 'Eroare la ștergerea etichetei.');
                    return;
                }

                setOpenSuccessDelete(true);
                setTags((prev) => prev.filter((tag) => tag.id !== tagId));
            } catch (err) {
                console.error('Eroare la ștergere:', err);
                alert('A apărut o eroare la ștergerea etichetei.');
            }
        }
    };

    if (loading) return <div className="p-6">Se încarcă serviciile...</div>;
    if (error) return <div className="p-6 text-red-600">Eroare: {error}</div>;

    return (
        <div className="p-6">
            <Snackbar
                open={openSuccessDelete}
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
                    Eticheta a fost șters cu succes!
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
                <h2 className="text-2xl font-bold text-gray-800">Etichete</h2>
                <button
                    onClick={() => navigate('create')}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <Plus size={20} />
                    Adaugă Etichetă
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Caută etichete..."
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
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Creat la
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ultima actualizare
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acțiuni
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {tags.map((tag) => {
                            const formattedDateCreated = new Intl.DateTimeFormat('ro-RO', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(tag.created_at));

                            const formattedDateUpdated = new Intl.DateTimeFormat('ro-RO', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(tag.updated_at));

                            return (
                                <tr key={tag.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">/{tag.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{formattedDateCreated}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{formattedDateUpdated}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => navigate(`edit/${tag.id}`)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tag.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500 ms-4">
                            Total servicii găsite: {totalTags}
                        </div>
                        <div className="flex justify-end items-center mt-4 me-4 mb-4 gap-2">
                            <div className="text-sm text-gray-500 me-4">Pagina {currentPage} din {totalPages}</div>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(1)}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                            >
                                &lt;&lt;
                            </button>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                            >
                                &lt;
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
                                &gt;
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(totalPages)}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                            >
                                &gt;&gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagList;
