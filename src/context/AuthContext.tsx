import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('userToken'));

    const isAuthenticated = !!token;

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const res = await fetch('http://localhost:5002/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error('Unauthorized');

                const userData = await res.json();
                setUser(userData);
            } catch (err) {
                console.error('Error fetching user:', err);
                logout();
            }
        };

        fetchUser();
    }, [token]);

    const login = (token: string) => {
        localStorage.setItem('userToken', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
