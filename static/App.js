'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IssueAdd = require('./IssueAdd.jsx');

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var IssueList = function (_React$Component) {
    _inherits(IssueList, _React$Component);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this.state = { issues: [] };
        // this.createTestIssue = this.createTestIssue.bind(this);
        _this.createIssue = _this.createIssue.bind(_this);
        // setTimeout(this.createTestIssue, 2000);
        return _this;
    }

    _createClass(IssueList, [{
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var _this2 = this;

            fetch('/api/issues', {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(newIssue)
            }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (updatedIssue) {
                        updatedIssue.created = new Date(updatedIssue.created);
                        if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                        var newIssues = _this2.state.issues.concat(updatedIssue);
                        _this2.setState({ issues: newIssues });
                    });
                } else {
                    response.json().then(function (error) {
                        alert("Failed to add issue: " + error.message);
                    });
                }
            }).catch(function (err) {
                alert("Error in sending data to server: " + err.message);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function loadData() {
            var _this3 = this;

            // setTimeout(() => {
            //     this.setState({issues: issues})
            // }, 500);
            fetch('/api/issues').then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("Total count of records: ", data._metaData.total_count);
                        data.records.forEach(function (issue) {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
                        });
                        _this3.setState({ issues: data.records });
                    });
                } else {
                    response.json().then(function (error) {
                        alert('Failed to fetch issues:' + error.message);
                    });
                }
            }).catch(function (err) {
                return console.log('Error in fetching data from server:', err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Issue tracker'
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: this.state.issues }),
                React.createElement('hr', null),
                React.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(React.Component);

var IssueFilter = function (_React$Component2) {
    _inherits(IssueFilter, _React$Component2);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a placehoder for issue filter'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

var IssueTable = function IssueTable(props) {
    return React.createElement(
        'table',
        { className: 'bordered-table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'Id'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'Created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                React.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            props.issues.map(function (issue) {
                return React.createElement(
                    IssueRow,
                    { key: issue._id },
                    issue
                );
            })
        )
    );
};

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


var IssueRow = function IssueRow(props) {
    var borderedStyle = { border: "1px solid silver", padding: 4 };
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children._id
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children.status
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children.owner
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children.created.toDateString()
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children.effort
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children.completionDate ? props.children.completionDate.toDateString() : ''
        ),
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children.title
        )
    );
};

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

ReactDOM.render(React.createElement(IssueList, null), contentNode);