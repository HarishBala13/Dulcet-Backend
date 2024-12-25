const nodemailer = require("nodemailer");

const sendRegisterEmail = async function sendRegisterEmail(users, callback) {
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
      to: users.useremail,
      subject: "Thanks for Registering",
      html: `<div style="background-color: rgba(10, 165, 15,0.6);  border-radius: 10px;   box-shadow: 0px 2px 3px 5px rgba(76, 75, 75, 0.4);  border: 2px solid rgba(104, 185, 104, 0.11); padding: 15px;">
          
          <h2 style=" color:black;">Hi ${users.username}.. </h2><br><p style="color: black; font-weight: 300;">You are going to enter into a parallel dimension.</p><br><p style="color: black; font-weight: 300;">You had registered an account on Dulcet on ${users.registeredtime}<br>Thanks for choosing our Service</p><br>
  
          <img style=" width: 65px; height: 45px; border-radius: 50%; " src="https://live.staticflickr.com/65535/52850396290_e650ce4a0b_n.jpg" alt="Dulcet logo">
  
          <p style=" text-align:justify; font-weight: 0.45cm; font-weight: 300; color:black;">Before enjoy using your account you need to verify that this is your email and next further process by clicking here: </p><br><br>
  
          <a style=" border: 2px solid black; border: none;  background:#13ed66;  padding: 10px; border-radius: 10px; text-decoration: none; color: white;" href="http://localhost:4200/signin">Verify your Email</a>
          
          <p style=" text-align:justify; font-weight: 0.45cm; font-weight: 300; color:black;">We are happy to announce that you are a valuable customer to us and we won't let you down in any situation.</p>
  
          <p style=" text-align:justify; font-weight: 0.45cm; font-weight: 300; color:black;">Have fun and don't hesitate to Contact us, because your valuable feedback will give us growth.</p><br>
  
          <p style=" text-align:justify; color:black;">Thanks,<br>The Dulcet Team.</p>
  
          <p style=" text-align:justify; color:rebeccapurple; ">Contact Us</p>
          
          <a href="https://www.facebook.com/profile.php?id=100089790477429" target="_blank" style="font-size:0.4cm; color: violet;">Facebook</a>>br>
  
          <a href="https://www.instagram.com/__delcet__23/"  target="_blank" style="font-size:0.4cm; color: violet;">Instagram</a><br>
  
          <a href="https://www.linkedin.com/in/delcet-musicapp-766898265/" target="_blank" style="font-size:0.4cm; color: violet;">Linked-in</a><br>
  
          <a href="mailto:dulcetonline2023@gmail.com" target="_blank" style="font-size:0.4cm; color: violet;">E-mail</a><br>
  
          <a href="https://twitter.com/DelcetMusicHB"  target="_blank" style="font-size:0.4cm; color: violet;">Twitter</a><br>
          </div>
          </div>`,
    };
    transporter.sendMail(mailoptions, (err, info) => {
      if (err) throw err;
      else console.log("email sent : " + info.response);
    });
  }

  module.exports = sendRegisterEmail;