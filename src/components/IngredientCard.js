import React, { Component } from 'react';
import ingredient from '../lib/ingredient-service';

class IngredientCard extends Component {
  state = {
    showCard: true
  }

  saveUserPreference = (event) => {
    event.preventDefault();
    ingredient.save(this.props.ingredient, event.target.name)
    .then( (result) => {
      console.log('result from backend: ' + result);
      })
    .catch( error => console.log(error) )
  }

  removeCard = (event) => {
    event.preventDefault();
    this.setState({ showCard: false} );
  }

  render() {
    if (this.state.showCard) {
      return (
        <div>
          <p>{this.props.ingredient}</p>
          <button name="favorite" onClick={this.saveUserPreference}>:)</button>
          <button name="avoid" onClick={this.saveUserPreference}>!</button>
          <button name="remove" onClick={this.removeCard}>x</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default IngredientCard;