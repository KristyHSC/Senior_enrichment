const Sequelize = require('sequelize');
const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Students');
const faker = require('faker');
const campuses = require('./db_Campuses');
const fakeStudents = require('./db_Students');


Student.belongsTo(Campus)
Campus.hasMany(Student)

const students = fakeStudents()

const syncAndSeed = () => {
  return conn.sync({force: true})
    .then(() => students.forEach(student => Student.create(student)))
    .then(() => campuses.forEach(campus => Campus.create({
      name: campus.name, 
      address: faker.address.streetAddress(),
      description: campus.description,
      imageUrl: campus.imageUrl
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