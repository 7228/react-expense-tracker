import { useContext, useState } from "react";
import "./Home.css";
import AppContext from "../AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const {stats, setStats} = useContext(AppContext);
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setStats(oldStats => {
            let salVal = parseInt(e.target.salary.value);
            let sideVal = parseInt(e.target.sideIncome.value);
            let giftVal = parseInt(e.target.gifts.value);
            let otherVal = parseInt(e.target.other.value);
            
            return {
                absolute:
                {
                    salary: salVal,
                    sideIncome: sideVal,
                    gifts: giftVal,
                    other: otherVal
                }, 
                percentage: {
                    total: salVal + sideVal + giftVal + otherVal,
                    
                    salary: function() {
                        return salVal/this.total * 100
                    },
                    sideIncome: function() {
                        return sideVal/this.total * 100
                    },
                    gifts: function() {
                        return giftVal/this.total * 100
                    },
                    other: function() {
                        if(otherVal > 0) {
                            return otherVal/this.total * 100
                        } 
                        return 0
                    } 
                }
            }
        })
        navigate("/main");
    }

    return(
        <div className="home-container">        
            <div className="form-monthly">
                <h1>Monthly Expense Tracker</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input className="form-input" placeholder="Salary Amount (€)" name="salary"></input>
                    <input className="form-input" placeholder="Side Income Amount (€)" name="sideIncome"></input>
                    <input className="form-input" placeholder="Gifts (€)" name="gifts"></input>
                    <input className="form-input" placeholder="Other (€)" name="other"></input>
                    <button type="submit" className="form-submit">Submit</button>
                </form>
            </div>
        </div>
    )
}