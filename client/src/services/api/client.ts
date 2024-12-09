import axios from 'axios'

const TIMEOUT = 5000
const API_URL = 'http://localhost:3000/api/v1/'

/**
 * Axios instance used to connect to the API
 */
const instance = axios.create({ baseURL: API_URL, timeout: TIMEOUT })

export default instance
