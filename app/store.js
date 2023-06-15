import { create } from "zustand";

const store = (set) => ({
  filter: "",
  setFilter: (filter) => set((state) => ({ ...state, filter })),
  user: [],
  setUser: (user) => set((state) => ({ ...state, user })),

  // ADD NEW STATE HERE

//   addNewUser: "",
//   setAddNewUser: (addNewUser) => set((state) => ({ ...state, addNewUser })),
});

export const useStore = create(store);
