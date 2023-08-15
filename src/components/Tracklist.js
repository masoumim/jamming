// Tracklist.js - This component will display the search results returned by a query to the Spotify API

import Track from "./Track";

function Tracklist({ tracks }) {

    return (
        <div className="Tracklist">
            <h2>Results:</h2>            
            <ul style={{listStyleType: "none"}}>
                {tracks.map((track) => (
                    <Track key={track.id} name={track.name} artist={track.artist} album={track.album} />
                ))}
            </ul>
        </div>
    );
}

export default Tracklist;