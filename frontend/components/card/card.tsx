import { FC } from 'react';
import css from './card.module.scss';

const Card: FC = ({ children }) => {
    return (
        <div className={css.card}>
            {children}
        </div>
    );
};

export default Card;
