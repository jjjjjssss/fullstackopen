const ResultsList = ({results, handleSearchChange}) => {
	return (
		<ul>
			{results.map((result, index) => (
				<li key={index}>
					{result.name.common}
					<button value={result.name.common} onClick={handleSearchChange}>Show</button>
				</li>
			))}
		</ul>
	)
}

export default ResultsList