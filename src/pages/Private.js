import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Private extends Component {
  render() {
    
    return (
      <div>
        <p>Hi {this.props.user.username}!</p>
        <h2>You Can Use Pickingry...</h2>
        <ul>
        <li>
          <img src=""/>
          <p>Take a pic of the product ingredients</p>
        </li>
        <li>
          <img src=""/>
          <p>Set alerts to favorite or avoid ingredients</p>
        </li>
        <li>
          <img src=""/>
          <p>Get alerts to recognize ingredients</p>
        </li>
        </ul>
      </div>
    )
  }
}

export default withAuth(Private);
