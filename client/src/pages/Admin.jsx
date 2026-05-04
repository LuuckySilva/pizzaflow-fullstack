import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3001'

function Admin() {
  const [dashboard, setDashboard] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageTicket: 0,
    totalItemsSold: 0,
    weeklyRevenue: 0,
    monthlyRevenue: 0
  })

  const [products, setProducts] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem('adminAuth') === 'true'
)
const [password, setPassword] = useState('')
const [loginError, setLoginError] = useState('')
const [loginLoading, setLoginLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    badge: '',
    image: ''
  })

  useEffect(() => {
    loadDashboard()
    loadProducts()
  }, [])

  async function loadDashboard() {
    const response = await fetch(`${API_URL}/api/dashboard`)
    const data = await response.json()
    setDashboard(data)
  }

  async function loadProducts() {
    const response = await fetch(`${API_URL}/api/pizzas`)
    const data = await response.json()
    setProducts(data)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

async function handleSubmit(e) {
  e.preventDefault()

  setLoading(true)

  const response = await fetch(`${API_URL}/api/pizzas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...form,
      price: Number(form.price)
    })
  })

  if (!response.ok) {
    const error = await response.json()
    alert(error.error || 'Erro ao cadastrar produto.')
    setLoading(false)
    return
  }

  alert('Produto cadastrado com sucesso!')

  setForm({
    name: '',
    description: '',
    price: '',
    category: '',
    badge: '',
    image: ''
  })

  await loadProducts()
  await loadDashboard()

  setLoading(false)
}

  async function deleteProduct(id) {
    await fetch(`${API_URL}/api/pizzas/${id}`, {
      method: 'DELETE'
    })

    loadProducts()
    loadDashboard()
  }
 function handleLogin(e) {
  e.preventDefault()

  setLoginLoading(true)

  setTimeout(() => {
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Senha incorreta. Tente novamente.')
      setPassword('')
    }

    setLoginLoading(false)
  }, 800)
}

function handleLogout() {
  localStorage.removeItem('adminAuth')
  setIsAuthenticated(false)
  setPassword('')
}
  if (!isAuthenticated) {
    
  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <span>Área administrativa</span>
        <h1>Acesso restrito</h1>
        <p>Digite a senha para acessar o painel PizzaFlow.</p>

        <input
          type="password" disabled={loginLoading}
          placeholder="Senha do admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && <p className="login-error">{loginError}</p>}

        <button type="submit" disabled={loginLoading}>
  {loginLoading ? 'Entrando...' : 'Entrar no painel'}
</button>

        <a href="/">Voltar para o site</a>
      </form>
    </main>
  )
}

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <span>Dashboard Administrativo</span>
          <h1>Gestão PizzaFlow</h1>
          <p>Acompanhe pedidos, faturamento e cadastre novos produtos.</p>
        </div>

      <div className="admin-actions">
  <button onClick={handleLogout} className="admin-logout">
    Sair
  </button>

  <a href="/" className="admin-back">
    Voltar para o site
  </a>
</div>
      </section>

      <section className="admin-metrics">
        <div className="metric-card">
          <span>Pedidos</span>
          <strong>{dashboard.totalOrders}</strong>
          <p>Total de pedidos recebidos</p>
        </div>

        <div className="metric-card">
          <span>Faturamento</span>
          <strong>R$ {dashboard.totalRevenue.toFixed(2)}</strong>
          <p>Valor total vendido</p>
        </div>

        <div className="metric-card">
          <span>Ticket médio</span>
          <strong>R$ {dashboard.averageTicket.toFixed(2)}</strong>
          <p>Média por pedido</p>
        </div>

        <div className="metric-card">
          <span>Itens vendidos</span>
          <strong>{dashboard.totalItemsSold}</strong>
          <p>Total de produtos vendidos</p>
        </div>

        <div className="metric-card">
          <span>Semana</span>
          <strong>R$ {dashboard.weeklyRevenue.toFixed(2)}</strong>
          <p>Faturamento semanal</p>
        </div>

        <div className="metric-card">
          <span>Mês</span>
          <strong>R$ {dashboard.monthlyRevenue.toFixed(2)}</strong>
          <p>Faturamento mensal</p>
        </div>
      </section>

      <section className="admin-content">
        <div className="admin-panel">
          <h2>Cadastrar produto</h2>

          <form onSubmit={handleSubmit} className="admin-form">
            <input name="name" placeholder="Nome do produto" value={form.name} onChange={handleChange} />
            <input name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
            <input name="price" placeholder="Preço" value={form.price} onChange={handleChange} />
            <input name="category" placeholder="Categoria" value={form.category} onChange={handleChange} />
            <input name="badge" placeholder="Badge (opcional)" value={form.badge} onChange={handleChange} />
            <input name="image" placeholder="URL da imagem" value={form.image} onChange={handleChange} />

            <button type="submit" disabled={loading}>
  {loading ? 'Cadastrando...' : 'Cadastrar produto'}
</button>
          </form>
        </div>

        <div className="admin-panel">
          <h2>Produtos cadastrados</h2>

          <div className="admin-products">
            {products.map((product) => (
              <div key={product.id} className="admin-product-card">
                <img src={product.image} alt={product.name} />

                <div>
                  <strong>{product.name}</strong>
                  <p>{product.category}</p>
                  <span>R$ {Number(product.price).toFixed(2)}</span>
                </div>

                <button onClick={() => deleteProduct(product.id)}>
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Admin