import Button from "./UI/Button";

export default function MealItem ({name, img, price, description}) {
    return (
        <div className="meal-item">
            <article>
                <img src={'http://localhost:3000/' + img} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">{price}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <div className='meal-item-actions'>
                    <Button className='button'>Add To Cart</Button>
                </div>
            </article>
        </div>
    );
}