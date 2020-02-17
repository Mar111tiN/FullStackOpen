import React, { useState, useEffect } from 'react'
import axios from 'axios'
const WEATHERKEY = '0de042e62bf199731d0b5c60befc62b9'
const weatherURL = 'http://api.weatherstack.com/current'




const ShortCountry= ({ country }) => {
    // STATE
    const [ showAll, setShowAll ] = useState(false)
    
      return (showAll)
        ? <div>
            <Country country={country} />
            <button onClick={() => setShowAll(!showAll)}>hide Details</button>
          </div>
        :  (  
          <div>
            <p>{country.name}</p>
            <button onClick={() => setShowAll(!showAll)}>show</button>
          </div>
        )
  }

const Country = ({ country, }) => {
  const [weather, setWeather ] = useState({
    temp: 'noData',
    wind: 'noData',
    windDir: 'noData',
    humidity: 'noData',
    icons: ['']
  })

  const queryURL = `${weatherURL}?access_key=${WEATHERKEY}&query=${country.capital}`

  useEffect(() => {axios.get(queryURL)
    .then(res => res.data.current)
    .then( weather => {
      let newWeather = {
        temp:weather.temperature,
        wind: weather.wind_speed,
        windDir: weather.wind_dir,
        humidity: weather.humidity,
        icons: weather.weather_icons 
      }
      setWeather(newWeather)
    })
  }, [queryURL])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language => <li key={language.iso639_1}>{language.name}</li>))}
      </ul>
      <img alt={`Flag of ${country.name}`} src={country.flag} width="200" height="200"/>
      <h3>Weather in {country.capital}</h3>
      <p><strong>temperature {weather.temp} Celsius</strong></p>
      {weather.icons.map(icon => <img key={icon} alt="weather in {country.capital}" src={icon} width="50" height="50" />)}
      <p><strong>wind {weather.wind} kph from {weather.windDir}</strong></p>
    </div>
  )
}

  const Filter = ({value, onChange}) => (
    <div>Filter: <input value={value} onChange={onChange} />
      </div>
)



const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterPhrase, setFilterPhrase ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log(`Found ${res.data.length} countries`)
        setCountries(res.data)
      })
  }, [])


  // handlers
  const handleFilter = (e) => setFilterPhrase(e.target.value.toLowerCase())

  const showCountry = (countryName) => () => setFilterPhrase(countryName)

  const filteredCountries = (filterPhrase)
    ? countries.filter((country) => country.name.toLowerCase().includes(filterPhrase))
    : countries

  // Display helpers
  const showCountries = (countries) => (countries)
    ? (countries.length === 1)
      ? <Country country={countries[0]} />
      : (countries.length < 10)
        ? countries.map(country => <ShortCountry key={country.alpha3Code} country={country} onClick={showCountry}/>)
        : <p>Too many countries</p>
    : <p>No countries found</p>


  return (
    <div>
      <Filter value={filterPhrase} onChange={handleFilter} />
      <p>Found {countries.length} countries</p>
      {showCountries(filteredCountries)}
    </div>
  )
}

export default App