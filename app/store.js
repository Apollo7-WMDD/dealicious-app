import { create } from 'zustand'


const store = (set) => ({
    filter: "",
    setFilter: (filter) => set((state)=> ({...state, filter})),
    user: [],
    setUser: (user) => set((state)=> ({...state, user})),
    
});
    
    
export const useStore = create(store)