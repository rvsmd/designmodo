import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';

interface BSliderPropsTypes {
    min: number;
    max: number;
    step: number;
    defaultValue?: number;
    paramsName: string;
    valueSymbol: string;
    onChange: (value: number) => void;
    hasNegativeValue?: boolean;
    style?: React.CSSProperties;
}

const BSlider = (props: BSliderPropsTypes) => {
    const {
        min,
        max,
        step,
        defaultValue = min,
        paramsName,
        valueSymbol,
        onChange,
        hasNegativeValue = false,
        style,
    } = props;
    const [value, setValue] = useState(defaultValue);
    const [right, setRigth] = useState('');
    const [left, setLeft] = useState('');

    useEffect(() => {
        if (!hasNegativeValue) {
            setLeft('0%');
            setRigth(`${100 - ((value - min) / (max - min)) * 100}%`);
            onChange(value);
            return;
        }
        if (value > (min + max) / 2) {
            setRigth(`${100 - ((value - min) / (max - min)) * 100}%`);
            setLeft('50%');
        } else {
            setRigth('50%');
            setLeft(`${((value - min) / (max - min)) * 100}%`);
        }
        onChange(value);
    }, [value, min, max]);

    return (
        <div className={styles['slider-container']}>
            <span style={{ fontSize: 11, fontFamily: 'Inter', fontWeight: 700, marginRight: 10 }}>{paramsName}</span>
            <div style={style}>
                <div className={styles['range-slider']}>
                    <span className={styles['range-selected']} style={{ right: right, left: left }} />
                </div>
                <div className={styles['range-input']}>
                    <input
                        type='range'
                        min={min}
                        max={max}
                        step={step}
                        defaultValue={defaultValue}
                        data-testid={'BSlider-' + paramsName}
                        onChange={(e) => setValue(parseFloat(e.target.value))}
                    />
                </div>
            </div>
            <div className={styles['range-input-value']}>{value + valueSymbol}</div>
        </div>
    );
};

export default BSlider;
