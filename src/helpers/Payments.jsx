import axios from 'axios'

const getToken = async (login, pwd, pin, setToken) => {
  await axios
    .post('http://flashint.cfc-rdc.com:3000/flashpay/get-token', {
      login: login,
      pwd: pwd,
      pin: pin,
    })
    .then((response) => setToken(response.data))
}

// const getTransaction = async () => {
//   await axios.get('http://flashint.cfc-rdc.com:3000/flashpay/get-transaction')
// }

const initPay = async (headerObject, bodyObject, setInitData) => {
  const { token, login, pwd } = headerObject
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
      bodyObject
    )
    .then((response) => setInitData(response.data))
}

export { getToken, initPay }
