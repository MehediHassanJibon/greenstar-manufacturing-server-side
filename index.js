
const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eqjnx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
      await client.connect();
      console.log('DB Connected');
      const productCollection = client.db('greenstar-parts').collection('products');
      const orderCollection = client.db('greenstar-parts').collection('orders');
      const userCollection = client.db('greenstar-parts').collection('users');
      const reviewCollection = client.db('greenstar-parts').collection('reviews');
      app.get('/product', async (req, res) => {
        const query = {};
        const cursor = await productCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    });
    app.get('/product/:id', async (req, res) => {
      const productId = req.params.id;
      const query = { _id: ObjectId(productId) };
      const result = await productCollection.findOne(query);
      res.send(result);
  });

  } finally {
      //   await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})