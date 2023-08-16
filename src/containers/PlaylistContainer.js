// PlaylistContainer.js - This component handles the logic and state for a playlist

import React, { useState, useEffect } from "react";
import { generateId } from "@/utilities";
import Playlist from "@/components/Playlist";

function PlaylistContainer() {

    // Mock data for playlists
    const playlistsArray = [
        {
            playlistName: "playlist1",
            playlistId: generateId(),
            tracks: {
                track1: {
                    id: generateId(),
                    name: "Song 4",
                    artist: "Artist 4",
                    album: "Album 4"
                },
                track2: {
                    id: generateId(),
                    name: "Song 5",
                    artist: "Artist 5",
                    album: "Album 5"
                },
                track3: {
                    id: generateId(),
                    name: "Song 6",
                    artist: "Artist 6",
                    album: "Album 6"
                }
            }
        },
        {
            playlistName: "playlist2",
            playlistId: generateId(),
            tracks: {
                track1: {
                    id: generateId(),
                    name: "Song 7",
                    artist: "Artist 7",
                    album: "Album 7"
                },
                track2: {
                    id: generateId(),
                    name: "Song 8",
                    artist: "Artist 8",
                    album: "Album 8"
                },
                track3: {
                    id: generateId(),
                    name: "Song 9",
                    artist: "Artist 9",
                    album: "Album 9"
                }
            }
        }
    ];

    // State variables for user input
    const [userInput, setUserInput] = useState("");

    // State variables for playlists
    const [playlists, setPlaylists] = useState(playlistsArray);

    // State variables for which playlist is open
    const [openPlaylist, setOpenPlaylist] = useState("");

    // Updates the userInput state on every change to the input field
    function handleUserInput(event) {
        setUserInput(event.target.value);
    }

    useEffect(() => {

    }, []);

    // Handle new playlist form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevents the page from reloading (?)                
        const newPlaylist = {
            playlistName: userInput,
            playlistId: generateId()
        }
        setPlaylists((playlists) => [...playlists, newPlaylist]);
    }

    // Handle click on playlist name
    function handleClickPlaylist(event) {
        let clickedPlaylist = event.target.className;
        console.log(`clickedPlaylist: ${clickedPlaylist}`);

        if (openPlaylist === "") {
            console.log("IF 1");
            // No other playlists are open - open this one.
            // Open clicked playlist
            const songlist = document.createElement("p");
            songlist.innerText = "Song List...";
            const playlist = document.getElementById(clickedPlaylist);
            playlist.appendChild(songlist);
            setOpenPlaylist(clickedPlaylist);
            return;
        }
        if (clickedPlaylist === openPlaylist) {
            console.log("IF 2");
            // Close this playlist
            const clicked = document.getElementById(clickedPlaylist);            
            
            for(let i = 0; i < clicked.children.length; i++){
                clicked.removeChild(clicked.children[i]);
            }

            setOpenPlaylist("");
            return;
        }
        
        // TODO: USE MY CHILD NODE DELETION LOOP IN IF 3
        if (clickedPlaylist !== openPlaylist) {
            console.log("IF 3");
            // Close open playlist
            const open = document.getElementById(openPlaylist);
            while (open.hasChildNodes()) {
                open.removeChild(open.firstChild);
            }

            // Open clicked playlist
            const songlist = document.createElement("p");
            songlist.innerText = "Song List...";
            const clicked = document.getElementById(clickedPlaylist);
            clicked.appendChild(songlist);
            setOpenPlaylist(clickedPlaylist);
            return;
        }

        console.log(`openPlaylist: ${openPlaylist}`);
    }

    // TODO: When another playlist is clicked, stop displaying tracks of previous playlist and display tracks of clicked playlist.
    return (
        <>
            <Playlist onInputChange={handleUserInput} userInput={userInput} onSubmitHandler={handleSubmit} playlists={playlists} onClickPlaylist={handleClickPlaylist} />
        </>
    );
}

export default PlaylistContainer;
