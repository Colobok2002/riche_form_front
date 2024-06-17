import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function SurveyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id !== 'new') {
      fetchSurvey(id).then(data => {
        form.setFieldsValue({
          title: data.title,
          questions: data.questions
        });
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id, form]);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    navigate('/');
  };

  return (
    <Form form={form} name="survey_edit" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="title"
        label="Название опроса"
        rules={[{ required: true, message: 'Введите название опроса!' }]}
      >
        <Input />
      </Form.Item>
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'question']}
                  fieldKey={[fieldKey, 'question']}
                  rules={[{ required: true, message: 'Введите вопрос!' }]}
                >
                  <Input placeholder="Вопрос" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Добавить вопрос
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {loading ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </Form.Item>
    </Form>
  );
}

async function fetchSurvey(id) {

  return {
    title: "Пример опроса",
    questions: [
      { question: "Ваше первое впечатление о продукте?", options: ["Отлично", "Хорошо", "Плохо"] },
      { question: "Что мы можем улучшить?", options: ["Сервис", "Цены", "Качество продукции"] }
    ]
  };
}

export default SurveyEdit;