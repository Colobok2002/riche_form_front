import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import './SurveyCreate.scss';

const SurveyCreate = () => {
  const [questions, setQuestions] = useState([]);
  const [dropdowns, setDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  const addQuestion = (type) => {
    setQuestions([...questions, { type, question: '', options: [''] }]);
  };

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

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
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
        </div>
      ))}
      <div className="active_btns">
        <div className="dropdown">
          <Button onClick={() => toggleDropdown('questionType')}>
            Добавить вопрос <DownOutlined />
          </Button>
          {dropdowns.questionType && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                Вопрос с одним ответом
                <Button type="link" onClick={(e) => { e.stopPropagation(); toggleDropdown('singleOptions'); }}>
                  <DownOutlined />
                </Button>
                {dropdowns.singleOptions && (
                  <div className="dropdown-submenu">
                    <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); addQuestion('single'); }}>
                      Вариант 1
                    </div>
                    <div className="dropdown-item" onClick={(e) => { e.stopPropagation(); addQuestion('single'); }}>
                      Вариант 2
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown-item" onClick={() => addQuestion('multiple')}>
                Вопрос с несколькими ответами
              </div>
              <div className="dropdown-item" onClick={() => addQuestion('text')}>
                Вопрос с текстовым ответом
              </div>
            </div>
          )}
        </div>
        <Button type="primary" onClick={handleSave}>
          Сохранить опрос
        </Button>
      </div>
    </div>
  );
};

export default SurveyCreate;
