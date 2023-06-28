import { create } from "zustand";

const store = (set) => ({
  filter: "",
  setFilter: (filter) => set((state) => ({ ...state, filter })),
  user: [],
  setUser: (user) => set((state) => ({ ...state, user })),

  // ADD NEW STATE HERE

    //new state for campaign
    campaigns: [],
    setCampaigns: (campaigns) => set((state) => ({ ...state, campaigns })),
    addCampaign: (campaign) => set((state) => ({ ...state, campaigns: [...state.campaigns, campaign] })),
//   addNewUser: "",
//   setAddNewUser: (addNewUser) => set((state) => ({ ...state, addNewUser })),
});

export const useStore = create(store);