import { Link, Outlet } from 'react-router-dom'
// import './Navbar.css'
import { useUser } from '../../UserContext'
import LogoutButton from '../Login/LogOut'

const NavBar = () => {
  const { login } = useUser()

  
  return (
    <>
      <ul className="navContainer">
        <li>
          <Link className="link" to="/" data-hover="Главная">
            Главная
          </Link>
        </li>

        {login ? (
          <>
            <li>
              <Link className="link" to="/user" data-hover="Люди">
                Люди
              </Link>
            </li>

            <li>
              <Link className="link" to="/game" data-hover="Билборд идей">
                Билборд идей
              </Link>
            </li>

            <li>
              <Link className="link" to="/game" data-hover="Чаты">
                Чаты
              </Link>
            </li>

            <li className="loginContainer">
              <div className="logout">
                <p>
                  Добро пожаловать, {login}
                  <LogoutButton />
                </p>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="link" to="/registration" data-hover="Регистрация">
                Регистрация
              </Link>
            </li>
            <li>
              <Link className="link" to="/login" data-hover="Войти">
                Войти
              </Link>
            </li>
          </>
        )}
        <Outlet />
      </ul>
    </>
  )
}

export default NavBar
