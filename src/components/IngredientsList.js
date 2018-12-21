import React, { Component } from 'react';
import IngredientCard from './IngredientCard';
import ingredient from '../lib/ingredient-service';

class IngredientsList extends Component {
  state = {
    lookupForPreferences: {}
  }

  handlePreferences = (newPreference, ingredient) => {
    const preferences = {...this.state.lookupForPreferences}
    preferences[ingredient] = newPreference
    this.setState({
      lookupForPreferences: preferences
    })
  }

  ingredients = [];
  
    // ============== get ingredients information from the database upon button click
    getUserPreferences = (event) => {
      event.preventDefault()  
      // send request to the backend api
      ingredient.getUserIngredients({ ingredients: this.ingredients })
      .then((result) => {
        const lookupForPreferences = {};
        this.ingredients.forEach(ingredient => {
          lookupForPreferences[ingredient] = 'unknown';
        })

        // store each user preference in the lookup object
        result.data.ingredients.forEach(ingredient => {
          const name = ingredient.ingredient_id.name;
          const preference = ingredient.preference;
          
          if (lookupForPreferences[name]) {
            lookupForPreferences[name] = preference;
          }
        })
        this.setState({lookupForPreferences: lookupForPreferences});
      })
      .catch((error) => {
        console.log('something went wrong');
      })
    }

  saveIngredients = (event) => {
    ingredient.save(this.ingredients)
    .then( (result) => {
      // console.log('result from backend: ' + result);
      })
    .catch( error => console.log(error) )
  }

  render() {
    if (!this.props.ingredientInformation) {
      return null;
    }
    // get product description of whatever text is before 'INGREDIENTES'
    let ingredientInformation = this.props.ingredientInformation[0].description; // string containing the text from the image
    let regexIngredients = /(ingredients|ingredientes|ingredienti|ingrédients|zutaten|ingrediënten):?/gi;
    const ingredientsPosition = ingredientInformation.search(regexIngredients);
    const textBeforeIngredients = ingredientInformation.substring(-70, ingredientsPosition); // everything before the word ingredientes, but max 70 characters

    // data cleaning of the ingredient information to get rid of rubbish and be more consistent
    // ------- ((.|\n)*(ingredients|ingredientes|ingredienti|ingrédients|zutaten|ingrediënten):?\s?) removes everything from the beginning until after ingredientes
    // ------- [()] removes al '(' and ')' characters
    // ------- ([0-9]{1,2}[, ]?[0-9]? ?%) removes all percentages (10%, 10 %, 10,1%, 10,1 %)
    // ------- (?<=E)-(?=[0-9]{3}) converts E-123 into E123
    regexIngredients = /((.|\n)*(ingredients|ingredientes|ingredienti|ingrédients|zutaten|ingrediënten):?\s?)|[()]|([0-9]{1,2}[, ]?[0-9]? ?%)|(?<=E)-(?=[0-9]{3})/gi
    ingredientInformation = ingredientInformation.replace(regexIngredients, '');
    ingredientInformation = ingredientInformation.replace(/\n/g, ' ');
    ingredientInformation = ingredientInformation.toLowerCase();

    // split ingredientInformation into multiple lines of ingredients
    const regexSplit = /[.,:]\s|\sy\s/g; // splits at ", " or ". " or ": " or " y " 
    this.ingredients = ingredientInformation.split(regexSplit).map(ingredient => ingredient.trim());
    
    return (
      <div>
        <h3>Product Description</h3>
        <p>{textBeforeIngredients}</p>
        <h3>List of ingredients</h3>
        <ul>
          {this.ingredients.map((ingredient, index) => {
            return <li key={index}>
              <IngredientCard key={index} ingredient={ingredient} ingred={this.state.lookupForPreferences} setPreference={this.handlePreferences}/>
            </li>
          })}          
        </ul>
        <button name="saveIngredients" onClick={this.saveIngredients}>save ingredients</button>
        <button name="getIngredients" onClick={this.getUserPreferences}>get user preferences</button>
      </div>
    )
  }
}

export default IngredientsList;