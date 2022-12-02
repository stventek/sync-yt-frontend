import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './views/home/home';
import Room from './views/room/room';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import './utilities/socket';
import Admin from './views/admin-signin/Admin';
import Dashboard from './views/admin-dashboard/Dashboard';
import './utilities/axios-mid'
import { createTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { createContext, useMemo, useState } from 'react';
import darkTheme from './utilities/dark-theme';
import lightTheme from './utilities/theme';

const ColorModeContext = createContext({ changeColorMode: (mode: string) => {} });

function App() {
  const [mode, setMode] = useState<string>(localStorage.getItem('mode') || 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const colorMode = useMemo(
    () => ({
      changeColorMode: (mode: string) => {
        setMode(mode)
      },
    }),
    [],
  )

  const theme = useMemo(
    () => {
      console.log(mode)
      switch(mode) {
        case 'light':
          return createTheme(lightTheme)
        case 'dark':
          return createTheme(darkTheme)
        case 'system':
          return prefersDarkMode ? createTheme(darkTheme) : createTheme(lightTheme)
        default:
          return prefersDarkMode ? createTheme(darkTheme) : createTheme(lightTheme)
      }
    },
    [mode, prefersDarkMode],
  )

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Router>
              <Switch>
                <Route exact component={Home} path="/"/>
                <Route path="/room/:room" render={props => {return <Room {...props}/>}}/>
                <Route component={Admin} path="/admin/signin"/>
                <Route component={Dashboard} path="/admin/dashboard"/>
                <Redirect to="/"/>
              </Switch>
            </Router>
          </CssBaseline>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export {ColorModeContext}
export default App
