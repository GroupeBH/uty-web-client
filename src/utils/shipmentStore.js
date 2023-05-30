import { create } from 'zustand'
import axios from 'axios'

export const useShipmentStore = create((set) => ({
  price: 0,
  provider: 0,
  pickUpCoord: [],
  dropOffCoord: [],
  distance: 0,
  duration: 0,
  order: {},
  shipments: [],

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
      console.log(response)
      set({ distance: Math.round(response.data.trips[0].distance / 1000) })
      set({ duration: Math.round(response.data.trips[0].duration / 60) })
    } catch (e) {
      console.log(e)
    }
  },
  updatePickUpCoord: async (provider) => {
    try {
      await axios
        .get(`http://localhost:5200/api/auth/getProvider/${provider}`)
        .then((response) => {
          console.log(response.data.user)
          set({ pickUpCoord: response.data.user.coords })
        })
    } catch (e) {
      console.log(e)
    }
  },
  updateOrder: async (orderId) => {
    try {
      await axios
        .get(`http://localhost:5200/api/order/getorder/${orderId}`)
        .then((response) => {
          console.log(response.data)
          set({ order: response.data })
          set({ dropOffCoord: response.data.customer.coords })
        })
    } catch (e) {
      console.log(e)
    }
  },
  updateShipments: async () => {
    try {
      await axios
        .get('http://localhost:5200/api/shipment/shipments')
        .then((response) => set({ shipments: response.data }))
    } catch (e) {
      console.log(e)
    }
  },
}))
