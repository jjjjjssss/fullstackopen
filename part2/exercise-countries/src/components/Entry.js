import { useState, useEffect } from 'react'
import axios from 'axios'

const Entry = ({entry}) => {
	const [weather, setWeather] = useState(null)
	const api_key = process.env.REACT_APP_API_KEY
	useEffect(() => {
		axios
			.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${entry.capital}&aqi=no`)
			.then(response => {
				setWeather(response.data)
			})
	}, [])

	let weatherDisplay = ''
	if (weather == null) {
		weatherDisplay = 'Loading weather info...'
	} else {
		weatherDisplay = <>
			<img src={weather.current.condition.icon} />
			<div><b>Temperature: </b>{weather.current.temp_c} °C</div>
			<div><b>Wind Speed: </b>{weather.current.gust_kph} kmph</div>
		</>
	}

	return (
		<div>
			<h2>{entry.name.common}</h2>

			<div>
				<div><b>Capital: </b>{entry.capital}</div>
				<div><b>Area: </b>{entry.area}</div>
			</div>

			<div>
				<h3>Languages</h3>
				<ul>
					{Object.values(entry.languages).map((language, index) => (
						<li key={index}>{language}</li>
					))}
				</ul>
			</div>

			<div>
				<h3>Flag</h3>
				<img height='200' src={entry.flags.png} />
			</div>

			<div>
				<h3>Weather in {entry.capital}</h3>
				{weatherDisplay}
			</div>

		</div>
	)
}

export default Entry