import {useContext, useState} from "react";
import Button from "./UI/Button";
import {CartContext} from "../store/CartContext";

export default function MealItem ({id, name, img, price, description}) {
    const {items, addItemToCart} = useContext(CartContext);
    const [justAdded, setJustAdded] = useState(false);

    function handleAddToCart () {
        addItemToCart(name, price, id);
        setJustAdded(true);
        setTimeout(() => {
            setJustAdded(false);
        }, 2000);
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
                <p className='meal-item-actions'>
                    <Button onClick={handleAddToCart} disabled={justAdded}>{justAdded ? 'Item added!' : 'Add To Cart'}</Button>
                </p>
            </article>
        </div>
    );
}