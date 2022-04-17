const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://floyd:floyd123@cluster0.t7b3c.mongodb.net/test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("Ryerson").collection("Books");

client.connect(() => {
  collection.find().toArray(function (err, res) {
    if (err) throw err;
    console.log(res);
    client.close();
  });
});
