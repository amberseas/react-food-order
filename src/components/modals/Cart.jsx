import {currencyFormatter} from '../../utils/formatting.js';
import {useContext} from "react";
import {CartContext} from "../../store/CartContext";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import CartItem from "./CartItem.jsx";

export default function Cart ({ref, onCheckout}) {
    const {items, updateItemQuantity} = useContext(CartContext);
    const totalSum = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Modal ref={ref} className="cart">
            <h2>Your Cart</h2>
            <ul>{items.map(item => (<CartItem key={item.id} item={item} updateItemQuantity={updateItemQuantity} />))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalSum)}</p>
            <form method="dialog">
                <p className="modal-actions">
                    <Button text>Close</Button>
                    {items.length > 0 && <Button onClick={onCheckout}>Go to Checkout</Button>}
                </p>
            </form>
        </Modal>
    );
}