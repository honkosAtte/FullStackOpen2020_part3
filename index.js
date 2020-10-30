const { DESTRUCTION } = require('dns')
const { response } = require('express')
const express = require('express')
const app = express()

let persons = [

  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const idNumber = Number(req.params.id)
  const result = persons.find(person => person.id === idNumber)

  if (result) {
    res.json(result)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const idNumber = Number(req.params.id)
  const result = persons.find(person => person.id === idNumber)
  if (result) {
    persons = persons.filter(person => person.id !== idNumber)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})


app.get('/info', (req, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
  res.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

