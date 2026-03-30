import { create } from "zustand";
import { persist } from "zustand/middleware";
import authSlice from "./slices/authSlice";
import connectionSlice from "./slices/connectionSlice";
import postSlice from "./slices/postSlice";
import uiSlice from "./slices/uiSlice";

const useAppStore = create(
  persist((set, get) => ({
    ...authSlice(set, get),
    ...connectionSlice(set, get),
    ...postSlice(set, get),
    ...uiSlice(set, get)
  })),
);

export default useAppStore;
