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
        .get(`https://uty-ti30.onrender.com/api/payment/getTransaction/${id}`)
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
        .get('https://uty-ti30.onrender.com/api/payment/getTransactions')
        .then((response) => {
          console.log(response.data)
          set({ transactions: response.data })
        })
    } catch (e) {
      console.log(e)
    }
  },
}))
