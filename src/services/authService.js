import axios from "axios";

const API_URL_REGISTER = 'http://localhost:5500/api/auth/register';
const API_URL_LOGIN = 'http://localhost:5500/api/auth/login';

export const addRegister = async (registerData) => {
    try {
        const response = await axios.post(API_URL_REGISTER, registerData);
        return response
    } catch (err) {
        return {
            success: false,
            message: 'Failed to add registration',
        };
    }
};

export const addLogin = async (loginData) => {
    try {
        const response = await axios.post(API_URL_LOGIN, loginData);
        return {
            success: true,
            status: response.status,
            data: response.data,
        };
    } catch (err) {
        return {
            success: false,
            status: err.response ? err.response.status : 500, // จัดการกรณีไม่มี response
            message: 'Login failed',
        };
    }
};
