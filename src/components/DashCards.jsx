import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function DashCards({ imgSrc, title, path }) {
  const navigate = useNavigate()
  return (
    <Container onClick={() => navigate(path)}>
      <img src={imgSrc} alt="dashboard icon" />
      <span className="cards__name">{title}</span>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px silver;
  padding: 1vh 1vw;
  width: 37.5vw;
  text-align: center;
  cursor: pointer;
  img {
    margin-bottom: 1vh;
  }
  span {
    color: orange;
    font-weight: semi-bold;
  }
`
