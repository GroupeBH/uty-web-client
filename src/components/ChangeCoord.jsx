import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Map from './Map'

function ChangeCoord({ user, setChangeCoords, myCoord }) {
  return (
    <Container>
      <div className="body__back">
        <IoClose onClick={() => setChangeCoords(false)} />
        <div className="centered">
          <div className="confirm__body">
            <div className="map__side">
              <Map user={user} myCoord={myCoord} />
            </div>
            <button className="confirm__command">confirmer</button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  .body__back {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translate(-0%, -100%);
    top: 100vh;
    svg {
      align-self: flex-start;
      margin-left: 4vw;
      font-size: 250%;
      margin-bottom: -3vh;
      color: white;
    }
    .centered {
      display: flex;
      flex-direction: column;
      margin-top: 5vh;
      height: 88.5vh;
      background-color: white;
      width: 85vw;
      border-radius: 0.5rem;
      .confirm__body {
        .adress__container {
          display: flex;
          padding: 1.5vh 2.5vw;
          .adress__icon {
            font-size: 235%;
            margin-right: 2vw;
            color: orange;
          }
        }
        button {
          width: 90%;
          height: 7.5vh;
          border: none;
          border-radius: 0.5rem;
          background-color: #020664;
          color: white;
          font-size: 100%;
          margin-left: 5vw;
        }
      }
    }
  }
`

export default ChangeCoord
