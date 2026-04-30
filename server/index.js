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
    {
      id: 1,
      name: 'Calabresa',
      description: 'Molho artesanal, mussarela, calabresa fatiada e cebola.',
      price: 42.9,
      category: 'Tradicional',
      badge: 'Mais vendida',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Frango com Catupiry',
      description: 'Frango desfiado, catupiry cremoso, mussarela e orégano.',
      price: 49.9,
      category: 'Especial',
      badge: 'Especial',
      image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Portuguesa',
      description: 'Presunto, ovos, cebola, azeitona, mussarela e ervilha.',
      price: 52.9,
      category: 'Especial',
      badge: '',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Chocolate',
      description: 'Chocolate cremoso, morango e finalização especial.',
      price: 44.9,
      category: 'Doce',
      badge: 'Doce',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Combo Família',
      description: '2 pizzas grandes + refrigerante 2L.',
      price: 89.9,
      category: 'Promoção',
      badge: 'Promo',
      image: 'https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Coca-Cola 2L',
      description: 'Bebida gelada para acompanhar seu pedido.',
      price: 12.9,
      category: 'Bebidas',
      badge: '',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
    }
  ])
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})