import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import utyLogo from '../assets/logo-uty.png'
import { IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import OfferDetail from '../components/OfferDetail'

function Offer() {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])
  const [selectedOffer, setSelectedOffer] = useState('')
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    const getOffers = async () => {
      const data = await JSON.parse(localStorage.getItem('currentUser'))
      const response = await axios.get(
        `http://localhost:5200/api/preOrder/getprop/${data._id}`
      )
      setOffers(response.data)
      console.log(offers)
    }
    getOffers()
  }, [])

  return (
    <Container>
      <div className="navbar">
        <div className="page__title" onClick={() => navigate('/')}>
          <img src={utyLogo} alt="" className="uty__logo" />{' '}
        </div>
        <div className="count__container">
          <IoMenu className="menu__icon" />
        </div>
      </div>
      <div className="offer__list">
        {offers.map((offer) => {
          return (
            <div
              className="offer"
              key={offer._id}
              onClick={() => {
                setSelectedOffer(offer)
                setIsClick(true)
              }}
            >
              <p className="offer_message">
                <span>offer.name</span>a repondu à votre requete du
                <span>
                  {moment(Date.now()).format('MMM Do YY') ===
                  moment(offer.createdAt).format('MMM Do YY')
                    ? moment(Date.now()).format('h') ===
                      moment(offer.createdAt).format('h')
                      ? moment(offer.createdAt).fromNow()
                      : moment(Date.now()).format('h:s')
                    : moment(offer.createdAt).format('DD/MM/YYYY  h:s')}
                </span>
              </p>
            </div>
          )
        })}

        {isClick && (
          <OfferDetail selectedOffer={selectedOffer} setIsClick={setIsClick} />
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: -5vw;
    margin-right: -5vw;
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    padding: 1vh 5vw;
    margin-bottom: 2.5vh;
    .user__profil {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #020664;
      background-color: white;
      border-radius: 2rem;
      padding-left: 2vw;
      padding-right: 2vw;
      svg {
        font-size: 150%;
        cursor: pointer;
      }
    }

    .page__title {
      padding-top: 1vh;
      .uty__logo {
        height: 8vh;
        width: 12.5vw;
      }
    }
    .count__container {
      .menu__icon {
        font-size: 250%;
      }
    }
  }
`

export default Offer
