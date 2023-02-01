import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/firebase-messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDiQLXVWGKBSGhBPpSS8Juwi0TvIANSx_o',
  authDomain: 'utyproject.firebaseapp.com',
  databaseURL: 'https://utyproject-default-rtdb.firebaseio.com',
  projectId: 'utyproject',
  storageBucket: 'utyproject.appspot.com',
  messagingSenderId: '647092575912',
  appId: '1:647092575912:web:511c7600de6b1cb9092c9d',
  measurementId: 'G-MSX0DHDKM9',
}

const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

export const getTokenFromFirebase = () => {
  return getToken(messaging, {
    vapidKey:
      'BC7dwnVnu_p3XWoevoWoQMO0EN2VgzvwHMIV0zfUv-TGCoXXkgjynESTZTgzoGOTL3IqmDy2BeBzrk5mY4DBMt8',
  })
    .then((currentToken) => {
      if (currentToken) console.log('good torrent')
      else console.log('no register token')
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload)
      resolve(payload)
    })
  })
