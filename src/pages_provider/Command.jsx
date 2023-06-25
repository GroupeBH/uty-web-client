import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import axios from 'axios'
import moment from 'moment'
// import loader from '../assets/loader.gif'
import { InfinitySpin } from 'react-loader-spinner'
import { useStore } from '../utils/Store'

function Command() {
  const data = JSON.parse(localStorage.getItem('currentProvider'))
  const [commands, setCommands] = useState([])
  const [loading, setLoading] = useState(true)
  const updateCoords = useStore((state) => state.updateCoords)
  const coords = useStore((state) => state.coords)

  useEffect(() => {
    updateCoords()
    console.log('current provider', data.user)
    const getCommands = async () => {
      try {
        const response = await axios.get(
          `https://uty-ti30.onrender.com/api/order/getMyCommands/${data._id}`
        )
        setCommands(response.data)
        console.log(response.data)
        setLoading(false)
        await axios
          .patch(
            `https://uty-ti30.onrender.com/api/auth/updateCoords/${data.user._id}`,
            {
              coords,
            }
          )
          .then((response) => {
            console.log(response)
          })
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }
    getCommands()
  }, [])
  return (
    <>
      {loading ? (
        <ContainerL>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          <InfinitySpin width="200" color="orange" />
        </ContainerL>
      ) : (
        <Container>
          <Nav />
          <div className="command__list">
            {commands.length == 0 && (
              <div className="empty">
                Pas de commandes en attente de livraison
              </div>
            )}
            {commands.map((command) => {
              return (
                <div className="command" key={command._id}>
                  <StyledLink to={'/ConfirmT/' + command._id}>
                    <p>La commande de : {command?.customer.username}</p>
                    <p className="">
                      <span>{command.price}</span>
                      <span>
                        {moment(Date.now()).format('MMM Do YY') ===
                        moment(command.createdAt).format('MMM Do YY')
                          ? moment(Date.now()).format('h') ===
                            moment(command.createdAt).format('h')
                            ? moment(command.createdAt).fromNow()
                            : moment(Date.now()).format('h:s')
                          : moment(command.createdAt).format('DD/MM/YYYY  h:s')}
                      </span>
                    </p>
                  </StyledLink>
                </div>
              )
            })}
          </div>
        </Container>
      )}
    </>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

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
  .command__list {
    display: flex;
    flex-direction: column;
    gap: 1vh 1vw;
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #484747;
      font-size: 125%;
      margin-top: 20vh;
      text-align: center;
    }
    .command {
      display: flex;
      flex-direction: column;
    }
  }
`

export default Command
