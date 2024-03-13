import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});
// Run front end with command: REACT_NATIVE_PACKAGER_HOSTNAME="192.168.100.83" npx expo start

export default api;