import axios from "axios";
const API_URL = import.meta.env.VITE_Backend_Url;

const postApi = axios.create({
  baseURL: `${API_URL}/api/post`,
  withCredentials: true,
});

const postService = {
  createPost: async (data) => {
    const res = postApi.post("/", data);
    return res.data;
  },
  getAllPosts: async () => {
    const res = postApi.get("/");
    return res.data;
  },
  deletePost: async (postId) => {
    const res = postApi.delete(`/:${postId}`);
    return res.data;
  },
  incrementLikes: async (postId) => {
    const res = postApi.put(`/:${postId}`);
    return res.data;
  },
};

export default postService;
