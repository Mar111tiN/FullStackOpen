import React, { useState, useEffect } from 'react'
import axios from 'axios'



const ShortCountry= ({ countryName, onClick }) => (
  <div>
    <p>{countryName}</p>
    <button onClick={onClick(countryName)}>show</button>
  </div>
)

const Country = ({ country, }) => (
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
    </div>
  )


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

  const showCountries = (countries) => (countries)
    ? (countries.length === 1)
      ? <Country country={countries[0]} />
      : (countries.length < 10)
        ? countries.map(country => <ShortCountry key={country.alpha3Code} countryName={country.name} onClick={showCountry}/>)
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