import React, { Component } from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import {
  pathToJS,
  isLoaded
} from 'react-redux-firebase';
import CompletedGoals from '../containers/Goals/goals-list-done';
import Navbar from '../containers/Navbar';
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
        <Navbar auth={auth} listLink="/Home" linkTitle="Home"/>
        <div className="container-fluid">
          <CompletedGoals auth={auth} />
        </div>
      </div>
    );
  }
}