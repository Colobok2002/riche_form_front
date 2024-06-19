import React, { useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const SurveyEdit = () => {

  const { id } = useParams()

  const [questions, setQuestions] = useState([{ id: 1, question: '', answers: [{ data: '', type: "multi" }] }]);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex].data = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    const newId = Math.max(...questions.map(q => q.id)) + 1;
    setQuestions([...questions, { id: newId, question: '', answers: [''] }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const addAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push({ data: '', type: "multi" });
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
    const currentIndex = questions.indexOf(draggingItem);
    const targetIndex = questions.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(currentIndex, 1);
      updatedQuestions.splice(targetIndex, 0, draggingItem);
      setQuestions(updatedQuestions);
    }
  };

  return (
    <div className="container">
      {id ? (
        <h1>Редактирование опроса</h1>

      ) : (
        <h1>Создать опрос</h1>
      )}
      {questions.map((q, qIndex) => (
        <div
          key={q.id}
          className={`question-container ${q === draggingItem ? 'dragging' : ''}`}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, q)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, q)}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Input
                placeholder="Введите вопрос"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
              <MinusCircleOutlined onClick={() => removeQuestion(qIndex)} />
            </div>
              <Select style={{width : 300}}options={[{ value: 'multi', label: <span>Мнодество ответов</span> },{ value: 'one', label: <span>Один ответ</span> },{ value: 'text', label: <span>Текст</span> }]} ></Select>
            {q.answers.map((a, aIndex) => (
              <Space key={aIndex} style={{ display: 'flex', marginBottom: 8 }}>
                {console.log(a)}
                {a.type}
                <Input
                  placeholder="Введите ответ"
                  value={a.data}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                />
                <MinusCircleOutlined onClick={() => removeAnswer(qIndex, aIndex)} />
              </Space>
            ))}
            <Button type="dashed" onClick={() => addAnswer(qIndex)} icon={<PlusOutlined />}>
              Добавить ответ
            </Button>
          </Space>
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
