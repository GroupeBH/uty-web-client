import React from 'react'
import styled from 'styled-components'

export default function AnnounceCard({
  image,
  description,
  minprice,
  maxprice,
}) {
  return (
    <Container>
      <div className="image__container">
        <img src={image} alt="" />
      </div>
      <div className="announce__detail">
        <div className="announce__price">
          <span>{minprice}</span> - <span>{maxprice + ' CDF'}</span>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px #5b5e5e;
  .image__container {
    width: 100%;
    img {
      width: 100%;
      height: 40vh;
    }
  }
  .announce__detail {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    padding: 2vh 3vw;
    .announce__price {
      align-self: flex-start;
      span {
        font-size: 200%;
      }
    }
    .description {
      align-self: flex-start;
      p {
        font-size: 135%;
        color: #636363;
        font-weight: bold;
      }
    }
  }
`
