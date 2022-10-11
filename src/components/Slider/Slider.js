import React from "react";
import s from './Slider.module.scss'

function Slider(props) {

    function setNumber() {
        if (props.value < props.min && props.min) {
        }
        if (props.value > props.max && props.value) {
        }
    }

    return <div className={s.slider}>
        <input className={s.number}
               type={"number"}
               disabled={props.disabled}
               value={props.value}
               onChange={props.handleChange}
            /*  onChange={setNumber}*//>
        <div className={s.text}>{props.text}</div>
        <input type="range" defaultValue={props.value}
               min={props.min}
               max={props.max}
               step={props.step}
               disabled={props.disabled}
               onChange={props.handleChange}/>
    </div>
}

export default Slider