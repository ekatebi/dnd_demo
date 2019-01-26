import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import YoDnd from '../../components/yoDnd.js'

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;
const Dnd = () => <h2>Dnd</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/about/" className="navbar-item" >About</Link>
            <Link to="/users/"className="navbar-item" >Users</Link>
            <Link to="/dnd/"className="navbar-item" >Dnd</Link>
          </div>
        </div>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Route path="/dnd/" component={YoDnd} />
    </div>
  </Router>
);

export default AppRouter;
