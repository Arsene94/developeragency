import React, {useState} from 'react';
import {UserCheck} from "lucide-react";
import Navbar from "../components/Navbar.tsx";
import {useAuth} from "../context/AuthContext.tsx";

const AdminLogin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const togglePasswordVisibility = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Login failed:', error);
                return;
            }

            const data = await response.json();
            login(data.token);

            window.location.href='/zjadminwebarcats/';
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    return (
        <>
            <main>
                <Navbar />
                <div className="relative h-[60vh] min-h-[400px] bg-slate-900">
                    <img
                        src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Some image"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/50" />
                    <div className="relative container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Autentificare</h1>
                            <p className="text-xl text-gray-200 mb-8">Esti admin? Conecteaza-te!</p>
                            <p className="text-xl text-gray-200 mb-8">Nu esti admin? <a href="/">Paraseste pagina</a>!</p>

                        </div>
                    </div>
                </div>

                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-xl mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="space-y-4">
                                    <form onSubmit={handleLogin}>
                                        <div className="pb-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded-md"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="email@webarca.ro"
                                                autoComplete="email"
                                            />
                                        </div>

                                        <div className="pb-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Parola
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="w-full px-3 py-2 pr-10 border rounded-md"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    placeholder="Parola123"
                                                    autoComplete="current-password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className={`absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 cs_eye_btn ${showPassword ? 'show' : ''}`}
                                                >
                                                    <svg
                                                        width="24"
                                                        height="16"
                                                        viewBox="0 0 29 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            d="M14.5 0C8.95924 0 3.93459 2.80577 0.22691 7.36308C-0.0756367 7.73644 -0.0756367 8.25807 0.22691 8.63144C3.93459 13.1942 8.95924 16 14.5 16C20.0408 16 25.0654 13.1942 28.7731 8.63692C29.0756 8.26355 29.0756 7.74194 28.7731 7.36857C25.0654 2.80577 20.0408 0 14.5 0ZM14.8975 13.6335C11.2194 13.8476 8.18211 11.0419 8.41347 7.63212C8.6033 4.82086 11.0652 2.54221 14.1025 2.36651C17.7806 2.15237 20.8179 4.95813 20.5865 8.36788C20.3908 11.1736 17.9289 13.4523 14.8975 13.6335ZM14.7136 11.0309C12.7322 11.1462 11.0949 9.63624 11.2254 7.80233C11.3262 6.28689 12.6551 5.06246 14.2924 4.96362C16.2738 4.84832 17.9111 6.35827 17.7806 8.19218C17.6738 9.71311 16.3449 10.9375 14.7136 11.0309Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <button
                                                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center"
                                            >
                                                <UserCheck className="w-5 h-5 mr-2" />
                                                Autentificare
                                            </button>
                                            <button
                                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                            >
                                                Am uitat parola
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default AdminLogin;
