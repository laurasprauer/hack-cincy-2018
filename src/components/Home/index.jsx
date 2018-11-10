import React from 'react';

// import styles
import styles from './styles.module.scss';

// import components
import DisplayLandmarks from '../DisplayLandmarks';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      long: 0,
      lat: 0,
      address: '',
      loadingCurrentLocation: false,
      viewLandmarks: false,
      landmarks: [
        {
          name: 'The Zoo!',
          type: 'Landmark',
          Address: '1234 Laura Ln, Cincinnati OH',
          miles: 0.34,
          visited: false,
        },
        {
          name: 'Skyline',
          type: 'Chili Resturaunt',
          Address: '1234 Hello Ave, Cincinnati OH',
          miles: 1.9,
          visited: false,
        },
      ],
    };
  }

  getStarted = () => {
    this.setState({
      viewLandmarks: true,
    });
  };

  useCurrentLocation = () => {
    this.setState({
      loadingCurrentLocation: true,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.convertPositionToAddress);
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.setState({
        loadingCurrentLocation: false,
      });
    }
  };

  convertPositionToAddress = (position) => {
    console.log(`Latitude: ${position.coords.latitude
    }<br>Longitude: ${position.coords.longitude}`);

    this.setState({
      long: position.coords.longitude,
      lat: position.coords.latitude,
      address: '1311 Vine St, Cincinnati, OH 45202',
      loadingCurrentLocation: false,
    });
  };

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  render() {
    let currentLocBtnText = 'Use My Current Location';
    if (this.state.loadingCurrentLocation) {
      currentLocBtnText = 'Loading Your Location...';
    }

    let pageContent = (
      <div className={styles.wrapper}>
        <h1>Start Your Journey</h1>

        <p>Find historical landmarks and chili restaurants near you.</p>

        <button className={styles.blueBtn} onClick={this.useCurrentLocation}>
          {currentLocBtnText}
        </button>

        <div>
          <div className={styles.location}>
            <input type="text" name="location" id="location" placeholder="enter an address" value={this.state.address} onChange={this.handleAddressChange} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C153.755 0 70.573 83.182 70.573 185.426c0 126.888 165.939 313.167 173.004 321.035 6.636 7.391 18.222 7.378 24.846 0 7.065-7.868 173.004-194.147 173.004-321.035C441.425 83.182 358.244 0 256 0zm0 278.719c-51.442 0-93.292-41.851-93.292-93.293S204.559 92.134 256 92.134s93.291 41.851 93.291 93.293-41.85 93.292-93.291 93.292z" /></svg>
          </div>
        </div>
        <button onClick={this.getStarted}>Get Started</button>
      </div>
    );

    if (this.state.viewLandmarks) {
      pageContent = (
        <div className={styles.viewLandmarks}>
          <h1>Near You</h1>
          <DisplayLandmarks
            landmarks={this.state.landmarks}
          />
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.overlay} />
        {pageContent}
      </div>
    );
  }
}
