import { create } from 'zustand'

const useStore = create((set) => ({
  fields: [],
  setFields: (fields: []) => set({ fields }),

}))

export default useStore