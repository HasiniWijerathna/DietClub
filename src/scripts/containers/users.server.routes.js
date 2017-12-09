'use strict';

module.exports = function(app) {
  var adminsPolicy = require('../policies/admin.server.policy.js');
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/:userId/profile').put(users.profile);
  app.route('/api/users/:userId/favourites').get(users.favourites);
  app.route('/api/users/:userId/shoppingList').get(users.shoppingList);

  app.route('/api/users/:userId/mealTag').post(users.createMealTag);
  app.route('/api/users/:userId/mealTag/:tagId').delete(users.deleteMealTag);
  app.route('/api/users/:userId/mealTag/:tagId').put(users.updateMealTag);

  app.route('/api/users/:userId/shoppingList/clean').get(users.shoppingListClean);
  app.route('/api/users/:userId/shoppingList/clear').get(users.shoppingListClear);

  app.route('/api/users/:userId/filter/:filter/vendors/:ids/calories/:cal/type/:type').get(users.filter);

  app.route('/api/users/:userId/add-fav/:itemId/type/:itemType').get(users.addFav);
  app.route('/api/users/:userId/remove-fav/:itemId/type/:itemType').get(users.removeFav);

  app.route('/api/users/:userId/add-shoppingList/:recipeId/ingredients/:ids')
    .get(users.updateShoppingList);
  app.route('/api/users/:userId/add-shoppingList/:recipeId/ingredient/:ingredientId')
    .get(users.addShoppingList);
  app.route('/api/users/:userId/remove-shoppingList/:recipeId/ingredient/:ingredientId')
    .get(users.removeShoppingList);

  app.route('/api/users/:userId/shopping-list')
    .post(users.addItemToShoppingList);
  app.route('/api/users/:userId/shopping-list/:shoppingListItemId')
    .put(users.updateItemOnShoppingList);
  app.route('/api/users/:userId/shopping-list')
    .put(users.updateEntireShoppingList);

  app.route('/api/users/:userId/update-profile').put(users.updateProfile);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  app.route('/api/v2/users/me/quick-picks').all(adminsPolicy.isAllowed)
    .get(users.getUserQuickpicks);

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
