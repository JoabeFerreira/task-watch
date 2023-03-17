import { useState } from "react"

interface NumericUpDownProps {
    value: number
    onChange: (value: number) => void
    max: number
    min: number
    disabled?: boolean
}

function NumericUpDown(props: NumericUpDownProps) {
    // const [upBtnEnabled, setUpBtnEnabled] = useState(!props.disabled);
    // const [downBtnEnabled, setDownBtnEnabled] = useState(!props.disabled);
    const [tempValue, setTempValue] = useState('');

    const handleUpClick = (): void => {
        let newValue = props.value + 1
        if (newValue > props.max) {
            newValue = props.min
        }
        props.onChange(newValue)
    }

    const handleDownClick = (): void => {
        let newValue = props.value - 1
        if (newValue < props.min) {
            newValue = props.max
        }
        props.onChange(newValue)
    }

    return <div className="numeric-updown">
        <button onClick={() => handleUpClick()}>+</button>
        <input value={props.value} onChange={e => setTempValue(e.target.value)} onBlur={() => enforceMinMax(tempValue)} />
        <button onClick={() => handleDownClick()}>-</button>
    </div>;

    function enforceMinMax(value: string) {
        let numberValue = +value;
        if (numberValue > props.max)
            numberValue = props.max
        else if (numberValue < props.min)
            numberValue = props.min
        props.onChange(numberValue)
    }
}

export default NumericUpDown;