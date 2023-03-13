import React, { useState } from 'react'
import styled from 'styled-components'
import { categories } from '../components/Categories'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import axios from 'axios'
import utyLogo from '../assets/logo-uty.png'
import { IoNotifications } from 'react-icons/io5'
import MenuClient from '../components/MenuClient'
import { io } from 'socket.io-client'
import { useGeolocated } from 'react-geolocated'
import { Rings } from 'react-loader-spinner'

function Requetes() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const socket = useRef()
  const [selectedImg, setSelectedImg] = useState(null)
  const [picUrl, setPicUrl] = useState(null)
  const [url, setUrl] = useState(null)
  const [description, setDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [cate, setCate] = useState(null)
  const [load, setLoad] = useState(false)
  const cloudName = 'disyacex9'
  let navigate = useNavigate()

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enabledHighAccuracy: false,
      },
      userDecisionTimeout: 30000,
    })

  console.log(coords)
  console.log(isGeolocationAvailable)
  console.log(isGeolocationEnabled)

  useEffect(() => {
    socket.current = io('http://localhost:5200')
    socket.current.emit('add-user', currentUser._id)
  }, [currentUser])

  useEffect(() => {
    if (selectedImg) {
      setPicUrl(URL.createObjectURL(selectedImg))
    }
  }, [selectedImg])

  const uploadImage = async () => {
    const picData = new FormData()
    picData.append('file', selectedImg)
    picData.append('upload_preset', 'utyweb')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        picData
      )
      setUrl(response.data.secure_url)
      console.log(url)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    const data = await JSON.parse(localStorage.getItem('currentUser'))
    console.log(data.username)
    console.log(data._id)
    try {
      console.log({
        description: description,
        image: url,
        sender: data._id,
        category: cate,
      })
      socket.current.emit('sendToProvider', {
        sender: data._id,
      })
      socket.current.emit('sendPreOrder', {
        sender: data.username,
        description: description,
        image: url,
        category: cate,
      })
      await uploadImage()
      await axios.post('https://uty-ti30.onrender.com/api/preOrder/addpre', {
        description: description,
        image: url,
        sender: data._id,
        category: cate,
      })

      setDescription('')
      setLoad(false)
      setCate(null)
    } catch (error) {
      console.log(error)
    }
    setIsOpen(true)
  }
  return (
    <Container>
      <div className="navbar">
        <div className="page__title" onClick={() => navigate('/HomePage')}>
          {' '}
          <img src={utyLogo} alt="" className="uty__logo" />{' '}
        </div>
        <div className="count__container">
          <IoNotifications
            className="notify__icon"
            onClick={() => navigate('/Offer')}
          />
          <MenuClient />
        </div>
      </div>
      <div className="request__form">
        <div className="upload__side">
          <h3>Salut {currentUser.username} trouvons votre produit</h3>
          <div className="product__image">
            <img src={picUrl} alt="" className="picture" />
          </div>
          <div className="image__upload">
            <input
              type="file"
              onChange={(e) => setSelectedImg(e.target.files[0])}
              className="file"
            />
            <label htmlFor="file">Ajouter une image</label>
          </div>
        </div>
        <div className="form__side">
          <div className="input__side">
            <span className="input__label">Que voulez-vous?</span>
            <textarea
              cols="30"
              rows="10"
              className="request__input"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          <div className="select__side">
            <span>Sélectionnez la catégorie du produit</span>
            <select
              name="category"
              id=""
              onChange={(e) => setCate(e.target.value)}
            >
              <option value=""></option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button onClick={(e) => handleSubmit(e)}>
            {load ? (
              <>
                <div
                  className="loader"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '-2vh',
                  }}
                >
                  <Rings height="80" width="80" color="white" />
                </div>
              </>
            ) : (
              <>Soumettre la requete</>
            )}
          </button>
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </Container>
  )
}

const Container = styled.div`
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  flex-direction: column;
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
      display: flex;
      align-items: center;
      .menu__icon {
        font-size: 250%;
        color: #020664;
      }
      .notify__icon {
        font-size: 250%;
        color: #020664;
        margin-right: 5vw;
      }
    }
  }
  .request__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    .upload__side {
      align-self: center;
      h3 {
        text-align: center;
        margin-top: 2.5vh;
      }
      .image__upload {
        align-self: center;
        position: relative;
        .file {
          opacity: 0;
          position: absolute;
          align-self: center;
        }
        label {
          background-color: orange;
          border-radius: 0.5rem;
          height: 7.5vh;
          color: white;
          font-weight: bold;
          font-size: 125%;
          width: 80vw;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease-out;
          align-self: center;
        }
      }
      .product__image {
        height: 20vh;
        width: 80vw;
        margin-bottom: 2vh;
        background-color: silver;
        display: flex;
        justify-content: center;
        align-self: center;
        padding-top: 1.5vh;
        .picture {
          height: 17.5vh;
        }
      }
    }

    .form__side {
      background-color: white;
      /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
      box-shadow: 0px 0px 5px silver;
      width: 100%;
      border-top-right-radius: 2rem;
      border-top-left-radius: 2rem;
      margin-top: 2.5vh;
      margin-left: -5vw;
      margin-right: -10vw;
      padding-left: 2.5vw;
      padding-right: 8vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .input__side {
        margin-top: 3.5vh;
        display: flex;
        flex-direction: column;
        .input__label {
          margin-bottom: 1vh;
        }
        .request__input {
          width: 80vw;
          height: 7.5vh;
          border-color: black;
          margin-right: -5vw;
        }
      }
      .select__side {
        display: flex;
        flex-direction: column;
        margin-left: 3.5vw;
        select {
          border-color: black;
          height: 7.5vh;
          width: 82.5vw;
        }
        span {
          margin-top: 2.5vh;
          margin-bottom: 1vh;
        }
      }
      button {
        margin-top: 5vh;
        height: 8vh;
        background-color: #020664;
        color: white;
        font-size: 125%;
        font-weight: bold;
        border: none;
        border-radius: 0.5rem;
        margin-bottom: 7vh;
        margin-left: 2.5vw;
        width: 82.5vw;
      }
    }
  }
`

export default Requetes
