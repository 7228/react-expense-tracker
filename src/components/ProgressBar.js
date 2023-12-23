import React, { useContext, useEffect, useRef, useState } from "react"
import CountUp from "react-countup";
import "./ProgressBar.css"
import AppContext from "../AppContext";


export default function ProgressBar(props) {
    const [percentage, setPercentage] = useState(0);
    const {stats, setStats} = useContext(AppContext);
    
    const sideIncomeStart = stats.percentage.salary() * 3.6;
    const sideIncomeEnds = sideIncomeStart + stats.percentage.sideIncome() * 3.6;
    const giftsStart = sideIncomeStart + sideIncomeEnds;
    const giftsEnd = 360 - stats.percentage.other() * 3.6; 
    
    
    useEffect(() => {
       
        setTimeout(() => {
        if (percentage < stats.percentage.salary()) {
            setPercentage(percentage + 1);
        }
        }, 50);
        
    }, [percentage]);
    
    const ProgressBarStyle = {
        background:`conic-gradient(#2ae84a ${percentage * 3.6}deg, #0c48c9 ${sideIncomeStart}deg, #0c48c9 ${sideIncomeEnds}deg, orange ${sideIncomeEnds}deg, orange ${giftsEnd}deg, green ${giftsEnd}deg)`
    }

    
    return(
        <div>
            <section className="progress-bar" style={ProgressBarStyle}>
                <span className="progress-value">
                    <small>Salary <span className="value"><CountUp duration={stats.percentage.sideIncome() / 12} className="counter" end={stats.percentage.salary()}></CountUp>
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
                        <h3 className="legend-description">Salary <span className="value-span">{Math.round(stats.percentage.salary())}% ({stats.absolute.salary}€)</span></h3>
                    </div>
                    <div className="legend-container">
                        <div className="side-income-legend"></div>
                        <h3 className="legend-description">Side Income <span className="value-span">{Math.round(stats.percentage.sideIncome())}%  ({stats.absolute.sideIncome}€)</span></h3>
                    </div>
                    <div className="legend-container">
                        <div className="gifts-legend"></div>
                        <h3 className="legend-description">Gifts <span className="value-span">{Math.round(stats.percentage.gifts())}% ({stats.absolute.gifts}€)</span></h3>
                    </div>
                    <div className="legend-container">
                        <div className="other-legend"></div>
                        <h3 className="legend-description">Other <span className="value-span">{Math.round(stats.percentage.other())}% ({stats.absolute.other}€)</span></h3>
                    </div>
                </div>
            </section>
        </div>
    )
}