import { create } from 'zustand'
import axios from 'axios'

export const usePayStore = create((set) => ({
  orderNumber: '',
  cardUrl: '',
  transaction: {},
  transactions: [],

  updateOrderNumber: (newOrderNumber) => {
    set({ orderNumber: newOrderNumber })
  },

  updateCardUrl: (newCardUrl) => {
    set({ cardUrl: newCardUrl })
  },

  updateTransaction: async (id) => {
    try {
      await axios
        .get(`http://localhost:5200/api/payment/getTransaction/${id}`)
        .then((response) => {
          console.log(response.data)
          set({ transaction: response.data })
        })
    } catch (e) {
      console.log(e)
    }
  },

  updateTransactions: async () => {
    try {
      await axios
        .get('http://localhost:5200/api/payment/getTransactions')
        .then((response) => {
          console.log(response.data)
          set({ transactions: response.data })
        })
    } catch (e) {
      console.log(e)
    }
  },
}))
