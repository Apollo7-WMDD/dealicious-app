import { create } from "zustand";

const store = (set) => ({
  // DARK / LIGHT MODE
  mode: "light",
  setMode: () =>
    set((state) => ({
      ...state,
      mode: state.mode === "light" ? "dark" : "light",
    })),

  // SIDEBAR
  sideBarLinkActive: "",
  setSideBarLinkActive: (sideBarLinkActive) =>
    set((state) => ({ ...state, sideBarLinkActive })),

  // SIDEBAR ITEM ACTIVE
  sideBarItemActive: "",
  setSideBarItemActive: (sideBarItemActive) =>
    set((state) => ({ ...state, sideBarItemActive })),

  // SIDEBAR SUBITEM ACTIVE
  sideBarSubItemActive: "",
  setSideBarSubItemActive: (sideBarSubItemActive) =>
    set((state) => ({ ...state, sideBarSubItemActive })),

  // MOBILE SIZE
  isSidebarOpen: true,
  setIsSidebarOpen: (isSidebarOpen) =>
    set((state) => ({ ...state, isSidebarOpen })),

  // REVENUE
  revenue: 0,
  setRevenue: (revenue) => set((state) => ({ ...state, revenue })),

  // CUSTOMERS
  customers: 0,
  setCustomers: (customers) => set((state) => ({ ...state, customers })),
});

export const useStore = create(store);
