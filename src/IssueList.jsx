// import React from 'react'
// import { Link } from 'react-router-dom';

// const IssueTable = (props) => {
//     return (
//         <table className="bordered-table">
//         <thead>
//             <tr>
//                 <th>Id</th>
//                 <th>Status</th>
//                 <th>Owner</th>
//                 <th>Created</th>
//                 <th>Effort</th>
//                 <th>Completion Date</th>
//                 <th>Title</th>           
//             </tr>
//         </thead>
//         <tbody>
//             {props.issues.map(issue => {
//                 return (
//                     <IssueRow key={issue._id} issue={issue}>
//                     {/* <IssueRow key={4}> */}
//                         {/* {issue} */}
//                     </IssueRow>
//                 )
//             })}
//         </tbody>
//     </table>
//     )
// }

// const IssueRow = (props) => {
//     const issue = props.issue
//     const borderedStyle = {border: "1px solid silver", padding: 4};
//     return (
//             <tr>
//             {/* <td style={borderedStyle}>{props.children._id}</td> */}
//             <td style={borderedStyle}><Link to={`/issues/${issue._id}`}>{issue._id.substr(-4)} </Link></td>
//             <td style={borderedStyle}>{issue.status}</td>
//             <td style={borderedStyle}>{issue.owner}</td>
//             <td style={borderedStyle}>{issue.created.toDateString()}</td>
//             <td style={borderedStyle}>{issue.effort}</td>
//             <td style={borderedStyle}>{issue.completionDate? issue.completionDate.toDateString() : ''}</td>
//             <td style={borderedStyle}>{issue.title}</td>
//         </tr>
//     )
// }

// import IssueAdd from "./IssueAdd.jsx";
// import IssueFilter from "./IssueFilter.jsx";

// export default class IssueList extends React.Component {
//     constructor() {
//         super();
//         this.state = {issues: []};
//         this.createIssue = this.createIssue.bind(this);
//     }

//     createIssue(newIssue) {
//         fetch('/api/issues', {
//           method: "POST",
//           headers: {'Content-Type' : "application/json",},
//           body: JSON.stringify(newIssue),
//         }).then(response => {
//             if ( response.ok ) {
//                 response.json()
//                 .then(updatedIssue => {
//                     updatedIssue.created = new Date(updatedIssue.created);
//                     if (updatedIssue.completionDate)
//                     updatedIssue.completionDate = new Date(updatedIssue.completionDate);
//                     const newIssues = this.state.issues.concat(updatedIssue);
//                     this.setState({ issues: newIssues });
//             });
//         } else {
//             response.json().then(error => {
//                 alert("Failed to add issue: " + error.message);
//             });
//         }
//           }).catch(err => {
//             alert("Error in sending data to server: " + err.message);
//         });
//     }

//     componentDidMount() {
//         this.loadData();    
//     }

//     loadData() {
//         fetch('/api/issues').then(response => {
//             if (response.ok) {
//                 response.json().then(data => {
//                     console.log("Total count of records: ", data._metaData.total_count)
//                     data.records.forEach(issue => {
//                         issue.created = new Date(issue.created);
//                         if (issue.completionDate)
//                           issue.completionDate = new Date(issue.completionDate);
//                       });
//                       this.setState({ issues: data.records });
//                 })
//             } else {
//                 response.json().then(error => {
//                     alert('Failed to fetch issues:'+ error.message)
//                 })
//             }
//         }).catch(err => console.log('Error in fetching data from server:', err))
//     }

//     render() {
//         return (
//             <div>
//                 {/* <h1>Issue tracker</h1> */}
//                 <IssueFilter />
//                 <hr />
//                 <IssueTable issues={this.state.issues} />
//                 <hr />
//                 <IssueAdd createIssue={this.createIssue} />
//             </div>
//         )
//     }
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';

const IssueTable = ({ issues }) => {
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {issues.map(issue => (
          <IssueRow key={issue._id} issue={issue} />
        ))}
      </tbody>
    </table>
  );
};

const IssueRow = ({ issue }) => {
  const borderedStyle = { border: '1px solid silver', padding: 4 };
  return (
    <tr>
      <td style={borderedStyle}>
        <Link to={`/issues/${issue._id}`}>{issue._id.substr(-4)} </Link>
      </td>
      <td style={borderedStyle}>{issue.status}</td>
      <td style={borderedStyle}>{issue.owner}</td>
      <td style={borderedStyle}>{issue.created.toDateString()}</td>
      <td style={borderedStyle}>{issue.effort}</td>
      <td style={borderedStyle}>
        {issue.completionDate ? issue.completionDate.toDateString() : ''}
      </td>
      <td style={borderedStyle}>{issue.title}</td>
    </tr>
  );
};

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  const createIssue = newIssue => {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    })
      .then(response => {
        if (response.ok) {
          response.json().then(updatedIssue => {
            updatedIssue.created = new Date(updatedIssue.created);
            if (updatedIssue.completionDate)
              updatedIssue.completionDate = new Date(updatedIssue.completionDate);
            setIssues([...issues, updatedIssue]);
          });
        } else {
          response.json().then(error => {
            alert('Failed to add issue: ' + error.message);
          });
        }
      })
      .catch(err => {
        alert('Error in sending data to server: ' + err.message);
      });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/issues');
        if (response.ok) {
          const data = await response.json();
          console.log('Total count of records: ', data._metaData.total_count);
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
          });
          setIssues(data.records);
        } else {
          const error = await response.json();
          alert('Failed to fetch issues:' + error.message);
        }
      } catch (err) {
        console.log('Error in fetching data from server:', err);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      {/* <h1>Issue tracker</h1> */}
      <IssueFilter />
      <hr />
      <IssueTable issues={issues} />
      <hr />
      <IssueAdd createIssue={createIssue} />
            </div>
        )
    }

