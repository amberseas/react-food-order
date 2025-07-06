import {useHttp} from "../hooks/useHttp";
import MealItem from "./MealItem";
import ErrorMessage from "./ErrorMessage";

const reqConfig = {};

export default function Meals () {
    const {
        isFetching,
        error,
        fetchedData: meals,
    } = useHttp('http://localhost:3000/meals', reqConfig, []);

    if (error) {
        console.log(error);
        return <ErrorMessage title="Something went wrong..." message={error} />;
    }

    return (
        <>
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