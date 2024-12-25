const sendRegisterEmail = require("../api/mailAPIs/sendRegisterEmail");
const sendForgotPassEmail = require("../api/mailAPIs/sendForgotPassEmail");
const sendRegisteredPremiumPlanEmail = require("../api/mailAPIs/sendRegisteredPremiumPlanEmail");

// import { sendRegisterEmail } from "../api/mailAPIs/sendRegisterEmail";
// import { sendForgotPassEmail } from "../api/mailAPIs/sendForgotPassEmail";
// import { sendRegisteredPremiumPlanEmail } from "../api/mailAPIs/sendRegisteredPremiumPlanEmail";

const RegisterEmail = (req, res) => {
  let users = req.body;
  // console.log(users);

  sendRegisterEmail(users, (err, info) => {
    if (err) console.error(err);
    else {
      console.log("Email Sent Successfully");
    }
  });
};
sendRegisterEmail;

const ForgotPassEmail = (req, res) => {
  let usersForgot = req.body;
  // console.log(usersForgot);

  sendForgotPassEmail(usersForgot, (err, info) => {
    if (err) console.error(err);
    else console.log("Email Sent Successfully");
  });
};

sendForgotPassEmail;

const RegisteredPremiumPlanEmail = (req, res) => {
  let premiumPlanDetails = req.body;
  sendRegisteredPremiumPlanEmail(premiumPlanDetails, (err, info) => {
    if (err) console.error(err);
    else console.log("Email Sent Successfully");
  });
};

sendRegisteredPremiumPlanEmail;

module.exports = {
  RegisterEmail,
  ForgotPassEmail,
  RegisteredPremiumPlanEmail
};
