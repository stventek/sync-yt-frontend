import PlayerControls from "./player-controls";

export default function Player(){
    return (
        <div>
            <PlayerControls start={1000 * 45} end={1000 * 60 * 60}/>
        </div>
    )
}
