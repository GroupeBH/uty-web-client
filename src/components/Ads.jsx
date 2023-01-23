import React from 'react'
import styled from 'styled-components'
import decoback from '../assets/decoback.jpg'

function Ads() {
  return (
    <Container>
      <div className="carousel__container">
        <div className="pub__container">
          <p className="pub__message">
            Découvrez le meilleur de la déco près de chez vous
          </p>
          <button className="pub__buttom">Voir plus</button>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .carousel__container {
    display: flex;
    height: 45vh;
    width: 27.5vw;
    background-image: url(${decoback});
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 2.5vw;
    .pub__container {
      display: flex;
      flex-direction: column;
      background-color: #020664;
      width: 10vw;
      height: 25vh;
      justify-content: center;
      border-radius: 1rem;
      color: white;
      font-weight: bold;
      opacity: 70%;
      p {
        text-align: center;
        align-self: center;
        opacity: 100%;
      }
      .pub__buttom {
        background-color: white;
        color: red;
        border: none;
        border-radius: 0.5rem;
        width: 5vw;
        height: 5vh;
        align-self: center;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`

export default Ads
