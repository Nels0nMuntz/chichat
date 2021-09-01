import React from 'react';

import style from './NotFound.module.scss';

const NotFound : React.FC = () => {

    const handleClick = React.useCallback(() => history.back(), [])

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <h1>404</h1>
                <p>page not found</p>
                <span className={style.link} onClick={handleClick}>go back home</span>
            </div>
        </div>
    )
}

export default NotFound;