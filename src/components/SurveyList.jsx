import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import '../styles.css';
import getApi from '../services/api';
import { ApiUrl } from '../../Constaints';

const SurveyList = () => {
  const { api } = getApi();

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
    api.get(ApiUrl + 'records/get-all-surveys').then((response) => {
      setSurveys(response.data);
    });
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
          <div className="survey" key={survey.id}>
            <div className="survey-title">{survey.title}</div>
            <div className="button-group">
              <NavLink to={`/edit/${survey.id}`}>
                <Button type="primary">Редактировать</Button>
              </NavLink>
              <NavLink to={`/copy-link/${survey.id}`}>
                <Button>Скопировать ссылку</Button>
              </NavLink>
              <NavLink to={`/responses/${survey.id}`}>
                <Button>Посмотреть ответы</Button>
              </NavLink>
              <NavLink to={`/edit-responses/${survey.id}`}>
                <Button>Редактировать ответы</Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;

