const nodemailer = require("nodemailer");

function Email(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amaraganisaikiran1999@gmail.com',
            pass: 'dngorfotbmzzfldb'
        }
    });

    const mailOptions = {
        from: '"ASAP Admin" <amaraganisaikiran1999@gmail.com>',
        to: email,
        subject: 'Confirmation: your account has been created',
        html: "<h1>Dear User,</h1>" +
            "<p>Thank you for signing up for ASAP Application</p>" +
            "<p>We’d like to confirm that your account was created successfully</p>" +
            "<p>Best,</p>" +
            "<p>The ASAP team</p>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { Email };