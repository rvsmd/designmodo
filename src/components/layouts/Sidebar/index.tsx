import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import BSlider from 'src/components/ui/BSlider';
import AnimationParams from 'src/models/enums/AnimationParamsEnum';
import { IElementAnimationParams } from 'src/models/IElementAnimationParams';

interface BSidebarProps {
    changeParams: (type: AnimationParams, value: number | boolean | string) => void;
    animationParams: IElementAnimationParams;
    elementId: string;
}

const Sidebar = (props: BSidebarProps) => {
    const { changeParams, animationParams, elementId } = props;

    const [replay, setReplay] = useState<boolean>(animationParams.replay);

    useEffect(() => {
        setReplay(animationParams.replay);
    }, [animationParams]);

    useEffect(() => {
        changeParams(AnimationParams.replay, replay);
    }, [replay]);

    return (
        <div className={styles['sidebar-container']}>
            <div className={styles['sliders-wrapper']}>
                <div className={styles['slider-container']}>
                    <BSlider
                        hasNegativeValue
                        min={-100}
                        max={100}
                        step={1}
                        defaultValue={animationParams.x}
                        idElement={elementId}
                        paramsName='X'
                        valueSymbol=''
                        style={{ width: 118 }}
                        onChange={(value) => changeParams(AnimationParams.coordinateX, value)}
                    />
                </div>
                <div className={styles['slider-container']}>
                    <BSlider
                        hasNegativeValue
                        min={-100}
                        max={100}
                        step={1}
                        defaultValue={animationParams.y}
                        idElement={elementId}
                        paramsName='Y'
                        valueSymbol=''
                        style={{ width: 118 }}
                        onChange={(value) => changeParams(AnimationParams.coordinateY, value)}
                    />
                </div>
                <div className={styles['slider-container']}>
                    <BSlider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={animationParams.opacity}
                        idElement={elementId}
                        paramsName='Opacity'
                        valueSymbol='%'
                        style={{ width: 118 }}
                        onChange={(value) => changeParams(AnimationParams.opacity, value)}
                    />
                </div>
                <div className={styles['slider-container']}>
                    <BSlider
                        hasNegativeValue
                        min={-3}
                        max={3}
                        step={0.1}
                        defaultValue={animationParams.scale}
                        idElement={elementId}
                        paramsName='Scale'
                        valueSymbol=''
                        style={{ width: 118 }}
                        onChange={(value) => changeParams(AnimationParams.scale, value)}
                    />
                </div>
                <div className={styles['slider-container']}>
                    <BSlider
                        hasNegativeValue
                        min={-20}
                        max={20}
                        step={1}
                        defaultValue={animationParams.blur}
                        idElement={elementId}
                        paramsName='Blur'
                        valueSymbol=''
                        style={{ width: 118 }}
                        onChange={(value) => changeParams(AnimationParams.blur, value)}
                    />
                </div>
                <div className={styles['slider-container']}>
                    <BSlider
                        min={0}
                        max={6}
                        step={0.1}
                        defaultValue={animationParams.speed}
                        idElement={elementId}
                        paramsName='Speed'
                        valueSymbol='s'
                        style={{ width: 118 }}
                        onChange={(value) => changeParams(AnimationParams.speed, value)}
                    />
                </div>
                <div className={styles['slider-container']} style={{ marginTop: 20 }}>
                    <BSlider
                        min={0}
                        max={10}
                        step={0.1}
                        defaultValue={animationParams.delay}
                        idElement={elementId}
                        paramsName='Delay'
                        valueSymbol='s'
                        style={{ width: 118 }}
                        onChange={(value) => changeParams(AnimationParams.delay, value)}
                    />
                </div>
                <div className={styles['select-container']}>
                    <span style={{ fontSize: 11, fontFamily: 'Inter', fontWeight: 700, marginRight: 6 }}>Easing</span>
                    <select
                        value={animationParams.easing}
                        data-testid='Sidebar-Easing'
                        onChange={(e) => changeParams(AnimationParams.easing, e.target.value)}
                    >
                        <option value='cubic-bezier(0.12, 0, 0.39, 0)'>easeInSine</option>
                        <option value='cubic-bezier(0.22, 1, 0.36, 1)'>easeOutQuint</option>
                        <option value='cubic-bezier(0.7, 0, 0.84, 0)'>easeInExpo</option>
                        <option value='cubic-bezier(0.36, 0, 0.66, -0.56)'>easeInBack</option>
                        <option value='cubic-bezier(0.68, -0.6, 0.32, 1.6)'>easeInOutBack</option>
                    </select>
                </div>
                <div className={styles['toggle-container']}>
                    <span style={{ fontSize: 11, fontFamily: 'Inter', fontWeight: 700, marginRight: 10 }}>Replay</span>
                    <label className={styles['switch']} htmlFor='checkbox' data-testid='Sidebar-Replay'>
                        <input
                            disabled={replay ? false : true}
                            type='checkbox'
                            id='checkbox'
                            checked={replay}
                            onChange={() => setReplay(!replay)}
                        />
                        <div className={styles['slider']}></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
