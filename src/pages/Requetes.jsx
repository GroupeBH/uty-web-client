import React, { useState } from 'react'
import styled from 'styled-components'
import { categories } from '../components/Categories'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import axios from 'axios'
import utyLogo from '../assets/logo-uty.png'
import { IoMenu } from 'react-icons/io5'

function Requetes() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [picUrl, setPicUrl] = useState(null)
  const [url, setUrl] = useState(null)
  const [description, setDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [cate, setCate] = useState(null)
  let navigate = useNavigate()

  // const [values, setValues] = useState({
  //     description: '',
  //     category: '',
  //     url: '',
  //   });

  useEffect(() => {
    if (selectedImg) {
      setPicUrl(URL.createObjectURL(selectedImg))
    }
  }, [selectedImg])

  const uploadImage = () => {
    const picData = new FormData()
    picData.append('file', selectedImg)
    picData.append('upload_preset', 'utyweb')
    picData.append('cloud_name', 'disyacex9')

    axios
      .post(' https://api.cloudinary.com/v1_1/disyacex9/image/upload', {
        method: 'post',
        body: picData,
      })
      .then((response) => response.json())
      .then((picData) => {
        setUrl(picData.url)
        console.log(picData)
      })
      .catch((error) => console.log(error))
  }

  // const handleChange = (event) => {
  //     setValues({ ...values, [event.target.name]: event.target.value });
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await JSON.parse(localStorage.getItem('currentUser'))
    console.log(data.username)
    console.log(data._id)
    uploadImage()
    try {
      console.log({
        description: description,
        image: url,
        sender: data._id,
        category: cate,
      })
      await axios.post('http://localhost:5100/api/preOrder/addpre', {
        description: description,
        image: url,
        sender: data._id,
        category: cate,
      })
      setDescription('')
      setCate(null)
    } catch (error) {
      console.log(error)
    }
    setIsOpen(true)
  }
  return (
    <Container>
      <div className="navbar">
        <div className="page__title" onClick={() => navigate('/')}>
          {' '}
          <img src={utyLogo} alt="" className="uty__logo" />{' '}
        </div>
        <div className="count__container">
          <IoMenu className="menu__icon" />
        </div>
      </div>
      <div className="request__form">
        <h3>Salut, trouvons votre produit</h3>
        <div className="product__image">
          <img src={picUrl} alt="" className="picture" />
        </div>
        <input
          type="file"
          onChange={(e) => setSelectedImg(e.target.files[0])}
          className="file"
        />
        <label htmlFor="file">Ajouter une image</label>
        <span>Que voulez-vous?</span>
        <textarea
          cols="30"
          rows="10"
          className="request__input"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <span>Sélectionnez la catégorie du produit</span>
        <select name="category" id="" onChange={(e) => setCate(e.target.value)}>
          <option value=""></option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button onClick={(e) => handleSubmit(e)}>Soumettre la requete</button>
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
      .menu__icon {
        font-size: 250%;
      }
    }
  }
  .request__form {
    display: flex;
    flex-direction: column;
    h3 {
      text-align: center;
      margin-top: 2.5vh;
    }
    .file {
      opacity: 0;
      align-self: center;
    }
    label {
      position: relative;
      background-color: blue;
      border-radius: 1rem;
      height: 6.5vh;
      color: white;
      font-weight: bold;
      width: 50vw;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease-out;
      align-self: center;
    }
    input:hover + label,
    input:focus + label {
      transform: scale(1.02);
    }
    .product__image {
      height: 15vh;
      width: 30vw;
      margin-bottom: 2vh;
      background-color: silver;
      display: flex;
      justify-content: center;
      align-self: center;
      .picture {
        height: 15vh;
      }
    }

    span {
      margin-top: 2.5vh;
      margin-bottom: 1vh;
    }
    .request__input {
      width: 90vw;
      height: 7.5vh;
      border-color: black;
    }
    select {
      border-color: black;
      height: 7.5vh;
    }
    button {
      margin-top: 5vh;
      height: 8vh;
      background-color: red;
      color: white;
      font-size: 150%;
      font-weight: bold;
      border: none;
      border-radius: 1rem;
      margin-bottom: 7vh;
    }
  }
`

export default Requetes
