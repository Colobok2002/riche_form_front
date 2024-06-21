import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Radio, Checkbox, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import "./SurveyAbout.scss";
import getApi from '../../services/api';
import { ApiUrl } from '../../../Constaints';
import { useParams } from 'react-router-dom';

const { Option } = Select;

const SurveyAbout = () => {

  const { api } = getApi()

  const { idSurvey } = useParams()

  const [questions, setQuestions] = useState({ 1: { type: 'single', question: '', answers: { "1": { "answer": "" } } } });
  const [draggingItem, setDraggingItem] = useState(null);
  const [surveyName, setSurveyName] = useState("")

  const handleQuestionChange = (index, value) => {
    const newQuestions = { ...questions };
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswersChange = (ordering, orderingAnsver, value) => {
    const newQuestions = { ...questions };
    questions[ordering].answers[orderingAnsver].answer = value;
    setQuestions(newQuestions);
  };

  const handleSelektAnsver = (ordering, orderingAnsver) => {
    const newQuestions = { ...questions };
    if (newQuestions[ordering].type === "single") {
      for (let key in newQuestions[ordering].answers) {
        if (newQuestions[ordering].answers.hasOwnProperty(key) && key != orderingAnsver) {
          newQuestions[ordering].answers[key].selected = false;
        }
      }
      newQuestions[ordering].answers[orderingAnsver].selected = !newQuestions[ordering].answers[orderingAnsver].selected;
    } else {
      if ('selected' in newQuestions[ordering].answers[orderingAnsver]) {
        newQuestions[ordering].answers[orderingAnsver].selected = !newQuestions[ordering].answers[orderingAnsver].selected;
      } else {
        newQuestions[ordering].answers[orderingAnsver].selected = true;
      }
    }

    setQuestions(newQuestions);
  };

  const handleTypeChange = (index, value) => {
    const newQuestions = { ...questions };
    newQuestions[index].type = value;
    setQuestions(newQuestions);
  };

  const addQuestion = (type) => {

    const oldState = { ...questions }
    const newQuestion = {
      type: type,
      question: '',
      answers: { "1": { "answer": "" } }
    }
    oldState[Object.keys(oldState).length + 1] = newQuestion
    setQuestions(oldState);
  };


  const removeQuestion = (index) => {
    const newQuestions = { ...questions };
    delete newQuestions[index];
    setQuestions(newQuestions);
  };

  const addAnswers = (qIndex) => {
    const newQuestions = { ...questions };
    newQuestions[qIndex].answers[Object.keys(newQuestions[qIndex].answers).length + 1] = { "answer": "" }
    setQuestions(newQuestions);
  };

  const removeAnswers = (qIndex, oIndex) => {
    const newQuestions = { ...questions };
    delete newQuestions[qIndex].answers[oIndex];
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    const data = {
      "name": "Тестовый опрос",
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
    const responseData = {
      "name": surveyName,
      "id": idSurvey,
      "data": questions

    }
    console.log(data)
    console.log(responseData)
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

  const handleDrop = (_, targetItem) => {

    if (draggingItem && targetItem) {
      const newQuestions = { ...questions };
      const temp = newQuestions[draggingItem];
      newQuestions[draggingItem] = newQuestions[targetItem];
      newQuestions[targetItem] = temp;
      setQuestions(newQuestions);
    }

    setDraggingItem(null);
  };

  return (
    <div className="container">
      {idSurvey ? (
        <h1>Редактировать опрос</h1>
      ) : (

        <h1>Создание нового опроса</h1>
      )
      }
      <Input
        placeholder="Название опроса"
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
      />
      {
        Object.keys(questions).map((ordering, qIndex) => (
          <div key={ordering} className="question-container"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, ordering)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, ordering)}
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

            {questions[ordering].type !== 'text' && Object.keys(questions[ordering].answers).map((orderingAnsver, oIndex) => (
              <Space key={oIndex} className="option-container">
                {questions[ordering].type === 'single' ? (
                  <Radio
                    checked={questions[ordering].answers[orderingAnsver]?.selected}
                    onChange={() => handleSelektAnsver(ordering, orderingAnsver)}
                  >
                  </Radio>
                ) : (
                  <Checkbox
                    checked={questions[ordering].answers[orderingAnsver]?.selected}
                    onChange={() => handleSelektAnsver(ordering, orderingAnsver)}
                  >
                  </Checkbox>
                )}
                <Input
                  placeholder="Введите вариант"
                  value={questions[ordering].answers[orderingAnsver].answer}
                  onChange={(e) => handleAnswersChange(ordering, orderingAnsver, e.target.value)}
                />
                <MinusCircleOutlined onClick={() => removeAnswers(ordering, orderingAnsver)} />
              </Space>
            ))}

            {questions[ordering].type === 'text' && (
              <Space className="option-container">
                <Input
                  placeholder="Введите ваш ответ"
                  value={questions[ordering].answers[0]}
                // onChange={(e) => handleOptionChange(ordering, 0, e.target.value)}
                />
              </Space>
            )}

            {questions[ordering].type !== 'text' && (
              <div>
                <Button type="dashed" onClick={() => addAnswers(ordering)} icon={<PlusOutlined />}>
                  Добавить вариант
                </Button>
              </div>
            )}
          </div>
        ))
      }
      <div className="active_btns">
        <Button type="primary" onClick={() => addQuestion('single')} icon={<PlusOutlined />}>
          Добавить вопрос
        </Button>
        <Button type="primary" onClick={handleSave}>
          Сохранить опрос
        </Button>
      </div>
    </div >
  );
};

export default SurveyAbout;
