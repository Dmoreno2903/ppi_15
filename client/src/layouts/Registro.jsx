import {styled} from "styled-components";
import img_registro from "../images/img_registro.jpg"
import {useForm} from 'react-hook-form'
import { useState } from "react";
import { createUser } from "../api/users_api";
import {useNavigate} from 'react-router-dom'

export default function Registro(){

    /* GET de todas las eps desde la base de datos*/
    const list_eps = ['SURA', 'Medimás', 'Colmédica'];

    /* Se muestran las opciones en el select EPS*/
    const [selectedEPS, setSelectedEPS] = useState('');
    const handleSelectChangeEPS = (event) => {
        setSelectedEPS(event.target.value);
    };

    /* Se listan los géneros y se muestran en el select*/
    const list_generos = ['Masculino', 'Femenino', '39 tipos de gays'];

    const [selectedGenero, setSelectedGenero] = useState('');
    const handleSelectChangeGenero = (event) => {
        setSelectedGenero(event.target.value);
    };

    /* Se toma la información del form y se guarda en la base de datos */
    const {register, handleSubmit} = useForm();

    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data) => {
        await createUser(data);
        navigate("/ppi_15/");
    });

    return(
        <>
        <Registro_styled>
            <div className="contenedor">
                <div className="image">
                    <img src={img_registro}/>
                </div>
                <div className="formulario">
                    <form onSubmit={onSubmit} autoComplete="off">
                        <h2>Formulario de registro</h2>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            autoComplete="off" 
                            {...register('name', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Documento de identidad"
                            autoComplete="off"
                            {...register('id', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Número de contacto"
                            autoComplete="off"
                            {...register('contacto', { required: true })}
                        />

                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            autoComplete="off"
                            {...register('email', { required: true })}
                        />

                        <select {...register('eps')} value={selectedEPS} onChange={handleSelectChangeEPS}>
                            <option value="">Seleccione una EPS</option>
                            {list_eps.map((eps, index) => (
                                <option key={index} value={eps}>
                                    {eps}
                                </option>
                            ))}
                        </select>

                        <select {...register('genero')} value={selectedGenero} onChange={handleSelectChangeGenero}>
                            <option value=''>Seleccione su género</option>
                            {list_generos.map((genero, index) => (
                                <option key={index} value={genero}>
                                    {genero}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Usuario"
                            autoComplete="off"
                            {...register('usuario', { required: true })}
                        />

                        <input
                            type="password"
                            placeholder="Contraseña"
                            autoComplete="off"
                            {...register('password', { required: true })}
                        />
                        
                        <h3>Contacto de emergencia</h3>
                        <input 
                            type="text"
                            placeholder="Nombre completo"
                            autoComplete="off"
                            {...register('name_emergencia', { required: true })}
                        />

                        <input
                            type="text"
                            placeholder="Número de contacto"
                            autoComplete="off"
                            {...register('contacto_emergencia', { required: true })}
                        />
                        
                        <div className="politica">
                            <input type="checkbox"></input>
                            <label>Acepto la politica de tratamiento de datos personales</label>
                        </div>

                        <button>Registrarse</button>
                    </form>
                </div>
            </div>
        </Registro_styled>
        </>
    );
}

const Registro_styled = styled.div`
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;

    .contenedor{
        border-radius: 15px;
        display: flex;
        width: 70%;
        height: 100%;
        background-color: #ffffff;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
    }

    .image{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
    }

    img{
        width: 95%;
        height: auto;
    }

    .formulario{
        width: 50%;
        text-align: center;
    }

    form{
        display: grid;
        width: 80%;
    }

    h2{
        margin-top: 5vh;
        color: #0B4FD9;
    }
    h3{
        margin-bottom: 2vh;
        margin-top: 0vh;
        color: #0B4FD9;
    }

    input{
        text-align: center;
        font-size: 1rem;
        background-color: rgba(242, 242, 242, 0.7);
        color: #0B4FD9;
        border: 1px solid #0B4FD9;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 2vh;
    }
    input:focus{
        outline: none;
    }
    input::placeholder {
        color: #0B4FD9;
    }

    select{
        text-align: center;
        font-size: 1rem;
        background-color: rgba(242, 242, 242, 0.7);
        color: #0B4FD9;
        border: 1px solid #0B4FD9;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 2vh;
    }
    select:focus{
        outline:none;
    }

    label{
        color: #0B4FD9;
        font-size: 1.1rem;
    }

    .politica{
        margin: 2vh;
    }

    button{
        margin-bottom: 5vh;
        font-weight: bold;
        background-color: #0B4FD9;
        color: white;
        padding: 10px 40px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        border: 1px solid #0B4FD9;
    }
    button:hover{
        background-color: white;
        color: #0B4FD9;
        border: 1px solid #0B4FD9;
    }

`