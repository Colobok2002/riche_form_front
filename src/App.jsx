import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import SurveyList from './components/SurveyList';
import SurveyEdit from './components/SurveyEdit';
import SurveyRespond from './components/SurveyRespond';
import SurveyResponses from './components/SurveyResponses';

const App = ({ favoriteLinks, setFavoriteLinks, menu, setOpenMenu }) => {
  const mockSurvey = {
    questions: [
      { question: 'Ваше любимое цвет?', answers: ['Красный', 'Синий', 'Зелёный'] },
      { question: 'Ваш любимое животное?', answers: ['Кошка', 'Собака', 'Птица'] }
    ]
  };

  const mockResponses = [
    ['Красный', 'Кошка'],
    ['Синий', 'Собака']
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<SurveyList />} />
        <Route path="/edit/:id" element={<SurveyEdit />} />
        <Route path="/respond/:id" element={<SurveyRespond survey={mockSurvey} />} />
        <Route path="/responses/:id" element={<SurveyResponses responses={mockResponses} />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default App;
