import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Sidebar from '../../layouts/Sidebar';
import mainImg from '../../../assets/images/main-img.png';
import AnimationParams from 'src/models/enums/AnimationParamsEnum';
import { IElementAnimationParams } from 'src/models/IElementAnimationParams';
import useInterval from 'src/components/hooks/useInterval';
import Header from 'src/components/layouts/Header';

const Main = () => {
    const [elementAnimationParams, setElementAnimationParams] = useState<IElementAnimationParams>(() => {
        if (JSON.parse(localStorage.getItem('animationParams') as string)) {
            return JSON.parse(localStorage.getItem('animationParams') as string);
        } else
            return {
                x: 0,
                y: 0,
                opacity: 100,
                scale: 1,
                blur: 0,
                speed: 0,
                delay: 0,
                easing: 'cubic-bezier(0.12, 0, 0.39, 0)',
                replay: false,
            };
    });

    const [initialElementAnimationParams] = useState<IElementAnimationParams>(() => {
        return {
            x: 0,
            y: 0,
            opacity: 100,
            scale: 1,
            blur: 0,
            speed: 0,
            delay: 0,
            easing: 'cubic-bezier(0.12, 0, 0.39, 0)',
            replay: false,
        };
    });

    const [initialElement, setInitialElement] = useState<any>(() => {
        if (localStorage.getItem('animatedElementId')) {
            return document.querySelector('#' + localStorage.getItem('animatedElementId'));
        } else return null;
    });
    const [animatedElement, setAnimatedElement] = useState<any>(null);

    const saveAnimatedElement = (el: any) => {
        console.log(el);
        localStorage.setItem('animatedElementId', 'animatedBtn');
    };

    const saveParams = () => {
        localStorage.setItem('animationParams', JSON.stringify(elementAnimationParams));
    };

    const changeParams = (type: AnimationParams, value: number | boolean | string) => {
        switch (type) {
            case AnimationParams.coordinateX:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    x: value as number,
                });
                break;
            case AnimationParams.coordinateY:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    y: value as number,
                });
                break;
            case AnimationParams.opacity:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    opacity: value as number,
                });
                break;
            case AnimationParams.scale:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    scale: value as number,
                });
                break;
            case AnimationParams.blur:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    blur: value as number,
                });
                break;
            case AnimationParams.speed:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    speed: value as number,
                });
                break;
            case AnimationParams.delay:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    delay: value as number,
                });
                break;
            case AnimationParams.easing:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    easing: value as string,
                });
                break;
            case AnimationParams.replay:
                setElementAnimationParams({
                    ...elementAnimationParams,
                    replay: value as boolean,
                });
                break;
            default:
                break;
        }
    };

    const createWrapperElements = (el: any) => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.setAttribute('id', 'wrapperToAnimation' + el);
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        return wrapper;
    };

    const createCloneElement = (el: any) => {
        const cloneElement = el.cloneNode(true);
        cloneElement.style.position = 'absolute';
        cloneElement.style.margin = 0;
        cloneElement.style.width = el.style.width;
        cloneElement.style.height = el.style.height;
        cloneElement.style.top = window.getComputedStyle(el as Element, null).getPropertyValue('margin-top');
        cloneElement.style.left = window.getComputedStyle(el as Element, null).getPropertyValue('margin-left');

        cloneElement.style.transform =
            `translate(${elementAnimationParams.x + 'px'}, ${elementAnimationParams.y + 'px'})` +
            ` scale(${elementAnimationParams.scale})`;
        cloneElement.style.opacity = elementAnimationParams.opacity + '%';
        cloneElement.style.filter = `blur(${elementAnimationParams.blur + 'px'})`;

        return cloneElement;
    };

    const checkWrapper = (el: any) => {
        if (!el.id) return false;
        if (!el.id.includes('wrapperToAnimation')) return false;
        return true;
    };

    const chooseElement = (el: any) => {
        if (!el) return;
        const wrapper =
            el !== initialElement || !checkWrapper(el.parentNode) ? createWrapperElements(el) : el.parentNode;
        const cloneElement = !animatedElement ? createCloneElement(el) : animatedElement;
        wrapper.appendChild(cloneElement);
        setInitialElement(el);
        setAnimatedElement(cloneElement);
        saveAnimatedElement(el);
    };

    const returnElementInitialPosition = () => {
        if (!initialElement) return;
        if (initialElement.style.display === 'none') initialElement.style.display = 'block';
        initialElement.style.transition = `transform ${0 + 's'}, opacity ${0 + 's'}, filter ${0 + 's'}`;
        initialElement.style.transform =
            `translate(${initialElementAnimationParams.x + 'px'}, ${initialElementAnimationParams.y + 'px'})` +
            ` scale(${initialElementAnimationParams.scale})`;
        initialElement.style.opacity = initialElementAnimationParams.opacity + '%';
        initialElement.style.filter = `blur(${initialElementAnimationParams.blur + 'px'})`;
        if (animatedElement && animatedElement.style.display !== 'none') animatedElement.style.display = 'none';
    };

    const startElementAnimation = () => {
        initialElement.style.transition = `
			transform ${elementAnimationParams.speed + 's'} ${elementAnimationParams.easing},
			opacity ${elementAnimationParams.speed + 's'} ${elementAnimationParams.easing},
			filter ${elementAnimationParams.speed + 's'} ${elementAnimationParams.easing}
		`;
        initialElement.style.transform =
            `translate(${elementAnimationParams.x + 'px'}, ${elementAnimationParams.y + 'px'})` +
            ` scale(${elementAnimationParams.scale})`;
        initialElement.style.opacity = elementAnimationParams.opacity + '%';
        initialElement.style.filter = `blur(${elementAnimationParams.blur + 'px'})`;
    };

    const startAnimation = () => {
        if (!elementAnimationParams.replay) {
            // console.log('once');
            returnElementInitialPosition();
            setTimeout(() => {
                setTimeout(() => {
                    startElementAnimation();
                }, 100);
            }, elementAnimationParams.delay * 1000);
        }
    };

    const showPreview = () => {
        if (!initialElement) return;
        startAnimation();
    };

    useInterval(
        () => {
            // console.log('interval');
            if (!elementAnimationParams.delay) return;
            startElementAnimation();
            setTimeout(
                () => {
                    returnElementInitialPosition();
                },
                elementAnimationParams.delay * 1000 - 100,
            );
        },
        elementAnimationParams.replay ? elementAnimationParams.delay * 1000 : null,
    );

    useEffect(() => {
        saveParams();
        if (!animatedElement) {
            returnElementInitialPosition();
            chooseElement(initialElement);
            return;
        }
        returnElementInitialPosition();
        if (animatedElement.style.display === 'none') animatedElement.style.display = 'block';
        animatedElement.style.transition = `transform ${0 + 's'}, opacity ${0 + 's'}, filter ${0 + 's'}`;
        animatedElement.style.transform =
            `translate(${elementAnimationParams.x + 'px'}, ${elementAnimationParams.y + 'px'})` +
            ` scale(${elementAnimationParams.scale})`;
        animatedElement.style.opacity = elementAnimationParams.opacity + '%';
        animatedElement.style.filter = `blur(${elementAnimationParams.blur + 'px'})`;
    }, [elementAnimationParams]);

    useEffect(() => {
        setTimeout(() => {
            setInitialElement(() => document.querySelector('#' + localStorage.getItem('animatedElementId')));
        }, 0);
    }, []);

    return (
        <div style={{ backgroundColor: 'rgb(229, 229, 229)', height: '100vh' }}>
            <Header showPreview={showPreview} initialElement={initialElement} />
            <section className={styles['main-section']}>
                <div className={styles['section-body']}>
                    <div className={styles['section-page']}>
                        <div
                            style={{
                                marginTop: 16.64,
                                marginRight: 30,
                            }}
                        >
                            <h1>Animation Settings</h1>
                            <h3 style={{ marginTop: 22.82 }}>
                                The user should have the option to select any <br />
                                element on the page and set up its animation using <br />
                                the controls in the right panel. A dotted line will <br />
                                show the element's position and state before the <br />
                                animation begins, giving the user a clear idea of how <br />
                                the animation will appear. The preview button on the <br />
                                top panel will open the result in a new tab.
                            </h3>
                            <button
                                className={styles['section-btn']}
                                data-testId='animationButton'
                                id='animatedBtn'
                                onClick={(e) => chooseElement(e.target)}
                            >
                                Button
                            </button>
                        </div>
                        <img src={mainImg} width={300} height={300} />
                    </div>
                </div>
                <Sidebar changeParams={changeParams} animationParams={elementAnimationParams} />
            </section>
        </div>
    );
};

export default Main;
