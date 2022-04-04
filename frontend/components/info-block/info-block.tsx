import classNames from 'classnames';
import { FC } from 'react';
import css from './info-block.module.scss';

export enum InfoBlockType {
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
    SUCCESS = 'success',
}

interface InfoBlockProps {
    text: string;
    type?: InfoBlockType;
}

const InfoBlock: FC<InfoBlockProps> = ({ text, type = InfoBlockType.INFO }) => {
    const classes = classNames(
        css[type.toString().toLowerCase()]
    );

    return (
        <div className={classes}>
            <p>{ text }</p>
        </div>
    );
};

export default InfoBlock;
