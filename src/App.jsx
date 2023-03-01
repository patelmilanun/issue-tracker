const contentNode = document.getElementById('contents');
import IssueAdd from "./IssueAdd.jsx";
  class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues: []};
        // this.createTestIssue = this.createTestIssue.bind(this);
        this.createIssue = this.createIssue.bind(this);
        // setTimeout(this.createTestIssue, 2000);
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
        // setTimeout(() => {
        //     this.setState({issues: issues})
        // }, 500);
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



class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placehoder for issue filter</div>
        )
    }
}
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
                        {issue}
                    </IssueRow>
                )
            })}
        </tbody>
    </table>
    )
}

// class IssueTable extends React.Component {
//     render() {
//         return (
//             <table className="bordered-table">
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>Status</th>
//                         <th>Owner</th>
//                         <th>Created</th>
//                         <th>Effort</th>
//                         <th>Completion Date</th>
//                         <th>Title</th>           
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {this.props.issues.map(issue => {
//                         return (
//                             <IssueRow key={issue.id}>
//                                 {issue}
//                             </IssueRow>
//                         )
//                     })}
//                     {/* <IssueRow
//                         issue_id={1}
//                         issue_title="Error in console when clicking Add" 
//                     />
//                     <IssueRow
//                         issue_id={2}
//                         issue_title="Missing bottom border on panel" 
//                     /> */}
//                 </tbody>
//             </table>
//         )
//     }
// }


const IssueRow = (props) => {
    const borderedStyle = {border: "1px solid silver", padding: 4};
    return (
            <tr>
            <td style={borderedStyle}>{props.children._id}</td>
            <td style={borderedStyle}>{props.children.status}</td>
            <td style={borderedStyle}>{props.children.owner}</td>
            <td style={borderedStyle}>{props.children.created.toDateString()}</td>
            <td style={borderedStyle}>{props.children.effort}</td>
            <td style={borderedStyle}>{props.children.completionDate? props.children.completionDate.toDateString() : ''}</td>
            <td style={borderedStyle}>{props.children.title}</td>
        </tr>
    )
}

// class IssueRow extends React.Component {
//     render() {
//         console.log("called")
//         const borderedStyle = {border: "1px solid silver", padding: 4};
//         return (
//             <tr>
//                 <td style={borderedStyle}>{this.props.children.id}</td>
//                 <td style={borderedStyle}>{this.props.children.status}</td>
//                 <td style={borderedStyle}>{this.props.children.owner}</td>
//                 <td style={borderedStyle}>{this.props.children.created.toDateString()}</td>
//                 <td style={borderedStyle}>{this.props.children.effort}</td>
//                 <td style={borderedStyle}>{this.props.children.completionDate? this.props.children.completionDate.toDateString() : ''}</td>
//                 <td style={borderedStyle}>{this.props.children.title}</td>
//             </tr>
//         ) 
//     } 
// }

ReactDOM.render(<IssueList />, contentNode)