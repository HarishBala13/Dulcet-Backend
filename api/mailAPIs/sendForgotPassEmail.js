const nodemailer = require('nodemailer');

const sendForgotPassEmail = async function sendForgotPassEmail(usersForgot, callback) {
    var transporter = nodemailer.createTransport({
      host: process.env.AUTHORIZED_HOST_MAIL,
      port: 465,
      secure: true,
      auth: {
        user: process.env.HOST_MAIL_ID,
        pass: process.env.HOST_PASSKEY,
      },
    });
    var mailoptions = {
      from: process.env.HOST_MAIL_ID,
      to: usersForgot.userEmail,
      subject: "Please reset your password",
      html: `<div style="background: rgba(127, 255, 212, 0.2);  border-radius: 10px;  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);  border: 2px solid rgba(104, 185, 104, 0.11); padding: 10px;">
  
          <img style=" width: 45px; height: 30px; border-radius: 50%; padding: 2px;" src="https://live.staticflickr.com/65535/52850396290_e650ce4a0b_n.jpg" alt="Dulcet logo">
  
          <h2 style="color:black;">Reset your Dulcet Password</h2>  
  
          <p style="font-size:0.4cm; color:black; padding: 4px;"><h2>Hey ${usersForgot.userName} !</h2><br> 
          We heard that you lost your Dulcet Password. Sorry about that!..</p>
  
          <p style="text-align:justify; font-size:0.4cm;">But don't worry. You can use the following button <br> to reset your password😊</p><br>
  
          <a style="background: #2883e4;  padding: 15px;  border-radius: 20px;   text-decoration: none;   color: white; width: 20%" 
          href="http://localhost:4200/updatepassword">    Reset your password    </a><br><br>
  
  
          <p>Thanks,<br>The Dulcet Team.</p>
  
          <p style="color:rebeccapurple; align: bold;">Contact Us</p>          
          
          <a href="https://www.facebook.com/profile.php?id=100089790477429" target="_blank" style="font-size:0.4cm; color: violet;">Facebook</a><br>
  
          <a href="https://www.instagram.com/__delcet__23/"  target="_blank" style="font-size:0.4cm; color: violet;">Instagram</a><br>
  
          <a href="https://www.linkedin.com/in/delcet-musicapp-766898265/" target="_blank" style="font-size:0.4cm; color: violet;">Linked-in</a><br>
  
          <a href="mailto:dulcetonline2023@gmail.com" target="_blank" style="font-size:0.4cm; color: violet;">E-mail</a><br>
  
          <a href="https://twitter.com/DelcetMusicHB"  target="_blank" style="font-size:0.4cm; color: violet;">Twitter</a><br>
          
          </div>`,
    };
    transporter.sendMail(mailoptions, (err, info) => {
      if (err) throw err;
      else console.log("email sent : " + info.response);
    });
  }
  
  module.exports = sendForgotPassEmail;