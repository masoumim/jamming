// PlaylistContainer.js - This component handles the logic and state for a playlist

import React, { useState } from "react";
import { generateId } from "@/utilities";
import Playlists from "@/components/Playlists";

function PlaylistContainer() {

    // Mock data for playlists
    const playlistsArray = [
        {
            playlistName: "playlist1",
            playlistId: generateId(),
            tracks: [
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
            ]
        },
        {
            playlistName: "playlist2",
            playlistId: generateId(),
            tracks: [
                {
                    id: generateId(),
                    name: "Song 7",
                    artist: "Artist 7",
                    album: "Album 7"
                },
                {
                    id: generateId(),
                    name: "Song 8",
                    artist: "Artist 8",
                    album: "Album 8"
                },
                {
                    id: generateId(),
                    name: "Song 9",
                    artist: "Artist 9",
                    album: "Album 9"
                }
            ]
        }
    ];

    // State variables for user input
    const [userInput, setUserInput] = useState("");

    // State variables for playlists
    const [playlists, setPlaylists] = useState(playlistsArray);

    // Updates the userInput state on every change to the input field
    function handleUserInput(event) {
        setUserInput(event.target.value);
    }

    // Handle new playlist form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevents the page from reloading (?)                
        const newPlaylist = {
            playlistName: userInput,
            playlistId: generateId()
        }
        setPlaylists((playlists) => [...playlists, newPlaylist]);
    }

    return (                
        <Playlists onInputChange={handleUserInput} userInput={userInput} onSubmitHandler={handleSubmit} playlists={playlists}/>
    );
}

export default PlaylistContainer;
