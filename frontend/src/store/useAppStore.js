import { create } from "zustand";
import { persist } from "zustand/middleware";
import authSlice from "./slices/authSlice";
import connectionSlice from "./slices/connectionSlice";
import postSlice from "./slices/postSlice";
import uiSlice from "./slices/uiSlice";

const useAppStore = create(
  persist(
    (set, get, ...a) => ({
      ...authSlice(set, get, ...a),
      ...connectionSlice(set, get, ...a),
      ...postSlice(set, get, ...a),
      ...uiSlice(set, get, ...a),
      _hashydrated: false,
      setHasHydrated: (value)=> set({_hasHydrated: value})
    }),
    {
      name: "career-mesh-app-storage",
      partialize: (state) => ({
        user: state.user,
      }),
      onRehydrateStorage: ()=>(state)=>{
        state?.setHasHydrated(true)
      }
    },
  ),
);

export default useAppStore;
