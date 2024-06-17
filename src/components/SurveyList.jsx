import React from 'react';
import { Button } from 'antd';

const SurveyList = () => {
  return (
    <div>
      <h1>Список опросов</h1>
      <Button>Редактировать</Button>
      <Button>Скопировать ссылку</Button>
      <Button>Посмотреть ответы</Button>
      <Button type="primary">Создать опрос</Button>
    </div>
  );
};

export default SurveyList;