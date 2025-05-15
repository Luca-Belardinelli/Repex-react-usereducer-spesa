import { useReducer } from 'react'; // Importa useReducer da React per gestire lo stato complesso

// Funzione reducer che gestisce le azioni sul carrello
function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Cerca se il prodotto è già presente nel carrello
      const cart = addedProducts.find(p => p.name === action.payload.name);

      if (cart) {
        // Se il prodotto esiste già, aumenta la quantità di 1
        return addedProducts.map(p =>
          p.name === action.payload.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        // Se non esiste, aggiungilo con quantità 1
        return [
          ...addedProducts,
          {
            ...action.payload,
            quantity: 1
          }
        ];
      }
    }

    case 'UPDATE_QUANTITY':
      // Se la quantità non è valida (minore di 1 o non numero), ritorna lo stato senza modifiche
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }

      // Altrimenti aggiorna la quantità del prodotto specificato
      return addedProducts.map(p =>
        p.name === action.payload.name
          ? { ...p, quantity: action.payload.quantity }
          : p
      );

    case 'REMOVE_ITEM':
      // Rimuove un prodotto dal carrello filtrando per nome
      return addedProducts.filter(p => p.name !== action.payload);

    default:
      // Se l'azione non è riconosciuta, ritorna lo stato attuale
      return addedProducts;
  }
}

function App() {
  // Array di prodotti disponibili con nome e prezzo
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  // Stato per gestire i prodotti nel carrello con useReducer
  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  // Calcola il totale da pagare sommando (prezzo * quantità) per ogni prodotto
  const totalToPay = addedProducts.reduce(
    (acc, p) => acc + (p.price * p.quantity),
    0
  );

  return (
    <>
      <h1>Lista Prodotti</h1>
      <ul>
        {/* Mappa l'array dei prodotti disponibili per mostrarli come elementi lista */}
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.name}</strong> : {product.price.toFixed(2)} €
            <button onClick={() => dispatchCart({
              type: 'ADD_ITEM',
              payload: product
            })}>
              Aggiungi al carrello
            </button>
          </li>
        ))}
      </ul>

      {/* Mostra la sezione carrello solo se ci sono prodotti aggiunti */}
      {addedProducts.length > 0 && (
        <>
          <h2>Carrello</h2>
          <ul>
            {/* Mappa i prodotti nel carrello mostrando nome, prezzo e quantità */}
            {addedProducts.map((p, index) => (
              <li key={index}>
                {/* Input per modificare la quantità del prodotto */}
                <input
                  type="number"
                  value={p.quantity}
                  onChange={e => dispatchCart({
                    type: 'UPDATE_QUANTITY',
                    payload: {
                      name: p.name,
                      quantity: parseInt(e.target.value)
                    }
                  })}
                />
                {p.name} - €{p.price.toFixed(2)} x {p.quantity}
                <button onClick={() => dispatchCart({
                  type: 'REMOVE_ITEM',
                  payload: p.name
                })}>
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>

          {/* Mostra il prezzo totale dei prodotti nel carrello */}
          <h3> totale da pagare : {totalToPay.toFixed(2)} €</h3>
        </>
      )}
    </>
  );
}

export default App;
