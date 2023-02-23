import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  getUsers,
  getUserById,
  addUser,
  getUserByEmail,
  getStores,
  getStoreById,
  addStore,
  getStoreProducts,
  addProduct, 
  createCart,
  getCart,
  addItemToCart
} from "./db.js";
import { getProducts } from "./db.js";

import bcrypt from "bcrypt";

import cors from "cors";
const port = 3001;
const app = express();

function generateProductId() {
  const alphanumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }
  return id;
}


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "*"],
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/user", cors(), async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred while trying to retrieve users");
  }
});

app.get("/api/user/:id", cors(), async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred while trying to retrieve the user");
  }
});

// app.post("/api/user/login", cors(), async (req, res) => {
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

app.post("/api/login", cors(), async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ error: "no user found" });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(404).send({ authorized: false });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

    if (user[0].role === "user") {
      const cart = await getCart (user[0].id)
      console.log(cart)
      return res.status(201).send({ authorized: isMatch, user: user[0], token: token, cart: cart });
    } else if (user[0].role === "admin") {
      const storeData = await getStoreById(user[0].storeId);
      const productData = await getStoreProducts(user[0].storeId);
      return res.status(201).send({ authorized: isMatch, user: user[0], storeData: storeData, productData: productData, token: token });
    } else {
      return res.status(404).send({ authorized: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Error logging in" });
  }
});


app.post("/api/user", cors(), async (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  let id, storeId, name;
  if (req.body.role === "admin") {
    id = "a_" + Date.now().toString();
    storeId = Date.now().toString();
    name = req.body.name
    try {
      const storeData = {
        storeId: storeId,
        storeName: name
      }
       addStore(storeData);
    }catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.body.role === "superadmin") {
    id = "s_" + Date.now().toString();
    storeId = "1";
  } else if (req.body.role === "user") {
    id = "u_" + Date.now().toString();
    storeId = "0";
    try {
      const cartData = {
        cartId: id,
        items: [],
        totalItems: 0,
        totalAmount: 0
      }
       createCart(cartData);
    }catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  userData.id = id;
  userData.storeId = storeId;

  const saltRounds = 10;
  const plainPassword = req.body.password;
  bcrypt.hash(plainPassword, saltRounds, async (err, hashedPassword) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      userData.password = hashedPassword;
      try {
        const newUser = await addUser(userData);
        res.json({
          message: "User added successfully",
          data: newUser,
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  });
});

//store
app.get("/api/store", cors(), async (req, res) => {
  try {
    const stores = await getStores();
    res.json(stores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred while trying to retrieve store");
  }
});

app.get("/api/store/:id", cors(), async (req, res) => {
  try {
    const store = await getStoreById(req.params.id);
    if (!store) {
      return res.status(404).send("store not found");
    }
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("An error occurred while trying to retrieve the store");
  }
});

app.post("/api/store", cors(), async (req, res) => {
  const storeData = {
    name: req.body.name,
    dsc: req.body.dsc,
    storeId: req.body.storeId
  };
  try {
    const newStore = await addStore(storeData);
    res.json({
      message: "store added successfully",
      data: newStore,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/api/store/product/:id", cors(), async (req, res) => {
  try {
    const storeProducts = await getStoreProducts(req.params.id);
    if (!storeProducts) {
      return res.status(404).send("store Products not found");
    }
    res.json(storeProducts);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send("An error occurred while trying to retrieve the store");
  }
});

//products

app.get("/api/product", cors(), async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred while trying to retrieve products");
  }
});
app.post("/api/product", cors(), async (req, res) => {
  const productData = {
    title: req.body.title,
    dscdescription: req.body.dscdescription,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    quantity: req.body.quantity,
    category:  req.body.category,
    date: new Date(),
    productId: generateProductId(),
    storeId: req.body.storeId
  };
  try {
    const newProduct = await addProduct(productData);
    res.json({
      message: "product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// cart
app.post("/api/cart/additem",cors(), async (req, res) => {
  const userId = req.body.userId
  const productId = req.body.productId
  try {
    const cart = await addItemToCart(userId, productId);
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});