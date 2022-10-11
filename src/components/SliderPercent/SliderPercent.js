import React from "react";
import s from './SliderPercent.module.scss'

function SliderPercent(props) {
    return <div className={s.sliderPercent}>

        {props.initial && <div className={s.number}>
            {props.initial}
        </div>}
        <input className={s.percent} value={`${props.value} %`}
               disabled={props.disabled}
               onChange={props.handleChange}/>
        <input type="range" defaultValue={props.value}
               min={props.min}
               max={props.max}
               step={props.step}
               disabled={props.disabled}
               onChange={props.handleChange}/>
    </div>
}

export default SliderPercent