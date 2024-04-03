import axios from 'axios';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/users/logout`, {
        withCredentials: true,
      });

      console.log(response);
      console.log('Logout successful');

      logout();
      sessionStorage.clear()
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button style={{ backgroundColor: 'rgba(28,28,28,0)', color: 'black', display: 'block' }} className="logoutBtn" onClick={handleLogout}>Выйти</button>
  );
};

export default LogoutButton;
