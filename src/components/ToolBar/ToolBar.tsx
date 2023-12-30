import * as React from 'react';
import {NavLink} from 'react-router-dom';

const ToolBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
            <NavLink className="navbar-brand nav-link" to="/">
              Finance
            </NavLink>
          <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav mt-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categories">Categories</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders">Add</NavLink>
                </li>
              </ul>
          </div>
        </div>
    </nav>
  );
};

export default ToolBar;