import React from "react";
import { Link, useParams } from 'react-router-dom';

export default function IssueEdit() {
  const { id } = useParams();
  return (
  <div>
  <p>This is a placeholder for editing issue {id}.</p>
  <Link to="/issues">Back to issue list</Link>
  </div>
  );
}