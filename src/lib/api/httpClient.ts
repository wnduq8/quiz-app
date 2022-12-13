import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient
