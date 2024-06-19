import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://0.0.0.0:8080';

const eventitosApi = axios.create({
    baseURL
})

// eventitosApi.interceptors.request.use(async (config) => {

//     const token = await AsyncStorage.getItem('token')

//     if (token) {
//         config.headers['Authorization'] = token
//     }

//     return config;

// })

export default eventitosApi;