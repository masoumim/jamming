// Tracklist.js - This component will be used for two purposes: 
// 1. display the tracks returned by a query to the Spotify API
// 2. display the tracks of a users playlist 

import Track from "./Track";

function Tracklist({ tracks, buttonType, onAddSong }) {
    return (
        <div className="Tracklist">                      
            <ul style={{listStyleType: "none"}}>
                {tracks.map((track) => (
                    <Track key={track.id} name={track.name} artist={track.artist} album={track.album} buttonType={buttonType} onAddSong={onAddSong}/>
                ))}
            </ul>
        </div>
    );
}

export default Tracklist;