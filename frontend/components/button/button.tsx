import { FC } from 'react';
import css from './button.module.scss';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button className={css.button} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
