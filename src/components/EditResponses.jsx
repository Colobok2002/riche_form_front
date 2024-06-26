import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import getApi from '../services/api';
import { ApiUrl } from '../../Constaints';

const EditResponses = () => {
    const { idSurvey } = useParams();
    const { api } = getApi();
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        api.get(`{ApiUrl}records/get-responses&survey_id=${idSurvey}`).then((response) => {
            setResponses(response.data);
        });
    }, [idSurvey]);

    const handleResponseChange = (responseIndex, questionIndex, value) => {
        const updatedResponses = [...responses];
        updatedResponses[responseIndex][questionIndex] = value;
        setResponses(updatedResponses);
    };

    const handleSave = () => {
        api.post(`${ApiUrl}records/update-responses`, { idSurvey, responses }).then((response) => {
         console.log('Responses update:', response.data)
        });
    };

    return(
        <div className="container">
            <h1>Редактировать ответы на опрос</h1>
            {responses.map((response, responseIndex) => (
                <div key={responseIndex} className="response-container">
                    <h3>Ответ {responseIndex + 1}</h3>
                    {response.map((ansver, questionIndex) => (
                        <div key={questionIndex} className="response-item">
                            <Input
                              value={ansver}
                              onChange={(e) => handleResponseChange(responseIndex, questionIndex, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
            <Button type="primary" onClick={handleSave}>Сохранить ответы</Button>
        </div>
    );
};


export default EditResponses;




