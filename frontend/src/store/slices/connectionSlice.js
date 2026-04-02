"use client";
import connectionService from "@/services/connection.service";

const connectionSlice = (set, get) => ({
  PendingRequests: [],
  MyNetwork:[],
  MyRequest:[],

  getPendingRequests: async () => {
    try {
      const res = await connectionService.getPendingRequests();
      set({ PendingRequests: res.data });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getMyNetwork: async () => {
    try {
      const res = await connectionService.getMyNetwork();
      set({MyNetwork: res.data})
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getMyRequest: async () => {
    try {
      const res = await connectionService.getMyRequest();
      set({ MyRequest: res.data });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
});

export default connectionSlice;
