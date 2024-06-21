import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Radio, Checkbox, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import "./SurveyCreate.scss";
import getApi from '../../services/api';
import { ApiUrl } from '../../../Constaints';

const { Option } = Select;

const SurveyCreate = () => {

  const { api } = getApi()

  const [questions, setQuestions] = useState({ 1: { type: 'single', question: '', options: [''] } });
  const [draggingItem, setDraggingItem] = useState(null);

  const handleQuestionChange = (index, value) => {
    console.log(index)
    const newQuestions = { ...questions };
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (ordering, oIndex, value, isChecked) => {
    const newQuestions = {...questions};
    if (questions[ordering].type === 'single') {
      newQuestions[ordering].options = newQuestions[ordering].options.map((_, idx) => idx === oIndex ? value : '');
    } else if (questions[ordering].type === 'multiple') {
      newQuestions[ordering].options[oIndex] = isChecked ? 'Отмечено' : '';
    } else {
      newQuestions[ordering].options[oIndex] = value;
    }
    setQuestions(newQuestions);
  };

  const handleTypeChange = (index, value) => {
    const newQuestions = { ...questions };
    newQuestions[index].type = value;
    newQuestions[index].options = [''];
    setQuestions(newQuestions);
  };

  const addQuestion = (type) => {

    const oldState = { ...questions }
    const newQuestion = {
      type,
      question: '',
      options: [''],
      id: Math.random().toString(36).substr(2, 9)
    };
    oldState[Object.keys(oldState).length + 1] = newQuestion
    setQuestions(oldState);
  };


  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = { ...questions };
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = { ...questions };
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, optIndex) => optIndex !== oIndex);
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    console.log(questions)
    const data = {
      "name": "Тестовый опрос",
      // "id": ,
      "data": {
        "1": {
          "question": "Назовите ваш пол этот теперь первый",
          "answers": { "1": { "answer": "М" }, "2": { "answer": "Ж" } },
        },
        "2": {
          "id": 2,
          "question": "Назовите ваш имя (Изм вопрос)",
          "answers": {
            "1": { "answer": "Илья" },
            "2": { "answer": "Вадим" },
            "3": { "answer": "Миша" },
          },
        },
        "3": {
          "question": "Новый вопрос",
          "answers": { "1": { "answer": "М" }, "2": { "answer": "Ж" } },
        },
      },
    }
    console.log(data)
    // api.post(ApiUrl + "records/create-survey", data).then((response) => {
    //   console.log(response.data)
    // })
    // console.log('Сохраненные данные:', questions);
  };


  const handleDragStart = (e, item) => {
    setDraggingItem(item);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    const currentIndex = questions.findIndex(item => item.id === draggingItem.id);
    const targetIndex = questions.findIndex(item => item.id === targetItem.id);

    if (currentIndex !== -1 && targetIndex !== -1 && currentIndex !== targetIndex) {
      const updatedQuestions = { ...questions };
      updatedQuestions.splice(currentIndex, 1);
      updatedQuestions.splice(targetIndex, 0, draggingItem);

      setQuestions(updatedQuestions);
    }
    setDraggingItem(null);
  };

  return (
    <div className="container">
      <h1>Создание нового опроса</h1>
      {Object.keys(questions).map((ordering, qIndex) => (
        <div key={ordering} className="question-container"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, q)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, q)}
        >
          <div className="question-title">
            <Input
              placeholder="Введите вопрос"
              value={questions[ordering].question}
              onChange={(e) => handleQuestionChange(ordering, e.target.value)}
            />
            <Select
              value={questions[ordering].type}
              onChange={(value) => handleTypeChange(ordering, value)}
              style={{ width: 200, marginLeft: 10 }}
            >
              <Option value="single">Вопрос с одним ответом</Option>
              <Option value="multiple">Вопрос с несколькими ответами</Option>
              <Option value="text">Текстовый вопрос</Option>
            </Select>
            <MinusCircleOutlined onClick={() => removeQuestion(ordering)} />
          </div>

          {questions[ordering].type !== 'text' && questions[ordering].options.map((option, oIndex) => (
            <Space key={oIndex} className="option-container">
              {questions[ordering].type === 'single' ? (
                <Radio
                  checked={option !== ''}
                  onChange={(e) => handleOptionChange(ordering, oIndex, e.target.value)}
                >
                  <Input
                    placeholder="Введите вариант"
                    value={option}
                    onChange={(e) => handleOptionChange(ordering, oIndex, e.target.value)}
                  />
                </Radio>
              ) : (
                <Checkbox
                  checked={option.includes('Отмечено')}
                  onChange={(e) => handleOptionChange(ordering, oIndex, 'Отмечено', e.target.checked)}
                >
                  <Input
                    placeholder="Введите вариант"
                    value={option.replace('Отмечено', '')}
                    onChange={(e) => handleOptionChange(ordering, oIndex, e.target.value, e.target.checked)}
                  />
                </Checkbox>

              )}
              <MinusCircleOutlined onClick={() => removeOption(ordering, oIndex)} />
            </Space>
          ))}

          {questions[ordering].type === 'text' && (
            <Space className="option-container">
              <Input
                placeholder="Введите ваш ответ"
                value={questions[ordering].options[0]}
                onChange={(e) => handleOptionChange(ordering, 0, e.target.value)}
              />
            </Space>
          )}

          {questions[ordering].type !== 'text' && (
            <div>
              <Button type="dashed" onClick={() => addOption(ordering)} icon={<PlusOutlined />}>
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
