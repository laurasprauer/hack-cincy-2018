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
      landmarks: [],
      noAddressError: false,
    };
  }

  getStarted = () => {
    if (this.state.lat && this.state.long && this.state.address) {
      fetch('https://dns0mi9ijd.execute-api.us-east-1.amazonaws.com/dev/calculateClosestSite', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: this.state.lat,
          lng: this.state.long,
        }),
      })
        .then(response => response.json())
        .then((data) => {
          const landmarks = [];
          for (let i = 0; i < data.body.length; i++) {
            const landmark = data.body[i];
            landmarks[i] = {
              key: i,
              name: landmark[1],
              type: landmark[2],
              address: landmark[0],
              miles: landmark[3].toFixed(2),
              visited: false,
            };
          }
          this.setState({
            viewLandmarks: true,
            landmarks,
          });
        });
    } else {
      this.setState({
        noAddressError: true,
      });
    }
  };

  startOver = () => {
    this.setState({
      landmarks: [],
      viewLandmarks: false,
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
    fetch('https://dns0mi9ijd.execute-api.us-east-1.amazonaws.com/dev/getAddrFromLatLong', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }),
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          address: data.addr,
          lat: position.coords.latitude,
          long: position.coords.longitude,
          loadingCurrentLocation: false,
          noAddressError: false,
        });
      });
  };

  handleAddressChange = (event) => {
    const address = event.target.value;
    fetch('https://dns0mi9ijd.execute-api.us-east-1.amazonaws.com/dev/getLatLongFromAddr', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        addr: address,
      }),
    })
      .then(response => response.json())
      .then((result) => {
        this.setState({
          address,
          lat: result.lat,
          long: result.lng,
          noAddressError: false,
        });
      });
  };

  toggleVisited = (id = 0) => {
    const landmarks = this.state.landmarks;
    const visited = landmarks[id].visited;
    landmarks[id].visited = !visited;
    this.setState({
      landmarks,
    });
    console.log('visited!');
  };

  render() {
    let currentLocBtnText = 'Use My Current Location';
    if (this.state.loadingCurrentLocation) {
      currentLocBtnText = 'Loading Your Location...';
    }

    let showError = null;
    if (this.state.noAddressError) {
      showError = <p className={styles.error}>Please enter an address</p>;
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
        {showError}
        <button onClick={this.getStarted}>Get Started</button>
      </div>
    );

    if (this.state.viewLandmarks) {
      pageContent = (
        <div className={styles.viewLandmarks}>
          <h1>Near You</h1>
          <a onClick={this.startOver}>Start Over</a>
          <DisplayLandmarks
            landmarks={this.state.landmarks}
            toggleVisited={this.toggleVisited}
            currentAddress={this.state.address}
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
