"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItemToCart = exports.getCart = exports.createCart = exports.addProduct = exports.getProducts = exports.getStoreProducts = exports.addStore = exports.getStoreById = exports.getStores = exports.addUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userSchema = _interopRequireDefault(require("./models/userSchema.js"));

var _mongodb = require("mongodb");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var uri = process.env.MONGO_URI; // const User = mongoose.model("User", UserSchema);

var connectToDb = function connectToDb() {
  var client;
  return regeneratorRuntime.async(function connectToDb$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_mongodb.MongoClient.connect(uri, {
            useUnifiedTopology: true
          }));

        case 3:
          client = _context.sent;
          console.log('Connected successfully to database');
          return _context.abrupt("return", client.db('store'));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getUsers = function getUsers() {
  var db, collection, users;
  return regeneratorRuntime.async(function getUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context2.sent;
          collection = db.collection('users');
          _context2.next = 7;
          return regeneratorRuntime.awrap(collection.find({}).toArray());

        case 7:
          users = _context2.sent;
          return _context2.abrupt("return", users);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getUsers = getUsers;

var getUserById = function getUserById(id) {
  var db, collection, user;
  return regeneratorRuntime.async(function getUserById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context3.sent;
          collection = db.collection('users');
          _context3.next = 7;
          return regeneratorRuntime.awrap(collection.find({
            id: id
          }).toArray());

        case 7:
          user = _context3.sent;
          return _context3.abrupt("return", user);

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getUserById = getUserById;

var getUserByEmail = function getUserByEmail(email) {
  var db, collection, user;
  return regeneratorRuntime.async(function getUserByEmail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context4.sent;
          collection = db.collection('users');
          _context4.next = 7;
          return regeneratorRuntime.awrap(collection.find({
            email: email
          }).toArray());

        case 7:
          user = _context4.sent;
          return _context4.abrupt("return", user);

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getUserByEmail = getUserByEmail;

var addUser = function addUser(userData) {
  var db, collection;
  return regeneratorRuntime.async(function addUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context5.sent;
          collection = db.collection('users');
          _context5.next = 7;
          return regeneratorRuntime.awrap(collection.insertOne(userData));

        case 7:
          return _context5.abrupt("return", userData);

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          return _context5.abrupt("return", _context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; //store


exports.addUser = addUser;

var getStores = function getStores() {
  var db, collection, stores;
  return regeneratorRuntime.async(function getStores$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context6.sent;
          collection = db.collection('stores');
          _context6.next = 7;
          return regeneratorRuntime.awrap(collection.find({}).toArray());

        case 7:
          stores = _context6.sent;
          return _context6.abrupt("return", stores);

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getStores = getStores;

var getStoreById = function getStoreById(id) {
  var db, collection, store;
  return regeneratorRuntime.async(function getStoreById$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context7.sent;
          collection = db.collection('stores');
          _context7.next = 7;
          return regeneratorRuntime.awrap(collection.find({
            storeId: id
          }).toArray());

        case 7:
          store = _context7.sent;
          return _context7.abrupt("return", store);

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0.message);

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getStoreById = getStoreById;

var addStore = function addStore(storeData) {
  var db, collection;
  return regeneratorRuntime.async(function addStore$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context8.sent;
          collection = db.collection('stores');
          _context8.next = 7;
          return regeneratorRuntime.awrap(collection.insertOne(storeData));

        case 7:
          return _context8.abrupt("return", storeData);

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          return _context8.abrupt("return", _context8.t0);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.addStore = addStore;

var getStoreProducts = function getStoreProducts(id) {
  var db, collection, products;
  return regeneratorRuntime.async(function getStoreProducts$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context9.sent;
          collection = db.collection('newProducts');
          _context9.next = 7;
          return regeneratorRuntime.awrap(collection.find({
            storeId: id
          }).toArray());

        case 7:
          products = _context9.sent;
          console.log(products);
          return _context9.abrupt("return", products);

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0.message);

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; //products


exports.getStoreProducts = getStoreProducts;

var getProducts = function getProducts() {
  var db, collection, products;
  return regeneratorRuntime.async(function getProducts$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context10.sent;
          collection = db.collection('newProducts');
          _context10.next = 7;
          return regeneratorRuntime.awrap(collection.find({}).toArray());

        case 7:
          products = _context10.sent;
          return _context10.abrupt("return", products);

        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0.message);

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getProducts = getProducts;

var addProduct = function addProduct(productData) {
  var db, collection;
  return regeneratorRuntime.async(function addProduct$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context11.sent;
          collection = db.collection('newProducts');
          _context11.next = 7;
          return regeneratorRuntime.awrap(collection.insertOne(productData));

        case 7:
          return _context11.abrupt("return", productData);

        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          return _context11.abrupt("return", _context11.t0);

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; //cart


exports.addProduct = addProduct;

var createCart = function createCart(cartData) {
  var db, collection;
  return regeneratorRuntime.async(function createCart$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context12.sent;
          collection = db.collection('cart');
          _context12.next = 7;
          return regeneratorRuntime.awrap(collection.insertOne(cartData));

        case 7:
          return _context12.abrupt("return", cartData);

        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          console.error(_context12.t0);
          return _context12.abrupt("return", _context12.t0);

        case 14:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.createCart = createCart;

var getCart = function getCart(id) {
  var db, collection, cart;
  return regeneratorRuntime.async(function getCart$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context13.sent;
          collection = db.collection('cart');
          _context13.next = 7;
          return regeneratorRuntime.awrap(collection.find({
            cartId: id
          }).toArray());

        case 7:
          cart = _context13.sent;
          return _context13.abrupt("return", cart);

        case 11:
          _context13.prev = 11;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0.message);

        case 14:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // export const  addItemToCart = async (userId, productId) => {
//   try {
//     const db = await connectToDb();
//     const cartCollection = db.collection('cart');
//     const cart = await cartCollection.find({cartId: userId}).toArray();
//     const productCollection = db.collection('newProducts');
//     const product = await productCollection.find({productId: productId}).toArray();
//     const existingItem = cart.items.find(item => item.productId === productId);
//     if (existingItem) {
//       existingItem.quantity++;
//     } else {
//       cart.items.push(product);
//     }
//     cart.totalItems = cart.items.length;
//     cart.totalAmount += product.price;
//     await cart.save();
//     return cart;
//   } catch (err) {
//     console.error(err);
//     throw new Error('Could not add item to cart');
//   }
// }


exports.getCart = getCart;

var addItemToCart = function addItemToCart(userId, productId) {
  var db, cartCollection, cart, productCollection, product, existingItem;
  return regeneratorRuntime.async(function addItemToCart$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(connectToDb());

        case 3:
          db = _context14.sent;
          cartCollection = db.collection('cart');
          _context14.next = 7;
          return regeneratorRuntime.awrap(cartCollection.findOne({
            cartId: userId
          }));

        case 7:
          cart = _context14.sent;
          productCollection = db.collection('newProducts');
          _context14.next = 11;
          return regeneratorRuntime.awrap(productCollection.findOne({
            productId: productId
          }));

        case 11:
          product = _context14.sent;
          console.log(product);
          existingItem = cart.items.find(function (item) {
            return item.productId === productId;
          });

          if (existingItem) {
            existingItem.quantity++;
          } else {
            cart.items.push(product);
          }

          cart.totalItems = cart.items.length;
          cart.totalAmount += product.price;
          _context14.next = 19;
          return regeneratorRuntime.awrap(cartCollection.updateOne({
            cartId: userId
          }, {
            $set: cart
          }));

        case 19:
          return _context14.abrupt("return", cart);

        case 22:
          _context14.prev = 22;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          throw new Error('Could not add item to cart');

        case 26:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

exports.addItemToCart = addItemToCart;