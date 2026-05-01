import express from 'express'
import cors from 'cors'
import { pizzas } from './data/pizzas.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API PizzaFlow rodando 🍕' })
})

app.get('/api/pizzas', (req, res) => {
  res.json(pizzas)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})