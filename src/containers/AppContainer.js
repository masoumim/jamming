// AppContainer.js - This component handles the logic, date and state for all of the Presentational components

import React, { useState } from "react";
import Playlists from "@/components/Playlists";
import SearchResults from "@/components/SearchResults";
import { generateId } from "@/utilities";

function AppContainer() {

    // Mock data for playlists
    const playlistsArray = [
        {
            playlistName: "playlist1",
            playlistId: 1,
            tracks: [
                {
                    id: 4,
                    name: "Song 4",
                    artist: "Artist 4",
                    album: "Album 4"
                },
                {
                    id: 5,
                    name: "Song 5",
                    artist: "Artist 5",
                    album: "Album 5"
                },
                {
                    id: 6,
                    name: "Song 6",
                    artist: "Artist 6",
                    album: "Album 6"
                }
            ]
        },
        {
            playlistName: "playlist2",
            playlistId: 2,
            tracks: [
                {
                    id: 7,
                    name: "Song 7",
                    artist: "Artist 7",
                    album: "Album 7"
                },
                {
                    id: 8,
                    name: "Song 8",
                    artist: "Artist 8",
                    album: "Album 8"
                },
                {
                    id: 9,
                    name: "Song 9",
                    artist: "Artist 9",
                    album: "Album 9"
                }
            ]
        }
    ];

    // Create a temporary hardcoded array of tracks to mock data returned by API
    const tracks = [
        {
            id: 1,
            name: "Song 1",
            artist: "Artist 1",
            album: "Album 1"
        },
        {
            id: 2,
            name: "Song 2",
            artist: "Artist 2",
            album: "Album 2"
        },
        {
            id: 3,
            name: "Song 3",
            artist: "Artist 3",
            album: "Album 3"
        }
    ];

    // State variables for user input
    const [userInput, setUserInput] = useState("");

    // State variables for playlists
    const [playlists, setPlaylists] = useState(playlistsArray);

    // State variables for the list of tracks returned by API
    const [fetchedTracks, setFetchedTracks] = useState(tracks);

    // State variables to store the playlistId of currently open playlist
    const [activeIndex, setActiveIndex] = useState();

    // Handle adding song from SearchResults Tracklist to current Playlist Tracklist    
    function addSongHandler(id, name, artist, album) {
        
        // Create new track object
        const addedTrack = {
            id: id,
            name: name,
            artist: artist,
            album: album
        }

        // Map over the playlists state array
        const updatedArray = playlists.map(playlist => {            
            // If playlist in the state array matches currently open playlist      
            // AND that playlist doesn't already contain the addedTrack      
            if(playlist.playlistId === activeIndex && !playlist.tracks.some(e => e.id === id)){                
                
                // Create new playlist object with updated tracks array
                const updatedPlaylist = {
                    playlistName: playlist.playlistName,
                    playlistId: playlist.playlistId,
                    tracks: [...playlist.tracks, addedTrack]
                }                                
                return updatedPlaylist;
            }
            else{
                return playlist;
            }
        });

        setPlaylists(updatedArray);
    }

    // TODO: Handle removing song from current Playlist Tracklist
    function removeSongHandler() {

    }

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
        <>
            <SearchResults tracks={fetchedTracks} onAddSong={addSongHandler} />
            <Playlists onInputChange={handleUserInput} userInput={userInput} onSubmitHandler={handleSubmit} playlists={playlists} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </>
    );
}

export default AppContainer