'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var issues = [{
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add'
}, {
    id: 2, status: 'Assigned', owner: 'Eddie', created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel'
}];

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
            var newIssues = this.state.issues.slice();
            newIssue.id = this.state.issues.length + 1;
            newIssues.push(newIssue);
            this.setState({
                issues: newIssues
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
            var _this2 = this;

            setTimeout(function () {
                _this2.setState({ issues: issues });
            }, 500);
        }

        // createTestIssue() {
        //     this.createIssue({
        //         status: 'New', owner: 'Ritik', created: new Date(),
        //         title: 'Completion date should be optional',
        //     })
        // }

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
                React.createElement(IssueAdd, { createIssue: this.createIssue })
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
                    { key: issue.id },
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

var IssueAdd = function (_React$Component3) {
    _inherits(IssueAdd, _React$Component3);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        var _this4 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

        _this4.handleSubmit = _this4.handleSubmit.bind(_this4);
        return _this4;
    }

    _createClass(IssueAdd, [{
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
            var form = document.forms.issueAdd;
            this.props.createIssue({
                owner: form.owner.value,
                title: form.title.value,
                status: 'New',
                created: new Date()
            });

            form.owner.value = "";
            form.title.value = "";
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { name: 'issueAdd', onSubmit: this.handleSubmit },
                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Issue owner' }),
                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Issue title' }),
                React.createElement(
                    'button',
                    { type: 'submit' },
                    'Add'
                )
            )
            // <div>This is a placehoder for issue add</div>
            ;
        }
    }]);

    return IssueAdd;
}(React.Component);

var IssueRow = function IssueRow(props) {
    var borderedStyle = { border: "1px solid silver", padding: 4 };
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            { style: borderedStyle },
            props.children.id
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