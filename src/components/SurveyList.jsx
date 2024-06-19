import React, { useState } from 'react';
import { Button, Radio, Checkbox, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import '../styles.css';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([
    { title: "Вопрос о косметике" },
    { title: "Метрики с сайта" },
    { title: "Что-нибудь" }
  ]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [singleOptionsVisible, setSingleOptionsVisible] = useState(false);
  const [multipleOptionsVisible, setMultipleOptionsVisible] = useState(false);
  const [textOptionsVisible, setTextOptionsVisible] = useState(false);
  const [selectedSingleOption, setSelectedSingleOption] = useState(null);
  const [selectedMultipleOptions, setSelectedMultipleOptions] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleSingleOptions = (e) => {
    e.stopPropagation();
    setSingleOptionsVisible(!singleOptionsVisible);
  };

  const toggleMultipleOptions = (e) => {
    e.stopPropagation();
    setMultipleOptionsVisible(!multipleOptionsVisible);
  };

  const toggleTextOptions = (e) => {
    e.stopPropagation();
    setTextOptionsVisible(!textOptionsVisible);
  };

  const handleSingleOptionSelect = (e) => {
    setSelectedSingleOption(e.target.value);
  };

  const handleMultipleOptionSelect = (checkedValues) => {
    setSelectedMultipleOptions(checkedValues);
  };

  const handleTextChange = (e) => {
    setTextAnswer(e.target.value);
  };

  const handleAddTextAnswer = () => {
    console.log("Добавленный текстовый ответ:", textAnswer);
    setTextAnswer("");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Список опросов</h1>
        <div className="dropdown">
          <Button type="primary" className="create-survey-button" onClick={toggleDropdown}>
            <DownOutlined />Создать опрос 
          </Button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <Button type="link" onClick={toggleSingleOptions}>
                  <DownOutlined /> Вопрос с одним ответом
                </Button>
                {singleOptionsVisible && (
                  <div className="dropdown-submenu">
                    <Radio.Group onChange={handleSingleOptionSelect} value={selectedSingleOption} className="vertical-radio-group">
                      <Radio value="Вариант 1">Вариант 1</Radio>
                      <Radio value="Вариант 2">Вариант 2</Radio>
                    </Radio.Group>
                  </div>
                )}
              </div>
              <div className="dropdown-item">
                <Button type="link" onClick={toggleMultipleOptions}>
                  <DownOutlined /> Вопрос с несколькими ответами
                </Button>
                {multipleOptionsVisible && (
                  <div className="dropdown-submenu">
                    <Checkbox.Group onChange={handleMultipleOptionSelect} value={selectedMultipleOptions} className="vertical-checkbox-group">
                      <Checkbox value="Вариант 1">Вариант 1</Checkbox>
                      <Checkbox value="Вариант 2">Вариант 2</Checkbox>
                      <Checkbox value="Вариант 3">Вариант 3</Checkbox>
                    </Checkbox.Group>
                  </div>
                )}
              </div>
              <div className="dropdown-item">
                <Button type="link" onClick={toggleTextOptions}>
                  <DownOutlined /> Вопрос с текстовым ответом
                </Button>
                {textOptionsVisible && (
                  <div className="dropdown-submenu">
                    <Input
                      placeholder="Введите ваш ответ"
                      value={textAnswer}
                      onChange={handleTextChange}
                    />
                    <Button type="primary" onClick={handleAddTextAnswer}>
                      Добавить
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="survey-list">
        {surveys.map((survey, key) => (
          <div className="survey" key={key}>
            <div className="survey-title">{survey.title}</div>
            <div className="button-group">
              <NavLink to={`/edit/${key + 1}`}>
                <Button type="primary">Редактировать</Button>
              </NavLink>
              <NavLink to={`/copy-link/${key + 1}`}>
                <Button>Скопировать ссылку</Button>
              </NavLink>
              <NavLink to={`/responses/${key + 1}`}>
                <Button>Посмотреть ответы</Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;
