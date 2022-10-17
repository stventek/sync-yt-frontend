import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { useState } from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import UserConfigDialog from '../user-config/UserConfigDialog';
import ChangeVideoInput from './ChangeVideoInput';

type propWithChangeVideoInput = {withChangeVideoInput: true, room: string}
type prop = {withChangeVideoInput: false}

export default function NavBar(props : prop | propWithChangeVideoInput) {
  const classes = useStyles();

  const [state, setState] = useState({configDialog: false} );

  const handleDialogConfigOpen = () => {
    setState({...state, configDialog: true})
  }
  
  const handleDialogConfigClose = () => {
    setState({...state, configDialog: false})
  }

  const handleDialogConfigSave = (username: string, color: string) => {
    localStorage.setItem('username', username)
    localStorage.setItem('color', color)
    setState({...state, configDialog: false})
  }


  return (
    <div>
      <UserConfigDialog handleClose={handleDialogConfigClose}  handleSave={handleDialogConfigSave} open={state.configDialog}/>
      <Toolbar style={{height: 64}}/>
      <AppBar position="fixed">
        <Toolbar style={{height: 64}}>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.linkTitle}>Sync YT</Link>
          </Typography>
          { props.withChangeVideoInput ? <ChangeVideoInput room={props.room}/> : undefined}
          <IconButton style={props.withChangeVideoInput ? undefined : {marginLeft: "auto"}} color="inherit" onClick={handleDialogConfigOpen}>
            <SettingsIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
