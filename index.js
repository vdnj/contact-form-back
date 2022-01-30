require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(formidable());

const mailgun = require("mailgun-js")({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
});

app.post("/form", async (req, res) => {
  console.log(req.fields);

  const data = {
    from: `${req.fields.name} ${req.fields.lastname} <${req.fields.email}>`,
    to: "dinatalevalentin@gmail.com",
    subject: req.fields.subject,
    text: req.fields.message,
  };

  mailgun.messages().send(data, (error, body) => {
    if (error === undefined) {
      res.json({ message: "Données du form bien recues, mail envoyé" });
    } else {
      res.json(error);
    }
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
