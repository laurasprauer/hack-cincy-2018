import React from 'react';
import { Link } from 'react-router-dom';

// import styles
import styles from './styles.module.scss';

function Header() {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link to="/">
            HOME
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
