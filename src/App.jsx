import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouterProvider } from '../utils/RouterContext.jsx';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const App = () => { 
  return (
  <RouterProvider>
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
  </RouterProvider>
);
}

createRoot(document.getElementById('contents')).render(<App />);

if (module.hot) {
  module.hot.accept();
}