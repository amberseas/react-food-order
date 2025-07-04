import {useContext} from "react";
import {CartContext} from "../../store/CartContext";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import {currencyFormatter} from '../../utils/formatting.js';

export default function Cart ({ref, onCheckout}) {
    const {items, updateItemQuantity} = useContext(CartContext);
    const totalSum = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Modal ref={ref} className="cart">
            <h2>Your Cart</h2>
            <ul>{items.map(item => (
                <li key={item.id} className="cart-item">
                    <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
                    <div className="cart-item-actions">
                        <Button text onClick={() => updateItemQuantity(item.id, -1)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button text onClick={() => updateItemQuantity(item.id, 1)}>+</Button>
                    </div>
                </li>))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalSum)}</p>
            <form method="dialog">
                <p className="modal-actions">
                    <Button text>Close</Button>
                    {totalSum > 0 && <Button onClick={onCheckout}>Go to Checkout</Button>}
                </p>
            </form>
        </Modal>
    );
}