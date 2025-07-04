import {useRef} from "react";
import MealItem from "./MealItem";
import ErrorMessage from "./ErrorMessage";
import {useHttp} from "../hooks/useHttp";

const reqConfig = {};

export default function Meals () {
    const errorDialog = useRef();
    const {isFetching, error, setError, fetchedData: meals, setFetchedData: setMeals} = useHttp('http://localhost:3000/meals', reqConfig, []);
    if (error) {
        errorDialog.current.open();
    }

    function handleError () {
        errorDialog.current.close();
        setMeals([]);
        setError(null);
    }

    return (
        <>
            <ErrorMessage ref={errorDialog} title='Something went wrong' message={error ? error.message : ''} onConfirm={handleError} />
            {isFetching && <p className="center">Loading...</p>}
            <ul id="meals">
                {meals.map(meal => {
                    return <MealItem
                        key={meal.id}
                        meal={meal}
                    />;
                })}
            </ul>
        </>
    );
}