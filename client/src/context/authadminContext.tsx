"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { getAsianAdmin } from '@/api/api';

interface AuthAdminContextType {
    admin: string | null;
    login: (authToken: string) => Promise<void>;
    logout: () => void;
}

const defaultAuthAdminContext: AuthAdminContextType = {
    admin: null,
    login: async () => { },
    logout: () => { },
};


const AuthAdminContext = createContext<AuthAdminContextType>(defaultAuthAdminContext);

interface AuthAdminProviderProps {
    children: ReactNode;
}

export const AuthAdminProvider = ({ children }: AuthAdminProviderProps) => {
    const [admin, setAdmin] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const fetchAdminProfile = async () => {
        const token = cookie.get('asiantoken_adn_');
        if (token) {
            try {
                const response = await getAsianAdmin(token);
                if (response.status === "success") {
                    setAdmin(response.adminId);
                }
            } catch (error) {
                console.error("Failed to fetch admin profile:", error);
            }
        }
    };

    const login = async (authToken: string) => {
        cookie.set('asiantoken_adn_', authToken, { expires: 1 });
        await fetchAdminProfile();
        router.push('/admin_panel/dashboard');
    };

    const logout = () => {
        setAdmin(null);
        cookie.remove('asiantoken_adn_');
        router.push('/admin_panel');
    };

    return (
        <AuthAdminContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthAdminContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AuthAdminContext);
