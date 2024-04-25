import './Profile.css'
import { Link } from 'react-router-dom';

const Profile = () => { 
  return (
    <div className="profile">
      <img src="image.jpg" alt="Profile Picture" />
        <div className="info">
          <div><span className="label">姓名：</span>王小明</div>
          <div><span className="label">性別：</span>男</div>
          <div><span className="label">生日：</span>1990-01-01</div>
          <div><span className="label">年齡：</span>33</div>
          <div><span className="label">過去病史：</span>無</div>
          <Link to="/edit-user">修改會員資料</Link>
        </div>
    </div>
  );
}

export default Profile;