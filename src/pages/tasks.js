import './css/tasks.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import yellrab from './img/tasks/redrabbit.png';

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
  }, []);

  const triggerHapticFeedback = () => {
    const { WebApp } = window.Telegram;
    WebApp.HapticFeedback.impactOccurred("medium");
  };

  return (
    <div className="main-tsk">
      <header>
        <div>
          <div className='headone'>
            <p className='h1tasks'>COMPLETE TASKS AND EARN $CRT</p>
          </div>
          <p className='usebostp'>$CRT CAN BE USED TO UPGRADE YOUR FARM</p>
        </div>
      </header>
      
      <button className='tasksavailable' onClick={triggerHapticFeedback}>
        available tasks: 7/7
      </button>
      <div className='taskscont'>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>DONE</p>
          </button>
        </div>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>CHECK</p>
            <p>150 $CRT</p>
          </button>
        </div>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>CHECK</p>
            <p>150 $CRT</p>
          </button>
        </div>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>CHECK</p>
            <p>150 $CRT</p>
          </button>
        </div>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>CHECK</p>
            <p>150 $CRT</p>
          </button>
        </div>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>CHECK</p>
            <p>150 $CRT</p>
          </button>
        </div>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>CHECK</p>
            <p>150 $CRT</p>
          </button>
        </div>
        <div className='tasks'>
          <span>
            <p>SUBSCRIBE TO OUR TELEGRAM CHANNEL</p>
          </span>
          <button onClick={triggerHapticFeedback}>
            <p>CHECK</p>
            <p>150 $CRT</p>
          </button>
        </div>
        {/* Дублируйте аналогично для других задач */}
      </div>

      <button className='daylycode' onClick={triggerHapticFeedback}>
        DAILY CODE: 12312
      </button>

      <footer>
        <div className='rabclub'>
          <div className='rabclubcont'>
            <div className='rabclubinfo rabtasks'>
              <p>VOTE FOR US IN THE OPEN LEAGUE SEASON XI</p>
              <button onClick={triggerHapticFeedback}>VOTE</button>
            </div>
            <img src={yellrab}/>
          </div>
        </div>
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
            <button style={{ borderRight: '1px solid black'}} onClick={triggerHapticFeedback}>
              BOOST
            </button>
          </Link>
          <Link to="/tasks" style={{textDecoration: "none"}}>
            <button className='selectfot' style={{ borderRight: '1px solid black'}} onClick={triggerHapticFeedback}>
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
