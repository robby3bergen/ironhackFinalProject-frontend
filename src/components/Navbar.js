import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import cameraIcon from '../images/camera.png';

class Navbar extends Component {

  renderIsLoggedIn = () => {
    return <div>
      <nav className="nav-header">
        <h1>Pickingry</h1>
        <p onClick={this.props.logout}>Logout</p>
      </nav>
      <nav className="nav-footer">
        <Link to="/ingredients"><img src={cameraIcon} alt="camera"/></Link>
      </nav>
    </div>
  }

  renderIsNotLoggedIn = () => {
    return <div>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </div>
  }

  render() {
    return (
      <div>
        { this.props.isLogged ? this.renderIsLoggedIn() : this.renderIsNotLoggedIn() }
      </div>
    )
  }
}

export default withAuth(Navbar);