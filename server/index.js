import express from 'express'
import cors from 'cors'
import { pizzas } from './data/pizzas.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let products = [...pizzas]

app.get('/', (req, res) => {
  res.json({ message: 'API PizzaFlow rodando 🍕' })
})

app.get('/api/pizzas', (req, res) => {
  res.json(products)
})

app.post('/api/pizzas', (req, res) => {
  const { name, description, price, category, badge, image } = req.body

  if (!name || !description || !price || !category || !image) {
    return res.status(400).json({
      error: 'Preencha nome, descrição, preço, categoria e imagem.'
    })
  }

  const newProduct = {
    id: Date.now(),
    name,
    description,
    price: Number(price),
    category,
    badge: badge || '',
    image
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
})

app.delete('/api/pizzas/:id', (req, res) => {
  const { id } = req.params

  products = products.filter((product) => product.id !== Number(id))

  res.json({ message: 'Produto removido com sucesso.' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})