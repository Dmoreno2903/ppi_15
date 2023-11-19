import axios from 'axios'

const PerfilAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/perfil/',
});

export const getAllPerfil = () => PerfilAPI.get('/');

export const createPerfil = (triaje) => PerfilAPI.post('/', triaje);

export const getPerfilUsuario = (cedula) => PerfilAPI.get(`/${cedula}/`);

export const updatePerfil = (user, data) => PerfilAPI.put(`/${user}/`, data);