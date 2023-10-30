import axios from 'axios'

const TriajeAPI = axios.create({
    baseURL: 'https://mediminder-e6ow.onrender.com/api/triaje/',
});

export const getAllTriaje = () => TriajeAPI.get('/');

export const createTriaje = (triaje) => TriajeAPI.post('/', triaje);