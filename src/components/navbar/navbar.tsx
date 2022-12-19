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
import { useHistory } from 'react-router-dom'
import socket from '../../utilities/socket';

type propWithChangeVideoInput = {withChangeVideoInput: true, room: string, useConfigDialog?: boolean, logOut?: boolean}
type prop = {withChangeVideoInput: false, useConfigDialog?: boolean, logOut?: boolean}

export default function NavBar(props : prop | propWithChangeVideoInput) {
  const classes = useStyles()

  const history = useHistory()

  const [state, setState] = useState({configDialog: false} );

  const handleDialogConfigOpen = () => {
    setState({...state, configDialog: true})
  }
  
  const handleDialogConfigClose = () => {
    setState({...state, configDialog: false})
  }

  const handleDialogConfigSave = () => {
    if(props.useConfigDialog && props.withChangeVideoInput){
      const username = localStorage.getItem('username')
      const color = localStorage.getItem('color')
      const req = {username, color, room: props.room}
      socket.emit('userUpdate', req, (code: number, res: any) => {
        
      })
    }
    setState({...state, configDialog: false})
  }

  const handleLogOut = () => {
    localStorage.setItem('accessToken', '')
    localStorage.setItem('exp', '')
    history.push('/admin/signin')
  }

  return (
    <div>
        <UserConfigDialog 
          open={state.configDialog ? true : false}
          handleClose={handleDialogConfigClose}  
          handleSave={handleDialogConfigSave}/>
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
          {props.logOut ? <Button color="inherit" onClick={handleLogOut} style={{marginLeft: "auto"}}>Log Out</Button> : undefined}
        </Toolbar>
      </AppBar>
    </div>
  );
}
