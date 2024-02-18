import React from 'react';
import styles from './style.module.scss';
import logoIcon from '../../../assets/images/icons/logo-icon.svg';

interface HeaderProps {
    showPreview: () => void;
    initialElement: Element;
}

const Header = (props: HeaderProps) => {
    const { showPreview, initialElement } = props;

    return (
        <header className={styles['header']}>
            <img src={logoIcon} alt='logo' width={27.44} height={28} />
            <button
                className={styles['header__btn']}
                data-testId='preview'
                onClick={showPreview}
            >
                Preview
            </button>
        </header>
    );
};

export default Header;
