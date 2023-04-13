import { create } from 'zustand'

interface SearchModalStore {
    isSearchModalOpen: boolean
    openSearchModal: () => void
    closeSearchModal: () => void
}

// this function is used to create a search modal
const useSearchModal = create<SearchModalStore>((set) => ({
    isSearchModalOpen: false,
    openSearchModal: () => set({ isSearchModalOpen: true }),
    closeSearchModal: () => set({ isSearchModalOpen: false }),
}))

export default useSearchModal