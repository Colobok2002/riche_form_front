import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const SurveyList = () => {
  return (
    <div className="container">
      <h1>Список опросов</h1>
      <div className="buttons-container">
        <NavLink to="/demo"><Button>Редактировать</Button></NavLink>
        <NavLink to="/edit"><Button>Скопировать ссылку</Button></NavLink>
        <NavLink to="#"><Button>Посмотреть ответы</Button></NavLink>
        <NavLink to="#"><Button type="primary">Создать опрос</Button></NavLink>
      </div>
    </div>
  );
};

export default SurveyList;
