// SearchResults.js - This component is responsible for rendering the search results
// using the Tracklist component

import Tracklist from "./Tracklist";

function SearchResults({ tracks }) {
    return (
        <div className="SearchResults" >
            <h2>Results:</h2>
            <Tracklist tracks={tracks} />
        </div>
    );
}

export default SearchResults;