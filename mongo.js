const mongoose = require('mongoose')
const password = process.argv[2]
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const personToAdd = process.argv[3]
const phoneNumberToAdd = process.argv[4]

const url = `mongodb+srv://Dingo:${password}@cluster0.odche.mongodb.net/Cluster0?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })




const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<4) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

const person = new Person({
  name: personToAdd,
  number: phoneNumberToAdd
})

person.save().then(response => {
  console.log('added ' + response)
  mongoose.connection.close()
})