import React from 'react';
import history from './history';

// import styles
import './styles.scss';

// import imageName from '../assets/image-name.png'; // Importing image

// import components
import Main from './components/Main';
// import Header from './components/Header';

function Entry() {
  return (
    <div>
      <Main pathname={history.location.pathname} />
    </div>
  );
}

export default Entry;
