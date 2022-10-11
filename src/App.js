import React, {useEffect, useState} from "react";
import Slider from "./components/Slider/Slider";
import s from './App.module.scss'
import axios from "axios";
import SliderPercent from "./components/SliderPercent/SliderPercent";
import preloaderImg from './assets/img/preloader.svg'
import Popup from "./components/Popup/Popup";

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
    const [disabled, setDisabled] = useState(false);
    const [popupActive, setPopupActive] = useState(false)


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

    let infoJSON = JSON.stringify(info)

    function handleSubmit(event) {
        event.preventDefault()
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
            credentials: 'same-origin',
        }
        setPreloader(true)
        setDisabled(true)

        axios.post(
            'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
            infoJSON,
            headers
        ).then(res => {
            console.log(res);
            console.log(res.data);
        }).finally(() => { //TODO: временное решение так как не работает API
            let response = {success: true}
            setTimeout(() => {
                setPreloader(false)
                setDisabled(false)
                setPopupActive(true)
            }, 2000)
        })
    }

    return (
        <div className={s.app}>
            <div className={s.appWrapper}>
                <h1>Рассчитайте стоимость<br/>автомобиля в лизинг</h1>
                <form onSubmit={handleSubmit}>
                    <div className={s.item}>
                        <div className={s.title}>Стоимость автомобиля</div>
                        <Slider value={price}
                                min={1000000}
                                max={6000000}
                                step={1000}
                                text={'₽'}
                                disabled={disabled}
                                handleChange={handleChangeAuto}/>
                    </div>
                    <div className={s.item}>
                        <div className={s.title}>Первоначальный взнос</div>
                        <SliderPercent value={initialPrize}
                                       initial={initial}
                                       min={10}
                                       max={60}
                                       step={1}
                                       disabled={disabled}
                                       handleChange={handleChangeInitialPrize}/>
                    </div>
                    <div className={s.item}>
                        <div className={s.title}>Срок лизинга</div>
                        <Slider value={months}
                                min={1}
                                max={60}
                                step={1}
                                text={'мес.'}
                                disabled={disabled}
                                handleChange={handleChangeLeasing}/>
                    </div>
                    <div className={s.sum}>
                        <div className={s.title}>Сумма договора лизинга</div>
                        <div className={s.mainText}>{totalSum} ₽</div>
                    </div>
                    <div className={s.sum}>
                        <div className={s.title}>Ежемесячный платеж от</div>
                        <div className={s.mainText}>{monthPay} ₽</div>
                    </div>
                    <button className={s.btn} disabled={disabled} type="submit">
                        {preloader ?
                            <div className={s.btnImg}><img className={s.image} src={preloaderImg} alt=""/></div> :
                            <div>Оставить заявку</div>}
                    </button>
                </form>
                <Popup active={popupActive} setActive={setPopupActive}>
                    Ваша заявка принята
                </Popup>
            </div>
        </div>
    );
}

export default App;
