// Tracklist.js - This component will be used for two purposes: 
// 1. display the tracks returned by a query to the Spotify API
// 2. display the tracks of a users playlist 

import Track from "./Track";

function Tracklist({ tracks, buttonType, onAddTrack, onRemoveTrack }) {
    return (
        <div className="Tracklist">                      
            <ul>
                {tracks.map((track) => (                    
                    <Track key={track.id} track={track} buttonType={buttonType} onAddTrack={onAddTrack} onRemoveTrack={onRemoveTrack}/>
                ))}
            </ul>
        </div>
    );
}

export default Tracklist;