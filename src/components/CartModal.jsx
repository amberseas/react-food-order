import {useContext, useRef, useImperativeHandle} from "react";
import {CartContext} from "../store/CartContext";
import {createPortal} from "react-dom";
import Button from "./UI/Button";

export default function CartModal ({ref}) {
    const {items, updateItemQuantity} = useContext(CartContext);
    const dialog = useRef();

    const totalSum = items.reduce((total, item) => total + item.price * item.quantity, 0);

    useImperativeHandle(ref, () => {
        return {
            open () {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className="modal">
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
            <form className="modal-actions" method="dialog">
                <Button text={true}>Close</Button>
                <Button>Go to Checkout</Button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}