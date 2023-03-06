import React from "react";
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// export default class IssueEdit extends React.Component {
//     render() {
//       return (
//         <div>
//           <p>This is a placeholder for editing issue {this.props.params.id}.</p> 
//           <Link to="/issues">Back to issue list</Link>
//         </div>
//       );
//   } }

export default function IssueEdit({ params }) {
  const { id } = useParams();
  return (
  <div>
  <p>This is a placeholder for editing issue {id}.</p>
  <Link to="/issues">Back to issue list</Link>
  </div>
  );
}

// IssueEdit.propTypes = {
//   params: React.PropTypes.object.isRequired,
// };

IssueEdit.propTypes = {
  params: PropTypes.shape({
  id: PropTypes.number.isRequired
  }).isRequired,
  };