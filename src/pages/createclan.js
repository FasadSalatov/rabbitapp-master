import './css/createclan.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import creclanav from './img/creclan/rabclub.svg';

function Main() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { WebApp } = window.Telegram;
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => {
      navigate(-1);
    });

    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setUserData({
        username: user.username,
        avatarUrl: user.photo_url,
      });
    }
  }, [navigate]);

  const triggerHapticFeedback = () => {
    const { WebApp } = window.Telegram;
    WebApp.HapticFeedback.impactOccurred('medium');
  };

  return (
    <div className="main-creclan">
      <header>
        <div>
          <div className='headone'>
            <p className='h1tasks'>CREATE YOUR CLAN OR JOIN ONE</p>
          </div>
        </div>
      </header>
      
      <div className='chototo'>
        {/* Можно добавить содержимое для отображения клана или выбора */}
      </div>

      <footer>
        <img src={creclanav} width={150} alt="Clan Avatar"/>
        <Link to="/claninfo" style={{textDecoration:"none"}}>
          <button className='creclanbtn' onClick={triggerHapticFeedback}>CREATE CLAN</button>
        </Link>
        <div className='fotbtns'>
          <Link to="/" style={{textDecoration:"none"}}>
            <button className='homeclan' onClick={triggerHapticFeedback}>HOME</button>
          </Link>
        </div>
      </footer>  
    </div>
  );
}

export default Main;
