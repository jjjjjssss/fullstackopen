import { useState, useEffect } from 'react'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if(window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const replacingPerson = {...existingPerson, number: newNumber}
        personServices
          .update(replacingPerson, existingPerson.id)
          .then(setPersons(persons.map(p => 
            p.id !== existingPerson.id ? p : replacingPerson
          )))
      }
    } else {
      const newPerson = { 
        name: newName,
        number: newNumber,
        // id: persons.length + 1
      }
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personServices
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
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
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
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
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.handleDelete(person)}>Delete</button>
        </li>
      )}
    </ul>
  )
}

export default App