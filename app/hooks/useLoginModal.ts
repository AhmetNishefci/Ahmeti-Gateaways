import { create } from 'zustand'

interface LoginModalStore {
    isLoginModalOpen: boolean
    openLoginModal: () => void
    closeLoginModal: () => void
}


const useLoginModal = create<LoginModalStore>((set) => ({
    isLoginModalOpen: false,
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
}))

export default useLoginModal