import * as React from 'react';
import { BaseSyntheticEvent, useState } from 'react';
import './LabelRange.css'


interface LabelRangeProps {
    value: number;
    unit: string;
    isEditable: boolean;
    onUpdateLabel: (internalValue: number) => any;
    alignContentEditable: 'left' | 'right'
}

const LabelRange = ({ value, unit, isEditable, onUpdateLabel, alignContentEditable }: LabelRangeProps) => {
    const [tempValue, setTempValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    const handlerChange = (event: BaseSyntheticEvent) => {
        const { value } = event.target;

        setTempValue(value)
        event.preventDefault();
    }

    const onBlur = () => {
        setNewValue();
    }

    const onSubmit = (event: BaseSyntheticEvent) => {
        setNewValue();
        event.preventDefault();
    }

    const onClickLabel = () => {
        setIsEditing(true);
        setTempValue(value);
    }

    const setNewValue = () => {

        const isInvalid = onUpdateLabel(tempValue);
        if (isInvalid) {
            setIsInvalid(true);
        } else {
            setIsEditing(false);
            setIsInvalid(false);
        }

    }

    const renderLabel = () => {
        if (isEditable && isEditing) {
            return (
                <form onSubmit={onSubmit}>
                    <input
                        data-testid="input-range"
                        className={isInvalid ? 'error' : ''}
                        autoFocus
                        type="number"
                        role="textbox"
                        value={tempValue}
                        onChange={handlerChange}
                        onBlur={onBlur}
                        style={{
                            textAlign: alignContentEditable
                        }}
                    />
                </form>

            );
        }

        return (<div className="label-range" onClick={onClickLabel} data-testid="label-range" >{`${value} ${unit}`}</div>);
    }

    return (
        renderLabel()
    )
}

export default LabelRange;
