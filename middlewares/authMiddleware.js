const User = require('../models/User')

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.session.userID)
		if (!user) {
			return res.redirect('/login')
		}
		next()
	} catch (error) {
		// Hata yönetimi
		console.error(error)
		res.redirect('/login') // Hata durumunda kullanıcıyı yönlendirin veya başka bir işlem yapın
	}
}
