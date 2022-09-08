import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { 
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter((person) => (
    person.name.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={search} onChange={handleSearchChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
        submit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}


const Search = (props) => {
  return (
    <form>
      Search name: <input value={props.value} onChange={props.onChange}/>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        Name: <input value={props.nameValue} onChange={props.nameOnChange}/><br></br>
        Number: <input value={props.numberValue} onChange={props.numberOnChange}/>
      </div>
      <div>
        <button type="submit" onClick={props.submit}>add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <ul style={{listStyleType:"none",paddingLeft:0}}>
      {props.persons.map((person) => 
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

export default App