import { create } from 'zustand'

interface LoginModalStore {
    isLoginModalOpen: boolean
    openLoginModal: () => void
    closeLoginModal: () => void
}

// this function is used to create a login modal
const useLoginModal = create<LoginModalStore>((set) => ({
    isLoginModalOpen: false,
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
}))

export default useLoginModal