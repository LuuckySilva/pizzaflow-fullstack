import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API PizzaFlow rodando 🍕' })
})

app.get('/api/pizzas', (req, res) => {
  res.json([
    { id: 1, name: 'Calabresa', price: 45.9 },
    { id: 2, name: 'Frango com Catupiry', price: 49.9 },
    { id: 3, name: 'Portuguesa', price: 52.9 }
  ])
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})