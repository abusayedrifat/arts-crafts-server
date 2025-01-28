require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('arts and crafts server is running')
})

const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb://localhost:27017/"
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.faxnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const craftsCollection = client.db('craftsDB').collection('art&crafts')
    const userColllection  = client.db('craftsUserDB').collection('users')
     
    app.post('/users',async(req,res)=>{
        const users = req.body
        console.log(users);
        
        const result = await userColllection.insertOne(users)
        res.send(result)
    })
    app.get('/users',async(req,res)=>{
        const cursor = userColllection.find()
        const result = await cursor.toArray();
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port,(req,res)=>{
    console.log('listening form',port);
})