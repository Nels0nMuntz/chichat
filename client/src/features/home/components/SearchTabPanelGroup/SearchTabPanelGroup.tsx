import React from 'react';

import { ChildrenProps } from 'shared';

import style from './SearchTabPanelGroup.module.scss';


type Props = ChildrenProps & {
    label: string;
    suffix?: string | JSX.Element;
}

const SearchTabPanelGroup : React.FC<Props> = ({ label, suffix, children }) => {
    return (
        <div className={style.group}>
            <div className={style.group_header}>
                <h4 className={style.group_header_title}>{label}</h4>
                {suffix
                    ? typeof suffix === "string"
                        ? <span className={style.group_header_suffix}>{suffix}</span>
                        : suffix
                    : null
                }                
            </div>
            {children}
        </div>
    )
};

export default SearchTabPanelGroup;