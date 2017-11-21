import React, { Component } from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import {
  pathToJS,
  isLoaded
} from 'react-redux-firebase';
import Goals from '../containers/goals/goals';
import NavbarAuth from '../containers/navbar/navbar_auth';
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
    if (!isLoaded(this.props.auth)) {
      return <LoadingSpinner />
    }
    return (
      <div className="App">
        <NavbarAuth auth={this.props.auth} />
        <div className="container-fluid">
          <Goals />
        </div>
      </div>
    );
  }
}