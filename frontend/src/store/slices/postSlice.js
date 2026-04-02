"use client";
import postService from "@/services/post.service";

const postSlice = (set, get) => ({
  posts: [],
  isFeedLoading: false,
  postError: null,

  addPost: async (formdata) => {
    try {
      set({ isFeedLoading: true, postError: null });
      const res = await postService.createPost(formdata);
      set((state) => ({ posts: [res.data, ...state.posts] }));
      return res;
    } catch (err) {
      console.log(err);
      set({ postError: err.response?.data?.message, isFeedLoading: false });
    }
  },
  deletePost: async (postId) => {
    set({ isFeedLoading: true });
    try {
      const res = await postService.deletePost(postId);
      set((state) => ({
        posts: state.posts.filter((el) => el.id !== postId),
        isFeedLoading: false,
      }));
      return res;
    } catch (err) {
      console.log(err);
      set({ postError: err.response?.data?.message, isFeedLoading: false });
    }
  },
  getAllPosts: async () => {
    set({ isFeedLoading: true });
    try {
      const res = await postService.getAllPosts();
      set({ posts: res.data });
      return res;
    } catch (err) {
      console.log(err);
      set({ isFeedLoading: false, postError: err.response?.data?.message });
    }
  },
  incrementLikes: async (postId) => {
    set({ isFeedLoading: true });
    try {
      const res = await postService.incrementLikes(postId);
      set((state) => ({
        posts: state.posts.map((el) =>
          el.id === postId ? { ...el, likes: res.likes } : el,
        ),
      }));
      return res;
    } catch (err) {
      console.log(err);
      set({ postError: err.response?.data?.message, isFeedLoading: false });
    }
  },
});

export default postSlice;
