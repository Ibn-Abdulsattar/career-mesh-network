import axios from "axios";
const API_URL = import.meta.env.NEXT_PUBLIC_BACKEND_URL;

const profileApi = axios.create({
    baseURL: `${API_URL}/api/profile`,
    withCredentials:true,
});

const profileService = {
    user: async()=>{
        const res = await profileApi.get("/me");
        return res.data;
    },
    userUpdate:  async(data)=>{
        const res = await profileApi.put("/me", data);
        return res.data;
    },
    getResume: async()=>{
        const res = await profileApi.get("/get-resume");
        return res.data;
    }
};

export default profileService;