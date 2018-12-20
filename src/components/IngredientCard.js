import React, { Component } from 'react';
import ingredient from '../lib/ingredient-service';

class IngredientCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCard: true,
    }
  }
  

  saveUserPreference = (event) => {
    event.preventDefault();
    this.props.setPreference(event.target.name, this.props.ingredient)
    ingredient.save(this.props.ingredient, event.target.name)
    .then( (result) => {
      // console.log('result from backend: ' + result);
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
          <p>{this.props.ingred[this.props.ingredient]}</p>
          <button name="favorite" className={`${this.props.ingred[this.props.ingredient]} button-favorite`} onClick={this.saveUserPreference}>:)</button>
          <button name="avoid" className={`${this.props.ingred[this.props.ingredient]} button-avoid`} onClick={this.saveUserPreference}>!</button>
          <button name="remove" onClick={this.removeCard}>x</button>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default IngredientCard;