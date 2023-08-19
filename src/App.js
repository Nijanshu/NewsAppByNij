// App.js
import './App.css';
import React, { Component } from 'react';
import News from './Components/news';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
         {/* <News/> */}
          <Routes>
          
            <Route path="/sports" element={<News key="sports" country="in" category="sports" />} />
            <Route path="/entertainment" element={<News key="entertainment" country="in" category="entertainment" />} />
            <Route path="/science" element={<News key="science" country="in" category="science" />} />
            <Route path="/technology" element={<News key="technology" country="in" category="technology" />} />
            <Route path='/' element={<News key="general" country="in" category="general" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
