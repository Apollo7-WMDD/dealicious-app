import { create } from 'zustand'


const store = (set) => ({
    filter: "",
    setFilter: (filter) => set((state)=> ({...state, filter})),
    user: [],
    setUser: (user) => set((state)=> ({...state, user})),

    // ADD NEW STATE HERE
    
});
    
    
export const useStore = create(store)