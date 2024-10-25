import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // ดึงข้อมูล user จาก localStorage เมื่อ component ถูกสร้าง
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
        // ดึง token จาก localStorage เมื่อ component ถูกสร้าง
        return localStorage.getItem('authToken');
    });

    // เมื่อ user หรือ token มีการเปลี่ยนแปลง จะบันทึกลง localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [token]);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
    };

    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            setUser(null);
            setToken(null);
            // ล้างข้อมูลทั้งหมดใน localStorage
            localStorage.clear();
            // หรือจะล้างเฉพาะ key ที่เกี่ยวข้อง:
            // localStorage.removeItem('user');
            // localStorage.removeItem('authToken');
        }
    };

    const isLoggedIn = () => {
        return !!(user && token);
    };

    // ฟังก์ชันสำหรับอัพเดทข้อมูล user
    const updateUser = (newUserData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...newUserData
        }));
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                token, 
                login, 
                logout, 
                isLoggedIn,
                updateUser // เพิ่มฟังก์ชัน updateUser เข้าไปใน context
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};