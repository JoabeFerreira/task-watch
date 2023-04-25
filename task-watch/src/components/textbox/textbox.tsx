import React, { FunctionComponent } from "react";
import './textbox.css'

interface TextboxProps {
    value: string
    onChange: (text: string) => void
    label: string
}
 
const Textbox: FunctionComponent<TextboxProps> = (props) => {
    return <div className="textbox">
        <label>{props.label}</label>
        <input value={props.value} onChange={e => props.onChange(e.target.value)} />
    </div>
    
}
 
export default Textbox;