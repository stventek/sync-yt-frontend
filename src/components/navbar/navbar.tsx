import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import socket from '../../utilities/socket';
import { useState } from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';

export default function NavBar(props : {room: string}) {
  const classes = useStyles();

  const [state, setState] = useState({url:""} );

  const handlePlay = (e: any) => {
    if(e.keyCode === 13){
      e.preventDefault();
      try{
        const videoId = state.url.split('v=')[1];
        socket.emit('play', props.room, videoId);
      }
      catch(err){
        console.log('invalid url')
      }
    }
  }
  
  const handleInputChange = (event : any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
};

  return (
    <div>
      <Toolbar style={{height: 64}}/>
      <AppBar position="fixed">
        <Toolbar style={{height: 64}}>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.linkTitle}>Sync YT</Link>
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
                <InputBase
                  name="url"
                  onChange={handleInputChange}
                  onKeyUp={handlePlay}
                  placeholder="URL"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
            </div>
          <IconButton color="inherit">
            <SettingsIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
