import React, { useState } from 'react'
import styled from 'styled-components'
import { IoLocation } from 'react-icons/io5'
import { useStore } from '../utils/Store'
import axios from 'axios'
import { Rings } from 'react-loader-spinner'

function ModalCoords({ setOpen }) {
  const currentProvider = JSON.parse(localStorage.getItem('currentProvider'))

  const updateCoords = useStore((state) => state.updateCoords)
  const coords = useStore((state) => state.coords)

  const [isLoad, setIsLoad] = useState(false)

  const handleClick = async () => {
    updateCoords()
    setIsLoad(true)
    await axios
      .patch(
        `https://uty-ti30.onrender.com/api/auth/updateCoords/${currentProvider.user._id}`,
        {
          coords: coords,
        }
      )
      .then(() => {
        setIsLoad(false)
        setOpen(false)
      })
  }
  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <IoLocation />
            <p>Désolé nous ne parvenons pas à acceder à votre localisation</p>
            <button onClick={handleClick}>
              {isLoad ? (
                <>
                  <div
                    className="loader"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '-2vh',
                    }}
                  >
                    <Rings height="80" width="80" color="white" />
                  </div>
                </>
              ) : (
                <>Autoriser ma localisation</>
              )}
            </button>
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
    top: 100vh;
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

export default ModalCoords
