// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyList from './components/SurveyList';
import SurveyEdit from './components/SurveyEdit';
import SurveyRespond from './components/SurveyRespond';
import SurveyResponses from './components/SurveyResponses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurveyList />} />
        <Route path="/edit/:id" element={<SurveyEdit />} />
        <Route path="/respond/:id" element={<SurveyRespond />} />
        <Route path="/responses/:id" element={<SurveyResponses />} />
      </Routes>
    </Router>
  );
}

export default App;

