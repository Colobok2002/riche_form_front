import React, { useState } from 'react';
import { Button, Input, Space, Radio, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
          <Input
            placeholder="Введите вопрос"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          {q.options.map((option, oIndex) => (
            <Space key={oIndex} className="option-container">
              {q.type === 'single' && <Radio />}
              {q.type === 'multiple' && <Checkbox />}
              <Input
                placeholder="Введите вариант"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              />
              <MinusCircleOutlined onClick={() => removeOption(qIndex, oIndex)} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => addOption(qIndex)} icon={<PlusOutlined />}>
            Добавить вариант
          </Button>
          <MinusCircleOutlined onClick={() => removeQuestion(qIndex)} />
        </div>
      ))}
      <Button type="dashed" onClick={() => addQuestion('single')} icon={<PlusOutlined />}>
        Добавить вопрос (один ответ)
      </Button>
      <Button type="dashed" onClick={() => addQuestion('multiple')} icon={<PlusOutlined />}>
        Добавить вопрос (несколько ответов)
      </Button>
      <Button type="primary" onClick={handleSave}>
        Сохранить опрос
      </Button>
    </div>
  );
};

export default SurveyCreate;
