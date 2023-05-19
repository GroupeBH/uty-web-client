import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaUserEdit, FaPhoneAlt, FaEnvelope, FaSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

function Profile() {
  const data = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {}, [])
  return (
    <Container>
      <Nav />
      <div className="profile__header">
        <div className="username">
          <h2>{data.username}</h2>
        </div>
        <div className="edit__button">
          <StyledLink to="/Compte">
            <FaUserEdit /> <span>Modifier</span>
          </StyledLink>
        </div>
      </div>
      <div className="profile__details">
        <div className="item">
          <FaEnvelope /> <p>{data.email}</p>
        </div>
        <div className="item">
          <FaPhoneAlt /> <p>{data.phone}</p>
        </div>
        {data.isProvider ? (
          <div className="item">
            <FaSquare /> <p>Vendeur</p>
          </div>
        ) : null}
        {data.isDeliver ? (
          <div className="item">
            <FaSquare className="deliver__icon" /> <p>Livreur</p>
          </div>
        ) : null}
      </div>
    </Container>
  )
}
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 135%;
  span {
    color: #020664;
    margin-left: 1vw;
  }
  svg {
    color: orange;
  }
`
const Container = styled.div`
  .profile__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5vw;
    padding-right: 5vw;
    .username {
      color: #020664;
      font-size: 120%;
    }
  }
  .profile__details {
    padding-left: 5vw;
    padding-right: 5vw;
    .item {
      display: flex;
      align-items: center;
      font-size: 120%;
      svg {
        color: orange;
        margin-right: 1.5vw;
      }
      .deliver__icon {
        color: green;
      }
    }
  }
`

export default Profile
