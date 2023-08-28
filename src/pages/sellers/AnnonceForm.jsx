import React, { useState } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Rings } from 'react-loader-spinner'
import { IoArrowBackSharp, IoAddSharp } from 'react-icons/io5'
import _ from 'lodash'

function AnnonceForm() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null)
  const [minprice, setMinPrice] = useState(null)
  const [maxprice, setMaxPrice] = useState(null)
  const [picUrl, setPicUrl] = useState(null)
  const [url, setUrl] = useState(null)
  const [description, setDescription] = useState('')
  const [load, setLoad] = useState(false)

  const getCategories = async () => {
    const response = await axios.get(
      'https://uty-ti30.onrender.com/api/category/getCategories'
    )
    setCategories(response.data)
  }

  useEffect(() => {
    if (selectedImg) {
      setPicUrl(URL.createObjectURL(selectedImg))
      const reader = new FileReader()
      reader.readAsDataURL(selectedImg)
      reader.onloadend = () => {
        setUrl(reader.result)
      }
    }
  }, [selectedImg])

  useEffect(() => {
    if (_.size(categories) === 0) {
      getCategories()
    }
  })

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value)
    console.log(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    const data = await JSON.parse(localStorage.getItem('currentProvider'))
    console.log(selectedCategory)
    try {
      await axios.post('http://localhost:5200/api/annonce/addAnnonce', {
        description: description,
        image: url,
        minprice: minprice,
        maxprice: maxprice,
        provider: data._id,
        category: selectedCategory,
      })
      setLoad(false)
      navigate('/Dashboard')
    } catch (error) {
      console.log(error)
      setLoad(false)
    }
  }
  return (
    <Container>
      <div className="request__form">
        <IoArrowBackSharp
          className="return"
          onClick={() => navigate('/Dashboard')}
        />
        <h3>Salut ajoutez une annonce de produit</h3>
        <hr />
        <div className="form__side">
          <div className="input__side">
            <div className="description">
              <label className="input__label">Decrivez le produit : </label>
              <textarea
                className="request__input"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="image__side">
              {!selectedImg ? (
                <div className="image__upload">
                  <input
                    type="file"
                    onChange={(e) => setSelectedImg(e.target.files[0])}
                    className="file"
                  />
                  <label htmlFor="file">
                    <IoAddSharp className="add__product" /> Ajouter une image
                  </label>
                </div>
              ) : (
                <div className="product_image">
                  <img src={picUrl} alt="product image" />
                </div>
              )}
            </div>
            <div className="price__inputs">
              <div className="price">
                <label htmlFor="">Prix minimum</label>
                <div className="input__price">
                  <div className="amount">
                    <input
                      type="number"
                      placeholder="5000"
                      value={minprice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="devise">
                    <span>CDF</span>
                  </div>
                </div>
              </div>

              <div className="price">
                <label htmlFor="">Prix maximum</label>
                <div className="input__price">
                  <div className="amount">
                    <input
                      type="number"
                      placeholder="10000"
                      value={maxprice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                  <div className="devise">
                    <span>CDF</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="category">
              <label htmlFor="">Catégorie du produit ou service : </label>
              <select onChange={handleSelectChange}>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
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
              <>Publier annonce</>
            )}
          </button>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .request__form {
    padding-top: 1vh;
    display: flex;
    flex-direction: column;
    .return {
      font-size: 250%;
      font-weight: bold;
      margin-bottom: 2.5vh;
    }
    h3 {
      font-weight: semi-bold;
      text-align: center;
    }
    .form__side {
      background-color: white;
      .input__side {
        padding: 1vh 2vw;
        gap: 2.5vh 1vw;
        .description {
          display: flex;
          flex-direction: column;
          .input__label {
            margin-bottom: 1vh;
          }
          .request__input {
            width: 90vw;
            height: 18.5vh;
            border-radius: 0.5rem;
            border: none;
            box-shadow: 0px 0px 2.5px #5b5e5e;
            box-sizing: border-box;
            margin-right: -5vw;
            resize: none;
            padding: 1vh 1vw;
          }
        }
        .price__inputs {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .price {
            display: flex;
            flex-direction: column;
            gap: 2vh 1vw;
            .input__price {
              display: flex;
              border-radius: 0.15rem;
              box-shadow: 0px 0px 2.5px #5b5e5e;
              height: 3vh;
              width: 50%;
              padding: 1vh 1vw;
              font-size: 120%;
              .amount {
                width: 75%;
                input {
                  border: none;
                }
              }
              .devise {
                width: 25%;
                height: 6.5vh;
              }
            }
          }
        }
        .image__side {
          align-self: flex-start;
          .product_image {
            img {
              height: 10vh;
              width: 20vw;
            }
          }
          .image__upload {
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
              font-size: 105%;
              padding-left: 1vw;
              padding-right: 1vw;
              width: 50vw;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: transform 0.2s ease-out;
              .add__product {
                font-size: 250%;
              }
            }
          }
        }
      }

      button {
        margin-top: 5vh;
        height: 10vh;
        background-color: #020664;
        color: white;
        font-size: 125%;
        font-weight: bold;
        border: none;
        border-radius: 0.5rem;
        margin-bottom: 7vh;
        width: 92.5vw;
      }
    }
  }
`

export default AnnonceForm
