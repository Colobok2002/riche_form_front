import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./SurveyCreate.scss";

const SurveyCreate = () => {
  const [questions, setQuestions] = useState([{ id: '1', type: 'single', question: '', options: [''] }]);

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
    const id = (questions.length + 1).toString();
    setQuestions([...questions, { id, type, question: '', options: [''] }]);
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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newQuestions = Array.from(questions);
    const [reorderedQuestion] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, reorderedQuestion);
    setQuestions(newQuestions);
  };

  return (
    <div className="container">
      <h1>Создание нового опроса</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((q, qIndex) => (
                <Draggable key={q.id} draggableId={q.id} index={qIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="question-container"
                    >
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
