import { Fragment } from "react"
import { AvailableMeals } from "./AvailableMeals/AvailableMeals"
import { MealsSummary } from "./MealsSummary/MealsSummary"

export const Meals =  () => {
    return (
        <Fragment>
            <MealsSummary />
            <AvailableMeals />
        </Fragment>
    )
}