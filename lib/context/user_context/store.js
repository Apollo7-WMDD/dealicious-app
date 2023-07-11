import { create } from "zustand";

const store = (set) => ({
  restaurantOwnerId: "",
  restaurantId: "",
  isOwner: true,
  setRestaurantOwner: (restaurantOwnerId) =>
    set((state) => ({ ...state, restaurantOwnerId })),
  setRestaurantId: (restaurantId) =>
    set((state) => ({ ...state, restaurantId })),
  setIsOwner: (isOwner) => set((state) => ({ ...state, isOwner })),
});

export const useStore = create(store);
