import React from "react";
import s from './SliderPercent.module.scss'

function SliderPercent(props) {
    return <div className={s.sliderPercent}>

        {props.initial &&
            <div>
                {props.initial}
            </div>
        }
        <input value={props.value} onChange={props.handleChange}/>
        <input type="range" defaultValue={props.value}
               min={props.min}
               max={props.max}
               step={props.step}
               onChange={props.handleChange}/>
    </div>
}

export default SliderPercent