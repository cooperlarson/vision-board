import React, { Component } from 'react';
import GoalsList from './goals-list';
import LoadingSpinner from '../../components/LoadingSpinner';
import { connect } from 'react-redux';
import { pathToJS, isLoaded } from 'react-redux-firebase';
import ContentHeader from './content-header';

@connect(
  ({ firebase }) => ({
     auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
   })
 )

 export default class Goals extends Component {
   render() {
    if (!isLoaded(this.props.auth)) {
      return <LoadingSpinner />
    }
    return (
      <div>
      <ContentHeader />
      <GoalsList auth={this.props.auth} />
      </div>
    )
   }
 }