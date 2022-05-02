import { useContext, useReducer, createContext } from "react";
import CartReducer from "./CartReducer";

const CartContext = createContext();
const CartContextDispatcher = createContext();

const initialState = {
  cart: [],
  total: 0,
};

export default function CartProvider ({ children })  {
  const [cart, dispatch] = useReducer(CartReducer, initialState);
  return (
    <CartContext.Provider value={cart}>
      <CartContextDispatcher.Provider value={dispatch}>
        {children}
      </CartContextDispatcher.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useCartActions = () => useContext(CartContextDispatcher);
