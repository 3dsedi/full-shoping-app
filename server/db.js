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



