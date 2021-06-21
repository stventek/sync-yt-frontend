import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import socket from '../../utilities/socket';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    marginRight: theme.spacing(2),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: "auto",
      width: 350
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

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
      <Toolbar/>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Sync YT
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
