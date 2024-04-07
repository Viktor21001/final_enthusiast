import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaLightbulb,
  FaComments,
  FaHome,
  FaBars,
  FaRegWindowMinimize,
} from 'react-icons/fa';
import styles from './SideNavvae.module.css'; // Ensure the CSS module is imported correctly
import { useUser } from '../../UserContext';

type NavItem = {
  label: string;
  key: string;
  icon: JSX.Element;
  link?: string;
};

const items: NavItem[] = [
  { label: 'Главная', key: '1', icon: <FaHome />, link: '/' },
  { label: 'Люди', key: '2', icon: <FaUsers />, link: '/people' },
  { label: 'Билборд идей', key: '3', icon: <FaLightbulb />, link: '/ideas' },
  { label: 'Чаты', key: '4', icon: <FaComments />, link: '/messages' },
];

const SideNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { login } = useUser();

  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{ width: collapsed ? '80px' : '256px' }}
      className={styles.sideNavbar}
    >
      {login ? (
        <ul className={styles.navList}>
          {items.map((item: NavItem) => (
            <li key={item.key} className={styles.navItem}>
              <Link to={item.link!} className={styles.navLink}>
                {' '}
                {item.icon}
                <span className={styles.navLabel}>
                  {collapsed ? '' : item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <Link to="/" className={styles.navLink}>
            <FaHome /> Главная
          </Link>
        </>
      )}
    </div>
  );
};

export default SideNavbar;
