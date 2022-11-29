import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './views/home/home';
import Room from './views/room/room';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import './utilities/socket';
import Admin from './views/admin-signin/Admin';
import Dashboard from './views/admin-dashboard/Dashboard';
import './utilities/axios-mid'
import { ThemeProvider } from '@material-ui/core';
import theme from './utilities/theme';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
