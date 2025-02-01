require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('arts and crafts server is running')
})

const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb');

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
    const userColllection = client.db('craftsUserDB').collection('users')

    //=====users api========
    app.post('/users', async (req, res) => {
      const users = req.body
      console.log(users);
      const result = await userColllection.insertOne(users)
      res.send(result)
    })
    app.get('/users', async (req, res) => {
      const cursor = userColllection.find()
      const result = await cursor.toArray();
      res.send(result)
    })

    //=======addding crafts api=======

    app.post('/crafts', async (req, res) => {
      const crafts = req.body
      console.log(crafts);
      const result = await craftsCollection.insertOne(crafts)
      res.send(result)
    })


    //===== get all crafts data ========
    app.get('/crafts', async (req, res) => {
      const cusrsor = craftsCollection.find()
      const result = await cusrsor.toArray()
      res.send(result)

    });
    
    app.get('/crafts/:email', async(req,res) => {
      const findEmail = req.params.email
      const query = {
        email: findEmail
      }
      const result = await craftsCollection.find(query).toArray()
      res.send(result)
    })

    

    app.get('/crafts/:id', async (req, res) => {
      const findId = req.params.id
      const query = {
        _id: new ObjectId(findId)
      }
      const result = await craftsCollection.findOne(query)
      res.send(result)
    })

 





    //===== get crafts data by category ====

    app.get('/category/LandscapePainting', async (req, res) => {
      const query = {
        subcategory: {
          $in: ["Landscape Painting"]
        }
      }
      const cursor = craftsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/category/OilPainting', async (req, res) => {
      const query = {
        subcategory: {
          $in: ["Oil Painting"]
        }
      }
      const cursor = craftsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/category/WaterCoolorPainting', async (req, res) => {
      const query = {
        subcategory: {
          $in: ["Water Coolor Painting"]
        }
      }
      const cursor = craftsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/category/PortraitDrawing', async (req, res) => {
      const query = {
        subcategory: {
          $in: ["Portrait Drawing"]
        }
      }
      const cursor = craftsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/category/CharcoalSketching', async (req, res) => {
      const query = {
        subcategory: {
          $in: ["Charcoal Sketching"]
        }
      }
      const cursor = craftsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/category/CartoonDrawing', async (req, res) => {
      const query = {
        subcategory: {
          $in: ["Cartoon Drawing"]
        }
      }
      const cursor = craftsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    // ====== get crafts data by user=====

   
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, (req, res) => {
  console.log('listening form', port);
})