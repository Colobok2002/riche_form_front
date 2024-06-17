import React, { useState } from 'react';
import { Button, Radio, Space } from 'antd';

const SurveyRespond = ({ survey }) => {
  const [answers, setAnswers] = useState([]);

  const handleAnswerChange = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log('Отправленные данные:', answers);
  };

  return (
    <div className="container">
      <h1>Ответ на опрос</h1>
      {survey.questions.map((q, qIndex) => (
        <div key={qIndex} className="question-container">
          <h3>{q.question}</h3>
          <Radio.Group onChange={(e) => handleAnswerChange(qIndex, e.target.value)}>
            {q.answers.map((a, aIndex) => (
              <Radio key={aIndex} value={a}>
                {a}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      ))}
      <Button type="primary" onClick={handleSubmit}>
        Отправить ответы
      </Button>
    </div>
  );
};

export default SurveyRespond;
