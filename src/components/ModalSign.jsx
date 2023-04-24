import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'

function ModalSign() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()
  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <img src={utyLogo} alt="logo of uty" />
            <p>
              Salut <span>{currentUser.username}</span>, nous vous souhaitons le
              bienvenu sur uty
            </p>
            <button onClick={() => navigate('/Categories')}>Commencer</button>
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
