import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';
import './styles.css';

const favoriteLinks = [];
const setFavoriteLinks = () => {};
const menu = [];
const setOpenMenu = () => {};

const routerAuntf = createBrowserRouter([
  {
    path: "/",
    element: <App favoriteLinks={favoriteLinks} setFavoriteLinks={setFavoriteLinks} menu={menu} setOpenMenu={setOpenMenu} />,
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




