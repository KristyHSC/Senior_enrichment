const Sequelize = require('sequelize');
const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Students');
const faker = require('faker')

Student.belongsTo(Campus)
Campus.hasMany(Student)

const fakeStudents = () => {
  let count = 0;
  const students = []
  while (count < 10) {
    students.push(
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        gpa: (Math.random()*4).toFixed(2)
        // imageUrl: faker.image.people()
      }
    )
    count++
  }
  return students;
}

const students = fakeStudents()

const campuses = ["Luna", "Terra", "Mars", "Titan"]

const syncAndSeed = () => {
  return conn.sync({force: true})
    .then(() => students.forEach(student => Student.create(student)))
    .then(() => campuses.forEach(campus => Campus.create({
      name: campus, 
      address: faker.address.streetAddress(),
      // imageUrl: faker.image.business()
    })))
    .then(() => console.log('seed success'))
}

module.exports = {
  syncAndSeed,
  Campus,
  Student,
  conn
}