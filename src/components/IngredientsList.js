import React, { Component } from 'react';

class IngredientsList extends Component {

  render() {
    if (!this.props.ingredientInformation) {
      return null;
    }

    // get product description of whatever text is before 'INGREDIENTES'
    let ingredientInformation = this.props.ingredientInformation[0].description; // string containing the text from the image
    let regexIngredients = /(ingredients|ingredientes|ingredienti|ingrédients|zutaten|ingrediënten):?/g;
    const ingredientsPosition = ingredientInformation.toLowerCase().search(regexIngredients);
    const textBeforeIngredients = ingredientInformation.substring(-70, ingredientsPosition); // everything before the word ingredientes, but max 70 characters

    // data cleaning of the ingredient information to get rid of rubbish and be more consistent
    regexIngredients = /((.|\n)*(ingredients|ingredientes|ingredienti|ingrédients|zutaten|ingrediënten):?\s?)|[()]|([0-9]{1,2}[, ]?[0-9]? ?%)|(?<=E)-(?=[0-9]{3})/gi
    ingredientInformation = ingredientInformation.replace(regexIngredients, '');
    // ------- ((.|\n)*(ingredients|ingredientes|ingredienti|ingrédients|zutaten|ingrediënten):?\s?) removes everything from the beginning until after ingredientes
    // ------- [()] removes al '(' and ')' characters
    // ------- ([0-9]{1,2}[, ]?[0-9]? ?%) removes all percentages (10%, 10 %, 10,1%, 10,1 %)
    // ------- (?<=E)-(?=[0-9]{3}) converts E-123 into E123

    // split ingredientInformation into multiple lines of ingredients
    const regexSplit = /[.,:]\s|\sy\s/g; // splits at ", " or ". " or ": " or " y " 
    const ingredients = ingredientInformation.split(regexSplit);
    
    return (
      <div>
        <h3>Product Description</h3>
        <p>{textBeforeIngredients}</p>
        <h3>List of ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>
          })}          
        </ul>
      </div>
    )
  }
}

export default IngredientsList;