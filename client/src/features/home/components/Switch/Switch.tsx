import React from 'react';
import { withStyles } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

import { AppTheme, ThemeContext } from 'shared';


const StyledSwitch = withStyles({
    switchBase: {
        padding: '10px',
        color: '#C4C9CC',
        '&.Mui-checked': {
            color: 'var(--color-primary)',
            '& + $track': {
                opacity: 1,
                backgroundColor: 'var(--color-primary)',
            },
            '& $thumb': {
                backgroundColor: 'var(--color-bg-100)',
                borderColor: 'var(--color-primary)',
            }
        }
    },
    thumb: {
        width: '18px',
        height: '18px',        
        backgroundColor: 'var(--color-white)',
        border: '2px solid #C4C9CC'
    },
    track: {
        opacity: 1,
        backgroundColor: '#C4C9CC',
    }
})(Switch);

const ThemeSwitch: React.FC = React.memo(() => {

    const { theme, switchTheme } = React.useContext(ThemeContext);

    return (
        <StyledSwitch
            checked={theme === AppTheme.Dark}
            onChange={switchTheme}
            disableRipple
            disableTouchRipple
        />
    )
});

export default ThemeSwitch