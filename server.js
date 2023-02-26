const express = require("express")
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'))
app.use(bodyParser.json());


//DATABASE 
const { MongoClient } = require('mongodb');
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


let issues = [
    {
      id: 1, status: 'Open', owner: 'Ravan',
      created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
      title: 'Error in console when clicking Add',
  }, 
  {
        id: 2, status: 'Assigned', owner: 'Eddie', created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel',
  }, 
];

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
  };

  const issueFieldType = {
    id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
  };

  function validateIssue(issue) {
    for (const field in issueFieldType) {
      const type = issueFieldType[field];
      if (!type) {
        delete issue[field];
      } else if (type === 'required' && !issue[field]) {
        return `${field} is required.`;
  } }
    if (!validIssueStatus[issue.status])
      return `${issue.status} is not a valid status.`;
    return null;
  }

app.get('/api/issues', (req, res) => {
    // const metaData = {total_count: issues.length};
    db.collection('issues').find().toArray().then(issues => {
      const metaData = { total_count: issues.length}
      res.json({_metaData: metaData, records: issues})
    }).catch(error => {
      console.log(error)
      res.status(500).json({ message: `Internal server error: ${error}`})
    })
    // res.json({_metaData: metaData, records: issues});
});

app.post('/api/issues', (req, res) => {
    // const metaData = "";
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = "New";
    const err = validateIssue(newIssue)
    if (err) {
        res.status(422).json({message: `Invalid request: ${err}`});
        return;
    }
    issues.push(newIssue);
    res.json(newIssue);
    // console.table(newIssue);
    // res.json()
})

// app.listen(3000, function() {
//     console.log('App started on port 3000')
// })

