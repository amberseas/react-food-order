import {currencyFormatter} from '../../utils/formatting.js';
import Button from '../UI/Button.jsx';

export default function CartItem ({item, updateItemQuantity}) {
    return (
        <li key={item.id} className="cart-item">
            <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
            <div className="cart-item-actions">
                <Button text onClick={() => updateItemQuantity(item.id, -1)}>-</Button>
                <span>{item.quantity}</span>
                <Button text onClick={() => updateItemQuantity(item.id, 1)}>+</Button>
            </div>
        </li>
    );
}