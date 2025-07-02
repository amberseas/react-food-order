import {useContext} from "react";
import Button from "./UI/Button";
import {CartContext} from "../store/CartContext";

export default function MealItem ({id, name, img, price, description}) {
    const {items, addItemToCart} = useContext(CartContext);


    function add () {
        console.log(items);
        addItemToCart(name, price, id);
    }

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
                    <button className='button' onClick={add}>Add To Cart</button>
                </div>
            </article>
        </div>
    );
}