import React from 'react'
import Ads from './Ads'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function CarrouselHome() {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      <Ads />
      <Ads />
      <Ads />
    </Carousel>
  )
}

export default CarrouselHome
