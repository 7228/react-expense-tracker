import React, { useContext, useEffect, useRef, useState } from "react"
import CountUp from "react-countup";
import "./ProgressBar.css"
import AppContext from "../AppContext";


export default function ProgressBar() {
    const [percentage, setPercentage] = useState(0);
    const {stats, setStats} = useContext(AppContext);

    const salaryPercentage = Math.round(stats.absolute.salary/stats.percentage.total * 100)
    const sideIncomePercentage = Math.round(stats.absolute.sideIncome/stats.percentage.total * 100)
    const giftsPercentage = Math.round(stats.absolute.gifts/stats.percentage.total * 100);
    const otherPercentage = Math.round(stats.absolute.other/stats.percentage.total * 100);
    
    const sideIncomeStart = Math.round(salaryPercentage * 3.6);
    const sideIncomeEnds = Math.round(sideIncomeStart + sideIncomePercentage * 3.6);
    const giftsStart = sideIncomeEnds + 1;
    const giftsEnd = 360 - Math.round(giftsPercentage * 3.6); 
    
    
    console.log("sal-end", Math.round(percentage * 3.6), "sajd-start:",sideIncomeStart, "sajd-end:",sideIncomeEnds,"gifts-start", giftsStart, "gifts-end", giftsEnd,"other-start:", giftsEnd)
    /*useEffect(() => {
       
        setTimeout(() => {
        if (percentage < salaryPercentage) {
            setPercentage(percentage + 1);
        }
        }, 50);
        
    }, [percentage]);*/

    const conicGradient = `conic-gradient(
        #2ae84a ${salaryPercentage * 3.6}deg,
        #0c48c9 ${sideIncomeStart}deg, #0c48c9 ${sideIncomeEnds}deg,
        orange ${giftsStart}deg, orange ${giftsEnd}deg,
        green ${giftsEnd}deg
    )`
    
    const ProgressBarStyle = {
        background:conicGradient
    }

    
    return(
        <div>
            <section className="progress-bar" style={ProgressBarStyle}>
                <span className="progress-value">
                    <small>Salary <span className="value"><CountUp duration={stats.percentage.sideIncome() / 12} className="counter" end={salaryPercentage}></CountUp>
                    %
                    </span>
                    </small>
                </span>
            </section>
            <section className="bar-info">
                <h2 className="inc">Income <span className="value">{stats.percentage.total} €</span></h2>
                <div className="legend">
                    <div className="legend-container">
                        <div className="salary-legend"></div>
                        <h3 className="legend-description">Salary <span className="value-span">{Math.round(salaryPercentage)}% ({stats.absolute.salary}€)</span></h3>
                    </div>
                    <div className="legend-container">
                        <div className="side-income-legend"></div>
                        <h3 className="legend-description">Side Income <span className="value-span">{Math.round(sideIncomePercentage)}%  ({stats.absolute.sideIncome}€)</span></h3>
                    </div>
                    <div className="legend-container">
                        <div className="gifts-legend"></div>
                        <h3 className="legend-description">Gifts <span className="value-span">{Math.round(giftsPercentage)}% ({stats.absolute.gifts}€)</span></h3>
                    </div>
                    <div className="legend-container">
                        <div className="other-legend"></div>
                        <h3 className="legend-description">Other <span className="value-span">{Math.round(otherPercentage)}% ({stats.absolute.other}€)</span></h3>
                    </div>
                </div>
            </section>
        </div>
    )
}