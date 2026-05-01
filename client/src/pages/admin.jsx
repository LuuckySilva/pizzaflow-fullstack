import { useState } from 'react'

const API_URL = 'http://localhost:3001'

function Admin() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    badge: '',
    image: ''
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await fetch(`${API_URL}/api/pizzas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      alert('Produto cadastrado com sucesso!')

      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        badge: '',
        image: ''
      })
    } catch (err) {
      alert('Erro ao cadastrar produto')
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin - Cadastro de Produto</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10, maxWidth: 400 }}>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Preço" value={form.price} onChange={handleChange} />
        <input name="category" placeholder="Categoria" value={form.category} onChange={handleChange} />
        <input name="badge" placeholder="Badge (opcional)" value={form.badge} onChange={handleChange} />
        <input name="image" placeholder="URL da imagem" value={form.image} onChange={handleChange} />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default Admin