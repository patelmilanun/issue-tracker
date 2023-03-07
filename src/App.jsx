import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, Navigate, useSearchParams, BrowserRouter, useLocation } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const App = () => { 
  const [searchParams] = useSearchParams()
  const location = useLocation();
  console.log(location)
  return (
    <div>
      <div className="header">
        <h1>Issue Tracker</h1>
      </div>
      <div className="contents">
        <Routes>
          <Route path="/" element={<Navigate to="/issues" />} />
          <Route path="/issues" element={<IssueList status={searchParams} />} />
          <Route path="/issues/:id" element={<IssueEdit />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
      <div className="footer">
        Made with love and confusion thanks to react router dom.
      </div>
    </div>
);
}

createRoot(document.getElementById('contents')).render(
<BrowserRouter>
  <App />
</BrowserRouter>
);

if (module.hot) {
  module.hot.accept();
}