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
        <div className="centered">
          <div className="carousel">
            <IoClose onClick={() => setIsClick(false)} />
            <Carousel autoPlay infiniteLoop showThumbs={false}>
              <div style={{ marginTop: '5vh' }}>
                {selectedOffer.imageOne ? (
                  <img src={selectedOffer.imageOne} alt="First product image" />
                ) : (
                  <img src={utyLogo} alt="first_product_image" />
                )}
              </div>
              <div>
                {selectedOffer.imageTwo ? (
                  <img src={selectedOffer.imageTwo} alt="First product image" />
                ) : (
                  <img
                    src={utyLogo}
                    alt="first_product_image"
                    style={{ width: '60vw' }}
                  />
                )}
              </div>
              <div>
                {selectedOffer.imageThree ? (
                  <img
                    src={selectedOffer.imageThree}
                    alt="First product image"
                  />
                ) : (
                  <img
                    src={utyLogo}
                    alt="first_product_image"
                    style={{ width: '60vw' }}
                  />
                )}
              </div>
            </Carousel>
          </div>
          <div className="price">Prix du produit: {selectedOffer.price} FC</div>
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
      .price {
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
