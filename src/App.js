import React, {useEffect, useState} from "react";
import Slider from "./components/Slider/Slider";
import s from './App.module.scss'
import axios from "axios";
import SliderPercent from "./components/SliderPercent/SliderPercent";
import preloaderImg from './assets/img/preloader.svg'

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

    const [preloader, setPreloader] = useState(false);

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
        setPreloader(true)


        axios.post(
            'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
            info,
            {headers: headers}
        ).then(function (response) {
            console.log(response)

        }).finally(() => {
            setTimeout(() => {
                setPreloader(false)
            }, 2000)
        })
    }

    return (
        <div className={s.app}>
            <div className={s.appWrapper}>
                <h1 className={s.mainText}>Рассчитайте стоимость<br/>автомобиля в лизинг</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={s.title}>Стоимость автомобиля</div>
                        <Slider value={price}
                                min={1000000}
                                max={6000000}
                                step={1000}
                                handleChange={handleChangeAuto}/>
                    </div>
                    <div>
                        <div className={s.title}>Первоначальный взнос</div>
                        <SliderPercent value={initialPrize}
                                       initial={initial}
                                       min={10}
                                       max={60}
                                       step={1}
                                       handleChange={handleChangeInitialPrize}/>
                    </div>
                    <div>
                        <div className={s.title}>Срок лизинга</div>
                        <Slider value={months}
                                min={1}
                                max={60}
                                step={1}
                                handleChange={handleChangeLeasing}/>
                    </div>
                    <div className={s.sum}>
                        <div className={s.title}>Сумма договора лизинга</div>
                        <div className={s.mainText}>{totalSum}</div>
                    </div>
                    <div className={s.sum}>
                        <div className={s.title}>Ежемесячный платеж от</div>
                        <div className={s.mainText}>{monthPay}</div>
                    </div>
                    <button className={s.btn} type="submit">
                        {preloader ? <div><img src={preloaderImg} alt=""/></div> : <div>Отправить</div>}
                    </button>


                </form>
            </div>
        </div>
    );
}

export default App;
