import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      setCountries(res.data)
    })
  }, [])

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  return (
    <>
      <form>
        Find countries <input value={search} onChange={handleSearchChange} />
      </form>
      <Content countries={countries} search={search} handleSearchChange={handleSearchChange}/>
    </>
  )
}

const Content = ({countries, search, handleSearchChange}) => {
  const results = countries.filter(c => (
    c.name.common.toLowerCase().includes(search.toLowerCase())
  ))

  if (search === '') {
    return <p>Search something</p>
  } else if (results.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (results.length === 1) {
    return <Info country={results[0]}/>
  } else {
    return <SearchResults results={results} handleSearchChange={handleSearchChange}/>
  }
}

const SearchResults = ({results, handleSearchChange}) => {
  return <ul>
    {results.map((c, index) => (
      <li key={index}>
        {c.name.common} <button value={c.name.common} onClick={handleSearchChange}>Show</button>
      </li>
    ))}
  </ul>
}

const Info = ({country}) => {
	const [weather, setWeather] = useState()

  useEffect(() => {
    axios
    .get(`https://api.open-meteo.com/v1/forecast?latitude=${country.capitalInfo.latlng[0]}&longitude=${country.capitalInfo.latlng[1]}&current_weather=true`)
    .then(response => {
      setWeather(response.data)
    })
  }, [])

  console.log(weather)

  let weatherDisplay = null
  if (weather == null) {
    weatherDisplay = <div>Loading weather info...</div>
    console.log('here1')
  } else {
    weatherDisplay = <div>
      <div>temperature: {weather.current_weather.temperature} celsius</div>
      <div>wind: {weather.current_weather.windspeed} km/s</div>
    </div>
    console.log('here2')

  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>

      <h3>languages: </h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>

      <h3>flag:</h3>
      <img src={country.flags.png} alt='Country Flag'></img>

      <h3>weather in {country.capital}:</h3>
      {weatherDisplay}

    </div>

  )
}

export default App;
