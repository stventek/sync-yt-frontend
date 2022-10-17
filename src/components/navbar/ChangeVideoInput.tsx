import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import socket from '../../utilities/socket';
import { useState } from 'react';
import useStyles from './styles';
import validateVideoURL from '../../utilities/validate-yt-url';

export default function ChangeVideoInput(props : {room: string}) {
  const classes = useStyles();

  const [state, setState] = useState({url:"", configDialog: false} );

  const handlePlay = (e: any) => {
    if(e.keyCode === 13){
      e.preventDefault();
      const videoId = validateVideoURL(state.url);
      if(videoId === null)
        return console.log("invalid video url");
      socket.emit('play', props.room, videoId);
    }
  }

  const handleInputChange = (event : any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
};

    return (
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
  );
}
