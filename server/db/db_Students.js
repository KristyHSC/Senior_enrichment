const faker = require('faker');

const studentImgArr = [
  'https://media1.tenor.com/images/c8c37be4b0cf7a4e1253a24f9029b723/tenor.gif?itemid=8217376',
  'https://media1.tenor.com/images/11fbda3fb3a9d019f3358026f29754be/tenor.gif?itemid=8217346',
  'https://media1.tenor.com/images/b9275833962c801339d3b69266827b42/tenor.gif?itemid=8217295',
  'https://media1.tenor.com/images/fd0b64bb7d268d0846058a1c39e2999d/tenor.gif?itemid=8921187',
  'http://pa1.narvii.com/6331/d110da4c5c1e7efc96c611073d0c89ab69fa7bd4_hq.gif',
  'https://media1.tenor.com/images/cc15c194cb795cda330c5545c6d303d5/tenor.gif?itemid=12352744',
  'https://media1.tenor.com/images/9b69c8f0aa598ab0435abb59e6b16e6c/tenor.gif?itemid=8217359',
]

const fakeStudents = () => {
  let count = 0;
  const students = []
  while (count < 10) {
    students.push(
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        gpa: (Math.random()*4).toFixed(2),
        imageUrl: studentImgArr[Math.floor(Math.random() * studentImgArr.length)]
      }
    )
    count++
  }
  return students;
}

module.exports = fakeStudents