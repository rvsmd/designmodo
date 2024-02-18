import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Sidebar from '../../layouts/Sidebar';
import mainImg from '../../../assets/images/main-img.png';
import AnimationParams from 'src/models/enums/AnimationParamsEnum';
import { IElementAnimationParams } from 'src/models/IElementAnimationParams';
// import useInterval from 'src/components/hooks/useInterval';
import Header from 'src/components/layouts/Header';

/* eslint-disable */
const Main = () => {
    const [animatedElements, setAnimatedElements] = useState<{ params: IElementAnimationParams; id: string }[] | []>(() => {
        if (JSON.parse(localStorage.getItem('animatedElementIds') as string)) {
            return JSON.parse(localStorage.getItem('animatedElementIds') as string);
        } else return [];
    });

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
        if (animatedElements.findIndex(item => item.id === el.id) === -1) {
            setAnimatedElements([...animatedElements, {params: elementAnimationParams, id: el.id}]);
        }
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
        cloneElement.classList.add('clone');
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

    const returnElementInitialPosition = (el?: any) => {
        if (!el) return;
        if (el.style.display === 'none') el.style.display = 'block';
        el.style.transition = `transform ${0 + 's'}, opacity ${0 + 's'}, filter ${0 + 's'}`;
        el.style.transform =
            `translate(${initialElementAnimationParams.x + 'px'}, ${initialElementAnimationParams.y + 'px'})` +
            ` scale(${initialElementAnimationParams.scale})`;
            el.style.opacity = initialElementAnimationParams.opacity + '%';
            el.style.filter = `blur(${initialElementAnimationParams.blur + 'px'})`;
        if (animatedElement && animatedElement.style.display !== 'none') animatedElement.style.display = 'none';
        el.animate(
            [
                {
                    transform: `translate(${initialElementAnimationParams.x + 'px'}, ${initialElementAnimationParams.y + 'px'})` +` scale(${initialElementAnimationParams.scale})`,
                    opacity:  initialElementAnimationParams.opacity + '%',
                    filter: `blur(${initialElementAnimationParams.blur + 'px'})`,
                },
            ],
            {
                fill: "forwards",
            }
          );
    };

    const chooseElement = (el: any) => {
        if (!el) return;
        returnElementInitialPosition(el);
        if (animatedElements.findIndex(item => item.id === el.id) !== -1) {
            setElementAnimationParams(animatedElements[animatedElements.findIndex(item => item.id === el.id)].params);
        }
        const wrapper =
            el !== initialElement || !checkWrapper(el.parentNode) ? createWrapperElements(el) : el.parentNode;
        const cloneElement =
            el === initialElement
                ? !animatedElement
                    ? createCloneElement(el)
                    : animatedElement
                : createCloneElement(el);
        wrapper.appendChild(cloneElement);
        setInitialElement(el);
        setAnimatedElement(cloneElement);
        saveAnimatedElement(el);
    };

    const startElementAnimation = (el: any, params: any) => {
        el.animate(
            [
                {
                    transform: `translate(${initialElementAnimationParams.x + 'px'}, ${initialElementAnimationParams.y + 'px'})` +` scale(${initialElementAnimationParams.scale})`,
                    opacity:  initialElementAnimationParams.opacity + '%',
                    filter: `blur(${initialElementAnimationParams.blur + 'px'})`,
                },
                {
                    transform: `translate(${params.x + 'px'}, ${params.y + 'px'})` +` scale(${params.scale})`,
                    opacity:  params.opacity + '%',
                    filter: `blur(${params.blur + 'px'})`,
                },
            ],
            {
                fill: "forwards",
                delay: params.delay * 1000,
                easing: params.easing,
                duration: params.speed * 1000,
                iterations: params.replay ? 'Infinity' : 1,
                endDelay: params.delay * 1000,
            }
          );
    };

    const startAnimation = (el: any, params: any) => {
        returnElementInitialPosition(el);
        startElementAnimation(el, params);
    };

    const showPreview = () => {
        if (!initialElement || !animatedElements) return;
        animatedElements.map(item => startAnimation(document.querySelector('#' + item.id), item.params));
    };

    const saveElementParams = () => {
        if (animatedElements.find(item => item.id === animatedElement.id)) {
            const newAnimatedElements = animatedElements.map(item => {
                if (item.id !== animatedElement.id) return item;
                return {
                    params: elementAnimationParams,
                    id: item.id,
                }
            })
            setAnimatedElements(newAnimatedElements);
        }
    }

    useEffect(() => {
        saveParams();
        if (!animatedElement) {
            returnElementInitialPosition(initialElement);
            chooseElement(initialElement);
            return;
        }
        animatedElements.map(item => returnElementInitialPosition(document.querySelector('#' + item.id)));
        if (animatedElement.style.display === 'none') animatedElement.style.display = 'block';
        animatedElement.style.transition = `transform ${0 + 's'}, opacity ${0 + 's'}, filter ${0 + 's'}`;
        animatedElement.style.transform =
            `translate(${elementAnimationParams.x + 'px'}, ${elementAnimationParams.y + 'px'})` +
            ` scale(${elementAnimationParams.scale})`;
        animatedElement.style.opacity = elementAnimationParams.opacity + '%';
        animatedElement.style.filter = `blur(${elementAnimationParams.blur + 'px'})`;
        saveElementParams();

    }, [elementAnimationParams]);

    useEffect(() => {
        if (!animatedElements) return;
        if (!animatedElements.length) return;
        localStorage.setItem('animatedElementIds', JSON.stringify(animatedElements));
    }, [animatedElements]);

    useEffect(() => {
        setTimeout(() => {
            setInitialElement(() => document.querySelector('#' + localStorage.getItem('animatedElementId')));
        }, 0);
    }, []);

    return (
        <div style={{ backgroundColor: 'rgb(229, 229, 229)', height: '100vh' }}>
            <Header showPreview={showPreview} />
            <section className={styles['main-section']}>
                <div className={styles['section-body']}>
                    <div className={styles['section-page']}>
                        <div
                            style={{
                                marginTop: 16.64,
                                marginRight: 30,
                            }}
                        >
                            <h1 id='user-animatedTitle' onClick={(e) => chooseElement(e.target)}>
                                Animation Settings
                            </h1>
                            <h3
                                id='user-animatedSubtitle'
                                style={{ marginTop: 22.82 }}
                                onClick={(e) => chooseElement(e.target)}
                            >
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
                                id='user-animatedBtn'
                                onClick={(e) => chooseElement(e.target)}
                            >
                                Button
                            </button>
                        </div>
                        <img
                            src={mainImg}
                            width={300}
                            height={300}
                            id='user-animatedImg'
                            onClick={(e) => chooseElement(e.target)}
                        />
                    </div>
                </div>
                <Sidebar changeParams={changeParams} animationParams={elementAnimationParams} elementId={initialElement ? initialElement.id : ''} />
            </section>
        </div>
    );
};

export default Main;
