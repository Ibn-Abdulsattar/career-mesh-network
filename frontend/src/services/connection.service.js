"use client";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const connectionApi = axios.create({
    baseURL: `${API_URL}/api/connections`,
    withCredentials:true,
});

const connectionService = {
    sendConnectionRequest: async(receiverId)=>{
        const res = await connectionApi.post(`/request/${receiverId}`);
        return res.data;
    },
    respondToRequest: async(requestId)=>{
        const res = await connectionApi.post(`/respond/${requestId}`);
        return res.data;
    },
    getPendingRequests: async()=>{
        const res = await connectionApi.get(`/pending`);
        return res.data;
    },
    getMyNetwork: async()=>{
        const res = await connectionApi.get(`/list`);
        return res.data;
    },
    getMyRequest: async()=>{
        const res = await connectionApi.get(`/requests`);
        return res.data;
    },
};

export default connectionService;