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
});

export const useStore = create(store);
