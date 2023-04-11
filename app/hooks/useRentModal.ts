import { create } from 'zustand'

interface RentModalStore {
    isRentModalOpen: boolean
    openRentModal: () => void
    closeRentModal: () => void
}

//
const useRentModal = create<RentModalStore>((set) => ({
    isRentModalOpen: false,
    openRentModal: () => set({ isRentModalOpen: true }),
    closeRentModal: () => set({ isRentModalOpen: false }),
}))

export default useRentModal