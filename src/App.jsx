const contentNode = document.getElementById('contents');

const issues = [
    {
      id: 1, status: 'Open', owner: 'Ravan',
      created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
      title: 'Error in console when clicking Add',
  }, {
  id: 2, status: 'Assigned', owner: 'Eddie', created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
  title: 'Missing bottom border on panel',
  }, ];

  class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {issues: []};
        // this.createTestIssue = this.createTestIssue.bind(this);
        this.createIssue = this.createIssue.bind(this);
        // setTimeout(this.createTestIssue, 2000);
    }

    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({
            issues: newIssues
        })
    }

    componentDidMount() {
        this.loadData();    
    }

    loadData() {
        setTimeout(() => {
            this.setState({issues: issues})
        }, 500);
    }

    // createTestIssue() {
    //     this.createIssue({
    //         status: 'New', owner: 'Ritik', created: new Date(),
    //         title: 'Completion date should be optional',
    //     })
    // }

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
                    <IssueRow key={issue.id}>
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

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        let form = document.forms.issueAdd;
        this.props.createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
        })

        form.owner.value = "";
        form.title.value = ""
    }
    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Issue owner" />
                <input type="text" name="title" placeholder="Issue title" />
                <button type="submit">Add</button>
            </form>
            // <div>This is a placehoder for issue add</div>
        )
    }
}

const IssueRow = (props) => {
    const borderedStyle = {border: "1px solid silver", padding: 4};
    return (
            <tr>
            <td style={borderedStyle}>{props.children.id}</td>
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