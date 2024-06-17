import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const SurveyList = () => {
  return (
    <div className="container">
      <h1>Список опросов</h1>
      <div className="buttons-container">
        <NavLink to="/edit/1">
          <Button type="primary">Редактировать</Button>
        </NavLink>
        <NavLink to="/copy-link">
          <Button>Скопировать ссылку</Button>
        </NavLink>
        <NavLink to="/responses">
          <Button>Посмотреть ответы</Button>
        </NavLink>
        <NavLink to="/create">
          <Button type="primary" className="create-survey-button">Создать опрос</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default SurveyList;
