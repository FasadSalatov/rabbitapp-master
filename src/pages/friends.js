import './css/friends.css';
import './css/main.css';
import './css/tasks.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import yellrab from './img/fri/rabs.png';
import devav from "./img/fri/defav.png";

function Main() {
  const [userData, setUserData] = useState(null);
  const [referrals, setReferrals] = useState([]);
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

    // Fetch referral data from the API
    const fetchReferrals = async () => {
      try {
        const response = await axios.get('https://147.45.246.69:8001/ref/', {
          headers: {
            'custom-header': 'query_id=AAEvw-FeAAAAAC_D4V6JvhPD&user=%7B%22id%22%3A1591853871%2C%22first_name%22%3A%22Andy%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22og_Andy%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728994271&hash=4a9c2eed2acd85a284f28bad44053724c054060a0fb4da7170ceea705b410eda'
          }
        });
        setReferrals(response.data);
      } catch (error) {
        console.error("Error fetching referral data", error);
      }
    };

    fetchReferrals();
  }, [navigate]);

  const triggerHapticFeedback = () => {
    const { WebApp } = window.Telegram;
    WebApp.HapticFeedback.impactOccurred('medium');
  };

  return (
    <div className="main-fri">
      <header>
        <div>
          <div className='headone'>
            <p className='h1tasks'>COMPLETE TASKS AND EARN $CRT</p>
          </div>
          <p className='usebostp'>$CRT CAN BE USED TO UPGRADE YOUR FARM</p>
        </div>
      </header>
      <img src={yellrab} width={350} alt="Rabbit"/>
      <button className='tasksavailable tskrab' onClick={triggerHapticFeedback}>RABBIT FAMILY TO DO LIST:</button>

      <div className='tododiv'>
        <Link to="/clancreate" style={{textDecoration:"none"}}>
          <button className='daylycode todo' onClick={triggerHapticFeedback}>CHOOSE YOUR CLAN</button>
        </Link>
        <Link to="/clancreate" style={{textDecoration:"none"}}>
          <button className='daylycode todo' onClick={triggerHapticFeedback}>CREATE YOUR CLAN</button>
        </Link>
        <button className='daylycode todo' onClick={triggerHapticFeedback}>LEADERBOARD</button>
      </div>

      <div className='Frlisth1'>
        <span>
          <h1>Friend list</h1>
        </span>
        <span>
          <p>You have {referrals.length} fren's - earned 6.5M $CRT</p>
          <p>referal’s your frens - 2.6M $CRT</p>
        </span>
      </div>

      <div className='FriendList'>
        {referrals.length > 0 ? (
          referrals.map((referral, index) => (
            <div className='Frtask' key={index}>
              <span>
                <img src={devav} width={30} alt="Friend avatar"/>
                <p className="refname">@{referral.nick_name}</p>
              </span>
              <span className='spannnn'>{referral.point} points</span>
            </div>
          ))
        ) : (
          <p>No referrals found</p>
        )}
      </div>

      <footer>
        <button className='invfr' onClick={triggerHapticFeedback}>INVITE FRIEND</button>
        <div className='infofr'>5000 $CRT + 10% from your fren + 2% from their referrals</div>
        <div className='fotbtns'>
          <Link to="/" style={{textDecoration:"none"}}>
            <button style={{ borderRight:'1px solid black', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px' }} onClick={triggerHapticFeedback}>HOME</button>
          </Link>
          <Link to="/upg" style={{textDecoration:"none"}}>
            <button style={{ borderRight:'1px solid black' }} onClick={triggerHapticFeedback}>BOOST</button>
          </Link>
          <Link to="/tasks" style={{textDecoration:"none"}}>
            <button style={{ borderRight:'1px solid black' }} onClick={triggerHapticFeedback}>TASKS</button>
          </Link>
          <Link to="/friends" style={{textDecoration:"none"}}>
            <button className='selectfot' style={{ borderTopRightRadius:'5px', borderBottomRightRadius:'5px' }} onClick={triggerHapticFeedback}>FRIENDS</button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Main;
