import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import loader from '../assets/loader.gif'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  // const navigate = useNavigate()

  // const handleClick = (item) => {
  //   navigate(`/Requetes/${item}`)
  // }

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        'http://localhost:5200/api/category/getCategories'
      )
      setCategories(response.data)
      setLoading(false)

      console.log(categories)
    }
    getCategories()
  })
  return (
    <>
      {loading ? (
        <ContainerL>
          <img src={loader} alt="loader" className="loader" />
        </ContainerL>
      ) : (
        <Container>
          <div className="navbar">
            <Nav />
          </div>
          <div className="categories__body">
            <div className="categories__list">
              {categories.map((categorie) => {
                return (
                  <div className="card" key={categorie._id}>
                    <Link to={'/Requetes/' + categorie.name}>
                      <div className="card__icon">
                        <img src={categorie.icon} alt="categorie-icon" />
                      </div>
                      <div className="card__title">
                        <p>{categorie.name}</p>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

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
    justify-content: center;
    align-items: center;
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
        margin-bottom: 5vh;
        padding: 1vh 1vw;
        width: 40vw;
        border-radius: 0.75rem;
        cursor: pointer;
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
          }
        }
      }
    }
  }
`

export default Categories
