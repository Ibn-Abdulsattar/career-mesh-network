"use client";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const authApi = axios.create({
    baseURL: `${API_URL}/api/auth`,
    withCredentials:true,
});

const authService = {
    authenticate: async (mode, data)=>{
        const response = await authApi.post(`/${mode}`, data);
        return response.data;
    },
    verifyOtp: async (data)=>{
        const response = await authApi.post('/verify-otp', data);
        return response.data;
    },
     forgotPassword: async (data) => {
        const response = await authApi.post('/forgot', data);
        return response.data;
    },
    resetPassword: async(resetToken,data)=>{
        const response = await authApi.put(`/reset-password/${resetToken}`, data);
        return response.data;
    },
    allUsers: async()=>{
        const response = await authApi.get(`/all-users`);
        return response.data;
    },
};

export default authService;