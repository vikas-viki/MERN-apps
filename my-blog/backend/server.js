const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();

app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb+srv://VIKAS:VIKAS@firstcluster.1fyyzpk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
        const db = client.db('my-blog');
    
        // await operations(db);

        console.log('Connected to database');
    
        client.close();
    } catch (error) {
        // res.status(500).json({ message: 'Error connecting to db', error });
        console.log(error);
    }
    }

    withDB();