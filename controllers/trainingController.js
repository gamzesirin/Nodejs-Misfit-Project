const Training = require('../models/Training')
const User = require('../models/User')
const Category = require('../models/Category')
exports.createTraining = async (req, res) => {
	try {
		const training = await Training.create({
			name: req.body.name,
			description: req.body.description,
			category: req.body.category,
			user: req.session.userID
		})
		res.status(201).redirect('/trainings')
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}
}

exports.getAllTrainings = async (req, res) => {
	try {
		const categorySlug = req.query.categories
		const category = await Category.findOne({ slug: categorySlug })

		let filter = {}
		if (categorySlug) {
			filter = { category: category._id }
		}
		const trainings = await Training.find(filter).sort('-createAt')
		const categories = await Category.find()
		res.status(200).render('trainings', {
			trainings: trainings,
			categories: categories,
			page_name: 'trainings'
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}
}

exports.getTraining = async (req, res) => {
	try {
		const user = await User.findById(req.session.userID)
		const training = await Training.findOne({ slug: req.params.slug }).populate('user')
		res.status(200).render('training', {
			training: training,
			page_name: 'trainings',
			user
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}
}

exports.enrollTraining = async (req, res) => {
	try {
		const user = await User.findById(req.session.userID)
		await user.trainings.push({ _id: req.body.training_id })
		await user.save()

		res.status(200).redirect('/users/dashboard')
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			error
		})
	}
}

exports.releaseTraining = async (req, res) => {
	try {
		const user = await User.findById(req.session.userID)
		await user.trainings.pull({ _id: req.body.training_id })
		await user.save()

		res.status(200).redirect('/users/dashboard')
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			error
		})
	}
}

exports.deleteTraining = async (req, res) => {
	try {
		await Training.findOneAndDelete({ slug: req.params.slug })

		res.status(200).redirect('/users/dashboard')
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			error
		})
	}
}

exports.updateTraining = async (req, res) => {
	try {
		const training = await Training.findOne({ slug: req.params.slug })
		training.name = req.body.name
		training.description = req.body.description
		training.category = req.body.category

		training.save()

		res.status(200).redirect('/users/dashboard')
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			error
		})
	}
}
