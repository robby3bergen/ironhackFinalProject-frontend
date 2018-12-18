import React, { Component } from 'react';
import ingredient from '../lib/ingredient-service';

class IngredientCard extends Component {
  state = {
    showCard: true
  }

  addToFavorites = (event) => {
    event.preventDefault();
    ingredient.save([this.props.ingredient])
    .then( (result) => {
      console.log('result from backend: ' + result);
      })
    .catch( error => console.log(error) )
  }

  // addToAvoidList

  removeCard = (event) => {
    event.preventDefault();
    console.log('button remove clicked');
    this.setState({ showCard: false} );
  }

  render() {
    if (this.state.showCard) {
      return (
        <div>
          <p>{this.props.ingredient}</p>
          <button name="favorite" onClick={this.addToFavorites}>:)</button>
          <button name="avoid" onClick={this.addToAvoidList}>!</button>
          <button name="remove" onClick={this.removeCard}>x</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default IngredientCard;