import express, { Request, Response } from 'express'
import productRouter from './routes/product.routes'

const app = express()
app.use(express.json())

app.use('/product',productRouter)

export default app