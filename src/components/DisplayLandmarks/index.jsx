import React from 'react';
import PropTypes from 'prop-types';

// import styles
import styles from './styles.module.scss';

// import components
import SingleLandmark from '../SingleLandmark';

export default class DisplayLandmarks extends React.Component {
  getLandmarks = () => {
    const landmarks = [];

    for (let i = 0; i < this.props.landmarks.length; i++) {
      landmarks.push(<SingleLandmark
        landmark={this.props.landmarks[i]}
      />);
    }
    return landmarks;
  };

  render() {
    return (
      <div>{this.getLandmarks()}</div>
    );
  }
}

DisplayLandmarks.propTypes = {
  landmarks: PropTypes.array.isRequired,
};
