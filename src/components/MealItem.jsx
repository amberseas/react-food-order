import {useContext} from "react";
import Button from "./UI/Button";
import {CartContext} from "../store/CartContext";

export default function MealItem ({id, name, img, price, description}) {
    const {items, addItemToCart} = useContext(CartContext);

    return (
        <div className="meal-item">
            <article>
                <img src={'http://localhost:3000/' + img} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">${price}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <div className='meal-item-actions'>
                    <Button onClick={() => addItemToCart(name, price, id)}>Add To Cart</Button>
                </div>
            </article>
        </div>
    );
}