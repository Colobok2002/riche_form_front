import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SurveyList from './components/SurveyList';
import SurveyEdit from './components/SurveyEdit';
import SurveyRespond from './components/SurveyRespond';
import SurveyResponses from './components/SurveyResponses';

const App = ({ favoriteLinks, setFavoriteLinks, menu, setOpenMenu }) => {
  return (
    <Routes>
      123
      <Route path="/" element={<SurveyList />} />
      <Route path="/edit/:id" element={<SurveyEdit />} />
      <Route path="/respond/:id" element={<SurveyRespond />} />
      <Route path="/responses/:id" element={<SurveyResponses />} />
    </Routes>
  );
};

export default App;
