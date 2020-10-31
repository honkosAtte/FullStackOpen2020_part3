const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const Person = require('./models/person')
morgan.token('type', function (req, res) { return JSON.stringify(req.body)  })

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

const PORT = process.env.PORT

let persons = [
  // {
  //   name: "Arto Hellas",
  //   number: "040-123456",
  //   id: 1
  // },
  // {
  //   name: "Ada Lovelace",
  //   number: "39-44-5323523",
  //   id: 2
  // },
  // {
  //   name: "Dan Abramov",
  //   number: "12-43-234345",
  //   id: 3
  // },
  // {
  //   name: "Mary Poppendieck",
  //   number: "39-23-6423122",
  //   id: 4
  // }
]

app.get('/', (req, res) => {
  return res.send('<h1>Hello</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
  res.json(persons)
  })

})

app.get('/api/persons/:id', (request, response) => {
  const idNumber = Number(request.params.id)
  Person.findById(idNumber).then(person => {
    response.json(person)
    // ei vielä toimi, tulee casting virhe _id
  })
})

// app.get('/api/persons/:id', (req, res) => {
//   const idNumber = Number(req.params.id)
//   const result = persons.find(person => person.id === idNumber)

//   if (result) {
//     return res.json(result)
//   } else {
//     return res.status(404).end()
//   }
// })

// app.post('/api/persons', (req, res) => {

//   const nameInthePhoneBook = persons.find(person => person.name === req.body.name)
//   if (req.body.name && req.body.number && !nameInthePhoneBook) {
//     const newMaxId = Math.floor(Math.random() * 10000) + 5;
    // const person = {
    //   name: req.body.name,
    //   number: req.body.number,
    //   id: newMaxId
    // }

//     persons = persons.concat(person)

//     return res.json(person)
//   } else {
//     const errorMessage = !req.body.name || !req.body.number ?
//       "name or number missing" : "number is already in the phonebook"
//     return res.status(400).json({ error: errorMessage })
//   }
// })

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    console.log('Saved person', savedPerson)
    res.json(savedPerson)
  })
})


app.delete('/api/persons/:id', (req, res) => {
  const idNumber = Number(req.params.id)
  const result = persons.find(person => person.id === idNumber)
  if (result) {
    persons = persons.filter(person => person.id !== idNumber)
    return res.status(204).end()
  } else {
    return res.status(404).end()
  }
})


app.get('/info', (req, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
  return res.send(info)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
