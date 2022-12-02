import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import socket from '../../utilities/socket';
import { FormEvent, useState } from 'react';
import useStyles from './styles';
import validateVideoURL from '../../utilities/validate-yt-url';

export default function ChangeVideoInput(props : {room: string}) {
  const classes = useStyles();

  const [state, setState] = useState({url:"", configDialog: false} );

  const handlePlay = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const videoId = validateVideoURL(state.url)
    if(videoId === null)
      return console.log("invalid video url")
    socket.emit('play', props.room, videoId)
    }

  const handleInputChange = (event : any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon />
            </div>
            <form onSubmit={handlePlay}>
              <InputBase
                  name="url"
                  onChange={handleInputChange}
                  placeholder="URL"
                  classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
              />  
            </form>
        </div>
  );
}
