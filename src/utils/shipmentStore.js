import { create } from 'zustand'
import axios from 'axios'

export const useShipmentStore = create((set) => ({
  price: 0,
  provider: 0,
  pickUpCoord: [],
  pickUp: [],
  dropOffCoord: [],
  distance: 0,
  duration: 0,
  order: {},
  shipments: [],
  shipment: {},
  adress: '',
  customer: '',
  productWanted: '',
  productWantedDesc: '',

  updatePrice: async (newPrice, distance) => {
    let constant = 2000 * distance
    set({ price: newPrice + constant })
  },

  updateProvider: async (user) => {
    try {
      await axios
        .get(`https://uty-ti30.onrender.com/api/provider/getProvider/${user}`)
        .then((response) => {
          console.log('pick', response.data.user.coords)
          set({ provider: response.data._id })
          set({ pickUp: response.data.user.coords })
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
      console.log(response.data.trips[0].distance)
      set({ distance: Math.round(response.data.trips[0].distance / 1000) })
      set({ duration: Math.round(response.data.trips[0].duration / 60) })
    } catch (e) {
      console.log(e)
    }
  },

  updatePickUpCoord: async (provider) => {
    try {
      await axios
        .get(`https://uty-ti30.onrender.com/api/auth/getProvider/${provider}`)
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
          set({ customer: response.data.customer.username })
          set({ dropOffCoord: response.data.customer.coords })
          set({ productWanted: response.data.wanted.media })
          set({ productWantedDesc: response.data.wanted.text })
        })
    } catch (e) {
      console.log(e)
    }
  },

  updateShipments: async () => {
    try {
      await axios
        .get('https://uty-ti30.onrender.com/api/shipment/shipments')
        .then((response) => set({ shipments: response.data }))
    } catch (e) {
      console.log(e)
    }
  },

  updateAdress: async (pickUpCoord) => {
    try {
      await axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickUpCoord[0]},${pickUpCoord[1]}.json?` +
            new URLSearchParams({
              access_token:
                'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
              limit: 1,
            })
        )
        .then((response) =>
          set({ adress: response.data.features[0].place_name })
        )
    } catch (e) {
      console.log(e)
    }
  },

  updateShipment: async (shipId) => {
    try {
      await axios
        .get(`https://uty-ti30.onrender.com/api/shipment/shipment/${shipId}`)
        .then((response) => set({ shipment: response.data }))
    } catch (e) {
      console.log(e)
    }
  },
}))
