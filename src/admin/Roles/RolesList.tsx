import React, { useState, useEffect } from 'react';
import {useLocation, Location, useNavigate} from 'react-router-dom';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import type { Role } from '../../types/auth';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {LocationState} from "../../types/utils.tsx";

const RolesList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('userToken');
  const [openSuccesDelete, setOpenSuccesDelete] = React.useState(false);
  const location = useLocation() as Location & { state: LocationState };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5002/api/role/all', {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        setRoles(data.roles || []);
      } catch (err) {
        console.error('Error submitting form:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [token]);

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
  const handleDelete = async (roleId: number) => {
    if (window.confirm('Ești sigur că vrei să ștergi acest rol?')) {
      try {
        const response = await fetch(`http://localhost:5002/api/role/delete/${roleId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || 'Eroare la ștergerea rolului.');
          return;
        }

        setOpenSuccesDelete(true);
        setRoles((prev) => prev.filter((role) => role.id !== roleId));
      } catch (err) {
        console.error('Eroare la ștergere:', err);
        alert('A apărut o eroare la ștergerea rolului.');
      }
    }
  };

  const filteredRoles = roles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            Rolul a fost sters cu succes!
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
          <h2 className="text-2xl font-bold text-gray-800">Gestionare Roluri</h2>
          <button
              onClick={() => navigate('create')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={20} />
            Adaugă Rol
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                  type="text"
                  placeholder="Caută roluri..."
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
                  Nume Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descriere
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permisiuni
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ultima Modificare
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acțiuni
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.map((role) => {
                const formattedDate = new Intl.DateTimeFormat('ro-RO', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(new Date(role.updated_at));
                return (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{role.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(role.permissions || []).map((permission, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                            >
                              {permission}
                            </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formattedDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                          onClick={() => navigate(`edit/${role.id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                          onClick={() => handleDelete(role.id)}
                          className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredRoles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500">
                      Nu s-au găsit roluri.
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default RolesList;
