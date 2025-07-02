import {useContext} from "react";
import {CartContext} from "../store/CartContext";
import Button from "./UI/Button";

export default function Cart () {
    const {items, updateItemQuantity} = useContext(CartContext);
    const totalSum = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <div className="cart">
                <h2>Your Cart</h2>
                <ul>{items.map(item => (
                    <li key={item.id} className="cart-item">
                        <p>{item.name} - {item.quantity} x ${item.price}</p>
                        <div className="cart-item-actions">
                            <Button text onClick={() => updateItemQuantity(item.id, -1)}>-</Button>
                            <span>{item.quantity}</span>
                            <Button text onClick={() => updateItemQuantity(item.id, 1)}>+</Button>
                        </div>
                    </li>))}
                </ul>
            </div>
            <div className="cart-total">${totalSum}</div>
        </>

    );
}