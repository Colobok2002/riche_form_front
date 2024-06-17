
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, Typography } from 'antd';

function SurveyResponses() {
  let { id } = useParams();
  const [responses, setResponses] = useState([]);


  useEffect(() => {

    const fetchResponses = async () => {

      const data = await fetch(`https://your-api/responses/${id}`);
      const json = await data.json();
      setResponses(json);
    };

    fetchResponses();
  }, [id]);

  return (
    <div>
      <Typography.Title level={2}>Ответы на опрос #{id}</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={responses}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={`Ответ #${item.id}`}
              description={item.response}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default SurveyResponses;


