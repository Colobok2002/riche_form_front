import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';
import './styles.css';
import SurveyList from './components/SurveyList';
import SurveyEdit from './components/SurveyEdit';
import SurveyRespond from './components/SurveyRespond';
import SurveyResponses from './components/SurveyResponses';
import SurveyCreate from './components/SurveyCreate/SurveyCreate';

const mockSurvey = {
  questions: [
    { question: 'Ваше любимый цвет?', answers: ['Красный', 'Синий', 'Зелёный'] },
    { question: 'Ваше любимое животное?', answers: ['Кошка', 'Собака', 'Птица'] }
  ]
};

const mockResponses = [
  ['Красный', 'Кошка'],
  ['Синий', 'Собака']
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <SurveyList />,
  },
  {
    path: "/edit/:id",
    element: <SurveyEdit />,
  },
  {
    path: "/respond/:id",
    element: <SurveyRespond survey={mockSurvey} />,
  },
  {
    path: "/responses/:id",
    element: <SurveyResponses responses={mockResponses} />,
  },
  {
    path: "/create",
    element: <SurveyCreate />,
  },
  {
    path: "*",
    element: <div>Страница не найдена</div>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);





