import React, { Component } from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import {
  pathToJS,
  isLoaded
} from 'react-redux-firebase';
import GoalsList from '../containers/Goals/goals-list';
import NavbarAuth from '../containers/Navbar/navbar_auth';
import { UserIsAuthenticated } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';

@UserIsAuthenticated

@connect(
  ({ firebase }) => ({
     auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
   })
 )

export default class App extends Component {
  render() {
    const { auth } = this.props
    if (!isLoaded(auth)) {
      return <LoadingSpinner />
    }
    return (
      <div className="App">
        <NavbarAuth auth={auth} />
        <div className="container-fluid">
          <GoalsList auth={auth} />
        </div>
      </div>
    );
  }
}
