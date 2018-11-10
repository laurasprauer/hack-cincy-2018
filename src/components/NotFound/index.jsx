import React from 'react';
import { Link } from 'react-router-dom';

// import styles
import styles from './styles.module.scss';

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Oops!</h1>
      <p>Looks like this page doesn&#39;t exist. <Link to="/">Go Home</Link>.</p>
    </div>
  );
}

export default NotFound;
