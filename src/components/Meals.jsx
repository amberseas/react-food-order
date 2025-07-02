import {useEffect, useState} from "react";
import MealItem from "./MealItem";

export default function Meals () {
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        async function loadMeals () {
            const response = await fetch('http://localhost:3000/meals');
            const meals = await response.json();
            setMeals(meals);
        }
        loadMeals();
    }, []);

    return (
        <div id="meals">
            {meals.map(meal => {
                return <MealItem
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    img={meal.image}
                    price={meal.price}
                    description={meal.description}
                />;
            })}
        </div>
    );
}