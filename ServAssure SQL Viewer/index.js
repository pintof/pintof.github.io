const mysql = require("mysql");
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");
const open = require("open");
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.static("./"));
app.use(express.urlencoded({ extended: true }));

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// set SQL query for initial startup run
var SQLquery = "SELECT * FROM TS_ALARMS LIMIT 5";

var fiberID = "Enter Fiber Node ID";
var alarmType = "";
var manualQuery = `SELECT Alarmtype, roottype, rootid, fiber, suppress, alarmState, currentSeverity, affectedDevices, detectedTime, notificationTime, verifiedTime, AlarmID, path, Notes FROM TS_ALARMS WHERE fiber='${fiberID}' AND Alarmtype='${alarmType}'`;

// query data from MySQL database & write .csv (on startup)
connection.query(SQLquery, function (error, data, fields) {
  if (error) throw error;

  const jsonData = JSON.parse(JSON.stringify(data));
  console.log("jsonData", jsonData);

  const json2csvParser = new Json2csvParser({ header: true });
  const csv = json2csvParser.parse(jsonData);

  fs.writeFile("ServAssure_SQL_Output.csv", csv, function (error) {
    if (error) throw error;
    console.log("Write to ServAssure_SQL_Output.csv successfully!");
  });
});

// render webpage to view .csv
app.get("/", (req, res) => {
  res.render(index.html);
});

// send json of new SQL user query (used to update SQL query on client side HTML via AJAX call to GET json)
app.get("/json", (req, res) => {
  res.json({ SQLquery: SQLquery });
});

// send fiberID from last user request back to client, to display last fiberID request made
app.get("/fiber", (req, res) => {
  res.json({ fiberID: fiberID });
});

// query MySQL database with user entered SQL query, re-write .csv with new query results, then re-load webpage to view new .csv
app.post("/", (req, res) => {
  // obtain new SQL query from user's form
  SQLquery = req.body.SQLquery;
  console.log(SQLquery);

  // query data from MySQL database
  connection.query(SQLquery, function (error, data, fields) {
    if (error) throw error;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);
    const json2csvParser = new Json2csvParser({ header: true });
    const csv = json2csvParser.parse(jsonData);

    // write new .csv of SQL query results
    fs.writeFile("ServAssure_SQL_Output.csv", csv, function (error) {
      if (error) throw error;
      console.log("Write to ServAssure_SQL_Output.csv successfully!");
    });
  });
  // redirect to webpage, thus reloading webpage, thus loading new .csv results from user's query
  res.redirect("/");
});

// query MySQL database with user entered Manual query, re-write .csv with new query results, then re-load webpage to view new .csv
app.post("/manualQuery", (req, res) => {
  // obtain Manual query from user's form
  fiberID = req.body.fiberID;
  alarmType = req.body.alarmType;
  manualQuery = `SELECT Alarmtype, roottype, rootid, fiber, suppress, alarmState, currentSeverity, affectedDevices, detectedTime, notificationTime, verifiedTime, AlarmID, path, Notes FROM TS_ALARMS WHERE fiber='${fiberID}' AND Alarmtype='${alarmType}'`;
  console.log(manualQuery);

  // query data from MySQL database
  connection.query(manualQuery, function (error, data, fields) {
    if (error) throw error;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);
    const json2csvParser = new Json2csvParser({ header: true });
    const csv = json2csvParser.parse(jsonData);

    // write new .csv of SQL query results
    fs.writeFile("ServAssure_SQL_Output.csv", csv, function (error) {
      if (error) throw error;
      console.log("Write to ServAssure_SQL_Output.csv successfully!");
    });
  });
  // redirect to webpage, thus reloading webpage, thus loading new .csv results from user's query
  res.redirect("/");
});

app.listen(3000);

open("http://localhost:3000/");
