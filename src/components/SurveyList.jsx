import React from 'react';
import { Button, List, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import { CopyOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

function SurveyList({ surveys }) {
  const copyLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/respond/${id}`)
    .then(() => message.success('Ссылка скопирована!'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Список опросов</h1>
      <List
        itemLayout="horizontal"
        dataSource={surveys}
        renderItem={survey => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => window.location.href=`/edit/${survey.id}`}>Редактировать</Button>,
              <Button icon={<CopyOutlined />} onClick={() => copyLink(survey.id)}>Копировать ссылку</Button>,
              <Link to={`/responses/${survey.id}`}><Button icon={<EyeOutlined />}>Просмотреть ответы</Button></Link>
            ]}
          >
            <List.Item.Meta
              title={survey.title}
            />
          </List.Item>
        )}
      />
      <Link to="/edit/new"><Button type="primary" style={{ marginTop: 16 }}>Создать опрос</Button></Link>
    </div>
  );
}

export default SurveyList;
