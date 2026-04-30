import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3001'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const categories = ['Todos', 'Tradicional', 'Especial', 'Doce', 'Promoção', 'Bebidas']
  const deliveryFee = cart.length > 0 ? 5 : 0

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(`${API_URL}/api/pizzas`)
      const data = await response.json()
      setProducts(data)
    }

    loadProducts()
  }, [])

  const filteredProducts =
    activeCategory === 'Todos'
      ? products
      : products.filter((product) => product.category === activeCategory)

  function addToCart(product) {
    const itemExists = cart.find((item) => item.id === product.id)

    if (itemExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }

    setIsCartOpen(true)
  }

  function increaseQuantity(productId) {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  function decreaseQuantity(productId) {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  const total = subtotal + deliveryFee

  function sendToWhatsApp() {
    if (!customerName || !phone || !address || cart.length === 0) {
      alert('Preencha seus dados e adicione pelo menos um item.')
      return
    }

    const message = `
🍕 *Novo Pedido - PizzaFlow*

👤 Nome: ${customerName}
📞 Telefone: ${phone}
📍 Endereço: ${address}

🛒 *Itens do pedido:*
${cart.map((item) => `• ${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Subtotal: R$ ${subtotal.toFixed(2)}
Taxa de entrega: R$ ${deliveryFee.toFixed(2)}
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
    setIsCartOpen(false)
  }

  return (
    <>
      <header className="header">
        <a href="#home" className="logo">PizzaFlow</a>

        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Cardápio</a>
          <a href="#about">Sobre</a>
          <a href="#gallery">Galeria</a>
          <a href="#contact">Contato</a>
        </nav>

        <button className="header-button" onClick={() => setIsCartOpen(true)}>
          Pedir Agora
        </button>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <span>Pizza artesanal no forno</span>
          <h1>Pizza artesanal feita no forno, direto para sua mesa.</h1>
          <p>Escolha sua favorita e monte seu pedido em poucos cliques.</p>

          <div className="hero-actions">
            <a href="#menu" className="primary-button">Pedir Agora</a>
            <a href="#menu" className="secondary-button">Ver Cardápio</a>
          </div>
        </div>
      </section>

      <section id="about" className="about section">
        <div>
          <span className="section-tag">Nossa história</span>
          <h2>Tradição, sabor e atendimento próximo.</h2>
          <p>
            A PizzaFlow nasceu para levar pizzas artesanais com ingredientes
            selecionados, massa leve e atendimento rápido. Nosso objetivo é
            transformar cada pedido em uma experiência simples, saborosa e
            confiável.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80"
          alt="Pizza artesanal"
        />
      </section>

      <section id="menu" className="section">
        <div className="section-header">
          <span className="section-tag">Cardápio</span>
          <h2>Escolha sua favorita</h2>
          <p>Filtre por categoria e adicione seus itens ao carrinho.</p>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              {product.badge && <span className="badge">{product.badge}</span>}

              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="product-footer">
                  <strong>R$ {product.price.toFixed(2)}</strong>
                  <button onClick={() => addToCart(product)}>
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works section">
        <div className="section-header">
          <span className="section-tag">Como funciona</span>
          <h2>Seu pedido em 3 passos</h2>
        </div>

        <div className="steps">
          <div>
            <span>1</span>
            <h3>Escolha sua pizza</h3>
            <p>Veja o cardápio e escolha seus sabores favoritos.</p>
          </div>

          <div>
            <span>2</span>
            <h3>Monte seu pedido</h3>
            <p>Adicione itens ao carrinho e confira o total.</p>
          </div>

          <div>
            <span>3</span>
            <h3>Receba em casa</h3>
            <p>Finalize pelo WhatsApp e aguarde a confirmação.</p>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery section">
        <div className="section-header">
          <span className="section-tag">Galeria</span>
          <h2>Sabor que entra pelos olhos</h2>
        </div>

        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1601924582975-4fcf2a6b458e?auto=format&fit=crop&w=800&q=80" alt="Pizza" />
          <img src="https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=800&q=80" alt="Pizza" />
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" alt="Pizza" />
        </div>
      </section>

      <section id="contact" className="cta-final">
        <h2>Está com fome?</h2>
        <p>Monte seu pedido agora e finalize pelo WhatsApp.</p>
        <a href="#menu" className="primary-button">Ver cardápio</a>
      </section>

      <footer className="footer">
        <strong>PizzaFlow</strong>
        <p>Projeto fullstack desenvolvido por Lucas Silva.</p>
      </footer>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Seu pedido</h2>
              <button onClick={() => setIsCartOpen(false)}>×</button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Seu carrinho está vazio.</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="quantity">
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>

                      <button className="remove" onClick={() => removeFromCart(item.id)}>
                        Remover
                      </button>
                    </div>
                  ))}
                </div>

                <div className="checkout">
                  <div>
                    <span>Subtotal</span>
                    <strong>R$ {subtotal.toFixed(2)}</strong>
                  </div>

                  <div>
                    <span>Entrega</span>
                    <strong>R$ {deliveryFee.toFixed(2)}</strong>
                  </div>

                  <div className="total">
                    <span>Total</span>
                    <strong>R$ {total.toFixed(2)}</strong>
                  </div>

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

                  <button className="checkout-button" onClick={sendToWhatsApp}>
                    Finalizar pedido
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  )
}

export default App