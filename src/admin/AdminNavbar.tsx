import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Image,
    MessageSquare,
    // LogOut,
    Menu,
    X
} from 'lucide-react';
// import { useAuthStore } from '../stores/authStore';

const AdminNavbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const location = useLocation();
    // const navigate = useNavigate();
    // const logout = useAuthStore(state => state.logout);

    const menuItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/services', icon: <FileText size={20} />, label: 'Servicii' },
        { path: '/admin/portfolio', icon: <Image size={20} />, label: 'Portofoliu' },
        { path: '/admin/testimonials', icon: <MessageSquare size={20} />, label: 'Testimoniale' },
    ];

    // const handleLogout = () => {
    //     logout();
    //     navigate('/');
    // };

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

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                location.pathname === item.path
                                    ? 'bg-teal-500 text-white'
                                    : 'hover:bg-slate-700'
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/*<button*/}
                {/*    onClick={handleLogout}*/}
                {/*    className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"*/}
                {/*>*/}
                {/*    <LogOut size={20} />*/}
                {/*    <span>Deconectare</span>*/}
                {/*</button>*/}
            </aside>

            {/* Main content */}
            <div className={`${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="text-xl font-semibold">
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
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
