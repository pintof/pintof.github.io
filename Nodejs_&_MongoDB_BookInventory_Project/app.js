var express = require("express");
var app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://floyd:floyd123@cluster0.t7b3c.mongodb.net/test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.get("/bookinventory/list", function (req, res) {
  client.connect((err) => {
    const collection = client.db("Ryerson").collection("Books");
    collection.find().toArray(function (error, response) {
      if (error) throw error;
      client.close();
      let html = "<p>";
      const books = response;
      for (var i = 0; i < books.length; i++) {
        html =
          html +
          "<b>TITLE: </b>" +
          books[i].title +
          "<br><b>AUTHOR: </b>" +
          books[i].author +
          "<br><b>PUBLISHER: </b>" +
          books[i].publisher +
          "<br><b>DATE: </b>" +
          books[i].date +
          "<br><b>WEBSITE: </b>" +
          books[i].website +
          "<br><br>";
      }
      html += "</p>";
      res.send(
        "<h1><u><b>LIST OF BOOKS</b></u></h1><br>" +
          html +
          '<br><a href="/bookinventory/add"><h3><b>APPEND BOOK INVENTORY</b></h3></a><br><br><br><br>--Made by Floyd Pinto--'
      );
    });
  });
});

app.get("/bookinventory/add", function (req, res) {
  const html =
    '<br><form action="/bookinventory/addbook" method="post"><input type="text" id="TITLE" name="title" placeholder="Title"><br><input type="text" id="AUTHOR" name="author" placeholder="Author"><br><input type="text" id="PUBLISHER" name="publisher" placeholder="Publisher"><br><input type="date" id="DATE" name="date" placeholder="Date"><br><input type="url" id="WEBSITE" name="website" placeholder="Website"><br><input type="submit" value="Submit"><br></form>';

  res.send("ENTER BOOK:" + html + "<br><br><br><br>--Made by Floyd Pinto--");
});

app.post("/bookinventory/addbook", function (req, res) {
  client.connect((err) => {
    const collection = client.db("Ryerson").collection("Books");
    const new_book = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      date: req.body.date,
      website: req.body.website,
    };
    collection.insertOne(new_book, function (error, response) {
      if (error) throw error;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(
    "TITLE:         <b>" +
      req.body.title +
      "</b><br><br>AUTHOR:        <b>" +
      req.body.author +
      "</b><br><br>PUBLISHER:     <b>" +
      req.body.publisher +
      "</b><br><br>DATE:          <b>" +
      req.body.date +
      "</b><br><br>WEBSITE:       <b>" +
      req.body.website +
      '</b><br><br><b>was successfully added!</b><br><br><a href="/bookinventory/list"><h3><b>VIEW BOOK INVENTORY</b></h3></a><br><br><br><br>--Made by Floyd Pinto--'
  );
});

app.all("*", function (req, res) {
  //redirect all other URIs to homepage
  res.redirect("/bookinventory/list");
});

app.listen(3000);
