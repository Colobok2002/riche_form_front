import React, { useState } from 'react';
import { Button, Input, Space, Radio, Checkbox, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import "./SurveyCreate.scss";

const { Option } = Select;

const SurveyCreate = () => {
  const [questions, setQuestions] = useState([{ type: 'single', question: '', options: [''] }]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value, isChecked) => {
    const newQuestions = [...questions];
    if (questions[qIndex].type === 'single') {
        newQuestions[qIndex].options = newQuestions[qIndex].options.map((_, idx) => idx === oIndex ? value : '');
    } else if (questions[qIndex].type === 'multiple') {
        newQuestions[qIndex].options[oIndex] = isChecked ? 'Отмечено' : '';
    } else {
        newQuestions[qIndex].options[oIndex] = value;
    }
    setQuestions(newQuestions);
};

  const handleTypeChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].type = value;
    newQuestions[index].options = [''];
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
            <Select
              value={q.type}
              onChange={(value) => handleTypeChange(qIndex, value)}
              style={{ width: 200, marginLeft: 10 }}
            >
              <Option value="single">Вопрос с одним ответом</Option>
              <Option value="multiple">Вопрос с несколькими ответами</Option>
              <Option value="text">Текстовый вопрос</Option>
            </Select>
            <MinusCircleOutlined onClick={() => removeQuestion(qIndex)} />
          </div>

          {q.type !== 'text' && q.options.map((option, oIndex) => (
            <Space key={oIndex} className="option-container">
              {q.type === 'single' ? (
                <Radio
                  checked={option !== ''}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                >
                  <Input
                    placeholder="Введите вариант"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  />
                </Radio>
              ) : (
                <Checkbox
                    checked={option.includes('Отмечено')}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, 'Отмечено', e.target.checked)}
                >
                    <Input
                        placeholder="Введите вариант"
                        value={option.replace('Отмечено', '')}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value, e.target.checked)}
                    />
                </Checkbox>

              )}
              <MinusCircleOutlined onClick={() => removeOption(qIndex, oIndex)} />
            </Space>
          ))}

          {q.type === 'text' && (
            <Space key={qIndex} className="option-container">
              <Input
                placeholder="Введите ваш ответ"
                value={q.options[0]}
                onChange={(e) => handleOptionChange(qIndex, 0, e.target.value)}
              />
            </Space>
          )}

          {q.type !== 'text' && (
            <div>
              <Button type="dashed" onClick={() => addOption(qIndex)} icon={<PlusOutlined />}>
                Добавить вариант
              </Button>
            </div>
          )}
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
