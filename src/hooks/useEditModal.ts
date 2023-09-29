import { create } from 'zustand'

type EditModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useEditModal
