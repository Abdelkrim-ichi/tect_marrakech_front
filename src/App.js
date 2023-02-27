import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ArticleList from './ArticleList'
import AddArticle from './AddArticle';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <nav>
      <div className="ui container">
        <div className='row'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Article list</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addArticle">Add Article</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Routes>
          <Route exact path = "/" element = {<ArticleList />} />
          <Route path = "/addArticle" element = { <AddArticle/> } />
        </Routes>
      </div> 
      </nav> 
    </Router>
  );
}

export default App;
