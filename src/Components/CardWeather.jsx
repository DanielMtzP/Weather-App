import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'


const CardWeather = ({lat,lon,}) => {
    
    
    
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if(lat){
            const APIKey = '3b8fee56361349bd2e1c4d9bccdaf661'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
            axios.get(URL)
                .then(res => {
                  setWeather(res.data)
                  const temp = {
                    celcius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                    farenheit:`${Math.round((res.data.main.temp - 273.15) * 9/5 + 32 )} °F`,
                  }
                  setTemperature(temp)
                  setIsLoading(false)
                })
                  
                  
                .catch(err => console.log(err))
        }

    }, [lat, lon])

    const handleClick = () => setIsCelsius(!isCelsius)

    if(isLoading){
      return <Loader />
    }else{
    return (
      <div>
        <h1>Weather App</h1>
        <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        <div>
          <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt=""></img>
          <div>
            <h3>"{weather?.weather[0].description}"</h3>
            <ul className='ul'>
              <li><span>Wind Speed</span> {`${weather?.wind.speed}`} m/s</li>
              <li><span>Clouds</span> {`${weather?.clouds.all}`}%</li>
              <li><span>Pressure</span> {`${weather?.main.pressure}`} hPa</li>
            </ul>
          </div>
        </div>
        <h2>{isCelsius ? temperature?.celcius : temperature?.farenheit}</h2>
        <button className='button' onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>    
      </div>
    )
  }
}

export default CardWeather