import { create } from 'zustand'

export const useStore = create((set) => ({
  latitude: 0,
  longitude: 0,
  coords: [],
  updateLatitude: (newLatitude) => {
    // const latitudeState = get().latitude
    set({ latitude: newLatitude })
  },
  updateLongitude: (newLongitude) => {
    // const longitudeState = get().longitude
    set({ longitude: newLongitude })
  },
  updateCoords: (newCoords) => {
    set({ coords: newCoords })
  },
}))
