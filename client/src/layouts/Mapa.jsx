// Importaciones de módulos necesarios
import Axios from 'axios';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import styled from "styled-components";

// Definición de constantes y estados iniciales
// Puedes definir origin aquí con un valor por defecto o dejarlo comentado y asignarlo más adelante
// const origin = { lat: 0, lng: 0 };

export default function Mapa() {
  // Carga de la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Estados para las respuestas de direcciones, distancia, duración y destino seleccionado
  // Respuesta de direcciones
  const [directionsResponse, setDirectionsResponse] = useState('');
  // Distancia de la ruta
  const [distance, setDistance] = useState('');
  // Duración de la ruta
  const [duration, setDuration] = useState('');
  // Destino seleccionado
  const [selectedDestination, setSelectedDestination] = useState(1);

  // Estado para almacenar los datos de destino obtenidos de Axios
  const [destinationData, setDestinationData] = useState([]);

  // Obtencion de ubicacion actual
  const [origin, setOrigin] = useState({ lat: 0, lng: 0 });



  // Solicitar datos de destino a la API de MediMinder en el backend
  useEffect(() => {
    // Petición POST a la API de MediMinder en el backend
    Axios.post('https://mediminder-e6ow.onrender.com/api/ips/filtro/')
      .then(response => {
        // Extracción de destinos válidos de la respuesta de Axios
        const ipsValidas = response.data.ips_validas;

        // Mapeo de destinos válidos al formato deseado
        const destinations = ipsValidas.map((ip, index) => ({
          lat: Number(ip.latitud),
          lng: Number(ip.longitud),
        }));

        // Almacenamiento de los destinos en el estado
        console.log(destinations);
        setDestinationData(destinations);
      })
      .catch(error => {
        // Manejo de errores
        console.error('Error al procesar los datos', error);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        const currentOrigin = { lat: position.coords.latitude, lng: position.coords.longitude };
        // Asigna el valor de origin usando setOrigin
        setOrigin(currentOrigin);
      }, (error) => {
        alert("Error: " + error.code + " " + error.message);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Función asincrónica para calcular la ruta desde el origen al destino seleccionado
  async function calculateRoute() {
    // Carga de la API de Google Maps
    const directionsService = new window.google.maps.DirectionsService();
    // Cálculo de la ruta
    // El destino se calcula a partir de los datos de ubicación de los centros de salud
    const results = await directionsService.route({
      // Parámetros de la ruta
      origin: origin,
      destination: destinationData[selectedDestination - 1],
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    // Actualización de estados con los resultados de la ruta
    setDirectionsResponse(results);
    // La distancia de la ruta se obtienen de los resultados de la ruta
    setDistance(results.routes[0].legs[0].distance.text);
    // La duración de la ruta se obtienen de los resultados de la ruta
    setDuration(results.routes[0].legs[0].duration.text);
  }

  // Se calcula la ruta cada vez que se selecciona un destino
  useEffect(() => {
    calculateRoute();
  }, [selectedDestination, destinationData]);

  // Comprobación de carga de Google Maps API
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Renderizado del mapa y botones de selección de destino
  return (
    <div style={{ height: '700px' }}>
      
      <GoogleMap center={origin} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
        <Marker position={origin} />
        <DirectionsRenderer directions={directionsResponse} />
      </GoogleMap>
      <div className='info'>
      <MapStyled>
      {/* Renderización de botones basados en los datos recibidos de Axios */}
      {destinationData.map((destination, index) => (
        <button key={index} onClick={() => setSelectedDestination(index + 1)} className=''>
          Ruta {index + 1}
        </button>
      ))}
      </MapStyled>
    </div>
    </div>
  );
}

const MapStyled = styled.div`
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  height: 100%;
}

button {
  margin-bottom: 5vh;
  font-weight: bold;
  background-color: #0B4FD9;
  color: white;
  padding: 0.5em 1vw;
  border: none;
  border-radius: 8px;
  font-size: 1.5vw;
  cursor: pointer;
  border: 1px solid #0B4FD9;
}

button:hover {
  background-color: white;
  color: #0B4FD9;
  border: 1px solid #0B4FD9;
}
`