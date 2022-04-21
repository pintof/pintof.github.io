const express = require("express");
const app = express();
const fetch = require("node-fetch");
const { auth } = require("express-openid-connect");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("html", require("ejs").renderFile);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = "mongodb+srv://floyd:floyd123@cluster0.t7b3c.mongodb.net/test";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const collection = client.db("Ryerson").collection("Dictionary");

//middleware for Auth0, grabs process.env variables from .env file
app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
    authRequired: true,
    auth0Logout: true,
  })
);

// load the website for the user
// loads the index.html page on the GET request (which is what all browser use) at root endpoint "/"
app.get("/", (req, res) => {
  res.render("index.html");
});

// listen for POST requests from the client on same "/" root endpoint. Requests will be for a query word to lookup, send the word's definition back to client, and record definition in MongoDB database as well
// when sending word definition back to client, first check if word definition already exists within database from a previously entered query of the same type within the last 10 minutes
// if exists, use the database entry, if not exists, make a call to Merriam Webster's Dictionary API to lookup the word
app.post("/", (req, res) => {
  async function lookup(queryWord) {
    const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${queryWord}?key=6b434ca6-7350-4807-b455-6f29aad7cc46`;
    const response = await fetch(url);
    const data = await response.json();
    let wordDefinition;
    try {
      // see if second entry exists, assign it to the word definition
      wordDefinition = data[0].def[0].sseq[0][1][1].dt[0][1];
    } catch {
      try {
        // see if first entry exists, assign it to the word definition
        wordDefinition = data[0].def[0].sseq[0][0][1].dt[0][1];
      } catch {
        // if first & second entry did not exist for given word, assign word definition to word not found
        wordDefinition = "Word not found";
      }
    }
    // send the word definition back to the client who made the post request(the index.html file)
    res.send(wordDefinition);
    // load the query word & word definition into a MongoDB database
    client.connect((error) => {
      if (error) throw error;
      collection.insertOne(
        { query_word: queryWord, word_definition: wordDefinition },
        function (err, res) {
          if (err) throw err;
          console.log("1 document inserted, 1 API call used");
          client.close();
        }
      );
    });
  }
  // check the mongodb database to see if the query word being searched, has already been searched for & entered into the database within the last 10 minutes
  // if matching record found in database, then send the word definition from the database back to the client, instead of using up an API call
  // if no matching record found in database, then call the lookup() function to do an API call to look the query word up
  client.connect(() => {
    collection.findOne(
      {
        query_word: req.body.query,
        // _id is a field automatically created by mongoDB which contains the date/time when the entry was created
        // _id key is paired with an ObjectId value, this object contains the time in UNIX format (seconds from 1970/01/01)
        // to search for _id's with a newer time than the last 10 minutes, we can create another ObjectId from 10 minutes ago, and search for any values greater than ($gt) this
        // to create a new ObjectId from the last 10 minutes, simply use OjectId(last 10 minutes in UNIX time in seconds)
        // the last 10 minutes in UNIX time is gotten by using Date.now() (Unix time right now in milliseconds), dividing this by 1000 to convert to seconds (required format for ObjectId), then subtracting 10 minutes worth of seconds - 600
        _id: { $gt: ObjectId(Date.now() / 1000 - 600) },
      },
      function (error, response) {
        if (error) throw error;
        client.close();
        if (response) {
          res.send(response.word_definition);
          console.log("1 API call saved, previous database entry used");
        } else {
          lookup(req.body.query);
        }
      }
    );
  });
});

app.listen(3000);
