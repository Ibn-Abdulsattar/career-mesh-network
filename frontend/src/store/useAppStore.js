import { create } from "zustand";
import { persist } from "zustand/middleware";
import authSlice from "./slices/authSlice";
import connectionSlice from "./slices/connectionSlice";
import postSlice from "./slices/postSlice";
import uiSlice from "./slices/uiSlice";

const useAppStore = create(
  persist(
    (...a) => ({
      ...authSlice(...a),
      ...connectionSlice(...a),
      ...postSlice(...a),
      ...uiSlice(...a),
    }),
    {
      name: "career-mesh-app-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);

export default useAppStore;
