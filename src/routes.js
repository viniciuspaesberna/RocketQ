const express = require('express')
const routes = express.Router()

const questionController = require('./controllers/questionContoller')
const roomController = require('./controllers/roomController')
const answerController = require('./controllers/answerController')


routes.get('/' , (req, res) => res.render('index', {page: 'enter-room'}))
routes.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}))

routes.get('/room/:room_id', roomController.open)
routes.post('/enter-room', roomController.enter)
routes.post('/create-room', roomController.create)

routes.post('/question/create/:room_id', questionController.create)
routes.post('/question/:room_id/:question_id/:action', questionController.index)

routes.post('/create-answer/:room_id', answerController.create)

module.exports = routes