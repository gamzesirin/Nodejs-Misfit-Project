const nodemailer = require('nodemailer')
exports.getIndexPage = (req, res) => {
	console.log(req.session.userID)
	res.status(200).render('index', {
		page_name: 'index'
	})
}
exports.getAboutPage = (req, res) => {
	res.status(200).render('about', {
		page_name: 'about'
	})
}
exports.getContactPage = (req, res) => {
	res.status(200).render('contact', {
		page_name: 'contact'
	})
}

exports.sendEmail = async (req, res) => {
	const outputMessage = `
	
	<h1>Mail Details </h1>
	<ul>
	  <li>Name: ${req.body.name}</li>
	  <li>Email: ${req.body.email}</li>
	  <li>Phone Number:${req.body.phone}</li>
	</ul>
	<h1>Message</h1>
	<p>${req.body.message}</p>
	`

	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'ggamzesirinn@gmail.com',
			pass: 'Scfvghbjnmvgbhnj'
		}
	})
	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"MİSFİT Contact Form" <ggamzesirinn@gmail.com>', // sender address
		to: 'ggamzesirinn@gmail.com', // list of receivers
		subject: 'MİSFİT Contact Form New Message ✔', // Subject line
		html: outputMessage // html body
	})

	console.log('Message sent: %s', info.messageId)
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

	res.status(200).redirect('contact')
}

exports.getGalleryPage = (req, res) => {
	res.status(200).render('gallery', {
		page_name: 'gallery'
	})
}

exports.getRegisterPage = (req, res) => {
	res.status(200).render('register', {
		page_name: 'register'
	})
}

exports.getLoginPage = (req, res) => {
	res.status(200).render('login', {
		page_name: 'login'
	})
}
