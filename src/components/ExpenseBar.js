import "./ExpenseBar.css"
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";

export default function ExpensesBar() {
    const {expenses, setExpenses} = useContext(AppContext);
    let holder = {};
    
    expenses?.absolute.forEach((obj) => {
        if(holder.hasOwnProperty(obj.category)) {
            holder[obj.category] = holder[obj.category] + parseInt(obj.amount)
        } else {
            holder[obj.category] = parseInt(obj.amount);
        }})


    const bills = expenses?.total > 0 && holder.Bills > 0 ? holder?.Bills/expenses.total * 100 : 0;
    const food = expenses?.total > 0 && holder.FoodandDrinks > 0 ? holder?.FoodandDrinks/expenses.total * 100: 0;
    const travel = expenses?.total > 0 && holder.Travel > 0 ? holder?.Travel/expenses.total * 100 : 0; 
    const entertainment = expenses?.total > 0 && holder.Entertainment > 0 ? holder?.Entertainment/expenses.total * 100: 0;
    const beauty = expenses?.total > 0 && holder.BeautyandCare > 0 ? holder?.BeautyandCare/expenses.total * 100: 0;
    const car = expenses?.total > 0 && holder.CarandTransportation > 0 ? holder?.CarandTransportation/expenses.total * 100: 0;
    const children = expenses?.total > 0 && holder.Children > 0 ? holder?.Children/expenses.total * 100 : 0; 
    const other = expenses?.total > 0 && holder.Other > 0 ? holder?.Other/expenses.total * 100 : 0;
    
    const foodStart = bills * 3.6;
    const foodEnd = foodStart + food * 3.6;
    const travelStart = foodEnd;
    const travelEnd = travelStart + travel * 3.6;
    const entStart = travelEnd;
    const entEnd = entStart + entertainment * 3.6;
    const beautyStart = entEnd;
    const beautyEnd = beautyStart + beauty * 3.6;
    const carStart = beautyEnd;
    const carEnd = carStart + car * 3.6;
    const childrenStart = carEnd;
    const childrenEnd = childrenStart + children * 3.6;
    const otherStart = childrenEnd;
    const otherEnd = 360;
        
    console.log(foodStart);
    const conicGradient = `conic-gradient(
        red ${bills * 3.6}deg,
        orange ${foodStart}deg, orange ${foodEnd}deg, 
        blue ${travelStart}deg, blue ${travelEnd}deg,
        yellow ${entStart}deg, yellow ${entEnd}deg,
        purple ${beautyStart}deg, purple ${beautyEnd}deg,
        #2ae84a ${carStart}deg, #2ae84a ${carEnd}deg,
        brown ${childrenStart}deg, brown ${childrenEnd}deg,
        white ${childrenEnd}deg
        )`
    const backgroundColor = expenses?.total === 0 ? "white" : conicGradient;
    const style = {background:`${backgroundColor}`}
    console.log("Exp:", expenses)
    console.log("Hol:",holder)
    
    return(
        <div className="expenses-container">
            <section className="expense-bar" style={style}>
            </section>
            <h2>Expenses {expenses?.total} €</h2>
            <section className="expense-info">
                <div className="legend-container">
                    <div className="bills info"></div>
                    <h3 className="legend-description">Bills <span className="value-span">{Math.round(bills)}% ({holder.Bills > 0 ? holder.Bills : 0}€)</span></h3>
                </div>
                <div className="legend-container">
                    <div className="food info"></div>
                    <h3 className="legend-description">Food and Drinks <span className="value-span">{Math.round(food)}% ({holder.FoodandDrinks > 0 ? holder.FoodandDrinks : 0}€)</span></h3>
                </div>
                <div className="legend-container">
                    <div className="travel info"></div>
                    <h3 className="legend-description">Travel <span className="value-span">{Math.round(travel)}% ({holder.Travel > 0 ? holder.Travel : 0}€)</span></h3>
                </div>
                <div className="legend-container">
                    <div className="entertainment info"></div>
                    <h3 className="legend-description">Entertainment <span className="value-span">{Math.round(entertainment)}% ({holder.Entertainment > 0 ? holder.Entertainment : 0}€)</span></h3>
                </div>
                <div className="legend-container">
                    <div className="beauty info"></div>
                    <h3 className="legend-description">Beauty <span className="value-span">{Math.round(beauty)}% ({holder.Beauty > 0 ? holder.Beauty : 0}€)</span></h3>
                </div>
                <div className="legend-container">
                    <div className="car info"></div>
                    <h3 className="legend-description">Car and Transport <span className="value-span">{Math.round(car)}% ({holder.CarandTransportation > 0 ? holder.CarandTransportation : 0}€)</span></h3>
                </div>
                <div className="legend-container">
                    <div className="children info"></div>
                    <h3 className="legend-description">Children <span className="value-span">{Math.round(children)}% ({holder.Children > 0 ? holder.Children : 0}€)</span></h3>
                </div>
                <div className="legend-container">
                    <div className="other info"></div>
                    <h3 className="legend-description">Other <span className="value-span">{Math.round(other)}% ({holder.Other > 0 ? holder.Other : 0}€)</span></h3>
                </div>
            </section>
        </div>
    )
}