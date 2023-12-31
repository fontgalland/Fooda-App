import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import { Card } from '../../UI/Card/Card';
import { MealItem } from '../MealItem/MealItem';

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch('https://react-food-app-355cc-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, [])

  if (isLoading) {
    return (
    <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
    )
  }

  if (httpError) {
    return (
    <section className={classes.mealsError}>
      <p>{httpError}</p>
    </section>
    )
  }

  const mealsList = meals.map(meal =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
}