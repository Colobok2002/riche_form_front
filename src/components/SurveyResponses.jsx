import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SurveyResponses = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchedResponses = [
      ['Ответ 1 на вопрос 1', 'Ответ 1 на вопрос 2'],
      ['Ответ 2 на вопрос 1', 'Ответ 2 на вопрос 2']
    ];
    setResponses(fetchedResponses);
  }, [id]);

  return (
    <div className="container">
      <h1>Ответы на опрос {id}</h1>
      {responses.map((response, index) => (
        <div key={index} className="response-container">
          <h3>Ответ {index + 1}</h3>
          {response.map((answer, aIndex) => (
            <p key={aIndex}>
              <strong>Вопрос {aIndex + 1}:</strong> {answer}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SurveyResponses;
