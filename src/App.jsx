import { useState } from 'react'

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  return (
    <>
      <h1>Lista Prodotti</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}€{product.price.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
