const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const db = require('./config/db')

const pageRoute = require('./routes/pageRoutes')
const trainingRoute = require('./routes/trainingRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')
dotenv.config()
const app = express()

//Templete Engine
app.set('view engine', 'ejs')

//Global Variable
global.userIN = null

//Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	session({
		secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
		resave: false,
		saveUninitialized: true,
		store: mongoStore.create({ mongoUrl: 'mongodb+srv://ggamzesirinn:QSz1j72spywUQqrF@cluster0.u84unwj.mongodb.net/' })
	})
)
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }))

//Routes
app.use('*', (req, res, next) => {
	userIN = req.session.userID
	next()
})

app.use('/', pageRoute)
app.use('/trainings', trainingRoute)
app.use('/categories', categoryRoute)
app.use('/users', userRoute)

//Listen on port

const PORT = process.env.PORT || 5000

//Connect to DB
db()

app.listen(PORT, () => {
	console.log(`Server ${PORT} portunda başlatıldı.`)
})
