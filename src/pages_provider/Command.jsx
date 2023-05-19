import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import axios from 'axios'
import moment from 'moment'
import loader from '../assets/loader.gif'

function Command() {
  const data = JSON.parse(localStorage.getItem('currentProvider'))
  const [commands, setCommands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCommands = async () => {
      try {
        const response = await axios.get(
          `https://uty-ti30.onrender.com/api/order/getMyCommands/${data._id}`
        )
        setCommands(response.data)
        console.log(response.data)
        setLoading(false)
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
          <img src={loader} alt="loader" className="loader" />
        </ContainerL>
      ) : (
        <Container>
          <Nav />
          <div className="command__list">
            {commands.map((command) => {
              return (
                <div className="command" key={command._id}>
                  <StyledLink to={'/ConfirmT/' + command._id}>
                    <p>La commande de : {command.customer.username}</p>
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
    .command {
      display: flex;
      flex-direction: column;
    }
  }
`

export default Command
