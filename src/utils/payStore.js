import { create } from 'zustand'
import axios from 'axios'

export const usePayStore = create((set) => ({
  token: '',
  initData: [],

  fetchToken: async (login, pwd, pin) => {
    await axios
      .post('http://flashint.cfc-rdc.com:3000/flashpay/get-token', {
        login: login,
        pwd: pwd,
        pin: pin,
      })
      .then((response) => response.json())
      .then((data) => set({ token: data.token }))
  },

  fetchInitData: async (headerObject, bodyObject) => {
    const { token, login, pwd } = headerObject
    const {
      montant,
      deviseiso,
      commentaire,
      urlSuccess,
      urlDecline,
      motif,
      fpid,
      transactionId,
      nomMarchand,
      pin,
    } = bodyObject
    await axios
      .post(
        'http://flashint.cfc-rdc.com:3000/flashpay/init',
        {
          headers: {
            'Content-Type': 'application/json',
            token: token,
            login: login,
            pwd: pwd,
          },
        },
        {
          montant,
          deviseiso,
          commentaire,
          urlSuccess,
          urlDecline,
          motif,
          fpid,
          transactionId,
          nomMarchand,
          pin,
        }
      )
      .then((response) => response.json())
      .then((data) => set({ initData: data }))
  },
}))
