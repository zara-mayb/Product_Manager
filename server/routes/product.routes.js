const UserController = require('../controllers/product.controller');

module.exports = app => {
  app.get('/api/products', UserController.findAllProducts);
  app.get('/api/products/:id', UserController.findOneSingleProduct);
  app.patch('/api/products/:id', UserController.updateExistingProduct);
  app.post('/api/products', UserController.createNewProduct);
  app.delete('/api/products/:id', UserController.deleteAnExistingProduct);
}
