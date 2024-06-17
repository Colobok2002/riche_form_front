import React, { useState } from 'react';
import { Button, Input, Space, Radio, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import "./SurveyCreate.scss"

const SurveyCreate = () => {
  const [questions, setQuestions] = useState([{ type: 'single', question: '', options: [''] }]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = (type) => {
    setQuestions([...questions, { type, question: '', options: [''] }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, optIndex) => optIndex !== oIndex);
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', questions);
  };

  return (
    <div className="container">
      <h1>Создание нового опроса</h1>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-container">
          <div className="question-title">
            <Input
              placeholder="Введите вопрос"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />
            <MinusCircleOutlined onClick={() => removeQuestion(qIndex)} />
          </div>

          {q.options.map((option, oIndex) => (
            <Space key={oIndex} className="option-container">
              {/* {q.type === 'single' && <Radio />}
              {q.type === 'multiple' && <Checkbox />} */}
              <Input
                placeholder="Введите вариант"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              />
              <MinusCircleOutlined onClick={() => removeOption(qIndex, oIndex)} />
            </Space>
          ))}
          <div>

            <Button type="dashed" onClick={() => addOption(qIndex)} icon={<PlusOutlined />}>
              Добавить вариант
            </Button>
            <Button type="dashed" onClick={() => addOption(qIndex)} icon={<PlusOutlined />}>
              E
            </Button>
          </div>

        </div>
      ))}
      <div className="active_btns">
        <Button type="primary" onClick={() => addQuestion('single')} icon={<PlusOutlined />}>
          Добавить вопрос
        </Button>
        <Button type="primary" onClick={handleSave}>
          Сохранить опрос
        </Button>
      </div>
    </div>
  );
};

export default SurveyCreate;
