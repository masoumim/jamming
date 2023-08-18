// SearchResults.js - This component is responsible for rendering the search results
// using the Tracklist component

import Tracklist from "./Tracklist";

function SearchResults({ tracks, onAddSong }) {
    return (
        <div className="SearchResults" >
            <h2>Results:</h2>
            <Tracklist tracks={tracks} buttonType={"add"} onAddSong={onAddSong}/>
        </div>
    );
}

export default SearchResults;