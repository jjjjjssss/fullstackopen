const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, your are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10}/>
      <Hello name={name} age={age}/>
    </>
  )
}

export default App;
