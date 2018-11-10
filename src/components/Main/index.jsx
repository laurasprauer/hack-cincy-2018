import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import styles
import styles from './styles.module.scss';

// import components
import Home from '../Home';
import NotFound from '../NotFound';

function Main() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Main;
