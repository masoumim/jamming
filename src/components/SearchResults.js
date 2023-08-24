// SearchResults.js - This component is responsible for rendering the search results
// using the Tracklist component

import Tracklist from "./Tracklist";

function SearchResults({ tracks, onAddTrack, onSearchBarInputChange, searchBarInput, onSubmitSearch }) {
    return (
        <>
            <form onSubmit={onSubmitSearch}>
                <label htmlFor="searchBar">Search for a track:</label>
                <input required id="searchBar" name="searchBar" type="text" input={searchBarInput} onChange={onSearchBarInputChange}></input>
                <button type="submit">Search</button>
                
            </form>
            <div className="SearchResults" >
                <h2>Results:</h2>
                <Tracklist tracks={tracks} buttonType={"add"} onAddTrack={onAddTrack} />
            </div>
        </>
    );
}

export default SearchResults;