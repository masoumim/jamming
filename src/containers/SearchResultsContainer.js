// SearchResultsContainer.js - This component will contain all of the logic involved in searching
// for tracks using the Spotify API, gathering and parsing the results and exporting them.

import React, { useState } from "react";
import { generateId } from "@/utilities";
import SearchResults from "@/components/SearchResults";
import { addSongHandler } from "./PlaylistContainer";

function SearchResultsContainer() {

    // Create a temporary hardcoded array of tracks to mock data returned by API
    const tracks = [
        {
            id: generateId(),
            name: "Song 1",
            artist: "Artist 1",
            album: "Album 1"
        },
        {
            id: generateId(),
            name: "Song 2",
            artist: "Artist 2",
            album: "Album 2"
        },
        {
            id: generateId(),
            name: "Song 3",
            artist: "Artist 3",
            album: "Album 3"
        }
    ];

    // State variables for the list of tracks returned by API
    const [fetchedTracks, setFetchedTracks] = useState(tracks);

    // Return the fetchedTracks state variable to the SearchResults component
    return (
        <SearchResults tracks={fetchedTracks} onAddSong={addSongHandler}/>
    );
}

export default SearchResultsContainer;