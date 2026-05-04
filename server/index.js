import express from 'express'
import cors from 'cors'
import { pizzas } from './data/pizzas.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

let products = [...pizzas]
let orders = []

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

app.post('/api/orders', (req, res) => {
  const { customerName, phone, address, items, subtotal, deliveryFee, total } = req.body

  if (!customerName || !phone || !address || !items || !total) {
    return res.status(400).json({ error: 'Dados do pedido incompletos.' })
  }

  const newOrder = {
    id: Date.now(),
    customerName,
    phone,
    address,
    items,
    subtotal,
    deliveryFee,
    total,
    status: 'Recebido',
    createdAt: new Date()
  }

  orders.push(newOrder)
  res.status(201).json(newOrder)
})

app.get('/api/orders', (req, res) => {
  res.json(orders)
})

app.get('/api/dashboard', (req, res) => {
  const totalOrders = orders.length

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + Number(order.total)
  }, 0)

  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const totalItemsSold = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
  }, 0)

  res.json({
    totalOrders,
    totalRevenue,
    averageTicket,
    totalItemsSold,
    weeklyRevenue: totalRevenue,
    monthlyRevenue: totalRevenue
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})