import './css/upgrade.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Добавлен импорт Link
import { useEffect, useState } from 'react';
import axios from 'axios';
import yellrab from './img/upg/yellrab.png';

// Компонент для отображения и покупки Boost
function BoostItem({ level, price, onBuy }) {
  return (
    <div className='boost'>
      <span>
        <p>Upgrade 1</p>
        <p>level {level}/3</p>
      </span>
      <button onClick={onBuy}>
        <p>BUY</p>
        <p>{price} $CRT</p>
      </button>
    </div>
  );
}

function Main() {
  const [userData, setUserData] = useState(null);
  const [boosts, setBoosts] = useState([]); // Состояние для списка Boost
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

    // Получаем список Boost с сервера
    axios.get('/boost/')
      .then(response => {
        setBoosts(response.data); // Устанавливаем список Boost в состояние
      })
      .catch(error => {
        console.error('Ошибка при получении списка Boost:', error);
      });

  }, [navigate]);

  // Функция для вызова вибрации
  const triggerHapticFeedback = () => {
    const { WebApp } = window.Telegram;
    WebApp.HapticFeedback.impactOccurred("medium");
  };

  // Функция для покупки Boost
  const buyBoost = (id_boost) => {
    axios.patch(`/boost/${id_boost}/`, {}, {
      headers: {
        'custom-header': 'query_id=AAEvw-FeAAAAAC_D4V6JvhPD&user=%7B%22id%22%3A1591853871%2C%22first_name%22%3A%22Andy%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22og_Andy%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728994271&hash=4a9c2eed2acd85a284f28bad44053724c054060a0fb4da7170ceea705b410eda', // Здесь можно добавить любые заголовки, если нужно
      }
    })
    .then(response => {
      console.log('Boost purchased:', response.data);
    })
    .catch(error => {
      console.error('Ошибка при покупке Boost:', error);
    });
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

      {/* Контейнер для Boost */}
      <div className='boostcont'>
        {boosts.map((boost) => (
          <BoostItem
            key={boost.id}
            level={boost.auto_watering}  // Пример использования одного из параметров
            price={500}  // Замените на фактическое значение, если нужно
            onBuy={() => {
              triggerHapticFeedback();
              buyBoost(boost.id);  // Покупка Boost
            }}
          />
        ))}
      </div>

      <button className='buyfarm' onClick={triggerHapticFeedback}>
        <p>BUY NEW FARM</p>
        <h1>100 000 000 $CRT + TWO BROTHERS NFT</h1>
      </button>

      <footer>
        <div className='rabclub'>
          <div className='rabclubcont'>
            <img src={yellrab} alt="Rabbit club" />
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
