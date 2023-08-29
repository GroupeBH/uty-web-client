import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AnnounceCard from './AnnounceCard'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { InfinitySpin } from 'react-loader-spinner'

function Announcements({ params }) {
  const [announces, setAnnounces] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getAnnouncements = async () => {
    await axios
      .get(`https://uty-ti30.onrender.com/api/annonce/getAnnonces/${params}`)
      .then((response) => {
        setAnnounces(response.data.data)
        setLoading(false)
      })
  }

  const handleClick = () => {
    navigate(`/Requetes/${params}`)
  }

  useEffect(() => {
    getAnnouncements()
  }, [params])
  return (
    <>
      {loading ? (
        <ContainerL>
          <InfinitySpin width="200" color="orange" />
        </ContainerL>
      ) : (
        <Container>
          <div className="header">
            <span>Catégorie: {params}</span>
          </div>
          <Carousel autoPlay infiniteLoop showThumbs={true}>
            {announces.map((announce) => (
              <div
                className="announce__list"
                key={announce._id}
                onClick={handleClick}
              >
                <AnnounceCard
                  image={announce.image}
                  description={announce.description}
                  minprice={announce.minprice}
                  maxprice={announce.maxprice}
                />
              </div>
            ))}
          </Carousel>
          <button onClick={handleClick}>Somba na uty</button>
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
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh 3vw;
  gap: 1vh 1vw;
  .header {
    margin-bottom: 5vh;
    font-size: 150%;
  }
  button {
    height: 10vh;
    background-color: #020664;
    color: white;
    font-size: 125%;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 7vh;
    width: 100%;
  }
`
export default Announcements
