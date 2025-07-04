import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Menu,
  X,
  ChevronDown,
  Users,
  Settings,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface MenuItem {
  path?: string;
  submenu?: MenuItem[];
}

const AdminNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      path: '/zjadminwebarcats',
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard'
    },
    {
      id: 'content',
      label: 'Conținut',
      icon: <FileText size={20} />,
      submenu: [
        { path: '/zjadminwebarcats/content/services', label: 'Servicii' },
        {
          path: '/zjadminwebarcats/portfolio',
          label: 'Portofoliu',
          submenu: [
            { path: '/zjadminwebarcats/content/portfolio/categories', label: 'Categorii Proiecte' },
            { path: '/zjadminwebarcats/content/portfolio/projects', label: 'Proiecte' },
            { path: '/zjadminwebarcats/content/portfolio/tags', label: 'Etichete' }
          ]
        },
        { path: '/zjadminwebarcats/testimonials', label: 'Testimoniale' }
      ]
    },
    {
      id: 'users',
      label: 'Utilizatori',
      icon: <Users size={20} />,
      submenu: [
        { path: '/zjadminwebarcats/users', label: 'Toți Utilizatorii' },
        { path: '/zjadminwebarcats/roles', label: 'Roluri și Permisiuni' }
      ]
    },
    {
      id: 'settings',
      label: 'Setări',
      icon: <Settings size={20} />,
      submenu: [
        { path: '/zjadminwebarcats/general', label: 'General' },
        { path: '/zjadminwebarcats/appearance', label: 'Aspect' },
        { path: '/zjadminwebarcats/security', label: 'Securitate' }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const isActivePath = (path: string) => location.pathname === path;

  const isActiveMenu = (item: MenuItem): boolean => {
    if (item.path) {
      return isActivePath(item.path);
    }
    if (item.submenu) {
      return item.submenu.some((subItem: MenuItem) => {
        if (subItem.submenu) {
          return subItem.submenu.some((subSubItem: MenuItem) => isActivePath(subSubItem.path ?? ''));
        }
        return isActivePath(subItem.path ?? '');
      });
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-slate-800 text-white w-64 p-4`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Webarca Admin</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                      isActiveMenu(item)
                        ? 'bg-teal-500 text-white'
                        : 'hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        isMenuExpanded(item.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`space-y-1 overflow-hidden transition-all duration-200 ${
                      isMenuExpanded(item.id)
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.submenu.map((subItem) => (
                      <div key={subItem.path || subItem.label}>
                        {subItem.submenu ? (
                          <div className="pl-12">
                            <div className="text-sm font-medium text-gray-300 py-2">{subItem.label}</div>
                            {subItem.submenu.map((subSubItem) => (
                              <Link
                                key={subSubItem.path}
                                to={subSubItem.path}
                                className={`flex items-center pl-4 pr-4 py-2 rounded-lg transition-colors ${
                                  isActivePath(subSubItem.path)
                                    ? 'bg-teal-500 text-white'
                                    : 'hover:bg-slate-700'
                                }`}
                              >
                                {subSubItem.label}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            to={subItem.path}
                            className={`flex items-center pl-12 pr-4 py-2 rounded-lg transition-colors ${
                              isActivePath(subItem.path)
                                ? 'bg-teal-500 text-white'
                                : 'hover:bg-slate-700'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-teal-500 text-white'
                      : 'hover:bg-slate-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden mr-4"
              >
                <Menu size={24} />
              </button>
              <div className="text-xl font-semibold">
                {menuItems.find(item => isActiveMenu(item))?.label || 'Dashboard'}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminNavbar;
