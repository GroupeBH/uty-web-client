import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function HomeCards({ title, text, path, button }) {
  const navigate = useNavigate()
  return (
    <Container>
      <div className="card__body">
        <p>{title}</p>
        <span>{text}</span>
        <button onClick={() => navigate(path)}>{button}</button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .card__body {
    display: flex;
    flex-direction: column;
    padding: 1vh 5vw;
    border-radius: 0.5rem;
    opacity: 90.5%;
    margin-top: -7.5vh;
    p {
      font-weight: bold;
      font-size: 150%;
      margin-top: 5vh;
      color: #020664;
    }
    span {
      margin-top: -1vh;
    }
    button {
      background-color: orange;
      color: white;
      border: none;
      border-radius: 0.5rem;
      height: 9vh;
      font-size: 120%;
      font-weight: bold;
      margin-top: 2vh;
      margin-bottom: 2vh;
    }
  }
`
