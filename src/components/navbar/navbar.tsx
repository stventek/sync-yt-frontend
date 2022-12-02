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
import Button from '@material-ui/core/Button';

type propWithChangeVideoInput = {withChangeVideoInput: true, room: string, useConfigDialog?: boolean, logOut?: boolean}
type prop = {withChangeVideoInput: false, useConfigDialog?: boolean, logOut?: boolean}

export default function NavBar(props : prop | propWithChangeVideoInput) {
  const classes = useStyles();

  const [state, setState] = useState({configDialog: false} );

  const handleDialogConfigOpen = () => {
    setState({...state, configDialog: true})
  }
  
  const handleDialogConfigClose = () => {
    setState({...state, configDialog: false})
  }

  const handleDialogConfigSave = () => {
    setState({...state, configDialog: false})
  }


  return (
    <div>
      {props.useConfigDialog && state.configDialog? 
        <UserConfigDialog 
        handleClose={handleDialogConfigClose}  
        handleSave={handleDialogConfigSave}/> : undefined}
      <Toolbar style={{height: 64}}/>
      <AppBar position="fixed">
        <Toolbar style={{height: 64}}>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.linkTitle}>Sync YT</Link>
          </Typography>
          { props.withChangeVideoInput ? <ChangeVideoInput room={props.room}/> : undefined}
          {props.useConfigDialog ? <IconButton 
            style={props.withChangeVideoInput ? undefined : {marginLeft: "auto"}} 
            color="inherit" 
            onClick={handleDialogConfigOpen}>
            <SettingsIcon/>
          </IconButton>: undefined}
          {props.logOut ? <Button color="inherit" style={{marginLeft: "auto"}}>Log Out</Button> : undefined}
        </Toolbar>
      </AppBar>
    </div>
  );
}
