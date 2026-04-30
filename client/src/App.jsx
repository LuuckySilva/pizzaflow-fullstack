import { useEffect, useState } from 'react'
import API_URL from './services/api'
import './App.css'

function App() {
  const [pizzas, setPizzas] = useState([])
  const [cart, setCart] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    async function loadPizzas() {
      const res = await fetch(`${API_URL}/api/pizzas`)
      const data = await res.json()
      setPizzas(data)
    }

    loadPizzas()
  }, [])

  function addToCart(pizza) {
    const itemExists = cart.find((item) => item.id === pizza.id)

    if (itemExists) {
      const updatedCart = cart.map((item) =>
        item.id === pizza.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )

      setCart(updatedCart)
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }])
    }
  }

  function removeFromCart(pizzaId) {
    setCart(cart.filter((item) => item.id !== pizzaId))
  }

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  function sendToWhatsApp() {
    if (!customerName || !phone || !address || cart.length === 0) {
      alert('Preencha seus dados e adicione pelo menos uma pizza.')
      return
    }

    if (phone.length < 10) {
      alert('Digite um telefone válido.')
      return
    }

    const message = `
🍕 *Novo Pedido - PizzaFlow*

👤 Nome: ${customerName}
📞 Telefone: ${phone}
📍 Endereço: ${address}

🛒 *Itens do pedido:*
${cart.map((item) => `• ${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}

💰 *Total: R$ ${total.toFixed(2)}*

Obrigado! Aguardo confirmação 😊
`

    const whatsappNumber = '5535984128081'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')

    setCart([])
    setCustomerName('')
    setPhone('')
    setAddress('')
  }

  return (
    <div className="app">
      <h1>PizzaFlow 🍕</h1>

      <section>
        <h2>Cardápio</h2>

        {pizzas.map((pizza) => (
          <div className="pizza-card" key={pizza.id}>
            <h3>{pizza.name}</h3>
            <p>R$ {pizza.price.toFixed(2)}</p>
            <button onClick={() => addToCart(pizza)}>
              Adicionar ao pedido
            </button>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>Seu pedido</h2>

        {cart.length === 0 ? (
          <p>Nenhuma pizza adicionada ainda.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <strong>{item.quantity}x {item.name}</strong>
              <p>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}>
                Remover
              </button>
            </div>
          ))
        )}

        <h3>Total: R$ {total.toFixed(2)}</h3>
      </section>

      <hr />

      <section>
        <h2>Dados para entrega</h2>

        <div className="form">
          <input
            type="text"
            placeholder="Seu nome"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button onClick={sendToWhatsApp}>
            Enviar pedido pelo WhatsApp
          </button>
        </div>
      </section>
    </div>
  )
}

export default App
