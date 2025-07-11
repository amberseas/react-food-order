import {useContext, useState} from "react";
import {currencyFormatter} from '../utils/formatting.js';
import {CartContext} from "../store/CartContext";
import Button from "./UI/Button";

export default function MealItem ({meal}) {
    const {addItemToCart} = useContext(CartContext);
    const [justAdded, setJustAdded] = useState(false);

    function handleAddToCart () {
        addItemToCart(meal.name, meal.price, meal.id);
        setJustAdded(true);
        setTimeout(() => {
            setJustAdded(false);
        }, 2000);
    }

    return (
        <li key={meal.id} className="meal-item">
            <article>
                <img src={'http://localhost:3000/' + meal.image} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className='meal-item-actions'>
                    <Button onClick={handleAddToCart} disabled={justAdded}>{justAdded ? 'Item added!' : 'Add To Cart'}</Button>
                </p>
            </article>
        </li>
    );
}