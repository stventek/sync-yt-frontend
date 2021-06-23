import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './views/home/home';
import Room from './views/room/room';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import './utilities/socket';

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Router>
          <Switch>
            <Route exact component={Home} path="/"/>
            <Route path="/room/:room" render={props => {return <Room {...props}/>}}/>
            <Redirect to="/"/>
          </Switch>
        </Router>
      </CssBaseline>
    </div>
  );
}

export default App;
