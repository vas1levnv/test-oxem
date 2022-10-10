import React, {useEffect, useState} from "react";
import Slider from "./components/Slider/Slider";
import s from './App.module.scss'
import axios from "axios";

function App() {
    let [price, setValueAuto] = useState(3300000)
    const handleChangeAuto = (event) => {
        setValueAuto(event.target.value)
    }

    let [initialPrize, setInitialPrize] = useState(13)
    const handleChangeInitialPrize = (event) => {
        setInitialPrize(event.target.value)
    }

    let [months, setValueLeasing] = useState(60)
    const handleChangeLeasing = (event) => {
        setValueLeasing(event.target.value)
    }

    const [data, setData] = useState(null);

    const initial = price * initialPrize / 100

    const monthPay = Math.floor((price - initial) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1)));

    const totalSum = initial + months * monthPay


    const info = {
        "car_coast": price,
        "initail_payment": initial,
        "initail_payment_percent": initialPrize,
        "lease_term": months,
        "total_sum": totalSum,
        "monthly_payment_from": monthPay
    }

    function handleSubmit(event) {
        event.preventDefault()
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
            credentials: 'same-origin',
        }
        axios.post(
            'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
            info,
            {headers: headers}
        ).then(function (response) {
            console.log(response);
        })
    }

    return (
        <div className={s.app}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Стоимость автомобиля</div>
                    <Slider value={price}
                            min={1000000}
                            max={6000000}
                            step={1000}
                            handleChange={handleChangeAuto}/>
                </div>
                <div>
                    <div>Первоначальный взнос</div>
                    <Slider value={initialPrize}
                            initial={initial}
                            min={10}
                            max={60}
                            step={1}
                            handleChange={handleChangeInitialPrize}/>
                </div>
                <div>
                    <div>Срок лизинга</div>
                    <Slider value={months}
                            min={1}
                            max={60}
                            step={1}
                            handleChange={handleChangeLeasing}/>
                </div>
                <div>
                    <div>Сумма договора лизинга</div>
                    <div>{totalSum}</div>
                </div>
                <div>
                    <div>Ежемесячный платеж от</div>
                    <div>{monthPay}</div>
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default App;
