// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, createRoutesFromElements, Routes, Route, RouterProvider, Navigate } from 'react-router-dom';

// import IssueList from './IssueList.jsx';
// import IssueEdit from './IssueEdit.jsx';

// const contentNode = document.getElementById('contents');

// const NoMatch = () => <p>Page not found</p>;


// createRoot(contentNode).render(
//   <Router>
//     <App />
//   </Router>
// );

import React from 'react';
import { createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const App = () => (
  <div>
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <div className="contents">
      <Routes>
        <Route path="/" element={<Navigate to="/issues" />} />
        <Route path="/issues" element={<IssueList />} />
        <Route path="/issues/:id" element={<IssueEdit />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
    <div className="footer">
      Made with love and confusion thanks to react router dom.
    </div>
  </div>
);

createRoot(document.getElementById('contents')).render(
  <Router>
    <App />
  </Router>
);

if (module.hot) {
  module.hot.accept();
}