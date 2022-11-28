const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

morgan.token('content', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan('tiny'));


app.get('/', (req, res) => {
  res.send('<h1>Persons Backend</h1>')
})
var logger = morgan(function(tokens, req, res) {
  var message = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]
  if (tokens.method(req, res) === 'POST') {
    message.push(tokens.content(req, res))
  }
  return message.join(' ');
})
app.use(logger)

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const currPersons = persons.map(p => p.name)

  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing'
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number is missing'
    })
  } else if (currPersons.includes(body.name)) {
    return res.status(400).json({
      error: 'name already exists'
    })
  }

  const id = Math.floor(Math.random() * 100000)
  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})