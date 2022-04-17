const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://floyd:floyd123@cluster0.t7b3c.mongodb.net/test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("Ryerson").collection("foods");

client.connect(() => {
  collection.findOne({ name: "lettuce" }, function (error, response) {
    if (error) throw error;
    client.close();
  });
});
