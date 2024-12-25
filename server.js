const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const {
  RegisterEmail,
  ForgotPassEmail,
  RegisteredPremiumPlanEmail,
} = require("./controllers/EmailController");
const {
  songsImageUpload,
  songsAudioUpload,
  userProfileUpload,
} = require("./controllers/ImageController");
const LoggerController = require("./controllers/LoggerController");

const audioFileUpload = require("./api/imageAPIs/songsAudioUpload");
const imageFileUpload = require("./api/imageAPIs/songsImageUpload");
const userProfileFileUpload = require("./api/imageAPIs/userProfileUpload");
const fetchRegisteredUser = require("./api/userAPI/fetchRegisteredUser");

const app = express();

const allowedOrigins = [`http://localhost:4200`];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

app.use(bodyparser.json());

app.get("/usersregister", fetchRegisteredUser);

// Songs - Images Storage REST API CALL
app.post(
  "/songsImageUpload",
  imageFileUpload.single("imageFiles"),
  songsImageUpload
);

// Songs - Audios Storage REST API CALL
app.post(
  "/songsAudioUpload",
  audioFileUpload.single("audioFiles"),
  songsAudioUpload
);

// Testing for Render site it's working or not
app.get("/audioUpload", (req, res) => {
  res.sendFile(__dirname + "/audioUpload.html");
});

// Songs - User Image Storage REST API CALL
app.post(
  "/userProfileUpload",
  userProfileFileUpload.single("userProfile"),
  userProfileUpload
);

// Send User Register Email REST API CALL
app.post("/sendRegisterEmail", RegisterEmail);

// Send User ForgotPassword Email REST API CALL
app.post("/sendForgotPassEmail", ForgotPassEmail);

// SendRegisteredPremiumPlanEmail REST API CALL
app.post("/sendRegisteredPremiumPlanEmail", RegisteredPremiumPlanEmail);

// Authenticating users by using JWT REST API CALL
// not yet implemented

// Logger file REST API CALL in server side and stores logs in MongoDB collections (logEntries)
app.post("/updateLogInexpress", LoggerController);

// Old method of calling API and storing logs locally
// app.post("/updateLogInexpress", (req, res) => {
//   const logMessage = req.body.logMessage;
//   const logtype = req.body.logMessagetype;
//   const loggedTime = req.body.logMessageDate;

//   fs.appendFile(
//     "DulcetLogs.log",
//     logMessage +
//       " on " +
//       new Date() +
//       `and it's an ` +
//       logtype +
//       " message Message Status ---> " +
//       logtype +
//       "\n",
//     (err) => {
//       if (err) {
//         console.error("Error writing log:", err);
//         return res.status(500).json({ error: "Error writing log" });
//       }
//       console.log("Log written successfully:", logMessage);
//       res.status(200).json({ message: "Log written successfully" });
//     }
//   );
// });

app.listen(process.env.PORT, (req, res, err) => {
  console.log(`Dulcet Project Backend Server Starts @${process.env.PORT}`);
});

// app.put('/updateLogInexpress', (req, res) => {
//     const newMessage = req.body;
//     if (newMessage) {
//         message = newMessage;
//         fs.writeFileSync(filePath, message, 'utf-8');
//         console.log(fs.writeFileSync(filePath, message, 'utf-8'));
//         return res.json({ message: 'Message updated successfully' });
//       } else {
//         return res.status(400).json({ error: 'Invalid input' });
//       }
// });

// import { RegisterEmail, ForgotPassEmail, RegisteredPremiumPlanEmail } from "./controllers/EmailController";
// import songsImageUpload, { songsAudioUpload, userProfileUpload } from "./controllers/ImageController";

// import audioFileUpload from "./api/imageAPIs/songsAudioUpload";
// import imageFileUpload from "./api/imageAPIs/songsImageUpload";
// import userProfileFileUpload from "./api/imageAPIs/userProfileUpload";
