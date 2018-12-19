const axios = require('axios');

class Ingredient {
  constructor() {
    // set up backend API
    this.ingredient = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });

    // set up Google Cloud Vision API
    this.googleVision = axios.create({
      baseURL: `${process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_URL}`
    });
  }

  // =========== GET all user ingedrients from backend server/database
  get() {
    return this.ingredient.get('/ingredient/list')
    .then(response => response);
  }
  
  // =========== POST: save ingredients and user preference in the database
  save(ingredientName, userPreference) {
    console.log(ingredient);
    return this.ingredient.post('/ingredient', { ingredientName, userPreference })
    .then(({ data }) => data);
  }

  // =========== GET Request to Google Cloud Vision API to convert image into text
  getTextFromImage(imageBase64String) {
    imageBase64String = imageBase64String.substring(22) // trim 'data:image/png;base64,' from the Base64 string
    console.log(imageBase64String);
    
    const requestBody = {
      "requests" : [
        {
          "image": 
            {
              "content": imageBase64String
            },
          "features": [
            {
              "type": "LOGO_DETECTION"
            },
            {
              "type": "LABEL_DETECTION"
            },
            {
              "type": "DOCUMENT_TEXT_DETECTION"
            }
          ]
        }
      ]
    }

    // request to Google Cloud Vision api
    return this.googleVision.post(`/images:annotate?key=${process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_KEY}`, requestBody)
    .then((response) => {
      console.log(response);
      return response.data.responses[0].textAnnotations
    });    
  }
}

const ingredient = new Ingredient();

export default ingredient;