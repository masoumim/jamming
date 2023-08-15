// PlaylistContainer.js - This component handles the logic and state for a playlist

import React, { useState } from "react";
import { generateId } from "@/utilities";
import Playlist from "@/components/Playlist";

function PlaylistContainer() {

    // Mock data for playlists
    const tracks = [
        {
            id: generateId(),
            name: "Song 4",
            artist: "Artist 4",
            album: "Album 4"
        },
        {
            id: generateId(),
            name: "Song 5",
            artist: "Artist 5",
            album: "Album 5"
        },
        {
            id: generateId(),
            name: "Song 6",
            artist: "Artist 6",
            album: "Album 6"
        }
    ];

    // State variables for user input
    const [userInput, setUserInput] = useState('');

    // State variables for playlists
    const [playlists, setPlaylists] = useState([]);

    // Updates the userInput state on every change to the input field
    function handleUserInput(event) {
        setUserInput(event.target.value);   
    }

    // Handle new playlist form submission
    function handleSubmit(event){
        event.preventDefault(); // Prevents the page from reloading (?)        
        const newPlaylist = userInput;        
        setPlaylists((playlists) => [...playlists, newPlaylist]);
    }

    // TODO: Add mock data for playlists (array of 2 playlists).
    // TODO: Display playlist names, if playlist is clicked, display tracks.
    // TODO: When another playlist is clicked, stop displaying tracks of previous playlist and display tracks of clicked playlist.
    return (
        <>
            <Playlist onInputChange={handleUserInput} userInput={userInput} onSubmitHandler={handleSubmit} playlists={playlists}/>
        </>
    );
}

export default PlaylistContainer;