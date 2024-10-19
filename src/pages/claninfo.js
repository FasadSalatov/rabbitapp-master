import './css/infoclan.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import devav from './img/mainimg/devav.png';
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

  const copyClanCode = () => {
    const clanCode = 'UQDXXE0g......8HXhN';
    navigator.clipboard.writeText(clanCode);
    triggerHapticFeedback();
    alert('Clan code copied to clipboard!');
  };

  return (
    <div className="maininfoclan">
      <header>
        <div>
          <div className='headone'>
            <img src={userData?.avatarUrl || devav} alt="Avatar" className='avatar'/>
            <svg width="85" height="50" viewBox="0 0 85 145" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.9996 60.8001H28.5596L59.8396 29.5201L55.2796 24.9601L23.9996 56.2401V60.8001ZM17.5996 67.2001V53.6001L59.8396 11.4401C60.4796 10.8534 61.1863 10.4001 61.9596 10.0801C62.7329 9.7601 63.5463 9.6001 64.3996 9.6001C65.2529 9.6001 66.0796 9.7601 66.8796 10.0801C67.6796 10.4001 68.3729 10.8801 68.9596 11.5201L73.3596 16.0001C73.9996 16.5868 74.4663 17.2801 74.7596 18.0801C75.0529 18.8801 75.1996 19.6801 75.1996 20.4801C75.1996 21.3334 75.0529 22.1468 74.7596 22.9201C74.4663 23.6934 73.9996 24.4001 73.3596 25.0401L31.1996 67.2001H17.5996ZM57.5196 27.2801L55.2796 24.9601L59.8396 29.5201L57.5196 27.2801Z" fill="white"/>
<g clip-path="url(#clip0_0_1)">
<path d="M17.709 124.375H14.1673C12.2887 124.375 10.487 123.892 9.15864 123.033C7.83026 122.173 7.08398 121.007 7.08398 119.792V99.1668C7.08398 97.9513 7.83026 96.7855 9.15864 95.9259C10.487 95.0664 12.2887 94.5835 14.1673 94.5835H46.0423C47.9209 94.5835 49.7226 95.0664 51.051 95.9259C52.3794 96.7855 53.1257 97.9513 53.1257 99.1668V101.458M38.959 110.625H70.834C74.746 110.625 77.9173 112.677 77.9173 115.208V135.833C77.9173 138.365 74.746 140.417 70.834 140.417H38.959C35.047 140.417 31.8757 138.365 31.8757 135.833V115.208C31.8757 112.677 35.047 110.625 38.959 110.625Z" stroke="#F3F3F3" stroke-width="12.8" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_0_1">
<rect width="85" height="55" fill="white" transform="translate(0 90)"/>
</clipPath>
</defs>
</svg>
            <div className='wallet walletp'>
              <p className='clanname'>@{userData?.username || 'Username not available'}</p>
              <p className='clanname'>RABBIT CLUB CLAN</p>
              <p className='clanname' onClick={copyClanCode}>UQDXXE0g......8HXhN</p>
            </div>
          </div>
        </div>
      </header>
      <p className='info t'>@{userData?.username || 'Username not available'}</p>
      <p className='info'>1342 $CRT</p>
      <div className='inlebtn'>
        <button onClick={triggerHapticFeedback}>INVITE</button>
        <button onClick={triggerHapticFeedback}>LEAVE</button>
      </div>
      <h1 className='h1inf'>CLAN INFO:</h1>
      <div className='claninf'>
        <span><p>BOOST</p><p>x10%</p></span>
        <span><p>CLAN RANK</p><p>#1000</p></span>
        <span><p>CLAN LEVEL</p><p>FUNNY BUNNY</p></span>
        <span><p>CLAN COLLECTED</p><p>578238 $CRT</p></span>
        <span><p>MEMBERS</p><p>241</p></span>
      </div>
      <h1 className='h1inf'>TOP PLAYERS:</h1>
      <div className='claninf'>
        <span><p>1.</p><p>@MAMEYO</p><p>135624 $CRT</p></span>
        <span><p>2.</p><p>@PLAYER2</p><p>126543 $CRT</p></span>
        <span><p>3.</p><p>@PLAYER3</p><p>123000 $CRT</p></span>
        <span><p>4.</p><p>@PLAYER4</p><p>115321 $CRT</p></span>
        <span><p>5.</p><p>@PLAYER5</p><p>112100 $CRT</p></span>
      </div>
      <button className='watering leadboardclanbtn' onClick={triggerHapticFeedback}>CLAN LEADERBOARD</button>
      <footer>
        <div className='fotbtns'>
          <Link to="/" style={{textDecoration:"none"}}><button className='homeclan' onClick={triggerHapticFeedback}>HOME</button></Link>
        </div>
      </footer>  
    </div>
  );
}

export default Main;
