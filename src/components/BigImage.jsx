import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'

function BigImage({ imgSrc, setPicClick }) {
  const handleClick = () => {
    setPicClick(false)
  }
  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <IoClose onClick={handleClick} />
          <div className="modal__body">
            <img src={imgSrc} />
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
    width: 100vw;
    height: 100vh;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: absolute;
    margin-left: -5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .centered {
      background-color: white;
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
        padding: auto 5vw;
        img {
          height: 60vh;
          margin-top: 2.5vh;
        }
      }
    }
  }
`

export default BigImage
