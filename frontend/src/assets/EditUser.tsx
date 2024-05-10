import React from 'react';
import './EditUser.css';

const EditUser = () => { 
  return (
    <div className="edituser">
        <h3>Edit User Page</h3>
        <img src="/public/default_avatar.jpg" alt="Profile Picture" className="profile-pic"/>
        <form>
            <label htmlFor="photo">選擇照片:</label>
            <input type="file" id="photo" name="photo" accept="image/*"/>
            
            <label htmlFor="name">姓名:</label>
            <input type="text" id="name" name="name"/>

            <label htmlFor="password">新密碼:</label>
            <input type="password" id="password" name="password"/>

            <label htmlFor="gender">性別:</label>
            <select id="gender" name="gender">
                <option value="male">男</option>
                <option value="female">女</option>
                <option value="helicopter">戰鬥直升機</option>
            </select>

            <label htmlFor="birthdate">生日:</label>
            <input type="date" id="birthdate" name="birthdate"/>

            <label htmlFor="age">年齡:</label>
            <input type="number" id="age" name="age"/>

            <label htmlFor="phone">電話:</label>
            <input type="tel" id="phone" name="phone"/>

            <label htmlFor="email">電子郵件:</label>
            <input type="email" id="email" name="email"/>

            <label htmlFor="address">地址:</label>
            <input type="text" id="address" name="address"/>

            <label htmlFor="medical_history">過去病史:</label>
            <input type="text" id="medical_history" name="medical_history"/>

            <input type="submit" value="Submit"/>
        </form>
    </div>
  );
}

export default EditUser;
