const express = require('express')
const trainingController = require('../controllers/trainingController')
const roleMiddleware = require('../middlewares/roleMiddleware')
const router = express.Router()
router.route('/').post(roleMiddleware(['teacher', 'admin']), trainingController.createTraining)
router.route('/').get(trainingController.getAllTrainings)
router.route('/:slug').get(trainingController.getTraining)
router.route('/:slug').delete(trainingController.deleteTraining)
router.route('/:slug').put(trainingController.updateTraining)
router.route('/enroll').post(trainingController.enrollTraining)
router.route('/release').post(trainingController.releaseTraining)

module.exports = router
