const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Student, Campus } = require('./server/db/index')

const port = process.env.PORT || 3000;

syncAndSeed()

app.use(express.json())

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
})

app.get('/api/campuses', (req, res, next) => {
  Campus.findAll()
    .then(campus => res.send(campus))
})

app.get('/api/campuses/:id', (req, res, next) => {
  Campus.findOne({where: {id: req.params.id}})
    .then(campus => res.send(campus))
    .catch(next)
})

app.get('/api/students/:id', (req, res, next) => {
  Student.findOne({where: {id: req.params.id}})
    .then(student => res.send(student))
    .catch(next)
})

app.post('/api/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next)
})

app.post('/api/campuses', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.json(campus))
    .catch(next)
})

app.delete('/api/students/:id', (req, res, next) => {
  Student.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(204))
    .catch(next)
})

app.delete('/api/campuses/:id', (req, res, next) => {
  Campus.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(204))
    .catch(next)
})

app.put('/api/students/:id', (req, res, next) => {
  Student.update(req.body, {where: {id: req.params.id}})
    .then((student) => console.log(student))
    .catch(next)
})


app.listen(port, ()=> console.log(`listening on port ${port}`))
