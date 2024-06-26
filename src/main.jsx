import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';
import './styles.css';
import SurveyList from './components/SurveyList';
import SurveyRespond from './components/SurveyRespond';
import SurveyResponses from './components/SurveyResponses';
import SurveyAbout from './components/SurveyAbout/SurveyAbout';
import EditResponses from './components/EditResponses';

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
    path: "/edit/:idSurvey",
    element: <SurveyAbout />,
  },
  {
    path: "/create",
    element: <SurveyAbout />,
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
    path: "/edit-responses/:idSurvey",
    element: <EditResponses />,
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





