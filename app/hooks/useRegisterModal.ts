import { create } from 'zustand'

interface RegisterModalStore {
    isRegisterModalOpen: boolean
    openRegisterModal: () => void
    closeRegisterModal: () => void
}

// this function is used to create a register modal
const useRegisterModal = create<RegisterModalStore>((set) => ({
    isRegisterModalOpen: false,
    openRegisterModal: () => set({ isRegisterModalOpen: true }),
    closeRegisterModal: () => set({ isRegisterModalOpen: false }),
}))

export default useRegisterModal