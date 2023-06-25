import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CarrousselOffer from './CarrouselOffer'

function OfferDetail({ selectedOffer, setIsClick, setIsConfirm }) {
  const handleClick = () => {
    setIsClick(false)
    setIsConfirm(true)
  }
  return (
    <Container>
      <div className="body__back">
        <div className="centered">
          <IoClose onClick={() => setIsClick(false)} />
          <div className="carousel">
            <CarrousselOffer selectedOffer={selectedOffer} />
          </div>
          <div className="comm">
            <p> Commentaire</p>
            <span>{selectedOffer.finded.text}</span>
          </div>
          <button className="confirm__command" onClick={handleClick}>
            Continuer
          </button>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  .body__back {
    background-color: gray;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-0%, -100%);
    top: 100vh;
    .centered {
      display: flex;
      flex-direction: column;
      padding: 2vh 3.5vw;
      height: 88.5vh;
      background-color: white;
      width: 90vw;
      svg {
        font-size: 175%;
      }
      .carousel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        height: 50vh;
      }
      .comm {
        display: flex;
        flex-direction: column;
        padding: 3.5vh 3vw;
        font-size: 125%;
        box-shadow: 0px 0px 5px silver;
        margin-bottom: 5vh;
        p {
          font-weight: bold;
        }
        span {
          margin-top: -2vh;
        }
      }
      .confirm__command {
        background-color: #020664;
        color: white;
        border-radius: 0.5rem;
        border: none;
        font-size: 125%;
        width: 100%;
        height: 8.5vh;
      }
    }
  }
`

export default OfferDetail
