const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://floyd:floyd123@cluster0.t7b3c.mongodb.net/test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const collection = client.db("Ryerson").collection("foods");
  var docs = [
    { name: "cake", healthy: false },
    { name: "lettuce", healthy: true },
    { name: "donut", healthy: false },
  ];

  collection.insertMany(docs, function (err, res) {
    if (err) throw err;
    console.log("documents inserted");
    client.close();
  });
});
