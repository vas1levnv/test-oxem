import React from "react";

function Slider(props) {

    let getValue = () => {
        console.log(props.value)
    }


    return <div>

        {props.initial &&
            <div>
                <span>{props.initial}</span>
            </div>
        }
        <input value={props.value} onChange={props.handleChange}/>
        <input type="range" defaultValue={props.value}
               min={props.min}
               max={props.max}
               step={props.step}
               onChange={props.handleChange}/>

        <button onClick={getValue}>btn</button>
    </div>
}

export default Slider