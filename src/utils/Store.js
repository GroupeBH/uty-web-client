import { create } from 'zustand'

export const useStore = create((set) => ({
  isProvider: false,
  isDeliver: false,
  username: '',
  latitude: 0,
  longitude: 0,
  coords: [],
  user: [],
  geometrie: '',
  adress: '',
  rideDistance: 0,
  rideDuration: 0,
  updateUsername: (newUsername) => {
    set({ username: newUsername })
  },
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
  updateUser: (newUser) => {
    set({ user: newUser })
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

  updateRideDistance: (newRideDistance) => {
    set({ rideDistance: newRideDistance })
  },

  updateRideDuration: (newRideDuration) => {
    set({ rideDuration: newRideDuration })
  },

  updateAdress: (newAdress) => {
    set({ adress: newAdress })
  },
}))
