import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'
import OfferDetail from '../components/OfferDetail'
import loader from '../assets/loader.gif'
import Nav from '../components/Nav'

function Offer() {
  const [offers, setOffers] = useState([])
  const [selectedOffer, setSelectedOffer] = useState('')
  const [isClick, setIsClick] = useState(false)
  const [loading, setLoading] = useState(true)
  const data = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    const getOffers = async () => {
      const response = await axios.get(
        `https://uty-ti30.onrender.com/api/preOrder/getprop/${data._id}`
      )
      setOffers(response.data)
      setLoading(false)
      console.log(offers)
    }
    getOffers()
  }, [])

  return (
    <>
      {loading ? (
        <ContainerL>
          <img src={loader} alt="loader" className="loader" />
        </ContainerL>
      ) : (
        <Container>
          <Nav />
          <div className="offer__list">
            {offers.length == 0 && (
              <div className="offer__empty">
                Salut {data.username} vous n avez pas d offres pour le moment
              </div>
            )}

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
                    <span>{offer.name ? offer.name : 'Un vendeur'}</span>
                    <span></span> a repondu à votre requete du
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
              <OfferDetail
                selectedOffer={selectedOffer}
                setIsClick={setIsClick}
              />
            )}
          </div>
        </Container>
      )}
    </>
  )
}

const ContainerL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45vh;
  img {
    height: 10vh;
  }
`

const Container = styled.div`
  .offer__list {
    display: flex;
    flex-direction: column;
    gap: 2.5vh;
    padding: 2vh 5vw;
    .offer__empty {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .offer {
      border-color: silver;
      box-shadow: 0px 0px 5px silver;
      padding-left: 2vw;
    }
  }
  .not__offers {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
    width: 100vw;
    img {
      height: 45vh;
      width: 40vh;
    }
    p {
      color: #5f6161;
      span {
        color: orange;
      }
    }
  }
`

export default Offer
