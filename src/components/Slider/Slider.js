import React from "react";
import s from './Slider.module.scss'

function Slider(props) {
    return <div className={s.slider}>
        <input className={s.number} min={props.min}
               max={props.max}
               value={props.value} onChange={props.handleChange}/>
        <input type="range" defaultValue={props.value}
               min={props.min}
               max={props.max}
               step={props.step}
               onChange={props.handleChange}/>
    </div>
}

export default Slider