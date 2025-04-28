import express from 'express'
import { auth } from '../middleware/auth'

export const router = express.Router()

router.post('/addproduct',auth,async (req ,res)=>{
    const productKeys = Object.keys(req.body)
    const options = ['title','desc','price','img']
  })