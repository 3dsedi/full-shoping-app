import express from "express";
import user from '../models/users.js'
const usersRouter = express.Router()


//get all
usersRouter.get('/', async(req, res) => {
try{
const users = await user.find()
res.json(users)
} catch(err){
res.status(500).json({message: err.message})
}
})
//get one
usersRouter.get('/:id', (req, res) => {
res.send(req.params.id)
})
// create one
usersRouter.post('/', (req, res) => {
    
})
//update one
usersRouter.patch('/:id', (req, res) => {
    
})
// delete one
usersRouter.delete('/:id', (req, res) => {
    
})


export default usersRouter