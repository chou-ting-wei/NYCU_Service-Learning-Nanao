import './Interact.css';
import React from 'react';
import BodySelector from './BodySelector';
import DataFiller from './DataFiller';
// import { Button } from 'antd';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import withAuthRedirect from '../withAuthRedirect';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:3000/';

const getUserID = async (username) => {
  const response = await axios.get(`${url}user/find/${username}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
};

const Interact = () => {
  const [cookie] = useCookies(['user']);
  const [PainLevel, setPainLevel] = React.useState({});
  const [currentPart, setCurrentPart] = React.useState('');
  const [MonthPain, setMonthPain] = React.useState({});
  const [WeekPain, setWeekPain] = React.useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userid = await getUserID(cookie.user);

      await Promise.all([
        axios.post(`${url}hurtform/${userid}`, PainLevel, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }),
        axios.post(`${url}weekform/${userid}`, WeekPain, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }),
        axios.post(`${url}yearform/${userid}`, MonthPain, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }),
      ]);

      navigate('/stat');
    } catch (error) {
      console.error('Error submitting forms:', error);
    }
  };

  return (
    <div className="container">
        <BodySelector
          PainLevel={PainLevel}
          setCurrentPart={setCurrentPart}
          currentPart={currentPart}
          MonthPain={MonthPain}
          WeekPain={WeekPain}
        />

          <DataFiller
            currentPart={currentPart}
            setCurrentPart={setCurrentPart}
            PainLevel={PainLevel}
            setPainLevel={setPainLevel}
            MonthPain={MonthPain}
            WeekPain={WeekPain}
          />
          <Button variant="outline-primary" className='float-end' onClick={handleSubmit}>
            送出
          </Button>
    </div>
  );
};

export default withAuthRedirect(Interact);
