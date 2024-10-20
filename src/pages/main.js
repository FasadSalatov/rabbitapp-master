import './css/main.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import devav from './img/mainimg/devav.png';
import tgsvg from './img/mainimg/tg.svg';
import copysvg from './img/mainimg/copy.svg';
import wtr from './img/mainimg/watering.svg';
import { TonConnectUIProvider, useTonConnectUI, useTonWallet, useTonAddress } from '@tonconnect/ui-react';

const API_URL = 'https://147.45.246.69:8001';

function Main() {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const navigate = useNavigate();
  const [queryId, setQueryId] = useState(null);

  useEffect(() => {
    const { WebApp } = window.Telegram;
    WebApp.BackButton.hide();
    WebApp.disableVerticalSwipes();
    WebApp.expand();
    
    // Получение initDataUnsafe из Telegram WebApp SDK
    const user = WebApp.initDataUnsafe?.user;
    const initData = WebApp.initDataUnsafe;
    const queryId = initData?.query_id;

    if (user && queryId) {
      setUserData({
        username: user.username,
        avatarUrl: user.photo_url,
      });
      setQueryId(queryId); // Устанавливаем query_id из initDataUnsafe
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${API_URL}/profile/${userData?.username || 1}`, {
          method: 'GET',
          headers: {
            'custom-header': queryId, // Используем динамический query_id
          },
        });
        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    };
    if (userData && queryId) {
      fetchProfileData();
    }
  }, [userData, queryId]);

  const triggerHapticFeedback = () => {
    const { WebApp } = window.Telegram;
    WebApp.HapticFeedback.impactOccurred('medium');
  };

  const handleConnectWallet = async () => {
    try {
      await tonConnectUI.connectWallet();
      triggerHapticFeedback();
      // Send wallet address to API
      if (rawAddress) {
        await fetch(`${API_URL}/profile/wallet/${rawAddress}`, {
          method: 'PATCH',
          headers: {
            'custom-header': queryId, // Используем динамический query_id
          },
        });
      }
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
    }
  };

  const handleWalletClick = () => {
    setWalletModalVisible(true);
    triggerHapticFeedback();
  };

  const handleCopyWallet = () => {
    if (userFriendlyAddress) {
      navigator.clipboard.writeText(userFriendlyAddress);
      setWalletModalVisible(false);
      triggerHapticFeedback();
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await tonConnectUI.disconnect();
      setWalletModalVisible(false);
      triggerHapticFeedback();
    } catch (error) {
      console.error('Ошибка отключения кошелька:', error);
    }
  };

  const maskWallet = (address) => {
    if (!address) return '';
    return `${address.slice(0, 5)}*******${address.slice(-7)}`;
  };

  const closeWalletModal = () => {
    setWalletModalVisible(false);
    triggerHapticFeedback();
  };

  const handleWatering = async (farmNumber) => {
    try {
      const response = await fetch(`${API_URL}/profile/watering/${userData?.username || 1}`, {
        method: 'GET',
        headers: {
          'custom-header': queryId, // Используем динамический query_id
        },
      });
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      triggerHapticFeedback();
    } catch (error) {
      console.error('Ошибка поливки:', error);
    }
  };

  return (
    <TonConnectUIProvider manifestUrl="https://jettocoinwebapp.vercel.app/tonconnect-manifest.json">
      <div className="main">
        <header>
          <div>
            <div className='headone'>
              <img src={userData?.avatarUrl || devav} alt="Avatar" className='avatar' />
              <button onClick={handleDisconnectWallet} className="wallet-button">
                <svg width="24" height="77" viewBox="0 0 77 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 60.8H20.56L51.84 29.52L47.28 24.96L16 56.24V60.8ZM9.59998 67.2V53.6L51.84 11.44C52.48 10.8533 53.1866 10.4 53.96 10.08C54.7333 9.75998 55.5466 9.59998 56.4 9.59998C57.2533 9.59998 58.08 9.75998 58.88 10.08C59.68 10.4 60.3733 10.88 60.96 11.52L65.36 16C66 16.5866 66.4666 17.28 66.76 18.08C67.0533 18.88 67.2 19.68 67.2 20.48C67.2 21.3333 67.0533 22.1466 66.76 22.92C66.4666 23.6933 66 24.4 65.36 25.04L23.2 67.2H9.59998ZM49.52 27.28L47.28 24.96L51.84 29.52L49.52 27.28Z" fill="white" />
                </svg>
              </button>
              <div className='wallet'>
                <p className='tag'>@{userData?.username || 'Username not available'}</p>
                {wallet ? (
                  <p className='wallet-button walletnum' onClick={handleWalletClick}>{maskWallet(userFriendlyAddress)}</p>
                ) : (
                  <button onClick={handleConnectWallet} className="wallet-button">Connect wallet</button>
                )}
              </div>
            </div>
            <div className='farmbtns'>
              <button className='selectfarm' onClick={() => handleWatering(1)}>FARM 1</button>
              <button onClick={() => handleWatering(2)}>FARM 2</button>
              <button onClick={() => handleWatering(3)}>FARM 3</button>
            </div>
          </div>
        </header>
        {profileData && (
          <div className='balance'>
            <div className='divbal'>
              <p>BALANCE: {profileData.amount_CRT} $CRT</p>
              <p className='nono'>STORAGE: {profileData.amount_storage} $CRT</p>
            </div>
            <button className='balance-claim' onClick={triggerHapticFeedback}>CLAIM</button>
          </div>
        )}
        <div className='social'>
          <button onClick={triggerHapticFeedback}>
            <img src={tgsvg} width={32} alt="Telegram"></img>join our official channel
          </button>
        </div>
        <div className='footbar'>
          <div className='farmcont'>
            <p>FARM 1</p>
            <p><img src={copysvg} width={25} alt="Copy"></img>NFT's CONNECTED: {profileData?.nft_connected.length}</p>
          </div>
          <div className='progressbar-container'>
            <div className='numbers'>
              <p>0%</p>
              <p>100%</p>
            </div>
            <div className='progressbar'>
              <div className='bar' style={{ width: `${profileData?.nft_connected.length}%` }}></div>
            </div>
          </div>
        </div>
        <button className='watering' onClick={triggerHapticFeedback}>
          <img src={wtr} width={25} alt="Watering"/>
          watering
        </button>
        <footer>
          
          <div className='fotbtns'>
            <Link to="/" style={{textDecoration:"none"}}>
              <button className='selectfot' style={{ borderRight:'1px solid black', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px' }} onClick={triggerHapticFeedback}>HOME</button>
            </Link>
            <Link to="/upg" style={{textDecoration:"none"}}>
              <button style={{ borderRight:'1px solid black' }} onClick={triggerHapticFeedback}>BOOST</button>
            </Link>
            <Link to="/tasks" style={{textDecoration:"none"}}>
              <button style={{ borderRight:'1px solid black' }} onClick={triggerHapticFeedback}>TASKS</button>
            </Link>
            <Link to="/friends" style={{textDecoration:"none"}}>
              <button style={{ borderTopRightRadius:'5px', borderBottomRightRadius:'5px' }} onClick={triggerHapticFeedback}>FRIENDS</button>
            </Link>
          </div>
        </footer>
      </div>

      {walletModalVisible && (
        <div className='wallet-modal'>
          <div className='content'>
            <button className='close' onClick={closeWalletModal}>X</button>
            <p className='title'>Your Wallet</p>
            <p className='wallet-number'>{maskWallet(userFriendlyAddress)}</p>
            <button className='button' onClick={handleCopyWallet}>
              <img src={copysvg} width={25} alt="Copy"></img>
              Copy Address
            </button>
            <button className='disconnect' onClick={handleDisconnectWallet}>Disconnect</button>
          </div>
        </div>
      )}
      
    </TonConnectUIProvider>
  );
}

export default Main;
