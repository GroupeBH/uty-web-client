import create from 'zustand'

export const useBookStore = create((set, get) => ({
  latitude: 0,
  longitude: 0,
  updateLatitude: (newLatitude) => {
    const latitudeState = get().latitude
    set({ latitude: newLatitude + latitudeState })
  },
  updateLongitude: (newLongitude) => {
    const longitudeState = get().longitude
    set({ longitude: newLongitude + longitudeState })
  },
}))
