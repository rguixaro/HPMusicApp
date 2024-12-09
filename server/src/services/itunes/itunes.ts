import axios from 'axios';

const TIMEOUT = 5000;
const AppleMusicAPI = 'https://itunes.apple.com/';

/**
 * Axios instance used to connect to the Apple Music API
 */
const instance = axios.create({ baseURL: AppleMusicAPI, timeout: TIMEOUT });

export default instance;
