# Auth frontend app

This app works with the following backend [https://github.com/Ironhack-PartTime-BCN/webdevFT-1018-backend-api](https://github.com/Ironhack-PartTime-BCN/webdevFT-1018-backend-api)

# Project Name
Pickingry (which is coming from pic, pick, ingredients, picky)

## Description
Scan the ingredients on products using the camera in order to quickly filter the ingredients you don’t want, based on previous scans. 

## User Stories

**Sign up** As a user can sign up using a username and password, so I can use the app.
**Login** As a user can login using a username and password, so I can use the app.
**Scan products** As a user can scan products using the camera, so I can see the list of ingredients.
**Preferences** As a user I can approve or reject the ingredients in the list, so I will recognize ingredients in future scans according to my preferences.
**404 page** As a user I can see a 404 page if I try to reach a page that does not exist, so that I know it's my fault
**500 page** As a user I can see a 500 page if something went wrong in the server, so I know it’s not my fault and get a direction what to do.

# Backlog

**Alternatives** As a user I can get a list or alternative products (based on previous scans of all users) which contains all of my approved ingredients and none of my rejected ingredients, so I can pick another product.

# Client

## Routes

`/` (home page)
`/auth/signup`
`/auth/login`
`/camera`
`/approve`
`/ingredients/:`
`/* 404`

## Components

Login (input username, input password, submit button)
Sign up (input username, input password, submit button)
Camera or image upload
ProductIngredientsList (list ingredients, toggle switch ‘approve/reject’, submit button)

## Services
- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Ingredient Service
  - create(name)
  - addToUserIngredients(userId, ingredientId)
  - getIdByName(name)
  - getUserIngredientsList(userId)
  - getUserIngredient(userId, ingredientId)
  - update(id)
  - updateUserIngredient(userId, ingredientId)
  - delete(id)
  - deleteUserIngredient(userId, ingredientId)


# Server
## Models
__User model__
```javascript
{
  username/email: string, required, unique
  password: string, required
  ingredient_preferences: array of objects {ingredient_id: relation_object, approved: boolean}
}
```

__Ingredient model__
```
name - string, required, unique
```


## API Endpoints (backend routes)
- `GET: /auth/me`
  - 404 if no user in session
  - 200 with user object
- `POST: /auth/signup`
  - check user is not logged in
  - validation: username and password should not be empty
  - check if username already exists
  - create user
  - store user in session
- `POST: /auth/login`
  - check user is not logged in
  - validation: username and password should not be empty
  - check if user exists
  - match password
  - store user in session
- `GET: /ingredients`
  - list all ingredients
- `POST: /ingredient`
  - create a ingredient
- `GET: /ingredient/:id`
  - get one ingredient
- `PUT: /ingredient/:id`
  - update an ingredient
- `DELETE: /ingredient/:id`
  - delete an ingredient
- `POST: /ingredient/:id/approved`
  - add an ingredient in the user preferences

## Links
https://cloud.google.com/vision/docs/quickstart-client-libraries

### Trello/Kanban
### Git
The url to your repository and to your deployed project
[Deploy Link](https://txatapp.firebaseapp.com)
### Slides
The url to your presentation slides