
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn() ? children 
                        : <Navigate to="/login" />;
};

export default ProtectedRoute;


// ถ้าผู้ใช้ ล็อกอินแล้ว, ProtectedRoute จะเรนเดอร์ children ซึ่งในที่นี้ก็คือคอมโพเนนต์ <Home />
// ถ้าผู้ใช้ ยังไม่ล็อกอิน, ProtectedRoute จะนำผู้ใช้ไปยังหน้า /login โดยใช้คอมโพเนนต์ <Navigate /> เพื่อเปลี่ยนเส้นทาง
