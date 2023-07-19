import { create } from 'zustand'

export const useStore = create((set) => ({
  isProvider: false,
  isDeliver: false,
  coords: [],
  location: [],
  user: {},
  geometrie: '',
  adress: '',
  tokenFirebase: '',

  updateCoords: () => {
    if (!navigator.geolocation) {
      console.log('location not supproted')
    } else {
      console.log('locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({ coords: [position.coords.latitude, position.coords.longitude] })
        },
        () => {
          console.log('enabled to retrieve location')
        }
      )
    }
  },

  updateDeliver: (newDeliver) => {
    set({ isDeliver: newDeliver })
  },
  updateProvider: (newProvider) => {
    set({ isProvider: newProvider })
  },

  updateGeometrie: (newGeometrie) => {
    set({ geometrie: newGeometrie })
  },

  updateAdress: (newAdress) => {
    set({ adress: newAdress })
  },

  updateUser: (newUser) => {
    set({ user: newUser })
  },

  updateLocation: (newLocation) => {
    set({ location: newLocation })
  },

  getTokenFirebase: (newToken) => {
    set({ tokenFirebase: newToken })
  },
}))
