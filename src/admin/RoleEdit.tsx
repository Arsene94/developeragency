import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import type { Permission } from '../types/auth';

const RoleEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [availablePermissions, setAvailablePermissions] = useState<Permission[]>([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const moduleCheckboxRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const modules = Array.from(new Set(availablePermissions.map(p => p.module)));

  useEffect(() => {
    async function fetchPermissions() {
      setLoadingPermissions(true);
      setError(null);

      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`http://localhost:5002/api/role/permissions`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const responseCurrentPermissions = await fetch(`http://localhost:5002/api/role/${id}/permissions`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const responseRole = await fetch(`http://localhost:5002/api/role/role/${id}`,{
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (!responseCurrentPermissions.ok) {
          throw new Error(`HTTP error! status: ${responseCurrentPermissions.status}`);
        }

        if (!responseRole.ok) {
          throw new Error(`HTTP error! status: ${responseRole.status}`);
        }

        const result = await response.json();
        const data: Permission[] = result.permissions;

        const resultRolePermissions = await responseCurrentPermissions.json();
        const dataRolePermissions: string[] = resultRolePermissions.permissions;

        const resultRole = await responseRole.json();
        const dataRole = resultRole.role;

        setAvailablePermissions(data);
        setFormData(prev => ({
          ...prev,
          name: dataRole.name,
          description: dataRole.description,
          permissions: dataRolePermissions,
        }));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load permissions');
        }
      } finally {
        setLoadingPermissions(false);
      }
    }

    fetchPermissions();
  }, [id]);

  // Update indeterminate state of module checkboxes when permissions change
  useEffect(() => {
    modules.forEach(module => {
      const modulePermissions = availablePermissions.filter(p => p.module === module).map(p => p.id);
      const checkedCount = modulePermissions.filter(id => formData.permissions.includes(id)).length;
      const moduleCheckbox = moduleCheckboxRefs.current[module];

      if (moduleCheckbox) {
        moduleCheckbox.indeterminate = checkedCount > 0 && checkedCount < modulePermissions.length;
      }
    });
  }, [formData.permissions, availablePermissions, modules]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:5002/api/role/role/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save role: ${response.statusText}`);
      }

      navigate('/zjadminwebarcats/roles', {
        state: { successMessage: `Rolul ${formData.name} a fost modificat cu succes!` },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('A apărut o eroare la salvarea rolului.');
    }
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(id => id !== permissionId)
          : [...prev.permissions, permissionId],
    }));
  };

  const handleSelectAllModule = (module: string, checked: boolean) => {
    const modulePermissions = availablePermissions
        .filter(p => p.module === module)
        .map(p => p.id);

    setFormData(prev => ({
      ...prev,
      permissions: checked
          ? Array.from(new Set([...prev.permissions, ...modulePermissions]))
          : prev.permissions.filter(id => !modulePermissions.includes(id)),
    }));
  };

  if (loadingPermissions) {
    return <div>Loading permissions...</div>;
  }
  if (error) {
    return <div className="text-red-600">Error loading permissions: {error}</div>;
  }
  return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Editare Rol</h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nume Rol</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Permisiuni</label>
                <div className="space-y-6">
                  {modules.map(module => {
                    const modulePermissions = availablePermissions.filter(p => p.module === module);
                    const allChecked = modulePermissions.every(p => formData.permissions.includes(p.id));
                    return (
                        <div key={module} className="border rounded-lg p-4">
                          <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id={`module-${module}`}
                                ref={el => (moduleCheckboxRefs.current[module] = el)}
                                checked={allChecked}
                                onChange={e => handleSelectAllModule(module, e.target.checked)}
                                className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`module-${module}`} className="ml-2 text-sm font-medium text-gray-700 capitalize">
                              {module}
                            </label>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                            {modulePermissions.map(permission => (
                                <div key={permission.id} className="flex items-start">
                                  <input
                                      type="checkbox"
                                      id={permission.id}
                                      checked={formData.permissions.includes(permission.id)}
                                      onChange={() => handlePermissionChange(permission.id)}
                                      className="h-4 w-4 mt-1 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                                  />
                                  <label htmlFor={permission.id} className="ml-2">
                                    <div className="text-sm font-medium text-gray-700">{permission.name}</div>
                                    <div className="text-sm text-gray-500">{permission.description}</div>
                                  </label>
                                </div>
                            ))}
                          </div>
                        </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                  type="button"
                  onClick={() => navigate('/zjadminwebarcats/roles')}
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

export default RoleEdit;
