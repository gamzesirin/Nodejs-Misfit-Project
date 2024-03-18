const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const Category = require('../models/Category')
const Training = require('../models/Training')
exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.status(201).redirect('/login')
	} catch (err) {
		const errors = validationResult(req)
		console.log(errors)
		console.log(errors.array()[0].msg)

		res.status(400).redirect('/register')
	}
}
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid email or password' })
		}
		req.session.userID = user._id
		res.status(200).redirect('/users/dashboard')
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

exports.logoutUser = async (req, res) => {
	req.session.destroy(() => {
		res.redirect('/')
	})
}

exports.getDashboardPage = async (req, res) => {
	const user = await User.findOne({ _id: req.session.userID }).populate('trainings')
	const categories = await Category.find({})
	const trainings = await Training.find({ user: req.session.userID })
	const users = await User.find({})
	res.status(200).render('dashboard', {
		page_name: 'dashboard',
		user,
		categories,
		trainings,
		users
	})
}

exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndRemove(req.params.id)
		await Training.deleteMany({ user: req.params.id })
		res.status(200).redirect('/users/dashboard')
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			error
		})
	}
}
