import { create } from 'zustand'
import axios from 'axios'

export const useShipmentStore = create((set) => ({
  price: 0,
  provider: 0,
  pickUpCoord: [],
  distance: 0,
  order: {},

  updatePrice: async (newPrice, distance) => {
    let constant = 2000 * distance
    set({ price: newPrice + constant })
  },
  updateProvider: async (user) => {
    try {
      await axios
        .get(`http://localhost:5200/api/auth/getProvider/${user}`)
        .then((response) => {
          console.log(response.data)
          set({ provider: response.data.user })
        })
    } catch (e) {
      console.log(e)
    }
  },
  updateDistance: async (pickUpCoord, dropOffCoord) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${pickUpCoord[0]},${pickUpCoord[1]};${dropOffCoord[0]},${dropOffCoord[1]}?` +
          new URLSearchParams({
            access_token:
              'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
          })
      )
      set({ distance: response.data.trips[0].distance })
    } catch (e) {
      console.log(e)
    }
  },
  updatePickUpCoord: async (order) => {
    try {
      await axios
        .get(
          `https://uty-ti30.onrender.com/api/auth/getProvider/${order.provider}`
        )
        .then((response) => {
          console.log(response.data)
          set({ pickUpCoord: response.data.user.coords })
        })
    } catch (e) {
      console.log(e)
    }
  },
  updateOrder: async (id) => {
    try {
      await axios
        .get(`https://uty-ti30.onrender.com/api/order/getorder/${id}`)
        .then((response) => {
          console.log(response.data)
          set({ order: response.data })
        })
    } catch (e) {
      console.log(e)
    }
  },
}))
