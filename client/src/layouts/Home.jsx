import {styled} from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [parametro, setParametro] = useState('');
  const location = useLocation();

  useEffect(() => {
    const tuParametro = location.pathname;
    setParametro(tuParametro);
  }, [location]);

  return (
    <>
    <Home_styled>
      <Header />
      <div>
        {parametro === '/ppi_15/' ? (
          <div className="cont_home">
            <div className="cont_home_des">
                <h1 className="cont_home_des_h1">Bienvenidos a MediMinder</h1>
                <a href="/ppi_15/recursos" className="cont_home_des_a">Acceso a recursos médicos</a>
            </div>
          </div>
        ) : (
          <div>
            <Outlet />
          </div>
        )}
      </div>
    </Home_styled>
    </>
  );
}


// Se crea la constante de estilo la cuál contendrá todo el código CSS
const Home_styled = styled.div`

    .cont_home{
        padding: 10vh 0 0 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
    }
    .cont_home_des{
        border-radius: 15px;
        background-color: #ffffff;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
        width: 80%;
        text-align: center;
        padding: 5vh 0vh 5vh 0vh;
    }
    .cont_home_des_h1{
        margin:0vh 0vh 5vh 0vh;
        font-size: 5vw;
        color: #081A40;
    }
    .cont_home_des_a{
        background-color: #081A40;
        border-radius: 15px;
        padding: 1vh 2vw 1vh 2vh;
        font-size: 2vw;
        text-decoration: None;
        color: white;
    }
    .cont_home_des_a:hover{
        background-color: #0B4FD9;
    }
`