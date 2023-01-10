import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import utyLogo from '../assets/logo-uty.png'

function OfferDetail({ selectedOffer, setIsClick }) {
  console.log(selectedOffer)
  return (
    <Container>
      <div className="body__back">
        <IoClose onClick={() => setIsClick(false)} />
        <div className="centered">
          <div className="carousel">
            <Carousel autoPlay>
              <div>
                {selectedOffer.imageOne ? (
                  <img src={selectedOffer.imageOne} alt="First product image" />
                ) : (
                  <img src={utyLogo} alt="uty logo" />
                )}
              </div>
              <div>
                {selectedOffer.imageTwo ? (
                  <img src={selectedOffer.imageTwo} alt="First product image" />
                ) : (
                  <img src={utyLogo} alt="uty logo" />
                )}
              </div>
              <div>
                {selectedOffer.imageThree ? (
                  <img
                    src={selectedOffer.imageThree}
                    alt="First product image"
                  />
                ) : (
                  <img src={utyLogo} alt="uty logo" />
                )}
              </div>
            </Carousel>
          </div>
          <div className="price">{selectedOffer.price}</div>
          <button className="confirm__command">Acheter</button>
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
    height: 88.5vh;
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
      height: 88.5vh;
      background-color: white;
      width: 90vw;
    }
  }
`

export default OfferDetail
