import {createContext, useReducer} from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: (name, price, id) => {},
    updateItemQuantity: (id, quantity) => {},
    clearCart: () => {}
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
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.id
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.quantity;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: [],
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

    function handleUpdateCartItemQuantity (id, quantity) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                id,
                quantity
            }
        });
    }

    function handleClearCart () {
        shoppingCartDispatch({
            type: 'CLEAR_CART',
        });
    }

    const ctxValue = {
        items: shoppingCart.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
        clearCart: handleClearCart
    };

    return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;

}