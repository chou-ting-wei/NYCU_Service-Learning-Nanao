import './Interact.css'
import React from 'react';
import BodySelector from './BodySelector';
import DataFiller from './DataFiller';
import { Button } from 'antd';
import { Cookies, useCookies } from 'react-cookie';
import axios from 'axios';
import { json } from 'react-router';
import withAuthRedirect from '../withAuthRedirect';
const url = 'http://localhost:3000/';

const getUserID = async (username: string) => {
  const response = axios.get(url + `user/find/${username}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return (await response).data;
};

const Interact = () => {
  const [cookie, setCookie] = useCookies(['user']);
  const [PainLevel, setPainLevel] = React.useState({});
  const [currentPart, setCurrentPart] = React.useState('');
  const [MonthPain, setMonthPain] = React.useState({});
  const [WeekPain, setWeekPain] = React.useState({});

  return (
    <div className="container">
      <div className='row d-flex align-items-center justify-content-center'>
        <BodySelector PainLevel={PainLevel} setCurrentPart={setCurrentPart} currentPart={currentPart} MonthPain={MonthPain} WeekPain={WeekPain} />
      </div>
      <div className='row '>
        <div className='col'>
          <DataFiller currentPart={currentPart} setCurrentPart={setCurrentPart} PainLevel={PainLevel} setPainLevel={setPainLevel} MonthPain={MonthPain} WeekPain={WeekPain} />
        </div>
        <div className='col'>
          <Button type="primary" onClick={async() => {
            const userid = await getUserID(cookie.user);
            const response1 = axios.post(url + 'hurtform/' + userid, PainLevel, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            });
            const response2 = axios.post(url + 'weekform/' + userid, WeekPain, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            });
            const response3 = axios.post(url + 'yearform/' + userid, MonthPain, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            });
          }}>送出</Button>
        </div>
      </div>
    </div>
  );
}

export default withAuthRedirect(Interact);