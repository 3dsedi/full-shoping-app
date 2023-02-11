import  express  from 'express';
import {getUsers , getUserById, addUser, getUserByEmail} from './db.js'
import {getProducts} from './db.js'

import bcrypt from 'bcrypt'
// import { uuid } from 'uuidv4';
import cors from 'cors'
const port = 3001
const app = express();
// const bcrypt = bcrypt();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    allowedHeaders: ['Content-Type','*'],
  }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.get('/api/user',cors(), async (req, res) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('An error occurred while trying to retrieve users');
    }
  });

  app.get('/api/user/:id',cors(), async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('An error occurred while trying to retrieve the user');
    }
  });

  app.post('/api/user/login',cors(), async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).send({error: 'no user found' });
      }
      const isMatch = await bcrypt.compare(password, user[0].password);
      if(!isMatch) {
        return res.status(404).send({authorized: false  })
      }
      return res.status(201).send({ authorized: isMatch });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: 'Error logging in' });
    }
  });

  

  app.post("/api/user",cors(), async (req, res) => {
      const userData = {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
      };
      let id, storeId;
      if (req.body.role === "admin") {
          id = "a_" + Date.now().toString();
          storeId = Date.now().toString()
      } else if (req.body.role === "super_admin") {
          id = "s_" + Date.now().toString();
          storeId = '1';
      } else {
          id = "u_" + Date.now().toString();
          storeId = '0';
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
                  res 
                  .json({
                      message: "User added successfully",
                      data: newUser
                  });
              } catch (error) {
                  res.status(400).json({ error: error.message });
              }
          }
      });
  });


  //products
  
  app.get('/api/product',cors(), async (req, res) => {
    try {
      const products = await getProducts();
      console.log(products)
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('An error occurred while trying to retrieve products');
    }
  });




  


  