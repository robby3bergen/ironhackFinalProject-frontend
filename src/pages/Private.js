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
          <p>Take a pic of the product ingredients</p>
        </li>
        <li>
          <p>Set alerts to favorite or avoid ingredients</p>
        </li>
        <li>
          <p>Get alerts to recognize ingredients</p>
        </li>
        </ul>
      </div>
    )
  }
}

export default withAuth(Private);
