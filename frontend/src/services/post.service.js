import axios from "axios";
const API_URL = import.meta.env.NEXT_PUBLIC_BACKEND_URL;

const postApi = axios.create({
  baseURL: `${API_URL}/api/post`,
  withCredentials: true,
});

const postService = {
  createPost: async (data) => {
    const res = await postApi.post("/", data);
    return res.data;
  },
  getAllPosts: async () => {
    const res =await postApi.get("/");
    return res.data;
  },
  deletePost: async (postId) => {
    const res =await postApi.delete(`/${postId}`);
    return res.data;
  },
  incrementLikes: async (postId) => {
    const res =await postApi.put(`/${postId}`);
    return res.data;
  },
};

export default postService;
