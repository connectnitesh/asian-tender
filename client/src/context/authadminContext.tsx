"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { getAsianAdmin } from '@/api/api';

const AuthAdminContext = createContext();

export const AuthAdminProvider = ({ children }) => {
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

    const login = async (authToken) => {
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
