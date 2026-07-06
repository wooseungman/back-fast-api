import React, { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('loading...')
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then((r) => r.json())
      .then((d) => setMessage(d.message))
      .catch(() => setMessage('failed'))

    // load items (since backend uses in-memory fake_db, there is no list endpoint; this is just demo)
  }, [])

  const createItem = async (e) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 100000)
    const payload = { id, name, price: parseFloat(price || 0) }
    try {
      const res = await fetch('/api/items/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const item = await res.json()
        setItems((s) => [item, ...s])
        setName('')
        setPrice('')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-2">Vite + React + Tailwind</h1>
        <p className="text-sm text-gray-600 mb-6">API message: <span className="font-medium">{message}</span></p>

        <form onSubmit={createItem} className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            <input className="col-span-2 p-2 border rounded" placeholder="Item name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="p-2 border rounded" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
          </div>
          <div className="mt-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Item</button>
          </div>
        </form>

        <div>
          <h2 className="text-lg font-medium mb-3">Created Items</h2>
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">No items yet — create one above.</p>
          ) : (
            <ul className="space-y-2">
              {items.map((it) => (
                <li key={it.id} className="p-3 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">ID: {it.id}</div>
                  </div>
                  <div className="font-semibold">${it.price}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
