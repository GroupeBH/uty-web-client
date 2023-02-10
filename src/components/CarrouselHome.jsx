import React from 'react'
import Ads from './Ads'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

function CarrouselHome() {
  return (
    <Container>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <Ads />
        <Ads />
        <Ads />
      </Carousel>
    </Container>
  )
}

const Container = styled.div`
  z-index: 2;
`

export default CarrouselHome
