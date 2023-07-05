import { create } from "zustand";

const store = (set) => ({
  // DARK / LIGHT MODE
  mode: "light",
  setMode: (mode) => set((state) => ({ ...state, mode })),

  // SIDEBAR
  sideBarLinkActive: "",
  setSideBarLinkActive: (sideBarLinkActive) => set((state) => ({ ...state, sideBarLinkActive })),
  // MOBILE SIZE
  isSidebarOpen : true,
  setIsSidebarOpen: (isSidebarOpen) => set((state) => ({ ...state, isSidebarOpen })),

  

  //new state for campaign
  campaigns: [],
  setCampaigns: (campaigns) => set((state) => ({ ...state, campaigns })),
  addCampaign: (campaign) =>
    set((state) => ({ ...state, campaigns: [...state.campaigns, campaign] })),

  // USER page

  filter: "",
  setFilter: (filter) => set((state) => ({ ...state, filter })),
  user: [],
  setUser: (user) => set((state) => ({ ...state, user })),
});

export const useStore = create(store);
