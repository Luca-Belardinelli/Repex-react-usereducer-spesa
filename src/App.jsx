import { useState } from 'react'


function App() {

  // array 
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  // stato per gestire la lista prodotti
  const [addProducts, setAddProducts] = useState([]);
  // console.log(addProducts)

  function addToCart(product) {
    const cart = addProducts.some(p => p.name === product.name);
    if (cart) {
      return;
    }
    setAddProducts(curr => [...curr, {
      ...product,
      quantity: 1
    }]);
  }


  return (
    <>
      <h1>Lista Prodotti</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> : {product.price.toFixed(2)} €
            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
      {addProducts.length > 0 && (
        <>
          <h2>Carrello</h2>
          <ul>
            {addProducts.map((p, index) => (
              <li key={index}>
                {p.name} - €{p.price.toFixed(2)} x {p.quantity}
              </li>
            ))}
          </ul>
        </>
      )}

    </>
  )
}

export default App
