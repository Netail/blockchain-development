import { FC } from 'react';
import css from './button.module.scss';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button className={css.root} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
