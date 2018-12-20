import React, { Component } from 'react';
import Camera from '../components/Camera';
import IngredientsList from '../components/IngredientsList';
import { withAuth } from '../providers/AuthProvider';
import ingredient from '../lib/ingredient-service';

class Ingredients extends Component {
  state = {
    showCamera: true,
    ingredientInformation: null,
    ingredient: null
  }

  componentDidMount() {
    console.log('ingredient component did mount');
  }

  // ============== convert image into text upon screenshot
  handleScreenshot = (imageBase64String) => {
    // close camera
    this.setState({showCamera: false});

    console.log('handle screenshot');

    ingredient.getTextFromImage(imageBase64String)
    .then((textAnnotations) => {
      //console.log(textAnnotations);
      this.setState({ingredientInformation: textAnnotations})
    })
    .catch((error) => {
      console.log(error, 'something went wrong in the Google Cloud Vision request')
    })
  }

  render() {    
    return (
      <div>
        <h1>Ingredients</h1>
        <Camera showCamera={this.state.showCamera} onCapture={this.handleScreenshot} />
        <IngredientsList ingredientInformation={this.state.ingredientInformation} saveIngredients={ingredient.saveIngredients} />
      </div>
    )
  }
}

export default withAuth(Ingredients);