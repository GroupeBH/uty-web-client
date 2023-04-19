/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.16.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging-compat.js'
)

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

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})
