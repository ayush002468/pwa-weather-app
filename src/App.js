import { async } from 'q';
import React , {useEffect, useState} from 'react'
import { fetchWeather } from './api/fetchWeather';
import './App.css'

const App = () => {
    const [query , setQuery] = useState('');
    // storing data in weather so that we can structure our data according to response
    const [weather , setWeather] = useState({})

    const search = async (e) => {
        if(e.key === 'Enter'){
            const data = await fetchWeather(query)
            // setWeather to data which is coming from response
            setWeather(data);
            // reset after we click enter
            setQuery('')
        }
    }

  return (
    <div className='main-container'>
        <h1>Search any city</h1>
        <input
        type='text' 
        className='search'
        placeholder='Search...'
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        onKeyPress={search}
        />
        {weather.main && (
            <div className='city'>
                <h2 className='city-name'>
                    <span>{weather.name}</span>
                    {/* sup tags sets the upper half of text like 10am and am as upper text */}
                    <sup>{weather.sys.country}</sup>
                </h2>
                <div className='city-temp'>
                    {Math.round(weather.main.temp)}
                    <sup>&deg;c</sup>
                </div>
                <div className='info'>
                    <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0]}/>
                    <p>{weather.weather[0].description}</p>
                </div>
            </div>
        )}

    </div>
  )
}

export default App;

