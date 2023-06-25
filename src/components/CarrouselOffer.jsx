import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
// import utyLogo from '../assets/logo-uty.png'

function CarrousselOffer({ selectedOffer }) {
  console.log(selectedOffer)
  return (
    <div>
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        {selectedOffer.finded.medias.map((image) => (
          <Container className="item" key={selectedOffer._id}>
            <img src={image} alt="" />
          </Container>
        ))}
      </Carousel>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 30vw;
  }
`

export default CarrousselOffer
