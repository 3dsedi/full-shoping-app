import  express  from 'express';
import mongoose from 'mongoose';
import UserSchema from './models/userSchema.js'
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv' 
dotenv.config()

const app = express();

const uri = process.env.MONGO_URI;
// const User = mongoose.model("User", UserSchema);


const connectToDb = async () => {
    try {
      const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
      console.log('Connected successfully to database');
      return client.db('store');
    } catch (err) {
      console.error(err.message);
    }
  };


  export const getUsers = async () => {
    try {
      const db = await connectToDb();
      const collection = db.collection('users');
      const users = await collection.find({}).toArray();
      return users;
    } catch (err) {
      console.error(err.message);
    }
  };

  export const getUserById = async (id) => {
    try {
      const db = await connectToDb();
      const collection = db.collection('users');
      const user = await collection.find({id: id}).toArray();
      return user;
    } catch (err) {
      console.error(err.message);
    }
  };

  export const getUserByEmail = async (email) => {
    try {
      const db = await connectToDb();
      const collection = db.collection('users');
      const user = await collection.find({email: email}).toArray();
      return user;
    } catch (err) {
      console.error(err.message);
    }
  };


   export  const addUser= async (userData)=> {
    try {
     const db = await connectToDb();
      const collection = db.collection('users');
      await collection.insertOne(userData)
      return userData;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //store
  export const getStores = async () => {
    try {
      const db = await connectToDb();
      const collection = db.collection('stores');
      const stores = await collection.find({}).toArray();
      return stores;
    } catch (err) {
      console.error(err.message);
    }
  };

  export const getStoreById = async (id) => {
    try {
      const db = await connectToDb();
      const collection = db.collection('stores');
      const store = await collection.find({storeId: id}).toArray();
      return store;
    } catch (err) {
      console.error(err.message);
    }
  };

  export  const addStore= async (storeData)=> {
    try {
     const db = await connectToDb();
      const collection = db.collection('stores');
      await collection.insertOne(storeData)
      return storeData;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  export const getStoreProducts = async (id) => {
    try {
      const db = await connectToDb();
      const collection = db.collection('newProducts');
      const products = await collection.find({storeId: id}).toArray();
      console.log(products)
      return products;
    } catch (err) {
      console.error(err.message);
    }
  };


  //products

  export const getProducts = async () => {
    try {
      const db = await connectToDb();
      const collection = db.collection('newProducts');
      const products = await collection.find({}).toArray();
      return products;
    } catch (err) {
      console.error(err.message);
    }
  };
  
  export  const addProduct= async (productData)=> {
    try {
     const db = await connectToDb();
      const collection = db.collection('newProducts');
      await collection.insertOne(productData)
      return productData;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //cart

  export  const createCart= async (cartData)=> {
    try {
     const db = await connectToDb();
      const collection = db.collection('cart');
      await collection.insertOne(cartData)
      return cartData;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  export const getCart = async (id) => {
    try {
      const db = await connectToDb();
      const collection = db.collection('cart');
      const cart = await collection.find({cartId: id}).toArray();
      return cart;
    } catch (err) {
      console.error(err.message);
    }
  };

export const addItemToCart = async (userId, productId) => {
  try {
    const db = await connectToDb();
    const cartCollection = db.collection('cart');
    const cart = await cartCollection.findOne({ cartId: userId });
    const productCollection = db.collection('newProducts');
    const product = await productCollection.findOne({ productId: productId });
    await productCollection.updateOne({ productId: productId }, { $inc: { quantity: -1 } });
    cart.items.push(product)
    cart.totalItems = cart.items.length;
    cart.totalAmount += product.price;

    await cartCollection.updateOne({ cartId: userId }, { $set: cart });

    return cart;
  } catch (err) {
    console.error(err);
    throw new Error('Could not add item to cart');
  }
};

export const deleteItemFromCart = async (cartId, productId) => {
  try {
    const db = await connectToDb();
    const cartCollection = db.collection('cart');
    const cart = await cartCollection.findOne({ cartId: cartId });
    const itemIndex = cart.items.indexOf(cart.items.find(item => item.productId === productId));
    console.log(itemIndex)
    if (itemIndex >= 0) {
      const deletedItem = cart.items.splice(itemIndex, 1)[0];
      cart.totalItems = cart.items.length;
      cart.totalAmount -= deletedItem.price;
      await cartCollection.updateOne({ cartId: cartId }, { $set: cart });
      const productCollection = db.collection('newProducts');
      await productCollection.updateOne({ productId: productId }, { $inc: { quantity: +1 } });
      return cart;
    } else {
      throw new Error('Item not found in cart');
    }
  } catch (err) {
    console.error(err);
    throw new Error('Could not delete item from cart');
  }
};







