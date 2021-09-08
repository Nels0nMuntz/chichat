import React, { ReactChild } from 'react';
import { AppTheme } from 'shared';


interface IThemeContext {
    theme: AppTheme
    switchTheme: () => void
};

type ThemeContextProps = {
    children: ReactChild
};

export const ThemeContext = React.createContext({} as IThemeContext);

export const ThemeProvider : React.FC<ThemeContextProps> = ({ children }) => {

    const [theme, setTheme] = React.useState<AppTheme>(AppTheme.Light);

    const switchTheme = React.useCallback(() => {
        theme === AppTheme.Light ? setTheme(AppTheme.Dark) : setTheme(AppTheme.Light);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};