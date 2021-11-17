const dotenv = require('dotenv');
const nodemailer = require ('nodemailer');

const sendEmail =async options => {
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        host:'smtp.mailtrap.io',
        port:'587',
        auth: {
            user:'3c870b1ae11c6e',
            pass:'bcb61b321dddb1'
        },
        ignoreTLS: true,
    })

    
    console.log(transporter.options.host);

    //2) Define Email options
    const mailOptions = {
        from: 'Harsh Shah <harshjshah53@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message,
        //html
    }


    //3) Send the email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;