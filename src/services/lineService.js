import axios from "axios";

const API_URL_LINE = 'http://localhost:5500/api/line/notify';


export const lineNotify = async (data) => {
    try {
        const response = await axios.post(API_URL_LINE, { message: data })
        return response


    } catch (err) {
        return {
            success: false,
            message: 'Failed to add registration',
        };
    }
};

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


