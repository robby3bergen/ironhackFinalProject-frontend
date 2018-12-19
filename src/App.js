import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './providers/AuthProvider';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';

// require('dotenv').config();

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <h1>Welcome to Pickingry</h1>
          <Navbar />
          <Switch>
              <Route exact path="/" component={Home} />
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/ingredients" component={Ingredients} />
              <PrivateRoute path="/private" component={Private} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
