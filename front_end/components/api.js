import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});
// Run front end with command: REACT_NATIVE_PACKAGER_HOSTNAME="personalLocalIP_Address" npx expo start
// REACT_NATIVE_PACKAGER_HOSTNAME="169.234.46.106" npx expo start
// REACT_NATIVE_PACKAGER_HOSTNAME="192.168.0.154" npx expo start
export default api;