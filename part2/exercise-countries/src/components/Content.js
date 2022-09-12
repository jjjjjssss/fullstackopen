import Entry from './Entry'
import ResultsList from './ResultsList'

const Content = ({search, results, handleSearchChange}) => {
	let display = []

	if (search === '') {
		display = 'Type something in the search box'
	} else if (results.length > 10) {
		display = 'Too many matches, specify another filter'
	} else if (results.length == 1) {
		display = <Entry entry={results[0]}/>
	} else {
		display.push(<ResultsList results={results} handleSearchChange={handleSearchChange} key='0' />)
	}

	return <div>{display}</div>
}

export default Content