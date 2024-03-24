import React, { useState, useEffect, useMemo } from 'react';
import styles from './style.module.scss';

interface BRangeSliderPropsTypes {
    min: number;
    max: number;
    step: number;
    defaultValue?: number;
    idElement?: string;
    paramsName: string;
    valueSymbol: string;
    onChange: (value: number) => void;
    hasNegativeValue?: boolean;
    style?: React.CSSProperties;
}

const BRangeSlider = (props: BRangeSliderPropsTypes) => {
    const {
        min,
        max,
        step,
        defaultValue = min,
        idElement,
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

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const inputMemo = useMemo(() => {
        return (
            <input
                key={'BRangeSlider-' + paramsName + idElement}
                type='range'
                min={min}
                max={max}
                step={step}
                defaultValue={defaultValue}
                data-testid={'BRangeSlider-' + paramsName}
                onChange={(e) => setValue(parseFloat(e.target.value))}
            />
        );
    }, [idElement]);

    const spanMemo = useMemo(() => {
        return <span className={styles['range-selected']} style={{ right: right, left: left }} />;
    }, [left, right]);

    return (
        <div className={styles['slider-container']}>
            <span style={{ fontSize: 11, fontFamily: 'Inter', fontWeight: 700, marginRight: 10 }}>{paramsName}</span>
            <div style={style}>
                <div className={styles['range-slider']}>{spanMemo}</div>
                <div className={styles['range-input']}>{inputMemo}</div>
            </div>
            <div className={styles['range-input-value']}>{value + valueSymbol}</div>
        </div>
    );
};

export default BRangeSlider;
