
"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { getUserProfile } from '@/api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const token = cookie.get('asiantoken_');
        if (token) {
            try {
                const response = await getUserProfile(token);
                if (response.status === "success")
                    setUser(response.userProfile);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        }
    };


    const login = async (authToken: any) => {
        cookie.set('asiantoken_', authToken, { expires: 1 });
        await fetchUserProfile();
        router.push('/profile');
    };

    const logout = () => {
        setUser(null);
        cookie.remove('asiantoken_');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
