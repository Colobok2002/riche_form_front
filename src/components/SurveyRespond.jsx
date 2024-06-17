
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Radio, Button } from 'antd';

function SurveyRespond() {
  let { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
  
    fetchSurvey(id).then(data => setSurvey(data));
  }, [id]);

  const onFinish = (values) => {
    console.log('Received responses:', values);

  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <Form onFinish={onFinish}>
      <h1>{survey.title}</h1>
      {survey.questions.map((item, index) => (
        <Form.Item name={`question_${index}`} key={index} label={item.question}>
          <Radio.Group>
            {item.options.map(option => (
              <Radio value={option} key={option}>{option}</Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      ))}
      <Button type="primary" htmlType="submit">
        Отправить ответы
      </Button>
    </Form>
  );
}

export default SurveyRespond;
