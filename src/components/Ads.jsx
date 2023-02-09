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
    align-items: center;
    height: 50vh;
    width: 95vw;
    background-image: url(${decoback});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-left: 2.5vw;
    margin-top: 2.5vh;
    .pub__container {
      display: flex;
      flex-direction: column;
      margin-left: 5vw;
      padding-left: 2.5vw;
      padding-right: 2.5vw;
      background-color: #020664;
      width: 50vw;
      height: 35vh;
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
        background-color: orange;
        color: white;
        border: none;
        border-radius: 0.5rem;
        width: 25vw;
        height: 5vh;
        align-self: center;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`

export default Ads
