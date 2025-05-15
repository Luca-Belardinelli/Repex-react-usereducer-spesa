import { useState } from 'react'

function App() {
  // Array di prodotti disponibili con nome e prezzo
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  // Stato per gestire i prodotti nel carrello
  const [addProducts, setAddProducts] = useState([]);


  // funzone per gestire la quantità degli oggetti nel carello
  function updateQuantity(name, quantity) {
    setAddProducts(curr => curr.map(p => p.name === name ? { ...p, quantity } : p)
    );
  }

  function addToCart(product) {
    // Verifica se il prodotto è già presente nel carrello
    const cart = addProducts.find(p => p.name === product.name);

    // Se il prodotto è già nel carrello, esce dalla funzione
    if (cart) {
      updateQuantity(cart.name, cart.quantity + 1);
      return;
    }

    // Aggiunge il nuovo prodotto al carrello con una quantità iniziale di 1
    setAddProducts(curr => [...curr, {
      ...product,
      quantity: 1
    }]);
  }

  function removeFromCart(productName) {
    // Funzione da implementare per rimuovere prodotti dal carrello
    setAddProducts(curr => curr.filter(p => p.name !== productName));
  }

  const totalToPay = addProducts.reduce((acc, p) => acc + (p.price * p.quantity),
    0);

  return (
    <>
      <h1>Lista Prodotti</h1>
      <ul>
        {/* Mappa l'array dei prodotti disponibili per crearli come elementi lista */}
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> : {product.price.toFixed(2)} €
            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>

      {/* Mostra la sezione carrello solo se ci sono prodotti aggiunti */}
      {addProducts.length > 0 && (
        <>
          <h2>Carrello</h2>
          <ul>
            {/* Mappa i prodotti nel carrello mostrando nome, prezzo e quantità */}
            {addProducts.map((p, index) => (
              <li key={index}>
                {p.name} - €{p.price.toFixed(2)} x {p.quantity}
                <button onClick={() => removeFromCart(p.name)}>Rimuovi dal carrello</button>
              </li>
            ))}
          </ul>
          <h3> totale da pagare : {totalToPay.toFixed(2)} €</h3>
        </>
      )}
    </>
  )
}

export default App
