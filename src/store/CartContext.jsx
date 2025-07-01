import {createContext, useReducer} from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

function shoppingCartReducer (state, action) {}

export default function CartContextProvider ({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []});
}