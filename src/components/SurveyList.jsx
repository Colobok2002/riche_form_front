import React, { useState } from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

const SurveyList = () => {

  const [surveys, setSurveys] = useState([
    {
      "title": "Вопрос о косметикие"
    },
    {
      "title": "Метрики с сайта"
    },
    {
      "title": "Гйцуцуцйу"
    }
  ])
  return (
    <div className="container" >
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <h1>Список опросов</h1>
        {/* <div className="buttons-container">
        <NavLink to="/edit/1">
        <Button type="primary">Редактировать</Button>
        </NavLink>
        <NavLink to="/copy-link">
        <Button>Скопировать ссылку</Button>
        </NavLink>
        <NavLink to="/responses">
        <Button>Посмотреть ответы</Button>
        </NavLink>
        
        </div> */}
        <NavLink to="/create">
          <Button type="primary" className="create-survey-button">Создать опрос</Button>
        </NavLink>
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
        {surveys.map((survey, key) => (
          <div className="survey" key={key} style={{ display: "flex", background: "red", flexDirection: "column", padding: 10, borderRadius: 10 }}>
            {survey.title}
            <NavLink to="/edit/1">
              <Button type="primary">Редактировать</Button>
            </NavLink>
            <NavLink to="/copy-link">
              <Button>Скопировать ссылку</Button>
            </NavLink>
            <NavLink to="/responses">
              <Button>Посмотреть ответы</Button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;
