import React, { useContext } from 'react';
import { Link,  } from 'react-router-dom';

const Separator = () => <span> | </span>;

function IssueFilter() {
    return (
    <div>
        <Link to="/issues">All issues</Link>
        <Separator />
        <Link to={{ pathname: '/issues', search: '?status=Open' }}>
            Open Issues
        </Link>
        <Separator />
        <Link to={{ pathname: '/issues', search: '?status=Assigned' }}>
            Assigned Issues
        </Link>
    </div>
    );
    }

export default IssueFilter;