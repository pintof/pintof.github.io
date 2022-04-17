const express = require("express");
const request = require("request");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/jokes/random", (req, res) => {
  request(
    {
      url: "https://www.lioapplications.lrc.gov.on.ca/services/CLUPA/dbclupaPolicyIdentify.ashx?lang=ENG&id=C117",
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.send(body);
    }
  );
});

app.listen(4000);
