import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './Components/CardWeather'
import Loader from './Components/Loader'

function App() {

  const APIKey = '3b8fee56361349bd2e1c4d9bccdaf661'
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${APIKey}`

  const [coords, setCoords] = useState()
    
  useEffect(() => {

    const succes = pos => {
      
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }

      setCoords(latlon)
      
    }
    
    navigator.geolocation.getCurrentPosition(succes)
  }, [])
  

  return (
    <div className="App">

      <CardWeather lon={coords?.lon} lat={coords?.lat}/>
        
    </div>
  )
}

export default App
