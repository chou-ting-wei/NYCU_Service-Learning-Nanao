import './Profile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface User {
  name: string;
  username: string;
  role: string;
}
interface UserData {
  gender: string;
  birthday: string;
  age: number;
  medical_History: string;
  address: string;
  email: string;
  phone: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Profile = ({ user, url }) => {
  const query = useQuery();
  const id = query.get('id');
  const [users, setUsers] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(id || null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errMsg, setErrMsg] = useState('');

  const getUserID = async (username: string) => {
    const response = axios.get(url + `user/find/${username}`);
    return (await response).data;
};

  useEffect(() => {
    const fetchUserId = async () => {
      if (!userId && user) {
        const fetchedId = await getUserID(user);
        if (fetchedId) {
          setUserId(fetchedId);
          fetchUserData(fetchedId);
        }
      } else if (userId) {
        fetchUserData(userId);
      }
    };
    fetchUserId();
  }, [userId, user]);

  const fetchUserData = async (id: string) => {
    try {
      console.log(id);
      const response1 = await axios.get(`${url}user/${id}`);
      setUsers(response1.data);
      const response2 = await axios.get(`${url}user-detail/${id}`);
      setUserData(response2.data);
    } catch (error) {
      setErrMsg('Error fetching user data.');
    }
  };

  const defaultData: UserData = {
    gender: '無',
    birthday: '無',
    age: 0,
    medical_History: '無',
    address: '無',
    email: '無',
    phone: '無',
  };

  const displayData = userData || defaultData;

  const genderMap = {
    MALE: '男',
    FEMALE: '女',
  };

  return (
    <div className="profile">
      <img src="/public/default_avatar.jpg" alt="Profile Picture" />
      <div className="info">
        <div><span className="label">姓名：</span>{users?.name || '無'}</div>
        <div><span className="label">性別：</span>{genderMap[displayData.gender] || '無'}</div>
        <div><span className="label">生日：</span>{displayData.birthday || '無'}</div>
        <div><span className="label">年齡：</span>{displayData.age}</div>
        <div><span className="label">電話：</span>{displayData.phone || '無'}</div>
        <div><span className="label">電子郵件：</span>{displayData.email || '無'}</div>
        <div><span className="label">地址：</span>{displayData.address || '無'}</div>
        <div><span className="label">過去病史：</span>{displayData.medical_History || '無'}</div>
      </div>
      {errMsg && <div className="errmsg">{errMsg}</div>}
    </div>
  );
};

export default Profile;
