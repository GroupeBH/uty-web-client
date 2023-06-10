import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
// import utyLogo from '../assets/logo-uty.png'

function CarrousselOffer({ selectedOffer }) {
  console.log(selectedOffer)
  return (
    <Container>
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        {selectedOffer.finded.medias.map((image) => (
          <div className="item" key={selectedOffer._id}>
            <img src={image} alt="" />
          </div>
        ))}
        {/* <div style={{ marginTop: '5vh' }}>
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
            <img src={selectedOffer.imageThree} alt="First product image" />
          ) : (
            <img
              src={utyLogo}
              alt="first_product_image"
              style={{ width: '60vw' }}
            />
          )}
        </div> */}
      </Carousel>
    </Container>
  )
}

const Container = styled.div``

export default CarrousselOffer
