"use strict";

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = require("./db.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var port = 3001;
var app = (0, _express["default"])();

function generateProductId() {
  var alphanumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var id = '';

  for (var i = 0; i < 8; i++) {
    id += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }

  return id;
}

app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "*"]
}));
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
app.get("/api/user", (0, _cors["default"])(), function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _db.getUsers)());

        case 3:
          users = _context.sent;
          res.json(users);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send("An error occurred while trying to retrieve users");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get("/api/user/:id", (0, _cors["default"])(), function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _db.getUserById)(req.params.id));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).send("User not found"));

        case 6:
          res.json(user);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send("An error occurred while trying to retrieve the user");

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // app.post("/api/user/login", cors(), async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   try {
//     const user = await getUserByEmail(email);
//     if (!user) {
//       return res.status(404).send({ error: "no user found" });
//     }
//     const isMatch = await bcrypt.compare(password, user[0].password);
//     if (!isMatch) {
//       return res.status(404).send({ authorized: false });
//     }
//     const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
//     return res
//       .status(201)
//       .send({ authorized: isMatch, user: user[0], token: token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send({ error: "Error logging in" });
//   }
// });
// app.post("/api/admin/login", cors(), async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   try {
//     const user = await getUserByEmail(email);
//     if (!user) {
//       return res.status(404).send({ error: "no user found" });
//     }
//     const isMatch = await bcrypt.compare(password, user[0].password);
//     if (!isMatch) {
//       return res.status(404).send({ authorized: false });
//     }
//     let storeData = {};
//     let productData = [];
//     if (user[0].role === "admin") {
//       storeData = await getStoreById(user[0].storeId);
//       productData = await getStoreProducts(user[0].storeId);
//     }
//     const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
//     return res
//       .status(201)
//       .send({ authorized: isMatch, user: user[0], storeData: storeData, productData: productData,token: token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send({ error: "Error logging in" });
//   }
// });

app.post("/api/login", (0, _cors["default"])(), function _callee3(req, res) {
  var email, password, user, isMatch, token, storeData, productData;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap((0, _db.getUserByEmail)(email));

        case 5:
          user = _context3.sent;

          if (user) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(404).send({
            error: "no user found"
          }));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user[0].password));

        case 10:
          isMatch = _context3.sent;

          if (isMatch) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", res.status(404).send({
            authorized: false
          }));

        case 13:
          token = _jsonwebtoken["default"].sign({
            id: user[0].id
          }, process.env.JWT_SECRET);

          if (!(user[0].role === "user")) {
            _context3.next = 18;
            break;
          }

          return _context3.abrupt("return", res.status(201).send({
            authorized: isMatch,
            user: user[0],
            token: token
          }));

        case 18:
          if (!(user[0].role === "admin")) {
            _context3.next = 28;
            break;
          }

          _context3.next = 21;
          return regeneratorRuntime.awrap((0, _db.getStoreById)(user[0].storeId));

        case 21:
          storeData = _context3.sent;
          _context3.next = 24;
          return regeneratorRuntime.awrap((0, _db.getStoreProducts)(user[0].storeId));

        case 24:
          productData = _context3.sent;
          return _context3.abrupt("return", res.status(201).send({
            authorized: isMatch,
            user: user[0],
            storeData: storeData,
            productData: productData,
            token: token
          }));

        case 28:
          return _context3.abrupt("return", res.status(404).send({
            authorized: false
          }));

        case 29:
          _context3.next = 35;
          break;

        case 31:
          _context3.prev = 31;
          _context3.t0 = _context3["catch"](2);
          console.error(_context3.t0.message);
          res.status(500).send({
            error: "Error logging in"
          });

        case 35:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 31]]);
});
app.post("/api/user", (0, _cors["default"])(), function _callee5(req, res) {
  var userData, id, storeId, name, storeData, saltRounds, plainPassword;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
          };

          if (req.body.role === "admin") {
            id = "a_" + Date.now().toString();
            storeId = Date.now().toString();
            name = req.body.name;

            try {
              storeData = {
                storeId: storeId,
                storeName: name
              };
              (0, _db.addStore)(storeData);
            } catch (error) {
              res.status(400).json({
                error: error.message
              });
            }
          } else if (req.body.role === "superadmin") {
            id = "s_" + Date.now().toString();
            storeId = "1";
          } else {
            id = "u_" + Date.now().toString();
            storeId = "0";
          }

          userData.id = id;
          userData.storeId = storeId;
          saltRounds = 10;
          plainPassword = req.body.password;

          _bcrypt["default"].hash(plainPassword, saltRounds, function _callee4(err, hashedPassword) {
            var newUser;
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!err) {
                      _context4.next = 4;
                      break;
                    }

                    res.status(400).json({
                      error: err.message
                    });
                    _context4.next = 15;
                    break;

                  case 4:
                    userData.password = hashedPassword;
                    _context4.prev = 5;
                    _context4.next = 8;
                    return regeneratorRuntime.awrap((0, _db.addUser)(userData));

                  case 8:
                    newUser = _context4.sent;
                    res.json({
                      message: "User added successfully",
                      data: newUser
                    });
                    _context4.next = 15;
                    break;

                  case 12:
                    _context4.prev = 12;
                    _context4.t0 = _context4["catch"](5);
                    res.status(400).json({
                      error: _context4.t0.message
                    });

                  case 15:
                  case "end":
                    return _context4.stop();
                }
              }
            }, null, null, [[5, 12]]);
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //store

app.get("/api/store", (0, _cors["default"])(), function _callee6(req, res) {
  var stores;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap((0, _db.getStores)());

        case 3:
          stores = _context6.sent;
          res.json(stores);
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0.message);
          res.status(500).send("An error occurred while trying to retrieve store");

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get("/api/store/:id", (0, _cors["default"])(), function _callee7(req, res) {
  var store;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap((0, _db.getStoreById)(req.params.id));

        case 3:
          store = _context7.sent;

          if (store) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", res.status(404).send("store not found"));

        case 6:
          res.json(store);
          _context7.next = 13;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0.message);
          res.status(500).send("An error occurred while trying to retrieve the store");

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
app.post("/api/store", (0, _cors["default"])(), function _callee8(req, res) {
  var storeData, newStore;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          storeData = {
            name: req.body.name,
            dsc: req.body.dsc,
            storeId: req.body.storeId
          };
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap((0, _db.addStore)(storeData));

        case 4:
          newStore = _context8.sent;
          res.json({
            message: "store added successfully",
            data: newStore
          });
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          res.status(400).json({
            error: _context8.t0.message
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.get("/api/store/product/:id", (0, _cors["default"])(), function _callee9(req, res) {
  var storeProducts;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap((0, _db.getStoreProducts)(req.params.id));

        case 3:
          storeProducts = _context9.sent;

          if (storeProducts) {
            _context9.next = 6;
            break;
          }

          return _context9.abrupt("return", res.status(404).send("store Products not found"));

        case 6:
          res.json(storeProducts);
          _context9.next = 13;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0.message);
          res.status(500).send("An error occurred while trying to retrieve the store");

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //products

app.get("/api/product", (0, _cors["default"])(), function _callee10(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap((0, _db.getProducts)());

        case 3:
          products = _context10.sent;
          res.json(products);
          _context10.next = 11;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0.message);
          res.status(500).send("An error occurred while trying to retrieve products");

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.post("/api/product", (0, _cors["default"])(), function _callee11(req, res) {
  var productData, newProduct;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          productData = {
            title: req.body.title,
            dscdescription: req.body.dsc,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            date: new Date(),
            id: generateProductId(),
            storeId: req.body.storeId
          };
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap((0, _db.addProduct)(productData));

        case 4:
          newProduct = _context11.sent;
          res.json({
            message: "product added successfully",
            data: newProduct
          });
          _context11.next = 11;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](1);
          res.status(400).json({
            error: _context11.t0.message
          });

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 8]]);
});