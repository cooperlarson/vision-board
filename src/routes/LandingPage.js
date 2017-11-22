import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Navbar from '../containers/Navbar/navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserIsNotAuthenticated } from '../utils/noauth';

@UserIsNotAuthenticated
@firebaseConnect()
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth')
}))

class LandingPage extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }
  render() {
    const { firebase, auth } = this.props

    const handleAnonymousLogin = () => {
      firebase.auth().signInAnonymously();
    }

    if (!isLoaded(auth)) {
      return (
        <LoadingSpinner />
      )
    }
    if (isLoaded(auth) && isEmpty(auth)) {
      return (
        <div className="landing-page">
        <Navbar />
        <div className="jumbotron">
          <h1>Vision Board</h1>
          <h3>Visualize & Achieve Your Goals</h3>
          <button onClick={handleAnonymousLogin} className="btn btn-primary get-started">Get Started</button>
        </div>
      </div>
      )
    }
  }
}

export default LandingPage;
