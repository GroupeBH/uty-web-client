import React from 'react'
import styled from 'styled-components'
import { IoCloseCircleOutline } from 'react-icons/io5'

function ModalError({ setOpen }) {
  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <IoCloseCircleOutline />
            <p>
              Désolé votre requete n&apos a pas été envoyé veuillez vérifier
              votre connexion et récommencer plutard
            </p>
            <button onClick={() => setOpen(false)}>Ok</button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .modal__back {
    background-color: rgba(0, 0, 0, 0.5);
    top: 100vh;
    height: 100vh;
    width: 100vw;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -50vw;
    .centered {
      margin-right: 5vw;
      margin-left: 5vw;
      .modal__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        background-color: white;
        padding-right: 1vw;
        padding-left: 2vw;
        text-align: center;
        border-radius: 1rem;
        padding-bottom: 2.5vh;
        padding-top: 2.5vh;
        svg {
          font-size: 600%;
          color: red;
        }
        p {
          font-size: 120%;
          font-weight: bold;
          color: #4f4b4b;
        }
        button {
          color: white;
          background-color: #020664;
          border: none;
          width: 80vw;
          height: 7.5vh;
          border-radius: 0.5rem;
          font-size: 120%;
          font-weight: bold;
        }
      }
    }
  }
`

export default ModalError
