const mongoose = require('mongoose')

const db = async () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		.then(() => {
			console.log('MongoDB bağlantısı başarılı.')
		})
		.catch((err) => {
			console.log(err)
		})
}

module.exports = db
