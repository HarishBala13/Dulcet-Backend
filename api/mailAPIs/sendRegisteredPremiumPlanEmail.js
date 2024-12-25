const nodemailer = require('nodemailer');

const sendRegisteredPremiumPlanEmail = async function sendRegisteredPremiumPlanEmail(premiumPlanDetails, callback) {
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
      to: premiumPlanDetails.userEmail,
      subject: "Thanks for purchasing Premium in Dulcet",
      html: `<div style="  background-color: rgb(69, 150, 231);  border-radius: 10px;  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); padding: 18px;">
  
          <img style=" width: 45px; height: 30px; border-radius: 50%; padding: 2px;" src="https://live.staticflickr.com/65535/52850396290_e650ce4a0b_n.jpg" alt="Dulcet logo">
  
          <h2 style="color:black; padding: 4px;">Hi ${premiumPlanDetails.userName} ! Welcome to the Dulcet</h2>  <br>
  
          <p style="font-size:0.4cm; color:black; padding: 4px;">Once a premium user will get all benefits from a normal user 😊😊!..</p>
          <p style="font-size:0.4cm; color:black; padding: 4px;">Once again Thanks for purchasing ${premiumPlanDetails.premiumPlanTitle} plan on ${premiumPlanDetails.premiumPlanPurchasedDateWithTime} for the price of ${premiumPlanDetails.premiumPlanPrice}. We will never loose you at any time.</p>
  
          <p style="text-align:justify; font-size:0.4cm;">You can experience now the offers of ${premiumPlanDetails.premiumPlanOffers} 😊</p><br>
  
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

  module.exports = sendRegisteredPremiumPlanEmail;