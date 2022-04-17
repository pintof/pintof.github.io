const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://floyd:floyd123@cluster0.t7b3c.mongodb.net/test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("Ryerson").collection("foods");
var myobj = {
  name: "Company Inc",
  address: "Highway 37",
  address: "Highway 38",
};

client.connect(() => {
  collection.insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    client.close();
  });
});
