import nodemailer  from "nodemailer";


const mailFunction = (userMail, subject, text, confirmationCode, html) => {


var html = ``;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASSWORD}`,
      },
    });
  
    var mailOptions = {
      from: "dmmlk23@gmail.com",
      to: userMail,
      subject: subject,
      text: text,
      html: html,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };