import React from 'react'
import { useNavigate } from 'react-router-dom'
import process from 'process'

import styled from 'styled-components'
import axios from 'axios'

export default function Logout() {
  const navigate = useNavigate()
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id
    const data = await axios.get(`http://localhost:5100/api/auth/logout/${id}`)
    if (data.status === 200) {
      localStorage.clear()
      navigate('/')
    }
  }
  return <Button onClick={handleClick}>logout</Button>
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: blue;
  border: none;
  cursor: pointer;
  svg {
    font-size: 350%;
    color: #ebe7ff;
  }
`
