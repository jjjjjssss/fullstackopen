import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'

const App = () => {
	const [search, setSearch] = useState('')
	const [all, setAll] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:3001/countries')
			.then(response => {
				setAll(response.data)
			})
	}, [])

	console.log(all)

	const handleSearchChange = event => {
		setSearch(event.target.value)
	}

	const searchResults = all.filter(country => (
		country.name.common.toLowerCase().includes(search.toLowerCase())
	))

	return (
		<div>
			<form>
				Find countries <input value={search} onChange={handleSearchChange} />
			</form>
			<Content search={search} results={searchResults} handleSearchChange={handleSearchChange}/>
		</div>
	)
}


export default App