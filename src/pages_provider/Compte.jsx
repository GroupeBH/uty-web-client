import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import blank_profile from '../assets/blank-profile.png'
import { useStore } from '../utils/Store'
import { Rings } from 'react-loader-spinner'
import { IoArrowBackSharp } from 'react-icons/io5'

function Compte() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])
  const [categories, setCategories] = useState([])
  const data_user = JSON.parse(localStorage.getItem('currentUser'))
  const [photo, setPhoto] = useState()
  const [picUrl, setPicUrl] = useState()
  const [url, setUrl] = useState()
  const [username, setUsername] = useState(`${data_user.username}`)
  const [email, setEmail] = useState(`${data_user.email}`)
  const [phone, setPhone] = useState()
  const [provider, setProvider] = useState(false)
  const [select, setSelect] = useState(false)
  const [selectTwo, setSelectTwo] = useState(false)
  const updateUser = useStore((state) => state.updateUser)
  const user = useStore((state) => state.user)
  const updateProvider = useStore((state) => state.updateProvider)
  const updateDeliver = useStore((state) => state.updateDeliver)
  const updateLatitude = useStore((state) => state.updateLatitude)
  const updateLongitude = useStore((state) => state.updateLongitude)
  const latitude = useStore((state) => state.latitude)
  const longitude = useStore((state) => state.longitude)

  const cloudName = 'disyacex9'

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log('location not supproted')
    } else {
      console.log('locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLatitude(position.coords.latitude)
          updateLongitude(position.coords.longitude)
        },
        () => {
          console.log('enabled to retrieve location')
        }
      )
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        'https://uty-ti30.onrender.com/api/category/getCategories'
      )
      setCategories(response.data)
    }

    getCategories()
    getLocation()
  })

  const options = categories.map((categorie) => {
    return { value: categorie.name, label: categorie.name }
  })

  useEffect(() => {
    if (photo) {
      setPicUrl(URL.createObjectURL(photo))
    }
  }, [photo])

  const uploadImage = async () => {
    const picData = new FormData()
    picData.append('file', photo)
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

  const handleChecked = (e) => {
    if (e.target.checked) {
      if (e.target.name == 'fournisseur') {
        setProvider(!provider)
        setSelect(!select)
      }

      if (e.target.name == 'livreur') {
        setSelectTwo(!selectTwo)
      }
    } else setProvider(false)
  }

  const handleSelect = (data) => {
    setCategory(data)
  }

  const handleclick = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      updateProvider(select)
      updateDeliver(selectTwo)
      await uploadImage()
      const response = await axios.patch(
        `https://uty-ti30.onrender.com/api/auth/updateCount/${data_user._id}`,
        {
          username,
          email,
          phone,
          url,
          select,
          selectTwo,
          category,
          latitude,
          longitude,
        }
      )
      updateUser(response.data)
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      console.log(user)
      setLoading(false)
      navigate('/Profile')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <div className="form__update">
        <IoArrowBackSharp onClick={() => navigate('/')} />
        <h2>Manage your account</h2>
        <div className="image__container">
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="file"
          />
          {photo ? (
            <img src={picUrl} alt="profile picture" height="100" />
          ) : (
            <img src={blank_profile} alt="" />
          )}
        </div>
        <div className="fields">
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="fields">
          <label htmlFor="">Phone</label>
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="fields">
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="checkbox__container">
          <input
            type="radio"
            name="fournisseur"
            checked={select}
            value={select}
            onClick={(e) => handleChecked(e)}
          />
          <p>Dévenir marchand</p>
        </div>
        {provider && (
          <div className="fields__category">
            <label htmlFor="">Catégorie</label>
            <Select
              options={options}
              value={category}
              onChange={handleSelect}
              className="select"
              isMulti
            />
          </div>
        )}
        <div className="checkbox__container1">
          <input
            type="radio"
            name="livreur"
            checked={selectTwo}
            value={selectTwo}
            onClick={(e) => handleChecked(e)}
          />
          <p>Dévenir livreur</p>
        </div>
        <button onClick={(e) => handleclick(e)}>
          {loading ? (
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
            <>Update</>
          )}
        </button>
        <button className="cancel__button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .form__update {
    display: flex;
    flex-direction: column;
    padding-left: 5vw;
    padding-right: 5vw;
    padding-top: 5vh;
    gap: 2vh;
    svg {
      font-size: 250%;
    }
    .image__container {
      display: flex;
      justify-content: center;
      position: relative;
      .file {
        opacity: 0;
        position: absolute;
        align-self: center;
      }
      img {
        height: 17.5vh;
        cursor: pointer;
      }
    }
    h2 {
      text-align: center;
      margin-bottom: -1vh;
      margin-top: -1vh;
    }
    .checkbox__container {
      display: flex;
      border-color: 1px solid black;
      align-items: center;
      p {
        margin-left: 1.5vw;
        font-size: 135%;
      }
      input[type='radio'] {
        -webkit-appearance: none;
        appearance: none;
        color: slategray;
        font: inherit;
        border: 0.02em solid slategray;
        width: 5.5vw;
        height: 3vh;
        cursor: pointer;
        border-radius: 50%;
        display: grid;
        place-content: center;
      }
      input[type='radio']::before {
        content: '';
        width: 5.5vw;
        height: 3vh;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
      }
      input[type='radio']:checked::before {
        transform: scale(1);
        background-color: #020664;
      }
    }
    .checkbox__container1 {
      display: flex;
      border-color: 1px solid black;
      align-items: center;
      margin-top: -3.5vh;
      p {
        margin-left: 1.5vw;
        font-size: 135%;
      }
      input[type='radio'] {
        -webkit-appearance: none;
        appearance: none;
        color: slategray;
        font: inherit;
        border: 0.02em solid slategray;
        width: 5.5vw;
        height: 3vh;
        cursor: pointer;
        border-radius: 50%;
        display: grid;
        place-content: center;
      }
      input[type='radio']::before {
        content: '';
        width: 5.5vw;
        height: 3vh;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
      }
      input[type='radio']:checked::before {
        transform: scale(1);
        background-color: orange;
      }
    }
    .fields {
      display: flex;
      flex-direction: column;
      label {
        margin-top: 2vh;
        margin-bottom: 1vh;
      }
      input {
        height: 5vh;
      }
    }
    .fields__category {
      margin-bottom: 2vh;
      margin-top: -1vh;
      label {
        margin-bottom: 5vh;
      }
      .select {
        margin-top: 1vh;
      }
    }
    button {
      height: 7.5vh;
      font-size: 150%;
      background-color: #020664;
      font-weight: bold;
      color: white;
      border: none;
      border-radius: 0.5rem;
      margin-top: 2.5vh;
    }
    .cancel__button {
      background-color: orange;
      margin-top: -0.1vh;
      margin-bottom: 5vh;
    }
  }
`

export default Compte
