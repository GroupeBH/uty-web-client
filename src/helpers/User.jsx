import axios from 'axios'

export const checkUserTokenFirebase = async (user) => {
  const response = await axios.get(
    `http://localhost:5200/api/auth/getUser/${user}`
  )

  return response.data.tokenFirebase
}
