import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';
import './styles.css';
import SurveyEdit from './components/SurveyEdit';

const favoriteLinks = [];
const setFavoriteLinks = () => { };
const menu = [];
const setOpenMenu = () => { };

const routerAuntf = createBrowserRouter([
  {
    path: "/",
    element: <App favoriteLinks={favoriteLinks} setFavoriteLinks={setFavoriteLinks} menu={menu} setOpenMenu={setOpenMenu} />,
    children: [
      {
        path: "/demo",
        element: <div>Login Page</div>,
      },
      {
        path: "/edit/:id",
        element: <SurveyEdit />,
      }
    ]
  },
  {
    path: "*",
    element: <>Страница не найлена</>,
  },
]);

const routerNoAuntf = createBrowserRouter([
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
]);

const userAuntifucate = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={userAuntifucate ? routerAuntf : routerNoAuntf} />
  </React.StrictMode>
);




