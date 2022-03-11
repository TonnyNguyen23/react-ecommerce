const cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []

const cartReducer = (state = cart, action) => {
  const product = action.payload
  switch (action.type) {
    case 'ADDITEM':
      // Check if product already exists
      const exist = state.find(x => x.id === product.id)

      if (exist) {
        // Increase the Quantity
        const carts = state.map(x =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        )
        localStorage.setItem('cart', JSON.stringify(carts))
        return carts
      } else {
        const product = action.payload
        const carts = [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ]
        localStorage.setItem('cart', JSON.stringify(carts))
        return carts
      }

    case 'DELETEITEM':
      const exist1 = state.find(x => x.id === product.id)

      if (exist1.qty === 1) {
        const carts = state.filter(x => x.id !== exist1.id)
        localStorage.setItem('cart', JSON.stringify(carts))
        return carts
      } else {
        const carts = state.map(x =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        )
        localStorage.setItem('cart', JSON.stringify(carts))
        return carts
      }

    default:
      return state
  }
}

export default cartReducer
