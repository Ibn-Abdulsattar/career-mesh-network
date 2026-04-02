"use client";
import authService from "@/services/auth.service";
import profileService from "@/services/profile.service";

const authSlice = (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  checkAuth: async () => {
    try {
      const data = await profileService.user();
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logoutUser: async () => {
    set({ isLoading: false });
    try {
      const data = await authService.logout("logout");
      set({ user: null, isAuthenticated: false, isLoading: false });
      return data;
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  registerUser: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.authenticate("register", formData);
      set({ isLoading: false });
      return data;
    } catch (err) {
      console.log(err);
      set({
        error: err.response?.data?.message,
        isLoading: false,
      });
    }
  },

  loginUser: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.authenticate("login", formData);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (err) {
      console.log(err.response?.data?.message);
      set({
        error: err.response?.data?.message,
        isLoading: false,
      });
    }
  },

  verifyUser: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.verifyOtp(formData);
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (err) {
      console.log(err);
      set({
        error: err.response?.data?.message,
        isLoading: false,
      });
    }
  },

  forgotPassword: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.forgotPassword(formData);
      set({ isLoading: false });
      return data;
    } catch (err) {
      console.log(err);
      set({ isLoading: false });
    }
  },
});

export default authSlice;
