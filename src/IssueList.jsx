import React from 'react'
import { Link } from 'react-router-dom';

const IssueTable = (props) => {
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
            {props.issues.map(issue => {
                return (
                    <IssueRow key={issue._id}>
                    {/* <IssueRow key={4}> */}
                        {issue}
                    </IssueRow>
                )
            })}
        </tbody>
    </table>
    )
}

const IssueRow = (props) => {
    const borderedStyle = {border: "1px solid silver", padding: 4};
    return (
            <tr>
            {/* <td style={borderedStyle}>{props.children._id}</td> */}
            <td style={borderedStyle}><Link to={`/issues/${props.children._id}`}>{props.children._id.substr(-4)} </Link></td>
            <td style={borderedStyle}>{props.children.status}</td>
            <td style={borderedStyle}>{props.children.owner}</td>
            <td style={borderedStyle}>{props.children.created.toDateString()}</td>
            <td style={borderedStyle}>{props.children.effort}</td>
            <td style={borderedStyle}>{props.children.completionDate? props.children.completionDate.toDateString() : ''}</td>
            <td style={borderedStyle}>{props.children.title}</td>
        </tr>
    )
}

import IssueAdd from "./IssueAdd.jsx";
import IssueFilter from "./IssueFilter.jsx";

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues: []};
        this.createIssue = this.createIssue.bind(this);
    }

    createIssue(newIssue) {
        fetch('/api/issues', {
          method: "POST",
          headers: {'Content-Type' : "application/json",},
          body: JSON.stringify(newIssue),
        }).then(response => {
            if ( response.ok ) {
                response.json()
                .then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate)
                    updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({ issues: newIssues });
            });
        } else {
            response.json().then(error => {
                alert("Failed to add issue: " + error.message);
            });
        }
          }).catch(err => {
            alert("Error in sending data to server: " + err.message);
        });
    }

    componentDidMount() {
        this.loadData();    
    }

    loadData() {
        fetch('/api/issues').then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log("Total count of records: ", data._metaData.total_count)
                    data.records.forEach(issue => {
                        issue.created = new Date(issue.created);
                        if (issue.completionDate)
                          issue.completionDate = new Date(issue.completionDate);
                      });
                      this.setState({ issues: data.records });
                })
            } else {
                response.json().then(error => {
                    alert('Failed to fetch issues:'+ error.message)
                })
            }
        }).catch(err => console.log('Error in fetching data from server:', err))
    }

    render() {
        return (
            <div>
                <h1>Issue tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        )
    }
}
