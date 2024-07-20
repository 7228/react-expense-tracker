import "./Main.css";
import ProgressBar from "../components/ProgressBar";
import { useContext, useState } from "react";
import AppContext from "../AppContext";
import ExpenseBar from "../components/ExpenseBar";
import {nanoid} from "nanoid";

export default function Main() {
    const [select, setSelect] = useState("Expense")
    const { expenses, setExpenses, stats, setStats } = useContext(AppContext);
    let last;

    const submitFormExpense = (e) => {
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

    const submitFormIncome = (e) => {
        e.preventDefault();


        setStats(oldStats => {
            let cat = e.target.category.value;
            let amount = e.target.amount.value;
            return {
                ...oldStats,
                absolute : {...oldStats.absolute, 
                    salary: cat === "salary" ? parseInt(oldStats.absolute.salary) + parseInt(amount) : oldStats.absolute.salary,
                    sideIncome: cat === "sideIncome" ? parseInt(oldStats.absolute.sideIncome) + parseInt(amount) : oldStats.absolute.sideIncome,
                    gifts: cat === "gifts" ? parseInt(oldStats.absolute.gifts) + parseInt(amount) : oldStats.absolute.gifts,
                    other: cat === "other" ? parseInt(oldStats.absolute.other) + parseInt(amount) : oldStats.absolute.other
                
                },
                percentage: {...oldStats.percentage, 
                    total: oldStats.absolute.salary + oldStats.absolute.sideIncome + oldStats.absolute.gifts + oldStats.absolute.other
                }
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
    

    console.log("stats",stats);
    
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
                        {select === "Expense" ?
                        <form className="add-item" onSubmit={submitFormExpense}>
                            <select className="category field" name="type" onChange={(e) => setSelect(e.target.value)}>
                                <option>Expense</option>
                                <option>Income</option>
                            </select>
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
                        :
                        <form className="add-item" onSubmit={submitFormIncome}>
                            <select className="category field" name="type" onChange={(e) => setSelect(e.target.value)}>
                                <option>Expense</option>
                                <option>Income</option>
                            </select>
                            <select className="category field" name="category">
                                <option value="salary">Salary</option>
                                <option value="sideIncome">Side Income</option>
                                <option value="gifts">Gifts</option>
                                <option value="other">Other</option>
                            </select>
                            <input type="date" className="field" name="date"></input>
                            <input className="field" name="amount" placeholder="Amount (€)"></input>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                        }
                        <div className="recent-transactions">
                            <hr />
                            <h2 className="transactions">Recent Expenses</h2>
                            <div>{last?.sort((a, b) => a - b).reverse().slice(0, 3)}</div>
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