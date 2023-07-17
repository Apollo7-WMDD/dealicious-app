import { create } from "zustand";

const store = (set) => ({
  superCustomerId: "",
  restaurantId: "",
  setSuperCustomerId: (superCustomerId) =>
    set((state) => ({ ...state, superCustomerId })),
  setRestaurantId: (restaurantId) =>
    set((state) => ({ ...state, restaurantId })),
});

export const useStore = create(store);
