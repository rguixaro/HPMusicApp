import axios from 'axios'
const { DEV } = import.meta.env

const TIMEOUT = 5000
const HOST = DEV ? 'http://localhost:3000' : 'https://api.music.rguixaro.dev'

/**
 * Axios instance used to connect to the API
 */
const instance = axios.create({ baseURL: `${HOST}/api/v1/`, timeout: TIMEOUT })

export default instance
