import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Private extends Component {
  render() {
    
    return (
      <div>
        <p>Hi {this.props.user.username}!</p>
        <h2>Instructions</h2>
      </div>
    )
  }
}

export default withAuth(Private);
