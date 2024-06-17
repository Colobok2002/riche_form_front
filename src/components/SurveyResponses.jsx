import React from 'react';

const SurveyResponses = ({ responses }) => {
  return (
    <div className="container">
      <h1>Ответы на опрос</h1>
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


