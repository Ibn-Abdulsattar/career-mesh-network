const createAuthSlice = (set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: true,
  setUser: (userData) => set({ user: userData }),
});

export default createAuthSlice;
