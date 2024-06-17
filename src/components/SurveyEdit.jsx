import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const SurveyEdit = () => {
  const [questions, setQuestions] = useState([{ question: '', answers: [''] }]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: [''] }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const addAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push('');
    setQuestions(newQuestions);
  };

  const removeAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter((_, ansIndex) => ansIndex !== aIndex);
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', questions);
  };

  return (
    <div className="container">
      <h1>Редактирование опроса</h1>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-container">
          <Input
            placeholder="Введите вопрос"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          {q.answers.map((a, aIndex) => (
            <Space key={aIndex} className="answer-container">
              <Input
                placeholder="Введите ответ"
                value={a}
                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
              />
              <MinusCircleOutlined onClick={() => removeAnswer(qIndex, aIndex)} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => addAnswer(qIndex)} icon={<PlusOutlined />}>
            Добавить ответ
          </Button>
          <MinusCircleOutlined onClick={() => removeQuestion(qIndex)} />
        </div>
      ))}
      <Button type="dashed" onClick={addQuestion} icon={<PlusOutlined />}>
        Добавить вопрос
      </Button>
      <Button type="primary" onClick={handleSave}>
        Сохранить опрос
      </Button>
    </div>
  );
};

export default SurveyEdit;
