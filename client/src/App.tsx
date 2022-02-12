import React from 'react';
import { Switch } from 'react-router-dom';

import appRoutes from './app-routes';
import { ThemeContext } from 'shared';
import { useNotifier } from 'features/notification';




const App: React.FC = () => {

    useNotifier();

    const { theme, switchTheme } = React.useContext(ThemeContext);

    return (
        <div className={`App ${theme}`} onDoubleClick={switchTheme}>
            <Switch>
                {appRoutes}
            </Switch>
        </div>
    )
};

export default App;