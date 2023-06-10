import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CarrousselOffer from './CarrouselOffer'
// import { useStore } from '../utils/Store'

function OfferDetail({ selectedOffer, setIsClick, setIsConfirm }) {
  const handleClick = () => {
    // updatePrix(selectedOffer.price)
    setIsClick(false)
    setIsConfirm(true)
  }
  return (
    <Container>
      <div className="body__back">
        <div className="centered">
          <div className="carousel">
            <IoClose onClick={() => setIsClick(false)} />
            <CarrousselOffer selectedOffer={selectedOffer} />
          </div>
          <div className="comm">
            Commentaire:
            {selectedOffer.finded.text}
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
      margin-top: 5vh;
      height: 88.5vh;
      background-color: white;
      width: 80vw;
      .carousel {
        width: 70vw;
        height: 55vh;
        padding-left: 3.5vw;
      }
      .comm {
        margin-top: 5vh;
        padding: 5vh 3.5vw;
        font-size: 125%;
      }
      .confirm__command {
        background-color: #020664;
        color: white;
        border-radius: 0.5rem;
        border: none;
        margin-left: 3.5vw;
        font-size: 125%;
        width: 90%;
        height: 7.5vh;
      }
    }
  }
`

export default OfferDetail
