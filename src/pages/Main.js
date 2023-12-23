import "./Main.css";
import ProgressBar from "../components/ProgressBar";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import ExpenseBar from "../components/ExpenseBar";
import {nanoid} from "nanoid";

export default function Main() {
    const { expenses, setExpenses, stats } = useContext(AppContext);
    let last;

    const submitForm = (e) => {
        e.preventDefault();
        
       
        let cat = e.target.category.value.split(" ").join("");
        let dt = e.target.date.value;
        let amt = e.target.amount.value;


        setExpenses(oldExpenses => {
            return {
                ...oldExpenses,
                absolute : [...oldExpenses.absolute, {category: cat, date: dt, amount: amt, id:nanoid()}],
                total: oldExpenses.total + parseInt(amt)
            }
        })
    }

    const remove = (identification) => {
        const obj1 = expenses.absolute.filter((obj) => {
            return obj.id === identification;
        })
        
        setExpenses(oldExpenses => {
            return {
                ...oldExpenses,
                absolute: [...oldExpenses.absolute.filter((obj) => obj.id !== identification)],
                total: oldExpenses.total - obj1[0].amount
            }
        })
    }


    if(expenses.absolute) {
        last = expenses?.absolute.map((obj) => {
            let type;
            switch(obj.category) {
                case "BeautyandCare":
                    type = "Beaty and Care";
                    break;
                case "CarandTransportation":
                    type = "Car and Transport";
                    break;
                case "FoodandDrinks":
                    type = "Food and Drinks";
                    break
                default:
                    type = obj.category;
            }
    
            return(
                <div className="last">
                    <h2 className="last-type">{type}</h2>
                    <h2 className="last-amount">{obj.amount}€</h2>
                    <h2 className="last-date">{obj.date}</h2>
                    <i className="fa fa-solid fa-trash can" onClick={() => remove(obj.id)}></i>
                </div>
            ) 
            }
            
        )
    }
    

    
    return(
        <div className="main-page">
            <div className="main-content">
                <section className="income budget">
                    <ProgressBar />
                </section>
                <div className="balance-container">
                    <div className="border-top"></div>
                    <section className="balance">
                        <h1>Balance</h1>
                        <h2 className="balance-total">{stats.percentage.total - expenses?.total}€</h2>
                        <form className="add-item" onSubmit={submitForm}>
                            <select className="category field" name="category">
                                <option>Bills</option>
                                <option>Food and Drinks</option>
                                <option>Travel</option>
                                <option>Entertainment</option>
                                <option>Beauty and Care</option>
                                <option>Car and Transportation</option>
                                <option>Children</option>
                                <option>Other</option>
                            </select>
                            <input type="date" className="field" name="date"></input>
                            <input className="field" name="amount" placeholder="Amount (€)"></input>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                        <div className="recent-transactions">
                            <hr />
                            <h2 className="transactions">Recent Transactions</h2>
                            <div>{last?.sort((a, b) => a - b).reverse().slice(0, 4)}</div>
                        </div>
                        
                    </section>
                </div>
                <section className="expense budget">
                    <ExpenseBar />
                </section>
            </div>
            
        </div>
    )
}