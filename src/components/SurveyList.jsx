import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import '../styles.css';

const SurveyList = () => {

  const [surveys, setSurveys] = useState([
    {
      "title": "Вопрос о косметике"
    },
    {
      "title": "Метрики с сайта"
    },
    {
      "title": "Что-нибудь"
    }
  ]);

  useEffect(() => {
    // Тут получаешь данные и записывваешь в surveys
  }, []);
  

  return (
    <div className="container">
      <div className="header">
        <h1>Список опросов</h1>
        <NavLink to="/create">
          <Button type="primary" className="create-survey-button">Создать опрос</Button>
        </NavLink>
      </div>
      <div className="survey-list">
        {surveys.map((survey, key) => (
          <div className="survey" key={key}>
            <div className="survey-title">{survey.title}</div>
            <div className="button-group">
              <NavLink to={`/edit/${key + 1}`}>
                <Button type="primary">Редактировать</Button>
              </NavLink>
              <NavLink to={`/copy-link/${key + 1}`}>
                <Button>Скопировать ссылку</Button>
              </NavLink>
              <NavLink to={`/responses/${key + 1}`}>
                <Button>Посмотреть ответы</Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;

