const uiSlice = (set, get) => ({
  notifications: [],

  addNotification: (notify) => {
    set((state) => ({
      notifications: [
        { ...notify, id: Date.now() + Math.random() },
        ...state.notifications,
      ],
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((el) => el.id !== id),
    }));
  },
});

export default uiSlice;
