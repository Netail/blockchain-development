import { FC, ReactNode } from 'react';
import css from './card.module.scss';

interface CardProps {
    children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
    return (
        <div className={css.root}>
            {children}
        </div>
    );
};

export default Card;
