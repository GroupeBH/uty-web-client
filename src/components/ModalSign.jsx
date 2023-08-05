import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
// import { useStore } from '../utils/Store'
import utyLogo from '../assets/logo-uty.png'
// import axios from 'axios'
// import { getTokenFromFirebase, onMessageListener } from '../firebase'
// import _ from 'lodash'

function ModalSign({ username, path }) {
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()
  // const [loading, setLoading] = useState()
  // let tokenFirebase = useStore((state) => state.tokenFirebase)
  // let updateTokenFirebase = useStore((state) => state.updateTokenFirebase)

  // const updateToken = async (user, token) => {
  //   await axios
  //     .patch(`http://localhost:5200/api/auth/updateTokenFirebase/${user}`, {
  //       tokenFirebase: token,
  //     })
  //     .then((response) => {
  //       console.log(response)
  //     })
  // }

  // useEffect(() => {
  //   Notification.requestPermission().then((permission) => {
  //     // If the user accepts, let's create a notification
  //     if (permission === 'granted') {
  //       getTokenFromFirebase(updateTokenFirebase)
  //     }
  //   })

  //   if (!_.isEmpty(tokenFirebase)) {
  //     updateToken(
  //       currentProvider.user._id
  //         ? currentProvider.user._id
  //         : currentProvider.user,
  //       tokenFirebase
  //     )
  //   }
  //   onMessageListener()
  //     .then((payload) => {
  //       console.log('From Message', payload)
  //     })
  //     .catch((err) => console.log('failed: ', err))
  // })

  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <img src={utyLogo} alt="logo of uty" />
            <p>
              Salut <span>{username}</span>, nous vous souhaitons le bienvenu
              sur uty
            </p>
            <button onClick={() => navigate(path)}>Commencer</button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .modal__back {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 100vh;
    .centered {
      align-self: center;
      background-color: white;
      width: 70vw;
      padding-right: 1vw;
      padding-left: 2vw;
      text-align: center;
      margin-right: 5vw;
      margin-left: 5vw;
      border-radius: 1rem;
      padding-bottom: 2.5vh;
      .modal__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        padding-top: 2vh;
        padding-bottom: 2vh;
        img {
          height: 20vh;
          width: 20vw;
        }
        p {
          margin-top: 2vh;
          font-size: 120%;
          font-weight: bold;
          color: #4f4b4b;
          span {
            color: orange;
          }
        }
        button {
          color: white;
          background-color: #040154;
          border: none;
          width: 50vw;
          height: 7.5vh;
          border-radius: 0.5rem;
          font-size: 130%;
          font-weight: bold;
        }
      }
    }
  }
`

export default ModalSign
