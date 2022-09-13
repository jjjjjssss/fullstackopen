import { useState, useEffect } from 'react'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifColor, setNotifColor] = useState('green')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if(window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const replacingPerson = {...existingPerson, number: newNumber}
        personServices
          .update(replacingPerson, existingPerson.id)
          .then(setPersons(persons.map(p => 
            p.id !== existingPerson.id ? p : replacingPerson
          )))
          .catch(error => {
            alreadyDeletedError(existingPerson)
          })
        setNotifMessage(`${existingPerson.name}'s number has been changed`)
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
          setNotifMessage(`${newName} has been added`)
        })
    }
    setNewName('')
    setNewNumber('')
    setNotifColor('green')
    setTimeout(() => setNotifMessage(null), 4000)
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
        .catch(error => {
          alreadyDeletedError(person)
        })
    }
  }

  const alreadyDeletedError = (person) => {
    setNotifMessage(`Information of ${person.name} has already been removed from server`)
    setNotifColor('red')
    setPersons(persons.filter(p => p.id !== person.id))
    setTimeout(() => setNotifMessage(null), 4000)
  }

  const personsToShow = persons.filter((person) => (
    person.name.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} color={notifColor}/>
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

const Notification = ({message, color}) => {
  if (message === null) {
    return
  }
  let style = {
    alignSelf: 'stretch',
    borderRadius: 3,
    border: '1px solid #34a34d',
    padding: 6,
    marginBottom: 12
  }
  if (color === 'green') {
    style = {
      ...style,
      backgroundColor: '#adf7bd',
      color: '#156b28',
      border: '1px solid #34a34d'
    }
  } else if (color === 'red') {
    style = {
      ...style,
      backgroundColor: '#ffb6ab',
      color: '#a33626',
      border: '1px solid #cf5d4c'
    }
  }
  return <div style={style}>{message}</div>
}

export default App