import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import type { Permission } from '../types/auth';

const RoleCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const availablePermissions: Permission[] = [
    { id: 'users.read', name: 'Vizualizare Utilizatori', description: 'Poate vedea lista de utilizatori', module: 'users' },
    { id: 'users.write', name: 'Editare Utilizatori', description: 'Poate crea și edita utilizatori', module: 'users' },
    { id: 'users.delete', name: 'Ștergere Utilizatori', description: 'Poate șterge utilizatori', module: 'users' },
    { id: 'roles.read', name: 'Vizualizare Roluri', description: 'Poate vedea lista de roluri', module: 'roles' },
    { id: 'roles.write', name: 'Editare Roluri', description: 'Poate crea și edita roluri', module: 'roles' },
    { id: 'roles.delete', name: 'Ștergere Roluri', description: 'Poate șterge roluri', module: 'roles' },
    { id: 'content.read', name: 'Vizualizare Conținut', description: 'Poate vedea conținutul', module: 'content' },
    { id: 'content.write', name: 'Editare Conținut', description: 'Poate crea și edita conținut', module: 'content' },
    { id: 'content.delete', name: 'Ștergere Conținut', description: 'Poate șterge conținut', module: 'content' },
    { id: 'content.publish', name: 'Publicare Conținut', description: 'Poate publica conținut', module: 'content' },
  ];

  const modules = Array.from(new Set(availablePermissions.map(p => p.module)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/zjadminwebarcats/roles');
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
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
        : prev.permissions.filter(id => !modulePermissions.includes(id))
    }));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Adaugă Rol Nou</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nume Rol
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descriere
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Permisiuni
              </label>
              <div className="space-y-6">
                {modules.map(module => (
                  <div key={module} className="border rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id={`module-${module}`}
                        checked={availablePermissions
                          .filter(p => p.module === module)
                          .every(p => formData.permissions.includes(p.id))}
                        onChange={(e) => handleSelectAllModule(module, e.target.checked)}
                        className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`module-${module}`} className="ml-2 text-sm font-medium text-gray-700 capitalize">
                        {module}
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                      {availablePermissions
                        .filter(permission => permission.module === module)
                        .map(permission => (
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
                ))}
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

export default RoleCreate;