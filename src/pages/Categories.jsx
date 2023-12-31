import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner'
import ModalConnect from './ModalConnect'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useStore } from '../utils/Store'
import { getTokenFromFirebase, onMessageListener } from '../firebase'

function Categories() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const deviceToken = JSON.parse(localStorage.getItem('tokenFirebaseCustomer'))
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCustomer, setIsCustomer] = useState(false)
  const [notConnected, setNotConnected] = useState(false)

  let tokenFirebase = useStore((state) => state.tokenFirebase)
  let updateTokenFirebase = useStore((state) => state.updateTokenFirebase)
  let userStatus = useStore((state) => state.userStatus)
  let updateUserStatus = useStore((state) => state.updateUserStatus)

  const getCategories = async () => {
    const response = await axios.get(
      'https://uty-ti30.onrender.com/api/category/getCategories'
    )
    setCategories(response.data)
    setLoading(false)
  }

  const updateToken = async (user, token) => {
    await axios
      .patch(
        `https://uty-ti30.onrender.com/api/auth/updateTokenFirebase/${user}`,
        {
          tokenFirebase: token,
        }
      )
      .then((response) => {
        console.log(response)
      })
  }

  useEffect(() => {
    if (!currentUser) {
      setNotConnected(true)
    } else {
      //👉🏻Logs the device token to the console
      setIsCustomer(true)

      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        console.log('notif: ', permission)
        if (permission === 'granted') {
          updateUserStatus('customer')
          getTokenFromFirebase(updateTokenFirebase, userStatus)
        }
      })

      console.log('firebase token :', tokenFirebase)

      if (!_.isEmpty(deviceToken)) {
        updateToken(currentUser._id, tokenFirebase)
      }
      //👉🏻Listen and logs the push messages from the server.
      onMessageListener()
        .then((payload) => {
          console.log('From Message', payload)
        })
        .catch((err) => console.log('failed: ', err))

      //....socket.io listeners
    }
  }, [tokenFirebase])

  useEffect(() => {
    getCategories()
  })
  return (
    <>
      {loading ? (
        <ContainerL>
          <InfinitySpin width="200" color="orange" />
        </ContainerL>
      ) : (
        <Container>
          <div className="navbar">
            <Nav isCustomer={isCustomer} />
          </div>
          <div className="categories__body">
            <div className="categories__accroche">
              <p>
                Hey <span>{currentUser?.username}</span>
                Renseignez ce dont vous avez besoin selon les catégories
                suivants
              </p>
              <hr />
            </div>
            <div className="categories__list">
              {categories.map((categorie) => {
                return (
                  <div className="card" key={categorie._id}>
                    <StyledLink to={'/announcements/' + categorie.name}>
                      <div className="card__icon">
                        <img src={categorie.icon} alt="categorie-icon" />
                      </div>
                      <div className="card__title">
                        <p>{categorie.name}</p>
                      </div>
                      <p className="hover__title">{categorie.name}</p>
                    </StyledLink>
                  </div>
                )
              })}
            </div>
          </div>
          {notConnected && <ModalConnect setIsOpen={setNotConnected} />}
        </Container>
      )}
    </>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`
const ContainerL = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 10vh;
    width: 20vw;
  }
`
const Container = styled.div`
  height: 100vh;
  .navbar {
    position: sticky;
    top: 0vh;
  }
  .categories__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .categories__accroche {
      text-align: center;
      padding: 1vh 4.5vw;
      margin-bottom: 1.5vh;
      p {
        font-size: 130%;
        font-weight: bold;
        color: #777474;
        margin-bottom: 0.25vh;
        span {
          margin-right: 1vw;
          color: orange;
          font-weight: bold;
        }
      }
    }
    .categories__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5vw;
      .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 5px silver;
        margin-bottom: 0.75vh;
        padding: 1vh 1vw;
        width: 40vw;
        border-radius: 0.75rem;
        cursor: pointer;
        .hover__title {
          display: none;
        }
        .card__icon {
          img {
            width: 30vw;
          }
        }
        .card__title {
          color: orange;
          font-weight: bold;
          font-size: 150%;
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-decoration: none;
          }
        }
      }
      .card:hover {
        background-color: #020664;
        .card__icon {
          display: none;
        }
        .card__title {
          display: none;
        }
        .hover__title {
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 150%;
        }
      }
    }
  }

  //for desktop
  @media all and (min-width: 992px) {
    .categories__body {
      .categories__list {
        .card {
          width: 20vw;
          .card__icon {
            img {
              width: 10vw;
            }
          }
          .card__title {
            color: orange;
            font-weight: bold;
            font-size: 150%;
            p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-decoration: none;
            }
          }
        }
      }
    }
  }

  //for tablets
  @media all and (765px <= width < 992px) {
    .categories__body {
      .categories__list {
        .card {
          width: 20vw;
          .card__icon {
            img {
              width: 10vw;
            }
          }
          .card__title {
            color: orange;
            font-weight: bold;
            font-size: 150%;
            p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
`

export default Categories
