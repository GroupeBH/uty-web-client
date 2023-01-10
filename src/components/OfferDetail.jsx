import React from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'

function OfferDetail({ selectedOffer, setIsClick }) {
  console.log(selectedOffer)
  return (
    <Container>
      <div className="body__back">
        <IoClose onClick={() => setIsClick(false)} />
        <div className="centered">
          <div className="carousel">{selectedOffer.name}</div>
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
