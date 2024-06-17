import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const SurveyList = () => {
  return (
    <div>
      <h1>Список опросов</h1>
      <NavLink to={"/demo"}>Редактировать</NavLink>
      <NavLink to={"/edit"}>Скопировать ссылку</NavLink>
      <NavLink>Посмотреть ответы</NavLink>
      <NavLink type="primary">Создать опрос</NavLink>
    </div>
  );
};

export default SurveyList;