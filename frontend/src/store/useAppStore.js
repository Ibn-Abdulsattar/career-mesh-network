import { create } from "zustand";
import { persist } from "zustand/middleware";
import createAuthSlice from "./slices/authSlice";

const useAppStore = create(
  persist((set, get) => ({
    ...createAuthSlice(set, get),
  })),
);

export default useAppStore;
