import {createContext, useReducer} from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: (name, price, id) => {},
    updateItemQuantity: () => {},
});

function shoppingCartReducer (state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingItemIndex = updatedItems.findIndex(item => item.id === action.payload.id);
        const existingItem = updatedItems[existingItemIndex];

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems.push({
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                quantity: 1
            });
        }

        return {
            items: updatedItems
        };
    }
    return state;
}

export default function CartContextProvider ({children}) {
    const [shoppingCart, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []});

    function handleAddItemToCart (name, price, id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: {
                name,
                price,
                id
            }
        });
    }

    const ctxValue = {
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart
    };

    return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;

}