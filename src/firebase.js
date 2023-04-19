import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
//Access Firebase cloud messaging
const messaging = getMessaging(firebaseApp)

/*
This function allows us to get your device token from Firebase 
which is required for sending Push notifications to your device.
*/
export const getTokenFromFirebase = () => {
  return getToken(messaging, {
    vapidKey:
      'BC7dwnVnu_p3XWoevoWoQMO0EN2VgzvwHMIV0zfUv-TGCoXXkgjynESTZTgzoGOTL3IqmDy2BeBzrk5mY4DBMt8',
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken)
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        )
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
}

//This function listens to push messages on the server
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload)
      resolve(payload)
    })
  })
