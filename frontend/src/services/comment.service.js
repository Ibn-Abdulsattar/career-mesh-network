import axios from "axios";
const API_URL = import.meta.env.VITE_Backend_Url;

const commentApi = axios.create({
  baseURL: `${API_URL}/api/post`,
  withCredentials: true,
});

 const commentService = {
  getComments: async (postId) => {
    const response = await commentApi.get(`/:${postId}/comment`);
    return response.data;
  },
  addComment: async (postId, commentData) => {
    const response = await commentApi.post(`/:${postId}/comment`, commentData);
    return response.data;
  },
  deleteComment: async (postId, commentId, commentData) => {
    const response = await commentApi.post(
      `/:${postId}/comment/:${commentId}`,
      commentData,
    );
    return response.data;
  },
};

export default commentService;
