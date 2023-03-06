// const express = require("express")
// const bodyParser = require('body-parser');
// const { validateIssue } = require('./issue')

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Issue from './issue.js';
import SourceMapSupport from 'source-map-support'; 

SourceMapSupport.install();
const app = express();
app.use(express.static('static'))
app.use(bodyParser.json());

//DATABASE 
// const { MongoClient } = require('mongodb');
const URI = 'mongodb://localhost:27017'
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connect() {
    await client.connect();
    console.log('Connected to the database server')
    db = client.db('issuetracker');
    const collection = db.collection('issues');
    return 'done.'
}

// Connect to the database
connect()
  .then(() => {
    app.listen(3000, () => console.log('App started on port 3000'))
  })
  .catch(console.error)
  // .finally(() => client.close())


  // REST API ROUTEs
app.get('/api/issues', (req, res) => {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    db.collection('issues').find(filter).toArray().then(issues => {
      const metaData = { total_count: issues.length}
      res.json({_metaData: metaData, records: issues})
    }).catch(error => {
      console.log(error)
      res.status(500).json({ message: `Internal server error: ${error}`})
    })
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = "New";
    

    // THIS IS WHERE I AM CALLING THE ISSUE FUNCTION
    // const err = Issue(newIssue)
    // if (err) {
    //     res.status(422).json({message: `Invalid request: ${err}`});
    //     return;
    // }
    db.collection('issues').insertOne(newIssue).then(result => 
      db.collection('issues').find({_id: result.insertedId}).limit(1).next()
      ).then(newIssue => {
        res.json(newIssue)
      }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal server error: ${error}`})
      }) 
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'))
})
