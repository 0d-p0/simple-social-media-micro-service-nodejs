import express from 'express'
import dotEnv from 'dotenv'
import cors from "cors"
import { connectDataBase } from './config.js'
import router from './routes/postRoutes.js'
dotEnv.config()
const app  = express()
connectDataBase()
const port  = process.env.PORT||4000

// * MiddleWare
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use('/api',router)


app.listen(port,()=>console.log(`server is running on ${port}`))