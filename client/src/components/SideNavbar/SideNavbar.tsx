import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaLightbulb, FaComments, FaHome } from 'react-icons/fa';
import { MdAddCircle, MdOutlineNotificationAdd } from 'react-icons/md';
import styles from './SideNavvae.module.css'; // Ensure the CSS module is imported correctly
import { useUser } from '../../UserContext';

const SideNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [showAdditionalButton, setShowAdditionalButton] =
    useState<boolean>(false);
  const [showAdditionalButtonIdea, setShowAdditionalButtonIdea] =
    useState<boolean>(false);
  const { login } = useUser();

  const handleMouseEnter = (label: string): void => {
    if (label === 'Главная') {
      setShowAdditionalButton(true);
    }
  };

  const handleMouseLeave = (label: string): void => {
    if (label === 'Главная') {
      setShowAdditionalButton(false);
    }
  };

  const handleMouseEnterIdea = (label: string): void => {
    if (label === 'Билборд идей') {
      setShowAdditionalButtonIdea(true);
    }
  };

  const handleMouseLeaveIdea = (label: string): void => {
    if (label === 'Билборд идей') {
      setShowAdditionalButtonIdea(false);
    }
  };

  return (
    <div
      style={{ width: collapsed ? '80px' : '256px' }}
      className={styles.sideNavbar}
    >
      {login ? (
        <>
          <ul className={styles.navList}>
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('Главная')}
              onMouseLeave={() => handleMouseLeave('Главная')}
            >
              <Link to="/" className={styles.navLink}>
                <FaHome />
                <span className={styles.navLabel}>
                  {collapsed ? '' : 'Главная'}
                </span>
              </Link>
              <ul>
                {showAdditionalButton && (
                  <div className={styles.additionalButton}>
                    <Link
                      to="/newstartup"
                      style={{ marginTop: '10px', fontSize: '17px' }}
                      className={styles.navLink}
                    >
                      <MdAddCircle />
                      <span className={styles.navLabel}>
                        {collapsed ? '' : 'Создать стартап'}
                      </span>
                    </Link>
                  </div>
                )}
              </ul>
            </li>

            <li className={styles.navItem}>
              <Link to="/people" className={styles.navLink}>
                <FaUsers />
                <span className={styles.navLabel}>
                  {collapsed ? '' : 'Люди'}
                </span>
              </Link>
            </li>
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnterIdea('Билборд идей')}
              onMouseLeave={() => handleMouseLeaveIdea('Билборд идей')}
            >
              <Link to="/ideas" className={styles.navLink}>
                <FaLightbulb />
                <span className={styles.navLabel}>
                  {collapsed ? '' : 'Билборд идей'}
                </span>
              </Link>
              <ul>
                {showAdditionalButtonIdea && (
                  <div className={styles.additionalButton}>
                    <Link
                      to="/newidea"
                      style={{ marginTop: '10px', fontSize: '17px' }}
                      className={styles.navLink}
                    >
                      <MdOutlineNotificationAdd />
                      <span className={styles.navLabel}>
                        {collapsed ? '' : 'Создать идею'}
                      </span>
                    </Link>
                  </div>
                )}
              </ul>
            </li>
            <li className={(styles.navItem, styles.isDesabled)}>
              <Link to="/messages" className={styles.navLink}>
                <FaComments />
                <span className={styles.navLabel}>
                  {collapsed ? '' : 'Чаты'}
                </span>
                <span className={styles.badge}>В разработке</span>
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <Link to="/" className={styles.navLink}>
          <FaHome /> Главная
        </Link>
      )}
    </div>
  );
};

export default SideNavbar;
