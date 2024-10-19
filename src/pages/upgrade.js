import './css/upgrade.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Добавлен импорт Link
import { useEffect, useState } from 'react';
import yellrab from './img/upg/yellrab.png';

function Main() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Хук для навигации в react-router-dom
  
  useEffect(() => {
    const { WebApp } = window.Telegram;
    // Показать кнопку "Назад"
    WebApp.BackButton.show();

    // Обработчик нажатия кнопки "Назад"
    WebApp.BackButton.onClick(() => {
      navigate(-1); // Вернуться на предыдущую страницу
    });

    // Получаем данные о пользователе
    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setUserData({
        username: user.username,
        avatarUrl: user.photo_url,
      });
    }

  }, []);

  // Функция для вызова вибрации
  const triggerHapticFeedback = () => {
    const { WebApp } = window.Telegram;
    WebApp.HapticFeedback.impactOccurred("medium");
  };

  return (
    <div className="main-upg">
      <header>
        <div>
          <div className='headone'>
            <p className='h1upg'>UPGRADE YOUR FARM</p>
          </div>
          
            <p className='usebostp'>USE BOOSTS TO INCREASE YOUR $CRT FARMING RATES</p>
            
        </div>
        
      </header>
      <div className='boostcont'>
        <div className='boost'>
          <span>
            <p>Upgrade 1</p>
            <p>level 1/3</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>BUY</p>
            <p>500 $CRT</p>
          </button>
        </div>
        <div className='boost'>
          <span>
            <p>Upgrade 1</p>
            <p>level 1/3</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>BUY</p>
            <p>500 $CRT</p>
          </button>
        </div>
        <div className='boost'>
          <span>
            <p>Upgrade 1</p>
            <p>level 1/3</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>BUY</p>
            <p>500 $CRT</p>
          </button>
        </div>
        <div className='boost'>
          <span>
            <p>Upgrade 1</p>
            <p>level 1/3</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>BUY</p>
            <p>500 $CRT</p>
          </button>
        </div>
        <div className='boost'>
          <span>
            <p>Upgrade 1</p>
            <p>level 1/3</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>BUY</p>
            <p>500 $CRT</p>
          </button>
        </div>
      </div>

      <button className='buyfarm' onClick={triggerHapticFeedback}>
        <p>BUY NEW FARM</p>
        <h1>100 000 000 $CRT + TWO BROTHERS NFT</h1>
      </button>

      <footer>
        <div className='rabclub'>
          <div className='rabclubcont'>
            <img src={yellrab} />
            <div className='rabclubinfo'>
              <p>Rabbit club socials give you latest alpha on the project</p>
              <button onClick={triggerHapticFeedback}>JOIN US NOW</button>
            </div>
          </div>
        </div>

        <Link to="/nft" style={{textDecoration: "none"}}>
          <button className='boostfarmnft' onClick={triggerHapticFeedback}>
            BOOST FARM WITH NFT
          </button>
        </Link>

        <div className='fotbtns'>
          <Link to="/" style={{textDecoration: "none"}}>
            <button 
              style={{ borderRight: '1px solid black', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}}
              onClick={triggerHapticFeedback}
            >
              HOME
            </button>
          </Link>
          <Link to="/upg" style={{textDecoration: "none"}}>
            <button className='selectfot' style={{ borderRight: '1px solid black'}} onClick={triggerHapticFeedback}>
              BOOST
            </button>
          </Link>
          <Link to="/tasks" style={{textDecoration: "none"}}>
            <button style={{ borderRight: '1px solid black'}} onClick={triggerHapticFeedback}>
              TASKS
            </button>
          </Link>
          <Link to="/friends" style={{textDecoration: "none"}}>
            <button style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px'}} onClick={triggerHapticFeedback}>
              FRIENDS
            </button>
          </Link>
        </div>
      </footer>  
    </div>
  );
}

export default Main;
